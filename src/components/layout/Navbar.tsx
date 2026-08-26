"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, Phone, Mail, ShieldCheck } from "lucide-react";
import Button from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-canvas shadow-sm">
      {/* TOP UTILITY HEADER (as seen in reference mockups) */}
      <div className="bg-brand-navy text-white text-xs py-2 px-6 border-b border-brand-mint/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6 text-brand-canvas/80">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-brand-mint" /> 
              24/7 Rapid Deployment: <a href="tel:07565805795" className="text-white hover:text-brand-mint font-bold transition-colors">07565 805795</a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-brand-mint" /> info@newerasupport.co.uk
            </span>
          </div>
          <div className="flex items-center gap-2 text-brand-mint font-semibold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CQC Aligned & 100% Safeguarding Vetted</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center select-none group">
          <Image
            src="/logos/logo-1.png"
            alt="New Era Support Limited Logo"
            width={240}
            height={60}
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-semibold">
          <Link
            href="/"
            className="text-brand-navy hover:text-brand-mint transition-colors text-sm"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-brand-slate hover:text-brand-navy transition-colors text-sm"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-brand-slate hover:text-brand-navy transition-colors text-sm"
          >
            Our Services
          </Link>
          <Link
            href="/work-for-us"
            className="text-brand-slate hover:text-brand-navy transition-colors text-sm"
          >
            Work For Us
          </Link>
          <Link
            href="/contact"
            className="text-brand-slate hover:text-brand-navy transition-colors text-sm"
          >
            Contact Us
          </Link>
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/request-staff">
            <Button variant="secondary" size="sm" className="flex items-center gap-2 shadow-sm">
              Request Staff <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-navy hover:text-brand-mint focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden absolute top-[116px] left-0 w-full bg-white border-b border-brand-canvas shadow-xl flex flex-col py-6 px-6 gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-brand-navy font-bold text-lg py-2 border-b border-brand-canvas"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-brand-navy font-bold text-lg py-2 border-b border-brand-canvas"
          >
            About Us
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="text-brand-navy font-bold text-lg py-2 border-b border-brand-canvas"
          >
            Our Services
          </Link>
          <Link
            href="/work-for-us"
            onClick={() => setIsOpen(false)}
            className="text-brand-navy font-bold text-lg py-2 border-b border-brand-canvas"
          >
            Work For Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-brand-navy font-bold text-lg py-2 border-b border-brand-canvas"
          >
            Contact Us
          </Link>
          <div className="pt-4 flex flex-col gap-3">
            <Link href="/request-staff" onClick={() => setIsOpen(false)}>
              <Button variant="secondary" size="md" className="w-full flex items-center justify-center gap-2">
                Request Staff <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
