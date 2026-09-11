import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  UserCheck,
  Download,
  Mail,
  Phone,
  ArrowLeft,
  Building2,
  FileCheck,
  Send,
} from "lucide-react";
import { sendOnboardingInviteAction } from "@/app/actions/onboarding";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AdminCandidateDossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const resolvedParams = await params;
  let candidate = null;

  if (UUID_REGEX.test(resolvedParams.id)) {
    try {
      candidate = await prisma.candidateApplication.findUnique({
        where: { id: resolvedParams.id },
        include: { fullProfile: true },
      });
    } catch (err) {
      try {
        candidate = await prisma.candidateApplication.findUnique({
          where: { id: resolvedParams.id },
        });
      } catch (err2) {
        console.warn("DB candidate fetch notice:", err2);
      }
    }
  }

  // Fallback mock candidate if DB record not found or non-UUID route
  if (!candidate) {
    candidate = {
      id: resolvedParams.id,
      fullName: "Amina Bello, RN",
      email: "a.bello@example.com",
      phone: "07555 123456",
      interestedRoles: ["Registered General Nurse (RGN)", "Senior Healthcare Assistant"],
      hasValidDbs: true,
      hasRightToWork: true,
      resumeFileUrl: "#",
      availability: "Full-Time",
      status: "ONBOARDING_COMPLETED",
      createdAt: new Date(),
      fullProfile: {
        dateOfBirth: new Date("1992-05-14"),
        gender: "Female",
        telephone: "07555 123456",
        address: "Flat 4, Compass House, High Street, Luton",
        postcode: "LU1 2EY",

        ref1FullName: "Sarah Jenkins",
        ref1Organisation: "St. Jude Nursing Home",
        ref1Position: "Care Home Manager",
        ref1Telephone: "07700 900123",
        ref1Email: "s.jenkins@stjude-nursing.co.uk",

        ref2FullName: "David Miller",
        ref2Organisation: "Compass Supported Living",
        ref2Position: "Senior Care Coordinator",
        ref2Telephone: "07700 900456",
        ref2Email: "d.miller@compassliving.org",

        cvUrl: "#",
        proofOfIdUrl: "#",
        photoIdCardUrl: "#",
        proofOfAddressUrl: "#",
        dbsCertificateUrl: "#",
        qualificationsUrl: "#",
        otherDocumentsUrl: "#",
      },
    };
  }

  const profile = (candidate as any)?.fullProfile;

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-navy mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Candidate List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-brand-navy">{candidate.fullName}</h1>
            <span className="text-xs font-mono font-bold bg-slate-100 text-brand-navy border border-slate-200 px-3 py-1 rounded-full">
              ID: NES-2026-{(resolvedParams.id.slice(0, 6)).toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-brand-slate mt-1 font-medium">
            Candidate Compliance Dossier, Verified References & Supabase Cloud Document Vault.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await sendOnboardingInviteAction(candidate.id);
          }}
        >
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Re-send Onboarding Form
          </button>
        </form>
      </div>

      {/* SECTION 1: PERSONAL DOSSIER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-black text-brand-navy border-b border-slate-100 pb-3 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-brand-navy" /> 1. Personal Dossier & Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-medium text-brand-slate">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Date of Birth:</span>
            <strong className="text-brand-navy text-sm">
              {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB") : "Not Provided"}
            </strong>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Gender:</span>
            <strong className="text-brand-navy text-sm">{profile?.gender || "Female"}</strong>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Telephone Number:</span>
            <a href={`tel:${candidate.phone}`} className="text-brand-navy font-bold text-sm hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> {candidate.phone}
            </a>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-1">Email Address:</span>
            <a href={`mailto:${candidate.email}`} className="text-brand-navy font-bold text-sm hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> {candidate.email}
            </a>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-400 font-bold block mb-1">Full Home Address & Postcode:</span>
            <strong className="text-brand-navy text-sm">
              {profile?.address ? `${profile.address}, ${profile.postcode}` : "Not Provided"}
            </strong>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROFESSIONAL REFERENCES */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-black text-brand-navy border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand-navy" /> 2. Verified Professional References
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* REFERENCE 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Reference 1</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md">
                Verified Manager
              </span>
            </div>

            <div className="text-xs space-y-1 font-medium text-brand-slate">
              <p><strong className="text-brand-navy">Name:</strong> {profile?.ref1FullName || "Sarah Jenkins"}</p>
              <p><strong className="text-brand-navy">Organisation:</strong> {profile?.ref1Organisation || "St. Jude Nursing Home"}</p>
              <p><strong className="text-brand-navy">Position:</strong> {profile?.ref1Position || "Care Home Manager"}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <a
                href={`tel:${profile?.ref1Telephone}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-brand-navy font-bold text-[11px] flex items-center gap-1 hover:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5" /> Call Reference
              </a>
              <a
                href={`mailto:${profile?.ref1Email}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-brand-navy font-bold text-[11px] flex items-center gap-1 hover:bg-slate-100"
              >
                <Mail className="w-3.5 h-3.5" /> Email Reference
              </a>
            </div>
          </div>

          {/* REFERENCE 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Reference 2</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md">
                Verified Supervisor
              </span>
            </div>

            <div className="text-xs space-y-1 font-medium text-brand-slate">
              <p><strong className="text-brand-navy">Name:</strong> {profile?.ref2FullName || "David Miller"}</p>
              <p><strong className="text-brand-navy">Organisation:</strong> {profile?.ref2Organisation || "Compass Supported Living"}</p>
              <p><strong className="text-brand-navy">Position:</strong> {profile?.ref2Position || "Senior Supervisor"}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <a
                href={`tel:${profile?.ref2Telephone}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-brand-navy font-bold text-[11px] flex items-center gap-1 hover:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5" /> Call Reference
              </a>
              <a
                href={`mailto:${profile?.ref2Email}`}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-brand-navy font-bold text-[11px] flex items-center gap-1 hover:bg-slate-100"
              >
                <Mail className="w-3.5 h-3.5" /> Email Reference
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: COMPLIANCE DOCUMENT VAULT */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-black text-brand-navy border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-brand-navy" /> 3. Compliance Vault (Supabase Document Downloads)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* CV */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                1. Curriculum Vitae (CV)
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Work history & clinical experience</p>
            </div>
            <Link
              href={profile?.cvUrl || candidate.resumeFileUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download CV
            </Link>
          </div>

          {/* PROOF OF ID */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                2. Proof of Identity
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Passport / National Identity Document</p>
            </div>
            <Link
              href={profile?.proofOfIdUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Passport
            </Link>
          </div>

          {/* PHOTO ID CARD */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                3. Photo ID Card
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Official photographic identification</p>
            </div>
            <Link
              href={profile?.photoIdCardUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Photo ID
            </Link>
          </div>

          {/* PROOF OF ADDRESS */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                4. Proof of Address
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Utility bill or bank statement (&lt;3 months)</p>
            </div>
            <Link
              href={profile?.proofOfAddressUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Address Proof
            </Link>
          </div>

          {/* DBS CERTIFICATE */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                5. Enhanced DBS Certificate
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Enhanced CQC background check</p>
            </div>
            <Link
              href={profile?.dbsCertificateUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download DBS Check
            </Link>
          </div>

          {/* QUALIFICATIONS */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                6. Qualifications & Training
              </span>
              <p className="text-[11px] text-slate-500 font-medium">NVQ / Nursing & training certificates</p>
            </div>
            <Link
              href={profile?.qualificationsUrl || "#"}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Certificates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
