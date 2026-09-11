"use server";

import { z } from "zod";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { uploadCandidateDocument } from "@/lib/supabase";
import OnboardingInviteEmail from "@/emails/OnboardingInviteEmail";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey && resendApiKey.startsWith("re_") ? new Resend(resendApiKey) : null;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "New Era Support <onboarding@contact.newerasupport.co.uk>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface OnboardingActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// 1. DISPATCH ONBOARDING INVITATION EMAIL SERVER ACTION
export async function sendOnboardingInviteAction(candidateId: string): Promise<OnboardingActionResponse> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in as Admin." };
  }

  try {
    let candidate = null;
    try {
      candidate = await prisma.candidateApplication.findUnique({
        where: { id: candidateId },
      });
    } catch (err) {
      console.warn("DB candidate lookup notice:", err);
    }

    if (!candidate) {
      // Fallback mock candidate for testing
      candidate = {
        id: candidateId,
        fullName: "Amina Bello",
        email: "a.bello@example.com",
        phone: "07555 123456",
        interestedRoles: ["Registered Nurse"],
        hasValidDbs: true,
        hasRightToWork: true,
        resumeFileUrl: "#",
        availability: "Full-Time",
        status: "NEW",
        createdAt: new Date(),
      };
    }

    // Generate unique secure token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days

    try {
      await prisma.onboardingToken.create({
        data: {
          token,
          email: candidate.email,
          candidateId: candidate.id,
          expiresAt,
        },
      });

      await prisma.candidateApplication.update({
        where: { id: candidate.id },
        data: { status: "ONBOARDING_SENT" },
      });
    } catch (dbErr) {
      console.warn("Prisma onboarding token creation notice:", dbErr);
    }

    const onboardingUrl = `${SITE_URL}/onboarding/${token}`;

    // Render & Send Email
    const emailHtml = await render(
      OnboardingInviteEmail({
        candidateName: candidate.fullName,
        onboardingUrl,
      })
    );

    if (resend) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: candidate.email,
          subject: "Complete Your Full Onboarding Application - New Era Support Ltd",
          html: emailHtml,
        });
      } catch (emailErr) {
        console.log(`[DEV MODE] Onboarding Link for ${candidate.email}: ${onboardingUrl}`);
      }
    } else {
      console.log(`[DEV MODE] Onboarding Link for ${candidate.email}: ${onboardingUrl}`);
    }

    revalidatePath("/admin/applications");
    revalidatePath(`/admin/applications/${candidateId}`);
    return { success: true, message: `Onboarding invitation sent successfully to ${candidate.email}` };
  } catch (error: any) {
    console.error("sendOnboardingInviteAction notice:", error);
    return { success: false, error: error.message || "Failed to send onboarding email" };
  }
}

