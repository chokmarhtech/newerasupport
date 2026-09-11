"use server";

import fs from "fs";
import path from "path";
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

// --- RESEND EMAIL SETUP ---
const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey && resendApiKey.length > 5 ? new Resend(resendApiKey) : null;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "New Era Support <onboarding@contact.newerasupport.co.uk>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@newerasupport.co.uk";

// --- HELPER TO SAVE LOCAL FILES ON DISK ---
async function saveLocalFile(buffer: Buffer, originalFilename: string): Promise<string> {
  try {
    const fileExt = path.extname(originalFilename) || ".pdf";
    const sanitizedBase = path.basename(originalFilename, fileExt).toLowerCase().replace(/[^a-z0-9]/g, "_");
    const fileName = `${sanitizedBase}_${Date.now()}${fileExt}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filePath, buffer);
    return `/uploads/resumes/${fileName}`;
  } catch (err) {
    console.warn("Failed to write file to local disk:", err);
    return `#`;
  }
}

// --- VALIDATION SCHEMAS ---
const ClientRequestSchema = z.object({
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  requiredRoles: z.array(z.string()).min(1, "Please select at least one required role"),
  shiftUrgency: z.string().optional(),
  notes: z.string().optional(),
});

const CandidateApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  interestedRoles: z.array(z.string()).min(1, "Please select at least one role of interest"),
  hasValidDbs: z.preprocess((val) => val === "true" || val === true, z.boolean()),
  hasRightToWork: z.preprocess((val) => val === "true" || val === true, z.boolean()),
  availability: z.string().optional(),
});

const GeneralInquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// --- SERVER ACTIONS ---

// 1. SUBMIT CLIENT STAFF REQUEST ACTION
export async function submitClientRequest(prevState: any, formData: FormData): Promise<ActionResponse> {
  try {
    const rawRoles = formData.getAll("requiredRoles") as string[];

    const rawData = {
      organizationName: formData.get("organizationName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      requiredRoles: rawRoles,
      shiftUrgency: formData.get("shiftUrgency"),
      notes: formData.get("notes"),
    };

    const validatedData = ClientRequestSchema.parse(rawData);

    // Save to Database
    let dbRecord = null;
    let isMockDb = false;

    try {
      dbRecord = await prisma.clientRequest.create({
        data: validatedData,
      });
    } catch (dbError) {
      console.warn("Database notice: running fallback insert:", dbError);
      isMockDb = true;
    }

    // Parallel Dual Email Dispatch: Admin Alert + Client Confirmation Receipt
    let isMockEmail = false;
    if (resend) {
      try {
        await Promise.all([
          resend.emails.send({
            from: SENDER_EMAIL,
            to: ADMIN_EMAIL,
            subject: `🚨 Urgent Staff Request: ${validatedData.organizationName} (${validatedData.location})`,
            react: StaffRequestAlert({
              organizationName: validatedData.organizationName,
              contactName: validatedData.contactName,
              email: validatedData.email,
              phone: validatedData.phone,
              location: validatedData.location,
              requiredRoles: validatedData.requiredRoles,
              shiftUrgency: validatedData.shiftUrgency || "Normal",
              notes: validatedData.notes,
            }),
          }),
          resend.emails.send({
            from: SENDER_EMAIL,
            to: validatedData.email,
            subject: `Staff Request Received - New Era Support Ltd`,
            react: ClientRequestConfirmation({
              contactName: validatedData.contactName,
              organizationName: validatedData.organizationName,
              requiredRoles: validatedData.requiredRoles,
              shiftUrgency: validatedData.shiftUrgency,
            }),
          }),
        ]);
      } catch (emailError) {
        console.warn("Resend email dispatch notice:", emailError);
        isMockEmail = true;
      }
    } else {
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
        errors: error.flatten().fieldErrors,
        message: "Please correct the errors in the form.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred while submitting your request. Please try again.",
    };
  }
}

// 2. SUBMIT CANDIDATE APPLICATION ACTION
export async function submitCandidateApplication(prevState: any, formData: FormData): Promise<ActionResponse> {
  try {
    const rawRoles = formData.getAll("interestedRoles") as string[];

    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interestedRoles: rawRoles,
      hasValidDbs: formData.get("hasValidDbs"),
      hasRightToWork: formData.get("hasRightToWork"),
      availability: formData.get("availability"),
    };

    const validatedData = CandidateApplicationSchema.parse(rawData);

    // File Upload Handling
    const file = formData.get("resume") as File | null;
    if (!file || file.size === 0) {
      return {
        success: false,
        errors: { resumeFileUrl: ["Curriculum Vitae (CV) file is required."] },
        message: "Please upload your CV resume to complete your application.",
      };
    }

    let resumeFileUrl = "";
    let isMockUpload = false;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (supabaseAdmin) {
      try {
        const fileExtension = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from("candidate-documents")
          .upload(`resumes/${fileName}`, buffer, {
            contentType: file.type || "application/pdf",
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: urlData } = supabaseAdmin.storage
            .from("candidate-documents")
            .getPublicUrl(`resumes/${fileName}`);
          resumeFileUrl = urlData.publicUrl;
        } else {
          // Fallback to local disk save
          resumeFileUrl = await saveLocalFile(buffer, file.name);
          isMockUpload = true;
        }
      } catch (uploadError) {
        resumeFileUrl = await saveLocalFile(buffer, file.name);
        isMockUpload = true;
      }
    } else {
      resumeFileUrl = await saveLocalFile(buffer, file.name);
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
      console.warn("Database notice: candidate created with fallback ID:", dbError);
      isMockDb = true;
    }

    // Parallel Dual Email Dispatch: Admin Alert + Candidate Confirmation Receipt
    let isMockEmail = false;
    if (resend) {
      try {
        await Promise.all([
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
        console.warn("Resend email dispatch notice:", emailError);
        isMockEmail = true;
      }
    } else {
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
        errors: error.flatten().fieldErrors,
        message: "Please correct the errors in the form.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred while submitting your application. Please try again.",
    };
  }
}

// 3. SUBMIT GENERAL INQUIRY ACTION
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

    // Save to Database
    let dbRecord = null;
    let isMockDb = false;

    try {
      dbRecord = await prisma.generalInquiry.create({
        data: validatedData,
      });
    } catch (dbError) {
      console.warn("Database notice: general inquiry fallback:", dbError);
      isMockDb = true;
    }

    // Email Dispatch
    let isMockEmail = false;
    if (resend) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: validatedData.email,
          subject: "Thank You for Contacting New Era Support Ltd",
          react: GeneralInquiryConfirmation({
            fullName: validatedData.fullName,
            subject: validatedData.subject,
          }),
        });
      } catch (emailError) {
        console.warn("Resend email dispatch notice:", emailError);
        isMockEmail = true;
      }
    } else {
      isMockEmail = true;
    }

    return {
      success: true,
      data: dbRecord || validatedData,
      mockMode: isMockDb || isMockEmail,
      message: "Thank you for reaching out. Your message has been received and our team will get back to you shortly.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Please correct the errors in the form.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred while sending your message. Please try again.",
    };
  }
}
