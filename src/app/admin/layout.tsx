import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession, canManageTeam } from "@/lib/auth";
import { logoutAdminAction } from "@/app/actions/admin";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCheck,
  FileText,
  LogOut,
  ShieldCheck,
  BellRing,
  ExternalLink,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Helper for Role Display Badges
  const getRoleBadge = (role?: string) => {
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

  const badge = getRoleBadge(session?.role);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image
            src="/logos/logo-2.png"
            alt="New Era Support Logo"
            width={140}
            height={35}
            className="h-7 w-auto object-contain"
          />
        </Link>
        {session && (
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="text-xs text-rose-400 flex items-center gap-1 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </form>
        )}
      </div>

      {/* EXECUTIVE DARK NAVY SIDEBAR */}
      {session && (
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-5 shrink-0">
          <div className="flex flex-col gap-6">
            {/* BRAND HEADER */}
            <div className="border-b border-slate-800/80 pb-5">
              <Link href="/admin/dashboard" className="block">
                <Image
                  src="/logos/logo-2.png"
                  alt="New Era Support Ltd"
                  width={180}
                  height={45}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Operations Portal
              </div>
            </div>

            {/* CURRENT USER PROFILE CARD */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-400 font-medium">Logged in as</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}
                >
                  {badge.icon} {badge.label}
                </span>
              </div>
              <p className="text-sm font-bold text-white truncate">{session.name}</p>
              <p className="text-xs text-slate-400 truncate">{session.email}</p>
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="flex flex-col gap-1 text-sm font-semibold">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Dashboard Overview</span>
              </Link>

              <Link
                href="/admin/requests"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 text-emerald-400" />
                  <span>Staff Requests</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Live
                </span>
              </Link>

              <Link
                href="/admin/applications"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Candidate Vetting</span>
              </Link>

              <Link
                href="/admin/blog"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Blog Article CMS</span>
              </Link>

              {/* TEAM USER MANAGEMENT LINK (SUPER_ADMIN & ADMIN ONLY) */}
              <Link
                href="/admin/team"
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  canManageTeam(session.role)
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 hover:bg-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Team Users</span>
                </div>
                {!canManageTeam(session.role) && (
                  <span className="text-[9px] font-bold uppercase text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                    Lock
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-xs text-slate-400 hover:text-emerald-400 transition-colors px-2 py-1"
            >
              <span>View Main Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out Session
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 min-w-0 p-4 md:p-8 bg-slate-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