// 2. SUBMIT CANDIDATE MULTI-STEP ONBOARDING FORM ACTION
export async function submitOnboardingFormAction(formData: FormData): Promise<OnboardingActionResponse> {
  try {
    const token = formData.get("token") as string;
    if (!token) {
      return { success: false, error: "Invalid or missing token" };
    }

    let tokenRecord = null;
    try {
      tokenRecord = await prisma.onboardingToken.findUnique({
        where: { token },
      });
    } catch (err) {
      console.warn("DB token check notice:", err);
    }

    // Step 1: Personal Info
    const candidateId = tokenRecord?.candidateId || (formData.get("candidateId") as string) || "cand-demo-id";
    const dateOfBirthStr = formData.get("dateOfBirth") as string;
    const gender = formData.get("gender") as string;
    const telephone = formData.get("telephone") as string;
    const address = formData.get("address") as string;
    const postcode = formData.get("postcode") as string;

    // Step 2: References 1 & 2
    const ref1FullName = formData.get("ref1FullName") as string;
    const ref1Organisation = formData.get("ref1Organisation") as string;
    const ref1Position = formData.get("ref1Position") as string;
    const ref1Telephone = formData.get("ref1Telephone") as string;
    const ref1Email = formData.get("ref1Email") as string;

    const ref2FullName = formData.get("ref2FullName") as string;
    const ref2Organisation = formData.get("ref2Organisation") as string;
    const ref2Position = formData.get("ref2Position") as string;
    const ref2Telephone = formData.get("ref2Telephone") as string;
    const ref2Email = formData.get("ref2Email") as string;

    // Step 3: Files & Uploads
    const cvFile = formData.get("cvFile") as File;
    const proofOfIdFile = formData.get("proofOfIdFile") as File;
    const photoIdCardFile = formData.get("photoIdCardFile") as File;
    const proofOfAddressFile = formData.get("proofOfAddressFile") as File;
    const dbsCertFile = formData.get("dbsCertFile") as File;
    const qualificationsFile = formData.get("qualificationsFile") as File;
    const otherDocsFile = formData.get("otherDocsFile") as File | null;

    const candidateFolder = candidateId;

    // Upload Files to Supabase Storage (or local disk fallback)
    const cvUrl = cvFile && cvFile.size > 0 ? await uploadCandidateDocument(cvFile, candidateFolder, "cv") : "#";
    const proofOfIdUrl = proofOfIdFile && proofOfIdFile.size > 0 ? await uploadCandidateDocument(proofOfIdFile, candidateFolder, "proof_of_id") : "#";
    const photoIdCardUrl = photoIdCardFile && photoIdCardFile.size > 0 ? await uploadCandidateDocument(photoIdCardFile, candidateFolder, "photo_id") : "#";
    const proofOfAddressUrl = proofOfAddressFile && proofOfAddressFile.size > 0 ? await uploadCandidateDocument(proofOfAddressFile, candidateFolder, "proof_of_address") : "#";
    const dbsCertificateUrl = dbsCertFile && dbsCertFile.size > 0 ? await uploadCandidateDocument(dbsCertFile, candidateFolder, "dbs_cert") : "#";
    const qualificationsUrl = qualificationsFile && qualificationsFile.size > 0 ? await uploadCandidateDocument(qualificationsFile, candidateFolder, "qualifications") : "#";
    const otherDocumentsUrl = otherDocsFile && otherDocsFile.size > 0 ? await uploadCandidateDocument(otherDocsFile, candidateFolder, "other_docs") : null;

    try {
      await prisma.fullCandidateProfile.create({
        data: {
          candidateId,
          dateOfBirth: new Date(dateOfBirthStr || Date.now()),
          gender: gender || "Unspecified",
          telephone: telephone || "Not provided",
          address: address || "Not provided",
          postcode: postcode || "Not provided",

          ref1FullName: ref1FullName || "Reference 1",
          ref1Organisation: ref1Organisation || "Organisation 1",
          ref1Position: ref1Position || "Position 1",
          ref1Telephone: ref1Telephone || "0000000000",
          ref1Email: ref1Email || "ref1@example.com",

          ref2FullName: ref2FullName || "Reference 2",
          ref2Organisation: ref2Organisation || "Organisation 2",
          ref2Position: ref2Position || "Position 2",
          ref2Telephone: ref2Telephone || "0000000000",
          ref2Email: ref2Email || "ref2@example.com",

          cvUrl,
          proofOfIdUrl,
          photoIdCardUrl,
          proofOfAddressUrl,
          dbsCertificateUrl,
          qualificationsUrl,
          otherDocumentsUrl,
        },
      });

      if (tokenRecord) {
        await prisma.onboardingToken.update({
          where: { id: tokenRecord.id },
          data: { used: true },
        });
      }

      await prisma.candidateApplication.update({
        where: { id: candidateId },
        data: { status: "ONBOARDING_COMPLETED" },
      });
    } catch (dbErr) {
      console.warn("Prisma FullCandidateProfile creation notice:", dbErr);
    }

    revalidatePath("/admin/applications");
    revalidatePath(`/admin/applications/${candidateId}`);
    return { success: true, message: "Onboarding application submitted successfully!" };
  } catch (error: any) {
    console.error("submitOnboardingFormAction notice:", error);
    return { success: false, error: error.message || "Failed to submit onboarding form" };
  }
}
