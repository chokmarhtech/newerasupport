import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, canManageTeam } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createTeamUserAction } from "@/app/actions/admin";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Lock,
  Mail,
  User,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default async function AdminTeamPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Permission Check
  if (!canManageTeam(session.role)) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Restricted</h2>
        <p className="text-sm text-slate-400">
          Your current role (<strong>{session.role}</strong>) does not have permission to manage team users. Team user management is reserved for <strong>SuperAdmin</strong> and <strong>Admin</strong> roles.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-block px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs rounded-xl transition-colors"
        >
          ← Return to Dashboard
        </Link>
      </div>
    );
  }

  let teamUsers: any[] = [];
  try {
    teamUsers = await prisma.adminUser.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB fetch failed for adminUsers, rendering demo team list:", err);
  }

  if (teamUsers.length === 0) {
    teamUsers = [
      {
        id: "usr-1",
        name: "Godspower Similoluwa",
        email: "superadmin@newerasupport.co.uk",
        role: "SUPER_ADMIN",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "usr-2",
        name: "Operations Admin",
        email: "admin@newerasupport.co.uk",
        role: "ADMIN",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "usr-3",
        name: "Rota Supervisor 1",
        email: "supervisor1@newerasupport.co.uk",
        role: "SUPERVISOR_1",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "usr-4",
        name: "Inquiries Inspector 2",
        email: "supervisor2@newerasupport.co.uk",
        role: "SUPERVISOR_2",
        isActive: true,
        createdAt: new Date(),
      },
    ];
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return { label: "Super Admin", color: "bg-amber-400/20 text-amber-300 border-amber-400/30", icon: "👑" };
      case "ADMIN":
        return { label: "Admin", color: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30", icon: "🛡️" };
      case "SUPERVISOR_1":
        return { label: "Supervisor 1", color: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30", icon: "📋" };
      case "SUPERVISOR_2":
      default:
        return { label: "Supervisor 2", color: "bg-slate-400/20 text-slate-300 border-slate-400/30", icon: "🔍" };
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" /> Role Permission Control
          </div>
          <h1 className="text-3xl font-black text-white">Team User Management</h1>
          <p className="text-sm text-slate-400 mt-1">
            Create team members, assign operational roles, and manage access permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TEAM MEMBERS LIST (2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" /> Active Team Members
          </h2>

          <div className="space-y-3">
            {teamUsers.map((user) => {
              const badge = getRoleBadge(user.role);
              return (
                <div
                  key={user.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{user.name}</h3>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.color}`}
                  >
                    {badge.icon} {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ADD TEAM MEMBER FORM (1 COL) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" /> Add Team Member
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Register a new administrative or supervisor account.
            </p>
          </div>

          <form action={createTeamUserAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Smith"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@newerasupport.co.uk"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Assigned Access Role
              </label>
              <select
                name="role"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-semibold text-emerald-400 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="SUPER_ADMIN">👑 Super Admin (Full Control)</option>
                <option value="ADMIN">🛡️ Admin (Team User Mgmt + Ops)</option>
                <option value="SUPERVISOR_1">📋 Supervisor 1 (Shift Coordinator)</option>
                <option value="SUPERVISOR_2">🔍 Supervisor 2 (Inquiries Inspector)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              + Create Team User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
