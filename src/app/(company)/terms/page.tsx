import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, ArrowLeft, FileText, Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Business Agreement | New Era Support Ltd",
  description: "Official Terms of Service and Business Operating Agreement for New Era Support Ltd healthcare staffing services and website usage.",
};

export default function TermsOfServicePage() {
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
            <FileText className="w-4 h-4" /> Business Operating Agreement
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Terms of Service</h1>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Terms and conditions governing the use of the New Era Support Ltd website, client staffing agreements, and candidate onboarding services.
          </p>
          <p className="text-xs text-slate-400 pt-2 font-mono">Effective Date: August 2026</p>
        </div>
      </section>

      {/* MAIN DOCUMENT CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 space-y-10 shadow-sm text-sm text-slate-700 leading-relaxed">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website of <strong>New Era Support Ltd</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), submitting a client staff request, or applying for healthcare roles through our platform, you agree to be bound by these Terms of Service.
            </p>
            <p>
              If you do not agree to these terms, please discontinue the use of our website and services immediately.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              2. Healthcare Staffing Provision for Clients
            </h2>
            <p>
              New Era Support Ltd provides healthcare, nursing, dementia care, and housing staffing support to client facilities across the UK.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Staff Booking & Deployment:</strong> Staff requests submitted via `/request-staff` or our 24/7 hotline (<strong>07950 850970</strong>) are processed subject to staff availability and contract confirmation.
              </li>
              <li>
                <strong>Compliance Representation:</strong> All assigned personnel supplied by New Era Support Ltd undergo DBS background vetting, Right-to-Work verification, and clinical reference checks.
              </li>
              <li>
                <strong>Shift Emergency Cover:</strong> Immediate emergency shift cancellations or modifications must be communicated to our 24/7 admin hotline with mandatory notice periods specified in individual client service level agreements (SLAs).
              </li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              3. Candidate Registrations & Onboarding Obligations
            </h2>
            <p>
              Candidates applying for employment through our onboarding portal agree to provide complete, truthful, and accurate information.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Document Integrity:</strong> Candidates must upload genuine compliance documents (Passports, Photo IDs, DBS certificates, NVQ/Nursing certificates). Providing fraudulent documentation will result in immediate disqualification and reporting to relevant statutory authorities (NMC/CQC/Police).
              </li>
              <li>
                <strong>Reference Verification:</strong> By submitting professional references in Step 2 of our onboarding portal, candidate applicants consent to New Era Support Ltd contacting previous employers for background verification.
              </li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              4. Website Use & Intellectual Property
            </h2>
            <p>
              All content on this website—including logos, editorial blog articles, code, illustrations, and user interface designs—is the exclusive intellectual property of <strong>New Era Support Ltd</strong> protected under UK and international copyright laws.
            </p>
            <p>
              You may not reproduce, distribute, or modify any portion of this site without prior written permission.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law in England & Wales, New Era Support Ltd shall not be liable for indirect, incidental, or consequential damages resulting from website unavailability, third-party network delays, or unapproved shift cancellations outside our operational control.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of <strong>England & Wales</strong>. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-black text-brand-navy">
              7. Contact Our Operations Team
            </h2>
            <p className="text-xs font-medium text-slate-600">
              For questions concerning these Terms of Service or business contracts, contact our team:
            </p>
            <div className="text-xs font-bold text-brand-navy space-y-1 pt-2">
              <p>📍 New Era Support Ltd, Flat 10 The Compasses, 11 Farley Hill, Luton, Bedfordshire</p>
              <p>📞 Phone: <a href="tel:07950850970" className="hover:underline text-emerald-700">07950 850970</a></p>
              <p>✉️ Email: <a href="mailto:info@newerasupport.co.uk" className="hover:underline text-emerald-700">info@newerasupport.co.uk</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
