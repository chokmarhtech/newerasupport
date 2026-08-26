"use client";

import React, { useActionState, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input, Textarea, Select } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { submitClientRequest } from "@/app/actions/submit";
import { CheckCircle2, ShieldCheck  } from "lucide-react";
import Link from "next/link";

const ROLE_OPTIONS = [
  "Interim Manager",
  "Registered Nurse (RGN/RMN)",
  "Care Assistant",
  "Support Worker",
  "Catering Staff",
  "Facilities / Domestic Staff",
];

const URGENCY_OPTIONS = [
  { value: "Future Rota", label: "Future Rota (Planned vacancy)" },
  { value: "Within 24h", label: "Within 24 Hours (Urgent coverage)" },
  { value: "Immediate", label: "Immediate Cover (Last-minute callout)" },
];

export default function RequestStaffPage() {
  const [state, formAction, isPending] = useActionState(submitClientRequest, null);
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
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-brand-canvas overflow-hidden">
            {state?.success ? (
              // Success Screen
              <div className="text-center py-8 flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-mint/15 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-brand-navy" />
                </div>
                <div>
                  <h2 className="font-sans text-3xl font-bold mb-2">Request Submitted</h2>
                  <p className="text-brand-slate max-w-md mx-auto">
                    {state.message} Our UK staffing coordinators have been alerted and will reach out to you within the hour.
                  </p>
                  {state.mockMode && (
                    <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full w-fit mx-auto mt-4 font-semibold border border-amber-200">
                      Demo Mode: Submission processed using local fallback systems.
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
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              // The Form
              <form action={formAction} className="flex flex-col gap-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                    B2B Staffing Solutions
                  </span>
                  <h1 className="font-sans text-3xl sm:text-4xl font-bold mt-1 mb-2">
                    Request Quality Staff
                  </h1>
                  <p className="text-brand-slate text-sm">
                    Connect with qualified care and housing professionals. Fill vacancies quickly with CQC-aligned vetting standards.
                  </p>
                </div>

                {state?.message && !state?.success && (
                  <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-200">
                    {state.message}
                  </div>
                )}

                {/* Organization Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Organization Name *"
                    name="organizationName"
                    placeholder="e.g. Holborn Care Home"
                    error={state?.errors?.organizationName?.[0]}
                    required
                  />
                  <Input
                    label="Contact Name *"
                    name="contactName"
                    placeholder="e.g. Jane Doe"
                    error={state?.errors?.contactName?.[0]}
                    required
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="e.g. manager@carehome.co.uk"
                    error={state?.errors?.email?.[0]}
                    required
                  />
                  <Input
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 07565 805795"
                    error={state?.errors?.phone?.[0]}
                    required
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Location / Facility Address *"
                      name="location"
                      placeholder="e.g. Luton, Bedfordshire"
                      error={state?.errors?.location?.[0]}
                      required
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="flex flex-col">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
                    Staff Types Required *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ROLE_OPTIONS.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`flex items-center justify-between p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          selectedRoles.includes(role)
                            ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                            : "bg-white text-brand-navy border-brand-slate/20 hover:border-brand-navy"
                        }`}
                      >
                        <span>{role}</span>
                        <input
                          type="checkbox"
                          name="requiredRoles"
                          value={role}
                          checked={selectedRoles.includes(role)}
                          onChange={() => {}} // Controlled via parent button
                          className="sr-only"
                        />
                      </button>
                    ))}
                  </div>
                  {state?.errors?.requiredRoles && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      {state.errors.requiredRoles[0]}
                    </p>
                  )}
                </div>

                {/* Shift urgency */}
                <div className="grid grid-cols-1 gap-6">
                  <Select
                    label="Shift Urgency / Timeframe *"
                    name="shiftUrgency"
                    options={URGENCY_OPTIONS}
                    error={state?.errors?.shiftUrgency?.[0]}
                    required
                  />
                  <Textarea
                    label="Notes / Specific Instructions"
                    name="notes"
                    placeholder="Provide details about rota patterns, specific ward requirements, or system preferences..."
                    error={state?.errors?.notes?.[0]}
                  />
                </div>

                {/* Info block */}
                <div className="bg-brand-canvas p-6 rounded-2xl border border-brand-slate/10 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-brand-navy shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-slate leading-relaxed">
                    By submitting this request, you agree to our terms of business. All temporary assignments undergo vetting procedures meeting the care standard guidelines in the UK, including enhanced DBS verification, clinical referencing, and mandatory training renewals.
                  </p>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isPending ? "Submitting..." : "Submit Staffing Request"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
