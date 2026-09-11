import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { FOOTER_NAV_ITEMS, LEGAL_NAV_ITEMS, COMPANY_CONTACT } from "@/constants/website";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* BRAND COLUMN */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center select-none">
            <Image
              src="/logos/logo-2.png"
              alt="New Era Support Limited Logo"
              width={240}
              height={60}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-brand-mint font-semibold text-xs uppercase tracking-wider mt-1">
            Supporting People • Empowering Lives • Building Better Tomorrows.
          </p>
          <p className="text-brand-canvas/75 text-sm leading-relaxed">
            Dependable healthcare, housing, and hospitality staffing solutions across the UK.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-brand-mint bg-white/5 border border-brand-mint/20 px-4 py-2.5 rounded-full w-fit">
            <ShieldCheck className="w-4 h-4 text-brand-mint" /> CQC Aligned & 100% Safeguarding Vetted
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-brand-mint font-sans font-bold uppercase tracking-wider text-xs mb-6">
            Site Navigation
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-brand-canvas/80 font-medium">
            {FOOTER_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-mint transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* UK COMPLIANCE */}
        <div>
          <h4 className="text-brand-mint font-sans font-bold uppercase tracking-wider text-xs mb-6">
            UK Standards & Safeguarding
          </h4>
          <p className="text-brand-canvas/75 text-xs leading-relaxed mb-4">
            New Era Support Ltd – Registered in England & Wales. We operate with uncompromising compliance, background vetting, and credential checks.
          </p>
          <p className="text-brand-canvas/75 text-xs leading-relaxed">
            All personnel undergo strict screening including enhanced **DBS (Disclosure and Barring Service)** checks, Right-to-Work verification, and clinical referencing.
          </p>
        </div>

        {/* CONTACT & LOCATION */}
        <div>
          <h4 className="text-brand-mint font-sans font-bold uppercase tracking-wider text-xs mb-6">
            Contact & Headquarters
          </h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-canvas/80">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
              <div>
                <a href={COMPANY_CONTACT.telLink} className="block font-bold text-white hover:text-brand-mint transition-colors">
                  {COMPANY_CONTACT.phone}
                </a>
                <span className="text-xs text-brand-canvas/50">24/7 Rapid Deployment Line</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-mint shrink-0" />
              <a href={COMPANY_CONTACT.emailLink} className="hover:text-brand-mint transition-colors">
                {COMPANY_CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
              <span className="leading-normal">
                {COMPANY_CONTACT.address.name}<br />
                {COMPANY_CONTACT.address.line1},<br />
                {COMPANY_CONTACT.address.line2}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-canvas/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-canvas/50">
        <p>&copy; {currentYear} New Era Support Ltd. Registered in England & Wales. All rights reserved.</p>
        <div className="flex gap-6">
          {LEGAL_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-mint transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

