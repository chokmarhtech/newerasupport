import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Heart, Users, Award, Target, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION WITH ASYMMETRIC IMAGE CONTAINER */}
        <section className="py-20 lg:py-24 bg-white border-b border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                About New Era Support Ltd
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl font-extrabold leading-tight">
                Dedicated to Excellence, Safeguarding, and Reliable Support
              </h1>
              <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
                New Era Support Ltd was established to bridge critical staffing gaps in healthcare, residential housing, and facility operations across the UK. We focus equally on client operational continuity and workforce wellbeing.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link href="/request-staff">
                  <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-md">
                    Request Staffing <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/work-for-us">
                  <Button variant="outline" size="lg">
                    Join Our Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* ASYMMETRIC PHOTO CONTAINER */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-4 bg-brand-mint/20 rounded-[50px] transform -rotate-3 blur-sm" />
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/about_care_team.jpg"
                  alt="New Era Support Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION PILLARS */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
              Guiding Principles
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold mt-2 mb-4">
              Our Vision & Mission
            </h2>
            <p className="text-brand-slate text-sm sm:text-base">
              The foundation of everything we build at New Era Support Ltd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* VISION CARD */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-brand-canvas shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-mint/20 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-brand-navy" />
                </div>
                <h3 className="font-sans text-2xl font-bold mb-4 text-brand-navy">
                  Our Vision
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed">
                  To become a trusted UK-wide workforce partner, recognized for providing highly skilled, reliable, compassionate, and professional staff who make a positive difference to the people and organizations we serve. We create stronger, safer, and more effective environments by connecting organizations with the right people at the right time.
                </p>
              </div>
            </div>

            {/* MISSION CARD */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-brand-canvas shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-navy text-brand-mint flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="font-sans text-2xl font-bold mb-4 text-brand-navy">
                  Our Mission
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed">
                  To provide high-quality, dependable, and professionally supported staffing solutions across the UK. We maintain the highest standards of safeguarding, reliability, and person-centered support through our core commitment: <strong className="text-brand-navy">the right people, the right support, and the right standards—wherever they are needed.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 bg-white border-t border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                What We Stand For
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold mt-2 mb-4">
                Our Core Values
              </h2>
              <p className="text-brand-slate text-sm sm:text-base">
                Four principles that drive our staffing standards and candidate care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <div className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-navy shadow-sm">
                  <Heart className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  Person-Centred Care
                </h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Prioritizing the dignity, safety, and respect of every individual served across care and housing settings.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-navy shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  Integrity & Safeguarding
                </h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Uncompromising compliance, background vetting, DBS checks, and strict adherence to UK care standards.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-navy shadow-sm">
                  <Users className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  Reliability & Continuity
                </h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Consistent delivery of dependable personnel who integrate seamlessly into client operational teams.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-navy shadow-sm">
                  <Award className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold text-brand-navy">
                  Valuing Our Workforce
                </h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Continuous professional support, fair treatment, competitive rates, and active career development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION BANNER WITH OVERLAPPING NURSE PORTRAIT */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="bg-brand-navy text-white rounded-[40px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border-4 border-white">
            <div className="max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-mint block mb-2">Empowering Care</span>
              <h2 className="font-sans text-3xl font-bold mb-2">
                Need Reliable Staff for Your Facility?
              </h2>
              <p className="text-brand-canvas/80 text-sm">
                Speak with our workforce coordinator today for immediate placement support.
              </p>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-mint shadow-lg hidden sm:block">
                <Image
                  src="/images/mission_nurse_portrait.jpg"
                  alt="UK Registered Nurse"
                  fill
                  className="object-cover"
                />
              </div>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Get In Touch <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
