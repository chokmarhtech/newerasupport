import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Mail, Phone, MapPin, Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & UK GDPR Compliance | New Era Support Ltd",
  description: "Official Privacy Policy and Data Protection declaration for New Era Support Ltd in accordance with UK GDPR and PECR.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4" /> UK GDPR & PECR Compliant
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Privacy Policy & Data Protection</h1>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-2xl mx-auto">
            How New Era Support Ltd collects, processes, and protects personal data for care applicants, client healthcare facilities, and website visitors.
          </p>
          <p className="text-xs text-slate-400 pt-2 font-mono">Last Updated: August 2026</p>
        </div>
      </section>

      {/* MAIN DOCUMENT CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 space-y-10 shadow-sm text-sm text-slate-700 leading-relaxed">
          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              1. Data Controller Identification
            </h2>
            <p>
              This Privacy Policy applies to <strong>New Era Support Ltd</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a healthcare, supported housing, and staffing recruitment company registered in England & Wales.
            </p>
            <p>
              Our registered office address is <strong>Flat 10 The Compasses, 11 Farley Hill, Luton, Bedfordshire</strong>. We are committed to maintaining the trust of our job candidates, healthcare client providers, and website visitors in accordance with the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulations (PECR).
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              2. Personal Data We Collect
            </h2>
            <p>We collect and process personal information depending on your interaction with our platform:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Healthcare Job Applicants & Staff Candidates:</strong> Full name, date of birth, gender, telephone number, personal email address, residential address, postcode, curriculum vitae (CV), professional references, identity verification documents (Passport, National ID), photo ID cards, proof of address, Enhanced Disclosure and Barring Service (DBS) certificates, nursing registration credentials (NMC/SSSC), and training certificates.
              </li>
              <li>
                <strong>Healthcare Clients & Care Providers:</strong> Organization name, manager contact name, official email address, business telephone number, facility location, staffing requirements, shift urgency, and invoicing details.
              </li>
              <li>
                <strong>General Website Visitors:</strong> IP addresses, browser types, session interactions, and cookie preferences stored via essential local browser keys.
              </li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              3. Legal Basis for Processing
            </h2>
            <p>We process your personal information under the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contractual Fulfillment:</strong> Processing necessary to place healthcare personnel into shifts or evaluate job applications.</li>
              <li><strong>Legal & Regulatory Obligation:</strong> Statutory CQC (Care Quality Commission) safeguarding compliance, UK Right-to-Work verification, and employment legislation.</li>
              <li><strong>Legitimate Interests:</strong> Operating and securing our business, verifying candidate credentials, and delivering emergency staffing services.</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              4. Data Storage & Security Measures
            </h2>
            <p>
              We implement industry-standard technical and organizational security controls to protect your data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Candidate compliance documents (Passports, DBS certificates, CVs) are stored in secure <strong>Supabase Cloud Storage Vaults</strong> with restricted access.</li>
              <li>Admin portal sessions enforce 20-minute automatic inactivity timeouts and encrypted HTTP-only session cookies.</li>
              <li>All file uploads enforce a strict 5 MB file size limit and in-browser image compression to prevent unauthorized memory exploits.</li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              5. Third-Party Data Sharing
            </h2>
            <p>
              We do not sell, rent, or trade personal data to third parties. Data is shared exclusively with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Regulatory Bodies:</strong> Care Quality Commission (CQC) auditors and local social care authorities for safeguarding inspections.</li>
              <li><strong>Verification Agencies:</strong> Disclosure and Barring Service (DBS) checking agencies and professional reference providers.</li>
              <li><strong>Transactional Service Providers:</strong> Resend API for automated email dispatch and Supabase PostgreSQL database infrastructure.</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-2">
              6. Your Legal Rights Under UK GDPR
            </h2>
            <p>Under UK data protection laws, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right of Access:</strong> Request copies of personal data held about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of data where legal retention periods have expired.</li>
              <li><strong>Right to Restrict Processing:</strong> Request suspension of data processing under specific conditions.</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-black text-brand-navy">
              7. Contact Our Data Protection Lead
            </h2>
            <p className="text-xs font-medium text-slate-600">
              For any questions regarding this Privacy Policy or to exercise your UK GDPR rights, please contact our team:
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
