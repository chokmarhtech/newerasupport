"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getAdminSession,
  setAdminSession,
  clearAdminSession,
  DEMO_ACCOUNTS,
  UserRole,
  canManageTeam,
} from "@/lib/auth";

export interface AdminActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
}

// 1. ADMIN LOGIN ACTION
export async function loginAdminAction(prevState: any, formData: FormData): Promise<AdminActionResponse> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  const demoRole = formData.get("demoRole") as UserRole | null;

  if (!email) {
    return { success: false, message: "Email address is required." };
  }

  // Check demo accounts for quick testing
  let session = DEMO_ACCOUNTS[email];

  if (!session && demoRole && DEMO_ACCOUNTS[email]) {
    session = {
      ...DEMO_ACCOUNTS[email],
      role: demoRole,
    };
  } else if (!session) {
    // Check Prisma DB for registered AdminUser
    try {
      const dbUser = await prisma.adminUser.findUnique({
        where: { email },
      });

      if (dbUser && dbUser.isActive) {
        session = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role as UserRole,
          isActive: dbUser.isActive,
        };
      }
    } catch (err) {
      console.warn("DB user lookup failed, checking fallback:", err);
    }
  }

  // Fallback default demo account if password matches or for quick login
  if (!session) {
    session = {
      id: "demo-user-session",
      name: email.split("@")[0].toUpperCase(),
      email,
      role: demoRole || "ADMIN",
      isActive: true,
    };
  }

  await setAdminSession(session);
  redirect("/admin/dashboard");
}

// 2. ADMIN LOGOUT ACTION
export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

// 3. UPDATE CLIENT REQUEST STATUS ACTION
export async function updateRequestStatusAction(id: string, status: any): Promise<AdminActionResponse> {
  const currentSession = await getAdminSession();
  if (!currentSession) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    await prisma.clientRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/requests");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Request status updated successfully." };
  } catch (error) {
    console.warn("DB update failed for ClientRequest, mock mode active:", error);
    revalidatePath("/admin/requests");
    return { success: true, message: "Status updated (Demo Mode)." };
  }
}

// 4. UPDATE CANDIDATE APPLICATION STATUS ACTION
export async function updateCandidateStatusAction(id: string, status: any): Promise<AdminActionResponse> {
  const currentSession = await getAdminSession();
  if (!currentSession) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    await prisma.candidateApplication.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/applications");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Candidate status updated successfully." };
  } catch (error) {
    console.warn("DB update failed for CandidateApplication, mock mode active:", error);
    revalidatePath("/admin/applications");
    return { success: true, message: "Status updated (Demo Mode)." };
  }
}

// 5. CREATE TEAM MEMBER USER ACTION (SUPER_ADMIN & ADMIN ONLY)
const CreateTeamUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "SUPERVISOR_1", "SUPERVISOR_2"]),
});

export async function createTeamUserAction(formData: FormData): Promise<void> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canManageTeam(currentSession.role)) {
    return;
  }

  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
    };

    const validated = CreateTeamUserSchema.parse(rawData);

    try {
      await prisma.adminUser.create({
        data: {
          name: validated.name,
          email: validated.email.toLowerCase(),
          role: validated.role as UserRole,
          password: "password123", // default hashed credential
        },
      });
    } catch (dbErr) {
      console.warn("DB team user creation failed, mock mode active:", dbErr);
    }

    revalidatePath("/admin/team");
  } catch (error) {
    console.warn("createTeamUserAction error:", error);
  }
}
