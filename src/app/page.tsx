import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  UserCheck,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Mail,
  Send,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard, FloatingBadge } from "@/components/ui/motion";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION WITH ASYMMETRIC PHOTO CONTAINER & BACKDROP ACCENT */}
        <section className="relative overflow-hidden py-20 lg:py-28 bg-white border-b border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN: TEXT & QUICK CHIPS */}
            <FadeIn direction="right" className="lg:col-span-7 flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-brand-canvas border border-brand-slate/15 px-3.5 py-1.5 rounded-full w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  UK-Wide Coverage & 24/7 Rapid Deployment
                </span>
              </div>

              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy leading-[1.1] tracking-tight">
                Dependable Staffing Solutions for <span className="text-brand-mint italic font-serif">Care, Housing & Hospitality</span> Across the UK
              </h1>

              <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
                Connecting organizations with qualified, compassionate, and vetted professionals—at the right time, with the right skills and values.
              </p>

              {/* PRIMARY CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <Link href="/request-staff" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md">
                    Request Staffing <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/work-for-us" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                    Join Our Team
                  </Button>
                </Link>
              </div>

              {/* QUICK INFO CHIPS (as seen in Valley Best Care reference) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brand-canvas mt-4 text-xs font-semibold">
                <div className="flex items-center gap-3 bg-brand-canvas p-3 rounded-2xl border border-brand-slate/10">
                  <div className="w-9 h-9 rounded-full bg-brand-mint/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-navy" />
                  </div>
                  <div>
                    <span className="block text-brand-slate text-[10px] uppercase tracking-wider">Headquarters</span>
                    <span className="block text-brand-navy font-bold text-xs">Flat 10 The Compasses, 11 Farley Hill, Luton, Bedfordshire</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-brand-canvas p-3 rounded-2xl border border-brand-slate/10">
                  <div className="w-9 h-9 rounded-full bg-brand-mint/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-navy" />
                  </div>
                  <div>
                    <span className="block text-brand-slate text-[10px] uppercase tracking-wider">Bookings Email</span>
                    <span className="block text-brand-navy font-bold text-xs">info@newerasupport.co.uk</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT COLUMN: ASYMMETRIC OVERLAY CONTAINER (from Alliance & Valley references) */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-5 relative flex items-center justify-center">
              {/* Soft purple/mint backdrop shape */}
              <div className="absolute -inset-4 bg-brand-mint/20 rounded-[50px] transform rotate-3 blur-sm" />

              {/* Main Photo Frame */}
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero_caregiver_nurse.jpg"
                  alt="UK Caregiver Nurse"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-mint">Quality Care</span>
                  <h4 className="text-xl font-bold mt-1">Person-Centred Support</h4>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <FloatingBadge className="absolute -top-6 -left-4 bg-white p-4 rounded-3xl shadow-xl border border-brand-canvas flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-mint/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-brand-navy" />
                </div>
                <div>
                  <span className="block text-[10px] text-brand-slate font-bold uppercase tracking-wider">Response Time</span>
                  <span className="block text-sm font-bold text-brand-navy">&lt; 60 Mins Urgent Cover</span>
                </div>
              </FloatingBadge>

              {/* Floating Circular Badge (Bottom Right, as seen in Alliance reference) */}
              <FloatingBadge className="absolute -bottom-6 -right-4 bg-brand-mint text-brand-navy p-5 rounded-3xl shadow-xl flex flex-col gap-1 items-start max-w-[190px] select-none">
                <span className="text-[10px] uppercase font-extrabold tracking-wider leading-none">Need Cover Now?</span>
                <span className="text-base font-black leading-tight">24/7 Helpline</span>
                <Link href="/request-staff?urgency=Immediate" className="mt-2 text-xs font-bold inline-flex items-center gap-1 hover:underline">
                  Request Now <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </FloatingBadge>
            </FadeIn>
          </div>
        </section>

        {/* ACTION TRIO STRIP (Directly Below Hero) */}
        <section className="relative z-10 -mt-10 max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl shadow-md border border-brand-canvas flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-mint/20 flex items-center justify-center mb-6">
                    <UserCheck className="w-6 h-6 text-brand-navy" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                    Request Rota Staff
                  </h3>
                  <p className="text-sm text-brand-slate leading-relaxed mb-6">
                    Submit shift requests, permanent hires, or contract needs. Fill vacancies quickly with vetted, local personnel.
                  </p>
                </div>
                <Link href="/request-staff">
                  <Button variant="ghost" size="sm" className="w-fit p-0 flex items-center gap-2 hover:gap-3 transition-all font-bold">
                    Request Staff <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </HoverCard>
            </StaggerItem>

            {/* Card 2 */}
            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl shadow-md border border-brand-canvas flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                    Emergency Cover
                  </h3>
                  <p className="text-sm text-brand-slate leading-relaxed mb-6">
                    Need last-minute support? Trigger our immediate dispatch workflow for urgent sickness cover and short-notice shifts.
                  </p>
                </div>
                <Link href="/request-staff?urgency=Immediate">
                  <Button variant="ghost" size="sm" className="w-fit p-0 flex items-center gap-2 hover:gap-3 text-red-600 hover:text-red-700 transition-all font-bold">
                    Get Immediate Cover <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </HoverCard>
            </StaggerItem>

            {/* Card 3 */}
            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl shadow-md border border-brand-canvas flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-mint flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                    Apply to Work
                  </h3>
                  <p className="text-sm text-brand-slate leading-relaxed mb-6">
                    Join a premier UK care agency. Excellent shift flexibility, competitive rates, and comprehensive ongoing training.
                  </p>
                </div>
                <Link href="/work-for-us">
                  <Button variant="ghost" size="sm" className="w-fit p-0 flex items-center gap-2 hover:gap-3 transition-all font-bold">
                    Join the Team <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ASYMMETRIC 2-PHOTO ABOUT OVERVIEW SECTION (from Alliance reference) */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: CONTENT & BULLET LIST */}
            <FadeIn direction="right" className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                Redefining Workforce Partnerships
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
                Building Stronger, Safer, and More Effective Environments
              </h2>
              <p className="text-brand-slate text-base leading-relaxed">
                At New Era Support Ltd, we build stronger, safer, and more effective care environments. Whether you require temporary shift cover, specialized care support, or strategic leadership, we supply professionals who make a measurable difference from day one.
              </p>

              <div className="flex flex-col gap-3 py-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                  <span className="text-sm font-semibold text-brand-navy">100% Vetted & Safeguarding Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                  <span className="text-sm font-semibold text-brand-navy">Continuity of Person-Centred Care</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-mint shrink-0" />
                  <span className="text-sm font-semibold text-brand-navy">24/7 Rapid Staff Deployment Across the UK</span>
                </div>
              </div>

              <div>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="flex items-center gap-2 shadow-sm">
                    Learn More About Our Mission <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* RIGHT: 2-PHOTO ASYMMETRIC GRID WITH OVERLAPPING STAT BADGE */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-6 relative grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/images/about_care_team.jpg"
                  alt="New Era Support Care Team"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border-2 border-white translate-y-6">
                <Image
                  src="/images/about_support_worker.jpg"
                  alt="Support Worker with Resident"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Center Floating Stat Badge */}
              <FloatingBadge className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-navy text-white p-5 rounded-3xl shadow-2xl border-4 border-white text-center select-none">
                <span className="block text-2xl font-black text-brand-mint">100%</span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-canvas/80">Safeguarding Vetted</span>
              </FloatingBadge>
            </FadeIn>
          </div>
        </section>

        {/* NUMBERED SERVICE PILLS WITH PHOTO HEADERS (from Valley Best Care & Alliance) */}
        <section className="py-20 bg-white border-t border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                What We Supply
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-brand-navy mt-2 mb-4">
                Core Staffing Sectors
              </h2>
              <p className="text-brand-slate text-sm sm:text-base">
                Vetted personnel available across three key operational sectors in the UK.
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sector 1 */}
              <StaggerItem>
                <HoverCard className="bg-brand-canvas rounded-3xl p-6 border border-brand-slate/10 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-white">
                      <Image
                        src="/images/service_healthcare.jpg"
                        alt="Healthcare & Clinical Support"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                        01
                      </div>
                    </div>
                    <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                      Healthcare & Leadership
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed mb-6">
                      Interim Managers, Registered Nurses, One-to-One Support Workers, and Care Assistants for clinical and residential settings.
                    </p>
                  </div>
                  <ul className="text-xs text-brand-navy font-semibold flex flex-wrap gap-2 pt-2 border-t border-brand-slate/10">
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Interim Managers</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Registered Nurses</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">1:1 Support Workers</li>
                  </ul>
                </HoverCard>
              </StaggerItem>

              {/* Sector 2 */}
              <StaggerItem>
                <HoverCard className="bg-brand-canvas rounded-3xl p-6 border border-brand-slate/10 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-white">
                      <Image
                        src="/images/service_catering.jpg"
                        alt="Hospitality & Catering"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                        02
                      </div>
                    </div>
                    <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                      Hospitality & Catering
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed mb-6">
                      Chefs, Assistant Cooks, and Kitchen Assistants providing dietary management, food prep, and kitchen sanitization.
                    </p>
                  </div>
                  <ul className="text-xs text-brand-navy font-semibold flex flex-wrap gap-2 pt-2 border-t border-brand-slate/10">
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Head Chefs</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Assistant Cooks</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Kitchen Assistants</li>
                  </ul>
                </HoverCard>
              </StaggerItem>

              {/* Sector 3 */}
              <StaggerItem>
                <HoverCard className="bg-brand-canvas rounded-3xl p-6 border border-brand-slate/10 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-white">
                      <Image
                        src="/images/service_housing.jpg"
                        alt="Facilities & Housing"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                        03
                      </div>
                    </div>
                    <h3 className="font-sans text-xl font-bold text-brand-navy mb-2">
                      Facilities & Housing
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed mb-6">
                      Housekeeping/Cleaners and Housing Assistants handling resident intake, welfare, tenancy administration, and cleaning.
                    </p>
                  </div>
                  <ul className="text-xs text-brand-navy font-semibold flex flex-wrap gap-2 pt-2 border-t border-brand-slate/10">
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Housing Assistants</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Housekeeping</li>
                    <li className="bg-white px-3 py-1.5 rounded-full border border-brand-slate/10">Cleaners</li>
                  </ul>
                </HoverCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* HIGH-CONTRAST DARK MISSION BANNER WITH OVERLAPPING CIRCULAR PORTRAIT */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="bg-brand-navy text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl border-4 border-white">
              <div className="lg:col-span-8 flex flex-col gap-6 relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-mint">Our Mission Statement</span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                  "The right people, the right support, and the right standards—wherever they are needed."
                </h2>
                <p className="text-brand-canvas/80 text-sm md:text-base leading-relaxed max-w-2xl">
                  To provide high-quality, dependable, and professionally supported staffing solutions across the UK. We maintain the highest standards of safeguarding, reliability, and person-centered support.
                </p>
                <div>
                  <Link href="/about">
                    <Button variant="secondary" size="lg" className="flex items-center gap-2">
                      Learn More About Us <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Overlapping Circular Nurse Portrait Badge */}
              <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-brand-mint shadow-2xl">
                  <Image
                    src="/images/mission_nurse_portrait.jpg"
                    alt="UK Registered Nurse Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 bg-white text-brand-navy px-4 py-2 rounded-full font-bold text-xs shadow-lg border border-brand-canvas">
                  CQC & Safeguarding Aligned
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* SIDE-BY-SIDE CONTACT PREVIEW CARD */}
        <section className="pb-24 max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="bg-white rounded-[32px] p-8 md:p-12 border border-brand-canvas shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Photo & Contact Info */}
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/images/contact_caregiver_support.jpg"
                  alt="Caregiver supporting resident"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-extrabold text-brand-mint tracking-wider">Reach Out To Us</span>
                  <h4 className="text-xl font-bold mt-1">Need Urgent Shift Cover?</h4>
                  <p className="text-xs text-brand-canvas/80 mt-1">24/7 Admin Hotline: <a href="tel:07565805795" className="font-bold text-white hover:text-brand-mint transition-colors">07565 805795</a></p>
                </div>
              </div>

              {/* Right Call to Action */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                  Workforce Coordination
                </span>
                <h2 className="font-sans text-3xl font-extrabold text-brand-navy">
                  Speak With Our Staffing Team Today
                </h2>
                <p className="text-brand-slate text-sm leading-relaxed">
                  Whether you need immediate sickness coverage or long-term rota support, our Admins are available 24/7 to fulfill your workforce needs.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                      Send Us a Message <Send className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/request-staff" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                      Request Immediate Cover
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
