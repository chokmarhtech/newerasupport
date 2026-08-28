"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input, Textarea } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { submitGeneralInquiry } from "@/app/actions/submit";
import { CheckCircle2, Phone, Mail, MapPin, ArrowLeft, Building2, User } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

const ALL_ROLES = [
  "Interim Manager",
  "Nurse",
  "Support Worker",
  "Care Assistant",
  "Chef / Cook",
  "Kitchen Assistant",
  "Housekeeping",
  "Housing Asst.",
];

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitGeneralInquiry, null);

  // Dual purpose switcher state
  const [userIntent, setUserIntent] = useState<"client" | "candidate">("client");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="grow py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brand-slate hover:text-brand-navy mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: CONTACT DETAILS & PHOTO CARD */}
            <FadeIn direction="right" className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                    Get In Touch
                  </span>
                  <h1 className="font-sans text-3xl font-extrabold mt-1 mb-2">
                    Contact Us
                  </h1>
                  <p className="text-brand-slate text-sm">
                    Whether you are a care provider requiring urgent staff cover or a candidate looking for a rewarding role, we are here 24/7.
                  </p>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-brand-canvas">
                  <Image
                    src="/images/contact_caregiver_support.jpg"
                    alt="Caregiver support"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-extrabold text-brand-mint tracking-wider">UK-Wide Coverage</span>
                    <h4 className="text-base font-bold">24/7 Admin Hotline</h4>
                  </div>
                </div>

                <div className="flex flex-col gap-5 text-sm pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs uppercase tracking-wider text-brand-slate mb-0.5">
                        Phone Line (24/7 Rapid Deployment)
                      </span>
                      <a href="tel:07565805795" className="block text-base font-bold text-brand-navy hover:text-brand-mint transition-colors">07565 805795</a>
                      <span className="text-xs text-brand-slate/75">Available 24/7 for urgent staffing</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs uppercase tracking-wider text-brand-slate mb-0.5">
                        Email Address
                      </span>
                      <a
                        href="mailto:info@newerasupport.co.uk"
                        className="block text-base font-bold hover:text-brand-mint transition-colors"
                      >
                        info@newerasupport.co.uk
                      </a>
                      <span className="text-xs text-brand-slate/75">General Enquiries & Bookings</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-xs uppercase tracking-wider text-brand-slate mb-0.5">
                        Office Address
                      </span>
                      <span className="block leading-relaxed text-xs">
                        New Era Support Ltd<br />
                        Flat 10 The Compasses, 11 Farley Hill,<br />
                        Luton, Bedfordshire
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT COLUMN: DUAL-PURPOSE INQUIRY FORM */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-brand-canvas shadow-sm">
              {state?.success ? (
                <div className="text-center py-12 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-brand-mint/15 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-brand-navy" />
                  </div>
                  <div>
                    <h2 className="font-sans text-3xl font-bold mb-2">Message Sent</h2>
                    <p className="text-brand-slate max-w-md mx-auto">
                      {state.message} A member of our support team will reply to you at the email address provided shortly.
                    </p>
                    {state.mockMode && (
                      <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full w-fit mx-auto mt-4 font-semibold border border-amber-200">
                        Demo Mode: Message processed using local database fallback.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
                    <Link href="/">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Go to Home
                      </Button>
                    </Link>
                    <button
                      onClick={() => window.location.reload()}
                      className="text-sm font-semibold text-brand-navy hover:underline cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form action={formAction} className="flex flex-col gap-6">
                  {/* INTENT SELECTOR SWITCHER */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
                      I am a: *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserIntent("client")}
                        className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${userIntent === "client"
                            ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                            : "bg-white text-brand-navy border-brand-slate/20 hover:border-brand-navy"
                          }`}
                      >
                        <Building2 className={`w-5 h-5 ${userIntent === "client" ? "text-brand-mint" : "text-brand-navy"}`} />
                        <div>
                          <span className="block text-sm font-bold">Care / Housing Provider</span>
                          <span className={`block text-xs ${userIntent === "client" ? "text-brand-canvas/70" : "text-brand-slate"}`}>
                            Need Staff Placement
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUserIntent("candidate")}
                        className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${userIntent === "candidate"
                            ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                            : "bg-white text-brand-navy border-brand-slate/20 hover:border-brand-navy"
                          }`}
                      >
                        <User className={`w-5 h-5 ${userIntent === "candidate" ? "text-brand-mint" : "text-brand-navy"}`} />
                        <div>
                          <span className="block text-sm font-bold">Job Seeker</span>
                          <span className={`block text-xs ${userIntent === "candidate" ? "text-brand-canvas/70" : "text-brand-slate"}`}>
                            Looking for Work
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name *"
                      name="fullName"
                      placeholder="e.g. Jane Doe"
                      error={state?.errors?.fullName?.[0]}
                      required
                    />
                    <Input
                      label={userIntent === "client" ? "Organization / Facility Name" : "Email Address *"}
                      name={userIntent === "client" ? "subject" : "email"}
                      placeholder={userIntent === "client" ? "e.g. Holborn Housing Ltd" : "e.g. jane@example.com"}
                      required={userIntent !== "client"}
                    />
                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="e.g. jane@example.com"
                      error={state?.errors?.email?.[0]}
                      required
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 07565 805795"
                      error={state?.errors?.phone?.[0]}
                    />
                  </div>

                  {/* Role(s) Needed / Interested In */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
                      {userIntent === "client" ? "Role(s) Needed:" : "Role(s) Interested In:"}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {ALL_ROLES.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => handleRoleToggle(role)}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${selectedRoles.includes(role)
                              ? "bg-brand-navy text-brand-mint border-brand-navy"
                              : "bg-brand-canvas text-brand-navy border-brand-slate/15 hover:border-brand-navy"
                            }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="Message / Requirement Details *"
                    name="message"
                    placeholder={
                      userIntent === "client"
                        ? "Detail your staffing requirements, shift patterns, or placement dates..."
                        : "Introduce yourself, your experience, and preferred shift hours..."
                    }
                    error={state?.errors?.message?.[0]}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 mt-2"
                  >
                    {isPending ? "Submitting Request..." : "Submit Request"}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
