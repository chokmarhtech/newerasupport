import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import OnboardingMultiStepForm from "@/components/onboarding/OnboardingMultiStepForm";
import { ShieldCheck, AlertCircle, Phone, ArrowLeft } from "lucide-react";

export default async function CandidateOnboardingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  const token = resolvedParams.token;

  let tokenRecord = null;
  try {
    tokenRecord = await prisma.onboardingToken.findUnique({
      where: { token },
    });
  } catch (err) {
    console.warn("Prisma onboarding token lookup notice:", err);
  }

  // Token expired or already submitted check
  const isExpired = tokenRecord ? new Date() > new Date(tokenRecord.expiresAt) : false;
  const isUsed = tokenRecord?.used || false;

  const isInvalid = !tokenRecord && token !== "demo-token";

  if (isInvalid || isExpired || isUsed) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <header className="w-full bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/logo-1.png"
              alt="New Era Support Ltd"
              width={170}
              height={42}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-brand-navy">Onboarding Link Notice</h1>
            <p className="text-xs text-brand-slate font-medium leading-relaxed">
              {isUsed
                ? "This onboarding application form has already been submitted."
                : isExpired
                ? "This onboarding link has expired after 7 days."
                : "This onboarding link is invalid or no longer active."}
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-brand-navy space-y-1">
              <span>Need a new onboarding link?</span>
              <p className="text-slate-500 font-normal">Contact our recruitment hotline: <strong>07950 850970</strong></p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Website
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* BRAND HEADER */}
      <header className="w-full bg-white border-b border-slate-200 px-6 md:px-12 py-5 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo-1.png"
            alt="New Era Support Ltd"
            width={170}
            height={42}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secure Compliance Onboarding</span>
        </div>
      </header>

      {/* MULTI-STEP FORM */}
      <main className="flex-1 p-4 md:p-8">
        <OnboardingMultiStepForm
          token={token}
          candidateId={tokenRecord?.candidateId || "cand-demo-id"}
          candidateEmail={tokenRecord?.email || ""}
        />
      </main>
    </div>
  );
}
