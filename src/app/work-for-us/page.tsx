"use client";

import React, { useActionState, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input, Select, Checkbox } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { submitCandidateApplication } from "@/app/actions/submit";
import {
  CheckCircle2,
  Upload,
  Clock,
  GraduationCap,
  Headphones,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/motion";

const ROLE_OPTIONS = [
  "Interim Manager",
  "Registered Nurse",
  "1:1 Support Worker & Care Assistant",
  "Chef / Assistant Cook",
  "Kitchen Assistant",
  "Housekeeping & Cleaner",
  "Housing Assistant",
];

const AVAILABILITY_OPTIONS = [
  { value: "Full-Time", label: "Full-Time (Rota placement)" },
  { value: "Part-Time", label: "Part-Time (Flex hours)" },
  { value: "Nights/Weekends", label: "Nights & Weekends only" },
];

export default function WorkForUsPage() {
  const [state, formAction, isPending] = useActionState(submitCandidateApplication, null);
  
  // Custom states
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateFile(selectedFile);
  };

  const validateFile = (selectedFile?: File) => {
    setFileError(null);
    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit");
      setFile(null);
      return;
    }

    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      setFileError("Supported formats: PDF (.pdf) or Word (.doc/.docx)");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    validateFile(droppedFile);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas text-brand-navy">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="py-20 lg:py-24 bg-white border-b border-brand-canvas">
          <FadeIn className="max-w-7xl mx-auto px-6 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
              Careers at New Era Support Ltd
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold leading-tight mt-2 mb-6">
              Build a Rewarding Career with New Era Support Ltd
            </h1>
            <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
              Join a supportive, reliable agency that values your dedication, respects your skills, and invests in your growth.
            </p>
          </FadeIn>
        </section>

        {/* WHY WORK WITH US */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
              Candidate Benefits
            </span>
            <h2 className="font-sans text-3xl font-extrabold mt-1">Why Work With Us</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm flex flex-col gap-3 h-full">
                <div className="w-12 h-12 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy">
                  <Clock className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold">Flexible Shifts</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Choose working hours that suit your schedule, family commitments, and lifestyle.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm flex flex-col gap-3 h-full">
                <div className="w-12 h-12 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy">
                  <Briefcase className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold">Competitive Pay</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Transparent pay rates with prompt, reliable weekly payroll schedules.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm flex flex-col gap-3 h-full">
                <div className="w-12 h-12 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy">
                  <GraduationCap className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold">Development</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Access to ongoing training, safeguarding updates, and career pathways.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="bg-white p-8 rounded-3xl border border-brand-canvas shadow-sm flex flex-col gap-3 h-full">
                <div className="w-12 h-12 rounded-full bg-brand-canvas flex items-center justify-center text-brand-navy">
                  <Headphones className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-sans text-xl font-bold">24/7 Support</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Dedicated 24/7 coordinator support to ensure safe and organized placements.
                </p>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* APPLICATION PROCESS (STEP BY STEP WITH PROMINENT NUMBERS) */}
        <section className="py-20 bg-white border-t border-brand-canvas">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                How To Join
              </span>
              <h2 className="font-sans text-3xl font-extrabold mt-1">
                4-Step Application Process
              </h2>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StaggerItem>
                <HoverCard className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col gap-3 relative shadow-sm h-full">
                  <span className="text-4xl font-black text-brand-mint">01</span>
                  <h3 className="font-sans text-lg font-bold">Submit Application</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    Fill out the online registration form and upload your current CV.
                  </p>
                </HoverCard>
              </StaggerItem>

              <StaggerItem>
                <HoverCard className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col gap-3 relative shadow-sm h-full">
                  <span className="text-4xl font-black text-brand-mint">02</span>
                  <h3 className="font-sans text-lg font-bold">Compliance & Vetting</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    Document verification (DBS check, Right to Work in UK, clinical references).
                  </p>
                </HoverCard>
              </StaggerItem>

              <StaggerItem>
                <HoverCard className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col gap-3 relative shadow-sm h-full">
                  <span className="text-4xl font-black text-brand-mint">03</span>
                  <h3 className="font-sans text-lg font-bold">Onboarding</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    Briefing on New Era standards, safety protocols, and client orientation.
                  </p>
                </HoverCard>
              </StaggerItem>

              <StaggerItem>
                <HoverCard className="bg-brand-canvas p-8 rounded-3xl border border-brand-slate/10 flex flex-col gap-3 relative shadow-sm h-full">
                  <span className="text-4xl font-black text-brand-mint">04</span>
                  <h3 className="font-sans text-lg font-bold">Start Working</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    Receive shift bookings that match your skills, preferences, and availability.
                  </p>
                </HoverCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section className="py-20 max-w-3xl mx-auto px-6">
          <FadeIn className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-brand-canvas">
            {state?.success ? (
              <div className="text-center py-8 flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-mint/15 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-brand-navy" />
                </div>
                <div>
                  <h2 className="font-sans text-3xl font-bold mb-2">Application Received</h2>
                  <p className="text-brand-slate max-w-md mx-auto">
                    {state.message} Our recruitment compliance team will review your CV, vetting status, and contact you shortly.
                  </p>
                  {state.mockMode && (
                    <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full w-fit mx-auto mt-4 font-semibold border border-amber-200">
                      Demo Mode: Submission processed using local database fallback.
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
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">
                    Online Registration
                  </span>
                  <h2 className="font-sans text-3xl font-bold mt-1 mb-2">
                    Candidate Application Form
                  </h2>
                  <p className="text-brand-slate text-sm">
                    Submit your application details, preferred roles, and CV to get started.
                  </p>
                </div>

                {state?.message && !state?.success && (
                  <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-200">
                    {state.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name *"
                    name="fullName"
                    placeholder="e.g. John Doe"
                    error={state?.errors?.fullName?.[0]}
                    required
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="e.g. john.doe@mail.co.uk"
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
                  <Select
                    label="Current Availability *"
                    name="availability"
                    options={AVAILABILITY_OPTIONS}
                    error={state?.errors?.availability?.[0]}
                    required
                  />
                </div>

                {/* Role selection checkboxes */}
                <div className="flex flex-col">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-3">
                    Target Role(s) Selected *
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
                          name="interestedRoles"
                          value={role}
                          checked={selectedRoles.includes(role)}
                          onChange={() => {}}
                          className="sr-only"
                        />
                      </button>
                    ))}
                  </div>
                  {state?.errors?.interestedRoles && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      {state.errors.interestedRoles[0]}
                    </p>
                  )}
                </div>

                {/* Declarations */}
                <div className="flex flex-col gap-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    Compliance & Vetting Declarations *
                  </label>
                  <div className="flex flex-col gap-3.5 bg-brand-canvas p-6 rounded-2xl border border-brand-slate/10">
                    <Checkbox
                      label="I hold a valid, enhanced DBS (Disclosure & Barring Service) certificate or am registered on the Update Service."
                      name="hasValidDbs"
                      value="true"
                    />
                    <Checkbox
                      label="I confirm I possess the legal Right to Work in the United Kingdom and can provide original document verification."
                      name="hasRightToWork"
                      value="true"
                      error={state?.errors?.hasRightToWork?.[0]}
                      required
                    />
                  </div>
                </div>

                {/* CV File Upload Dropzone */}
                <div className="flex flex-col">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                    Upload Your CV / Resume *
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className="border-2 border-dashed border-brand-slate/25 hover:border-brand-mint bg-white p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-brand-slate group-hover:text-brand-navy mb-4 transition-colors" />
                    {file ? (
                      <div>
                        <span className="block text-sm font-semibold text-brand-navy">
                          {file.name}
                        </span>
                        <span className="block text-xs text-brand-slate/60 mt-1">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="block text-sm font-semibold text-brand-navy group-hover:text-brand-navy transition-colors">
                          Drag & drop your file here or click to browse
                        </span>
                        <span className="block text-xs text-brand-slate/60 mt-1">
                          Supports PDF, DOC, or DOCX (Max 5MB)
                        </span>
                      </div>
                    )}
                  </div>
                  {(fileError || state?.errors?.resume) && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      {fileError || state?.errors?.resume?.[0]}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isPending ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            )}
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
