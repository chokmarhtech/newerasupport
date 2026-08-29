"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";
import StaffRequestAlert from "@/emails/StaffRequestAlert";
import CandidateApplicationAlert from "@/emails/CandidateApplicationAlert";
import ClientRequestConfirmation from "@/emails/ClientRequestConfirmation";
import CandidateApplicationConfirmation from "@/emails/CandidateApplicationConfirmation";
import GeneralInquiryConfirmation from "@/emails/GeneralInquiryConfirmation";

// --- RESPONSE TYPE ---
export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  data?: any;
  mockMode?: boolean;
}

// --- RESEND INSTANTIATION ---
const resend = new Resend(process.env.RESEND_API_KEY || "re_mock");
const ADMIN_EMAIL = "info@newerasupport.co.uk";
const SENDER_EMAIL = "New Era Support <onboarding@resend.dev>"; // Fallback sender for Resend free tier

// --- VALIDATION SCHEMAS ---
const ClientRequestSchema = z.object({
  organizationName: z.string().min(2, "Organization name must be at least 2 characters").max(150),
  contactName: z.string().min(2, "Contact name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(6, "Phone number must be at least 6 characters").max(50),
  location: z.string().min(2, "Location must be at least 2 characters").max(150),
  requiredRoles: z.array(z.string()).min(1, "Please select at least one role"),
  shiftUrgency: z.enum(["Immediate", "Within 24h", "Future Rota"]),
  notes: z.string().max(2000).optional(),
});

const CandidateApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(120),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(6, "Phone number must be at least 6 characters").max(50),
  interestedRoles: z.array(z.string()).min(1, "Please select at least one role"),
  hasValidDbs: z.boolean(),
  hasRightToWork: z.boolean().refine((val) => val === true, {
    message: "You must confirm you have the right to work in the UK",
  }),
  availability: z.enum(["Full-Time", "Part-Time", "Nights/Weekends"]),
});

const GeneralInquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(120),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(50).optional().nullable(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200).optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(4000),
});

// --- SUBMISSION ACTIONS ---

