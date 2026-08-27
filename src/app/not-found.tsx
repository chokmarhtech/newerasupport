import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Phone,
  UserCheck,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/motion";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="grow flex items-center justify-center py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* RESPONSIVE 2-COLUMN HERO (ILLUSTRATION LEFT, TEXT & BUTTONS RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            {/* LEFT COLUMN: 3D HEALTHCARE ILLUSTRATION */}
            <FadeIn direction="right" className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-340px sm:max-w-400px aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="/images/not_found_healthcare_illustration.jpg"
                  alt="404 Healthcare Staffing Illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </FadeIn>

            {/* RIGHT COLUMN: 404 BADGE, TEXT, & ACTION BUTTONS */}
            <FadeIn direction="left" delay={0.1} className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
              <div className="inline-flex items-center gap-2 bg-white border border-brand-slate/15 px-4 py-1.5 rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-navy">
                  Error 404 • Page Not Found
                </span>
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight tracking-tight">
                Looking for Healthcare Staffing or Support?
              </h1>

              <p className="text-brand-slate text-base sm:text-lg leading-relaxed max-w-xl">
                The page you are looking for doesn't exist, has been moved, or the link may be outdated. Let's get you back on track!
              </p>

              {/* Main Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md">
                    <Home className="w-4 h-4" /> Return to Homepage
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Contact Support Team
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Quick Helpful Destinations Grid */}
          <FadeIn delay={0.2}>
            <div className="text-left bg-white rounded-3xl p-8 border border-brand-canvas shadow-sm">
              <h3 className="font-sans text-xs font-extrabold uppercase tracking-widest text-brand-mint mb-6 text-center lg:text-left">
                Popular Destinations
              </h3>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StaggerItem>
                  <Link href="/request-staff">
                    <HoverCard className="bg-brand-canvas p-6 rounded-2xl border border-brand-slate/10 flex flex-col gap-2 h-full">
                      <div className="w-10 h-10 rounded-xl bg-brand-mint/20 flex items-center justify-center text-brand-navy mb-2">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy">Request Staff</h4>
                      <p className="text-xs text-brand-slate leading-relaxed">
                        Need shift cover or permanent healthcare/housing staff?
                      </p>
                    </HoverCard>
                  </Link>
                </StaggerItem>

                <StaggerItem>
                  <Link href="/services">
                    <HoverCard className="bg-brand-canvas p-6 rounded-2xl border border-brand-slate/10 flex flex-col gap-2 h-full">
                      <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-mint flex items-center justify-center mb-2">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy">Our Services</h4>
                      <p className="text-xs text-brand-slate leading-relaxed">
                        Explore our clinical, catering, and housing sector offerings.
                      </p>
                    </HoverCard>
                  </Link>
                </StaggerItem>

                <StaggerItem>
                  <Link href="/work-for-us">
                    <HoverCard className="bg-brand-canvas p-6 rounded-2xl border border-brand-slate/10 flex flex-col gap-2 h-full">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-navy mb-2 shadow-sm">
                        <HelpCircle className="w-5 h-5 text-brand-navy" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy">Join Our Team</h4>
                      <p className="text-xs text-brand-slate leading-relaxed">
                        Apply to work with New Era Support Ltd across the UK.
                      </p>
                    </HoverCard>
                  </Link>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
