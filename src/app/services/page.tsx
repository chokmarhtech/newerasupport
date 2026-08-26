import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Utensils, Home as HomeIcon, Zap, Clock, UserCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/motion";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="py-20 lg:py-24 bg-white border-b border-brand-canvas">
          <FadeIn className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
              Workforce Excellence
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold leading-tight mt-2 mb-6">
              Comprehensive Workforce Solutions Tailored to Your Operational Needs
            </h1>
            <p className="text-brand-slate text-base sm:text-lg leading-relaxed mb-8">
              We supply vetted professionals across healthcare, housing, and hospitality, offering flexible staffing service models designed for maximum operational continuity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-staff">
                <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-md">
                  Request Staff <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Speak with a Coordinator
                </Button>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* SERVICE MODELS SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
              Flexible Staffing Models
            </span>
            <h2 className="font-sans text-3xl font-extrabold mt-1">How We Deliver Staffing</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold mb-2">Emergency Shift Cover</h3>
                <p className="text-sm text-brand-slate leading-relaxed">
                  Short-notice coverage for staff sickness, unexpected callouts, and sudden rota deficits. Available 24/7.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-mint/20 flex items-center justify-center text-brand-navy mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold mb-2">Contract & Temporary</h3>
                <p className="text-sm text-brand-slate leading-relaxed">
                  Medium to long-term temporary contracts to support seasonal spikes, maternity cover, or ongoing projects.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy text-white flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6 text-brand-mint" />
                </div>
                <h3 className="font-sans text-xl font-bold mb-2">Permanent & Interim</h3>
                <p className="text-sm text-brand-slate leading-relaxed">
                  Strategic recruitment for key operational leadership, registered managers, and permanent core staff roles.
                </p>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* DETAILED ROLE CATEGORIES WITH PHOTO HEADERS & NUMBERED BADGES */}
        <section className="py-20 bg-white border-t border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                Staffing Directory
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold mt-2">
                Detailed Role Categories
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-12">
              {/* Category 1: Healthcare */}
              <FadeIn className="bg-brand-canvas rounded-3xl p-8 md:p-12 border border-brand-slate/10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                  <div className="lg:col-span-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-mint flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans text-2xl font-extrabold">1. Healthcare & Clinical Support</h3>
                      <span className="text-xs text-brand-slate font-semibold uppercase tracking-wider">Clinical & Residential Care</span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/service_healthcare.jpg"
                      alt="Healthcare Service"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                      01
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Interim Managers</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Seasoned operational and clinical leaders to guide teams, maintain regulatory standards, and drive unit stability.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Registered Nurses (RGN / RMN)</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      High-standard clinical care, medication administration, care planning, and team management for residential and hospital settings.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">One-to-One Support Workers</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Dedicated care for individuals with complex needs, learning disabilities, mental health challenges, and autonomy goals.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Care Assistants</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Compassionate day-to-day personal care, mobility support, and personal dignity assistance for residential environments.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Category 2: Hospitality & Catering */}
              <FadeIn className="bg-brand-canvas rounded-3xl p-8 md:p-12 border border-brand-slate/10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                  <div className="lg:col-span-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-mint flex items-center justify-center shrink-0">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans text-2xl font-extrabold">2. Hospitality & Catering</h3>
                      <span className="text-xs text-brand-slate font-semibold uppercase tracking-wider">Nutrition & Food Operations</span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/service_catering.jpg"
                      alt="Catering Service"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                      02
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Chefs</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Nutritional meal planning, allergen management, and high-volume meal preparation tailored to care facility dietary needs.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Assistant Cooks</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Food preparation support, kitchen hygiene compliance, portioning, and structured meal service support.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Kitchen Assistants</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Sanitization, kitchen maintenance, dishwashing, and compliant food handling practices.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Category 3: Facilities & Housing Operations */}
              <FadeIn className="bg-brand-canvas rounded-3xl p-8 md:p-12 border border-brand-slate/10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                  <div className="lg:col-span-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-mint flex items-center justify-center shrink-0">
                      <HomeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans text-2xl font-extrabold">3. Facilities & Housing Operations</h3>
                      <span className="text-xs text-brand-slate font-semibold uppercase tracking-wider">Housing & Environment Services</span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/service_housing.jpg"
                      alt="Housing Service"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white text-brand-navy w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                      03
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Housing Assistants</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Resident intake support, tenancy administration, welfare checks, and community housing operations support.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-brand-slate/10">
                    <h4 className="font-bold text-base text-brand-navy mb-1">Housekeeping / Cleaners</h4>
                    <p className="text-xs text-brand-slate leading-relaxed">
                      Deep cleaning, infection control standards, room sanitization, and general facility environment maintenance.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="bg-brand-navy text-white rounded-[40px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border-4 border-white">
              <div className="max-w-xl">
                <h2 className="font-sans text-3xl font-bold mb-2">
                  Need Custom Staffing Options?
                </h2>
                <p className="text-brand-canvas/80 text-sm">
                  Our account managers can tailor a bespoke staffing package for your organization.
                </p>
              </div>
              <Link href="/request-staff">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Request Staff <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
