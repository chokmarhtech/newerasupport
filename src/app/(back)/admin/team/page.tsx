import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, canManageTeam, DEMO_ACCOUNTS } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeamClientManager from "@/components/admin/TeamClientManager";
import { Users, ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Team User Management | New Era Support Ltd Admin",
  description: "Manage admin users, roles, password credentials, and access permissions.",
};

export default async function AdminTeamPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Supervisor Total Isolation Guard: Redirect Supervisors away immediately
  if (session.role.startsWith("SUPERVISOR") || !canManageTeam(session.role)) {
    redirect("/admin/dashboard");
  }

  // Fetch Team Users from Database
  let dbUsers: any[] = [];
  try {
    dbUsers = await prisma.adminUser.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB team lookup notice, checking fallback:", err);
  }



  // Stealth SuperAdmin Visibility Rule: Non-SuperAdmins CANNOT see SUPER_ADMIN accounts!
  let visibleUsers = dbUsers;
  if (session.role !== "SUPER_ADMIN") {
    visibleUsers = dbUsers.filter((u) => u.role !== "SUPER_ADMIN");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans pb-12">
      {/* PAGE TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-brand-navy" /> Operations Control
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            Team User Management
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Provision admin accounts, manage operational roles, reset credentials, and govern security permissions.
          </p>
        </div>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-brand-navy transition-colors w-fit shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* TEAM CLIENT MANAGER COMPONENT (CRUD & MODALS) */}
      <TeamClientManager
        currentUserRole={session.role}
        currentUserEmail={session.email}
        teamUsers={visibleUsers}
      />
    </div>
  );
}
