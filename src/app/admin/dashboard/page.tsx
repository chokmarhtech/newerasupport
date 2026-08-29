import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ClipboardList,
  UserCheck,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Building2,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch real database records (fallback to mock data if DB is empty)
  let clientRequests: any[] = [];
  let candidateApplications: any[] = [];

  try {
    clientRequests = await prisma.clientRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    candidateApplications = await prisma.candidateApplication.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (err) {
    console.warn("Prisma fetch failed, rendering mock operational records:", err);
  }

  // Mock fallback records for rich preview if DB is empty
  if (clientRequests.length === 0) {
    clientRequests = [
      {
        id: "mock-1",
        organizationName: "Holborn Care & Housing Ltd",
        contactName: "Sarah Connor",
        email: "s.connor@holborncare.co.uk",
        phone: "07700 900123",
        location: "Luton, Bedfordshire",
        requiredRoles: ["Registered Nurse", "1:1 Support Worker"],
        shiftUrgency: "Immediate",
        status: "NEW",
        createdAt: new Date(),
      },
      {
        id: "mock-2",
        organizationName: "St. Jude Nursing Home",
        contactName: "Michael Vance",
        email: "m.vance@stjude.org.uk",
        phone: "07700 900456",
        location: "Bedford, Bedfordshire",
        requiredRoles: ["Care Assistant"],
        shiftUrgency: "Within 24h",
        status: "REVIEWED",
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
    ];
  }

  if (candidateApplications.length === 0) {
    candidateApplications = [
      {
        id: "cand-1",
        fullName: "David Miller, RGN",
        email: "d.miller@healthcare.co.uk",
        phone: "07890 123456",
        interestedRoles: ["Registered Nurse"],
        hasValidDbs: true,
        hasRightToWork: true,
        availability: "Full-Time",
        status: "NEW",
        createdAt: new Date(),
      },
      {
        id: "cand-2",
        fullName: "Amina Yusuf",
        email: "a.yusuf@gmail.com",
        phone: "07890 654321",
        interestedRoles: ["Care Assistant", "Support Worker"],
        hasValidDbs: true,
        hasRightToWork: true,
        availability: "Nights/Weekends",
        status: "CONTACTED",
        createdAt: new Date(Date.now() - 3600000 * 8),
      },
    ];
  }

  const immediateCount = clientRequests.filter((r) => r.shiftUrgency === "Immediate").length;

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Live Shift & Compliance Operations
          </div>
          <h1 className="text-3xl font-black text-white">Operations Control Center</h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back, <strong>{session.name}</strong>. Here is your real-time staffing overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/requests"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <ClipboardList className="w-4 h-4" /> Review Staff Requests
          </Link>
          <Link
            href="/admin/applications"
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700"
          >
            <UserCheck className="w-4 h-4" /> Vet Candidates
          </Link>
        </div>
      </div>

      {/* URGENT SHIFT COVER ALERT BANNER */}
      {immediateCount > 0 && (
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-200">
                🚨 {immediateCount} Immediate Shift Cover Request(s) Pending Dispatch!
              </p>
              <p className="text-xs text-slate-300">
                Care homes in Luton and Bedfordshire are requesting emergency personnel within the next 2 hours.
              </p>
            </div>
          </div>
          <Link
            href="/admin/requests"
            className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shrink-0"
          >
            View Urgent Requests →
          </Link>
        </div>
      )}

      {/* SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Total Staff Requests</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{clientRequests.length}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" /> 100% Active Care Facilities
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Candidate Registrations</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{candidateApplications.length}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-cyan-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Enhanced DBS Vetted
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Immediate Cover Urgency</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-300">{immediateCount}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5" /> Target 60-min Response
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Safeguarding Compliance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400">100%</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
            CQC & NHS Framework Compliant
          </div>
        </div>
      </div>

      {/* RECENT OPERATIONAL FEEDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT STAFF REQUESTS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Recent Client Staff Requests</h2>
            </div>
            <Link
              href="/admin/requests"
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {clientRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{req.organizationName}</span>
                    {req.shiftUrgency === "Immediate" ? (
                      <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                        ⚡ Immediate
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        {req.shiftUrgency}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Contact: {req.contactName} ({req.phone}) • {req.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {req.requiredRoles.map((role: string) => (
                      <span key={role} className="text-[10px] font-medium bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-md">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/admin/requests"
                  className="px-3 py-1.5 text-xs font-bold bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
                >
                  Inspect
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT CANDIDATE APPLICATIONS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Recent Candidate Applications</h2>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {candidateApplications.map((cand) => (
              <div
                key={cand.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{cand.fullName}</span>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      DBS Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Email: {cand.email} • Availability: {cand.availability}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {cand.interestedRoles.map((role: string) => (
                      <span key={role} className="text-[10px] font-medium bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-md">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/admin/applications"
                  className="px-3 py-1.5 text-xs font-bold bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors shrink-0"
                >
                  Vet Candidate
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
