import { cookies } from "next/headers";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SUPERVISOR_1" | "SUPERVISOR_2";

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export const DEMO_ACCOUNTS: Record<string, AdminSession> = {
  "superadmin@newerasupport.co.uk": {
    id: "demo-superadmin-01",
    name: "Godspower Similoluwa",
    email: "superadmin@newerasupport.co.uk",
    role: "SUPER_ADMIN",
    isActive: true,
  },
  "admin@newerasupport.co.uk": {
    id: "demo-admin-02",
    name: "Operations Admin",
    email: "admin@newerasupport.co.uk",
    role: "ADMIN",
    isActive: true,
  },
  "supervisor1@newerasupport.co.uk": {
    id: "demo-sup1-03",
    name: "Rota Supervisor 1",
    email: "supervisor1@newerasupport.co.uk",
    role: "SUPERVISOR_1",
    isActive: true,
  },
  "supervisor2@newerasupport.co.uk": {
    id: "demo-sup2-04",
    name: "Inquiries Inspector 2",
    email: "supervisor2@newerasupport.co.uk",
    role: "SUPERVISOR_2",
    isActive: true,
  },
};

const SESSION_COOKIE_NAME = "admin_session";

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  try {
    const session: AdminSession = JSON.parse(sessionCookie.value);
    return session;
  } catch (error) {
    return null;
  }
}

export async function setAdminSession(session: AdminSession) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Role permission check matrix
export function canManageTeam(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}

export function canUpdateStatus(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN" || role === "SUPERVISOR_1" || role === "SUPERVISOR_2";
}

export function canPublishBlog(role: UserRole): boolean {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}
