import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Modern Slavery & Human Trafficking Statement | New Era Support Ltd",
  description: "Official Modern Slavery and Anti-Trafficking declaration for New Era Support Ltd pursuant to Section 54 of the UK Modern Slavery Act 2015.",
};

export default function ModernSlaveryStatementPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* BRAND NAVBAR */}
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
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Website
        </Link>
      </header>

      {/* HERO BANNER */}
      <section className="bg-brand-navy text-white py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> UK Modern Slavery Act 2015 Statement
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Modern Slavery & Human Trafficking Policy</h1>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Our zero-tolerance commitment to preventing modern slavery, human trafficking, and worker exploitation across healthcare, housing, and supply chain operations.
          </p>
          <p className="text-xs text-slate-400 pt-2 font-mono">Financial Year 2025 / 2026</p>
        </div>
      </section>

      {/* MAIN DOCUMENT CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 space-y-10 shadow-sm text-sm text-slate-700 leading-relaxed">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              1. Zero-Tolerance Statement & Commitment
            </h2>
            <p>
              <strong>New Era Support Ltd</strong> operates a strict zero-tolerance policy towards modern slavery, human trafficking, forced labor, and servitude in any part of our business operations or supply chain.
            </p>
            <p>
              Pursuant to Section 54 of the UK Modern Slavery Act 2015, this statement sets out the actions taken by New Era Support Ltd to ensure that modern slavery does not exist within our business or among our staffing supply partners.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              2. Organizational Structure & Supply Chain
            </h2>
            <p>
              New Era Support Ltd is a healthcare, supported living, and staffing agency operating across Luton, Bedfordshire, and the wider UK region. We recruit and supply healthcare personnel—including Registered Nurses, Healthcare Assistants, Support Workers, and Housing Managers—to care homes, NHS providers, and local council facilities.
            </p>
            <p>
              Because our core activity involves healthcare recruitment, we recognize the critical responsibility to ensure all worker placements are fair, legal, and voluntary.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              3. Recruitment Due Diligence & Worker Safeguards
            </h2>
            <p>To eliminate any potential for modern slavery or wage exploitation, we enforce rigorous vetting controls on 100% of candidates:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Direct Right-to-Work Checks:</strong> Every applicant must submit valid proof of identity (Original Passport or National ID) and legal Right-to-Work documentation verified directly by our compliance team.
              </li>
              <li>
                <strong>Direct UK Bank Account Payment:</strong> Wages are paid exclusively into a verified UK bank account registered in the candidate&apos;s own name, preventing third-party wage interception or exploitation.
              </li>
              <li>
                <strong>Enhanced DBS Checks:</strong> Full Enhanced Disclosure and Barring Service (DBS) checks are conducted for all care staff prior to shift placement.
              </li>
              <li>
                <strong>Fair Wage Guarantee:</strong> All workers receive wages at or above the UK National Living Wage without illegal deduction of recruitment fees.
              </li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              4. Whistleblowing & Reporting Concerns
            </h2>
            <p>
              We actively encourage all employees, candidate workers, and client partners to report any suspicious activity, warning signs of human trafficking, or worker coercion.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs font-semibold text-brand-navy">
              <p>🚨 <strong>24/7 Safeguarding Helpline:</strong> 07950 850970</p>
              <p>✉️ <strong>Confidential Reporting Email:</strong> info@newerasupport.co.uk</p>
              <p>🇬🇧 <strong>UK Modern Slavery Helpline:</strong> 08000 121 700</p>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              5. Executive Sign-Off
            </h2>
            <p>
              This statement has been formally approved by the Board of Directors of <strong>New Era Support Ltd</strong> and is reviewed annually to ensure continuous anti-slavery compliance.
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-brand-navy">Board of Directors</p>
                <p className="text-xs text-slate-500">New Era Support Ltd</p>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full">
                Status: Approved & Active
              </span>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
