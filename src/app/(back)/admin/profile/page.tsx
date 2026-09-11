import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getRoleBadge } from "@/constants/admin";
import ProfileClientForm from "@/components/admin/ProfileClientForm";
import { User, ShieldCheck, Key, Mail, Calendar, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "My Account Profile | New Era Support Ltd Admin",
  description: "Manage your admin user profile and update your password securely.",
};

export default async function AdminProfilePage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const badge = getRoleBadge(session.role);

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      {/* PAGE TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <User className="w-3.5 h-3.5 text-brand-navy" /> Account Settings
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
            My Account Profile
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            View your registered account details and manage your security credentials.
          </p>
        </div>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-brand-navy transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: PROFILE CARD */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-brand-navy text-white text-2xl font-black flex items-center justify-center mx-auto border-4 border-slate-50">
              {session.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .substring(0, 2)}
            </div>

            <div>
              <h2 className="text-lg font-black text-brand-navy">{session.name}</h2>
              <p className="text-xs font-medium text-slate-500 truncate mt-0.5">{session.email}</p>
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 space-y-2 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-navy shrink-0" />
                <span>Account Status: <strong className="text-emerald-700 font-bold">Active 🟢</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-navy shrink-0" />
                <span className="truncate">{session.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-navy shrink-0" />
                <span>Session Expiry: 20-Min Idle Timeout</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SECURITY & PASSWORD CHANGE FORM */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-brand-navy flex items-center gap-2">
                Change Security Password
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Update your account login password. Passwords must be at least 6 characters long.
              </p>
            </div>

            {/* CLIENT-SIDE INTERACTIVE FORM */}
            <ProfileClientForm />
          </div>
        </div>
      </div>
    </div>
  );
}