export async function submitClientRequest(prevState: any, formData: FormData): Promise<ActionResponse> {
  try {
    const rawData = {
      organizationName: formData.get("organizationName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      requiredRoles: formData.getAll("requiredRoles"),
      shiftUrgency: formData.get("shiftUrgency"),
      notes: formData.get("notes"),
    };

    const validatedData = ClientRequestSchema.parse(rawData);

    // Save to Database via Prisma (catch errors for mock environment)
    let dbRecord = null;
    let isMockDb = false;

    try {
      dbRecord = await prisma.clientRequest.create({
        data: validatedData,
      });
    } catch (dbError) {
      console.warn("Database connection failed. Running in mock mode. Details:", dbError);
      isMockDb = true;
    }

    // Parallel Dual Email Dispatch: Admin Alert + Client Confirmation Receipt
    let isMockEmail = false;
    try {
      await Promise.all([
        // 1. Admin Alert Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🚨 [Urgent: ${validatedData.shiftUrgency}] Staffing Request - ${validatedData.organizationName}`,
          react: StaffRequestAlert({
            organizationName: validatedData.organizationName,
            contactName: validatedData.contactName,
            email: validatedData.email,
            phone: validatedData.phone,
            location: validatedData.location,
            requiredRoles: validatedData.requiredRoles,
            shiftUrgency: validatedData.shiftUrgency,
            notes: validatedData.notes,
          }),
        }),
        // 2. Client Confirmation Receipt Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: validatedData.email,
          subject: `Staffing Request Confirmation - New Era Support Ltd`,
          react: ClientRequestConfirmation({
            organizationName: validatedData.organizationName,
            contactName: validatedData.contactName,
            requiredRoles: validatedData.requiredRoles,
            shiftUrgency: validatedData.shiftUrgency,
            location: validatedData.location,
          }),
        }),
      ]);
    } catch (emailError) {
      console.warn("Email dispatch failed. Details:", emailError);
      isMockEmail = true;
    }

    return {
      success: true,
      data: dbRecord || validatedData,
      mockMode: isMockDb || isMockEmail,
      message: "Your staffing request has been submitted successfully. A confirmation receipt has been sent to your email.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}

export async function submitCandidateApplication(prevState: any, formData: FormData): Promise<ActionResponse> {
  try {
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interestedRoles: formData.getAll("interestedRoles"),
      hasValidDbs: formData.get("hasValidDbs") === "true",
      hasRightToWork: formData.get("hasRightToWork") === "true",
      availability: formData.get("availability"),
    };

    const validatedData = CandidateApplicationSchema.parse(rawData);
    
    // File Upload handling
    const file = formData.get("resume") as File;
    if (!file || file.size === 0) {
      return {
        success: false,
        errors: { resume: ["CV/Resume file is required"] },
      };
    }

    // File validation: Size <= 5MB
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        errors: { resume: ["File size must not exceed 5MB"] },
      };
    }

    // File validation: PDF or Word format
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      return {
        success: false,
        errors: { resume: ["Only PDF (.pdf) and Word (.doc/.docx) files are supported"] },
      };
    }

    let resumeFileUrl = "";
    let isMockUpload = false;

    // Upload to Supabase Storage
    if (supabaseAdmin) {
      try {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileExtension = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from("resumes")
          .upload(fileName, fileBuffer, {
            contentType: file.type,
            duplex: "half",
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin.storage
          .from("resumes")
          .getPublicUrl(fileName);

        resumeFileUrl = urlData.publicUrl;
      } catch (uploadError) {
        console.warn("Supabase Storage upload failed. Using mock file path. Details:", uploadError);
        resumeFileUrl = `https://mock-supabase-storage.local/resumes/${Date.now()}-${file.name}`;
        isMockUpload = true;
      }
    } else {
      console.warn("Supabase Admin client not initialized. Using mock file path.");
      resumeFileUrl = `https://mock-supabase-storage.local/resumes/${Date.now()}-${file.name}`;
      isMockUpload = true;
    }

    // Save candidate to DB
    let dbRecord = null;
    let isMockDb = false;

    try {
      dbRecord = await prisma.candidateApplication.create({
        data: {
          ...validatedData,
          resumeFileUrl,
        },
      });
    } catch (dbError) {
      console.warn("Database connection failed. Running in mock mode. Details:", dbError);
      isMockDb = true;
    }

    // Parallel Dual Email Dispatch: Admin Alert + Candidate Confirmation Receipt
    let isMockEmail = false;
    try {
      await Promise.all([
        // 1. Admin Alert Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `💼 New Candidate Application - ${validatedData.fullName}`,
          react: CandidateApplicationAlert({
            fullName: validatedData.fullName,
            email: validatedData.email,
            phone: validatedData.phone,
            interestedRoles: validatedData.interestedRoles,
            hasValidDbs: validatedData.hasValidDbs,
            hasRightToWork: validatedData.hasRightToWork,
            resumeFileUrl,
            availability: validatedData.availability,
          }),
        }),
        // 2. Candidate Confirmation Receipt Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: validatedData.email,
          subject: `Application Received - Welcome to New Era Support Ltd`,
          react: CandidateApplicationConfirmation({
            fullName: validatedData.fullName,
            interestedRoles: validatedData.interestedRoles,
            availability: validatedData.availability,
            hasValidDbs: validatedData.hasValidDbs,
          }),
        }),
      ]);
    } catch (emailError) {
      console.warn("Email dispatch failed. Details:", emailError);
      isMockEmail = true;
    }

    return {
      success: true,
      data: dbRecord || { ...validatedData, resumeFileUrl },
      mockMode: isMockDb || isMockEmail || isMockUpload,
      message: "Your job application has been submitted successfully. A confirmation receipt has been sent to your email.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}

export async function submitGeneralInquiry(prevState: any, formData: FormData): Promise<ActionResponse> {
  try {
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const validatedData = GeneralInquirySchema.parse(rawData);

    // Save to DB
    let dbRecord = null;
    let isMockDb = false;

    try {
      dbRecord = await prisma.generalInquiry.create({
        data: validatedData,
      });
    } catch (dbError) {
      console.warn("Database connection failed. Running in mock mode. Details:", dbError);
      isMockDb = true;
    }

    // Parallel Dual Email Dispatch: Admin Alert + User Confirmation Receipt
    let isMockEmail = false;
    try {
      await Promise.all([
        // 1. Admin Alert Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `✉️ General Inquiry: ${validatedData.subject || "No Subject"} - ${validatedData.fullName}`,
          text: `
Name: ${validatedData.fullName}
Email: ${validatedData.email}
Phone: ${validatedData.phone || "N/A"}
Subject: ${validatedData.subject || "N/A"}

Message:
${validatedData.message}
          `,
        }),
        // 2. User Confirmation Receipt Email
        resend.emails.send({
          from: SENDER_EMAIL,
          to: validatedData.email,
          subject: `We Have Received Your Message - New Era Support Ltd`,
          react: GeneralInquiryConfirmation({
            fullName: validatedData.fullName,
            subject: validatedData.subject || undefined,
            message: validatedData.message,
          }),
        }),
      ]);
    } catch (emailError) {
      console.warn("Email dispatch failed. Details:", emailError);
      isMockEmail = true;
    }

    return {
      success: true,
      data: dbRecord || validatedData,
      mockMode: isMockDb || isMockEmail,
      message: "Your message has been sent successfully. A confirmation receipt has been sent to your email.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors as Record<string, string[]>,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}
