"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, Phone, Mail, ShieldCheck, Clock, MapPin } from "lucide-react";
import Button from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { NAV_ITEMS, COMPANY_CONTACT } from "@/constants/website";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-canvas shadow-sm">
      {/* TOP UTILITY HEADER (as seen in reference mockups) */}
      <div className="bg-brand-navy text-white text-xs py-2 px-6 border-b border-brand-mint/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-6 text-brand-canvas/80">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-brand-mint" /> 
              24/7 Rapid Deployment: <a href={COMPANY_CONTACT.telLink} className="text-white hover:text-brand-mint font-bold transition-colors">{COMPANY_CONTACT.phone}</a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-brand-mint" /> {COMPANY_CONTACT.email}
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
            width={200}
            height={60}
            className="h-6 sm:h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors text-sm ${
                  isActive
                    ? "text-brand-navy font-bold"
                    : "text-brand-slate hover:text-brand-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/request-staff">
            <Button variant="secondary" size="sm" className="flex items-center gap-2 shadow-sm">
              Request Staff <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* SHADCN MOTION MOBILE SHEET NAVBAR DRAWER */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 text-brand-navy hover:text-brand-mint focus:outline-hidden transition-colors cursor-pointer rounded-lg hover:bg-brand-canvas"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col justify-between w-full max-w-xs sm:max-w-sm p-6 bg-white">
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left border-b border-brand-canvas pb-4">
                  <SheetTitle className="flex items-center">
                    <Image
                      src="/logos/logo-1.png"
                      alt="New Era Support Logo"
                      width={180}
                      height={45}
                      className="h-7 sm:h-8 w-auto object-contain"
                    />
                  </SheetTitle>
                </SheetHeader>

                {/* STAGGERED FRAMER MOTION MOBILE LINKS */}
                <StaggerContainer staggerChildren={0.08} delayChildren={0.15} className="flex flex-col gap-2 font-semibold">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <StaggerItem key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={`py-2.5 px-3 rounded-xl transition-colors text-base font-bold flex items-center ${
                              isActive
                                ? "text-brand-mint bg-brand-canvas"
                                : "text-brand-navy hover:text-brand-mint hover:bg-brand-canvas"
                            }`}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>

              {/* SHEET FOOTER & CTAs */}
              <div className="flex flex-col gap-4 pt-6 border-t border-brand-canvas">
                <SheetClose asChild>
                  <Link href="/request-staff">
                    <Button variant="secondary" size="md" className="w-full flex items-center justify-center gap-2 shadow-sm">
                      Request Staff <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </SheetClose>

                <div className="bg-brand-canvas p-4 rounded-2xl border border-brand-slate/10 flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-brand-navy">
                    <Clock className="w-3.5 h-3.5 text-brand-mint shrink-0" />
                    <span>24/7 Rapid Deployment Line</span>
                  </div>
                  <Link href={`tel:${COMPANY_CONTACT.phone}`} className="font-extrabold text-sm text-brand-navy hover:text-brand-mint transition-colors">
                    {COMPANY_CONTACT.phone}
                  </Link>
                  <div className="flex items-center gap-1.5 text-[10px] text-brand-slate pt-1 border-t border-brand-slate/10">
                    <MapPin className="w-3 h-3 text-brand-navy" />
                    <span>{COMPANY_CONTACT.address.short}</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

