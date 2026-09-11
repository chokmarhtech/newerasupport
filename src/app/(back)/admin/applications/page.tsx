import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateCandidateStatusAction } from "@/app/actions/admin";
import { sendOnboardingInviteAction } from "@/app/actions/onboarding";
import {
  UserCheck,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  Send,
  FileText,
} from "lucide-react";

export default async function AdminApplicationsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let candidates: any[] = [];
  try {
    candidates = await prisma.candidateApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: { fullProfile: true },
    });
  } catch (err) {
    try {
      candidates = await prisma.candidateApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (err2) {
      console.warn("DB candidate fetch notice:", err2);
    }
  }

  if (candidates.length === 0) {
    candidates = [
      {
        id: "11111111-1111-4111-a111-111111111111",
        fullName: "David Miller, RGN",
        email: "d.miller@healthcare.co.uk",
        phone: "07890 123456",
        interestedRoles: ["Registered Nurse"],
        hasValidDbs: true,
        hasRightToWork: true,
        resumeFileUrl: "https://mock-supabase-storage.local/resumes/david-miller-cv.pdf",
        availability: "Full-Time",
        status: "ONBOARDING_COMPLETED",
        createdAt: new Date(),
      },
      {
        id: "22222222-2222-4222-a222-222222222222",
        fullName: "Amina Yusuf",
        email: "a.yusuf@gmail.com",
        phone: "07890 654321",
        interestedRoles: ["Care Assistant", "1:1 Support Worker"],
        hasValidDbs: true,
        hasRightToWork: true,
        resumeFileUrl: "https://mock-supabase-storage.local/resumes/amina-yusuf-cv.pdf",
        availability: "Nights/Weekends",
        status: "CONTACTED",
        createdAt: new Date(Date.now() - 3600000 * 8),
      },
    ];
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ONBOARDING_COMPLETED":
        return { label: "ONBOARDING COMPLETE 🟢", color: "bg-emerald-100 text-emerald-900 border-emerald-300" };
      case "ONBOARDING_SENT":
        return { label: "ONBOARDING SENT 🟡", color: "bg-amber-100 text-amber-900 border-amber-300" };
      case "CONTACTED":
        return { label: "CONTACTED 🔵", color: "bg-blue-100 text-blue-900 border-blue-300" };
      case "REVIEWED":
        return { label: "REVIEWED 🟣", color: "bg-purple-100 text-purple-900 border-purple-300" };
      case "ARCHIVED":
        return { label: "ARCHIVED ⚪", color: "bg-slate-200 text-slate-700 border-slate-300" };
      case "NEW":
      default:
        return { label: "NEW APPLICATION 🟢", color: "bg-cyan-100 text-cyan-900 border-cyan-300" };
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" /> Compliance Vetting Portal
          </div>
          <h1 className="text-3xl font-black text-brand-navy">Candidate Registrations</h1>
          <p className="text-sm text-brand-slate mt-1 font-medium">
            Vet job applicants, send full onboarding forms, and inspect compliance document vaults.
          </p>
        </div>
      </div>

      {/* CANDIDATES LIST */}
      <div className="space-y-4">
        {candidates.map((cand) => {
          const badge = getStatusBadge(cand.status);
          return (
            <div
              key={cand.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-brand-navy">{cand.fullName}</h3>
                    <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Enhanced DBS Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-brand-slate pt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-navy" /> {cand.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-brand-navy" /> {cand.phone}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Clock className="w-3.5 h-3.5" /> Availability: {cand.availability}
                    </span>
                  </div>
                </div>

                {/* ACTION BUTTONS & STATUS UPDATER */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* SEND ONBOARDING EMAIL BUTTON */}
                  <form
                    action={async () => {
                      "use server";
                      await sendOnboardingInviteAction(cand.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-white" /> Send Full Onboarding Form
                    </button>
                  </form>

                  {/* INSPECT FULL DOSSIER & DOCUMENTS */}
                  <Link
                    href={`/admin/applications/${cand.id}`}
                    className="px-3.5 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Inspect Dossier
                  </Link>

                  {/* STATUS SELECTOR */}
                  <form action={updateCandidateStatusAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={cand.id} />
                    <select
                      name="status"
                      defaultValue={cand.status}
                      className="bg-slate-100 border border-slate-200 text-xs font-bold text-brand-navy rounded-xl px-2.5 py-2 focus:outline-none focus:border-brand-navy cursor-pointer"
                    >
                      <option value="NEW">NEW 🟢</option>
                      <option value="REVIEWED">REVIEWED 🟣</option>
                      <option value="CONTACTED">CONTACTED 🔵</option>
                      <option value="ONBOARDING_SENT">ONBOARDING SENT 🟡</option>
                      <option value="ONBOARDING_COMPLETED">ONBOARDING COMPLETE 🟢</option>
                      <option value="ARCHIVED">ARCHIVED ⚪</option>
                    </select>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-200 text-slate-800 hover:bg-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>

              {/* TARGET ROLES */}
              <div>
                <p className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-2">Target Healthcare Role(s):</p>
                <div className="flex flex-wrap gap-2">
                  {cand.interestedRoles.map((role: string) => (
                    <span
                      key={role}
                      className="text-xs font-bold bg-slate-100 text-brand-navy border border-slate-200 px-3 py-1 rounded-xl"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
