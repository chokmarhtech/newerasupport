"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { submitOnboardingFormAction } from "@/app/actions/onboarding";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  FileCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";

interface OnboardingFormProps {
  token: string;
  candidateId?: string;
  candidateEmail?: string;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export default function OnboardingMultiStepForm({
  token,
  candidateId = "demo-id",
  candidateEmail = "",
}: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  // Step 1 State
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Female");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState(candidateEmail);
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  // Step 2 State (Reference 1)
  const [ref1FullName, setRef1FullName] = useState("");
  const [ref1Organisation, setRef1Organisation] = useState("");
  const [ref1Position, setRef1Position] = useState("");
  const [ref1Telephone, setRef1Telephone] = useState("");
  const [ref1Email, setRef1Email] = useState("");

  // Step 2 State (Reference 2)
  const [ref2FullName, setRef2FullName] = useState("");
  const [ref2Organisation, setRef2Organisation] = useState("");
  const [ref2Position, setRef2Position] = useState("");
  const [ref2Telephone, setRef2Telephone] = useState("");
  const [ref2Email, setRef2Email] = useState("");

  // Step 3 File State
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [proofOfIdFile, setProofOfIdFile] = useState<File | null>(null);
  const [photoIdCardFile, setPhotoIdCardFile] = useState<File | null>(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState<File | null>(null);
  const [dbsCertFile, setDbsCertFile] = useState<File | null>(null);
  const [qualificationsFile, setQualificationsFile] = useState<File | null>(null);
  const [otherDocsFile, setOtherDocsFile] = useState<File | null>(null);

  const validateFile = (file: File | null, key: string) => {
    if (!file) return true;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileErrors((prev) => ({
        ...prev,
        [key]: `⚠️ "${file.name}" exceeds 5 MB size limit (${(file.size / 1024 / 1024).toFixed(1)} MB). Please select a smaller file.`,
      }));
      return false;
    }
    setFileErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    return true;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
    key: string
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (validateFile(file, key)) {
        setter(file);
      } else {
        e.target.value = "";
        setter(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("token", token);
    formData.append("candidateId", candidateId);

    // Step 1
    formData.append("fullName", fullName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("postcode", postcode);

    // Step 2
    formData.append("ref1FullName", ref1FullName);
    formData.append("ref1Organisation", ref1Organisation);
    formData.append("ref1Position", ref1Position);
    formData.append("ref1Telephone", ref1Telephone);
    formData.append("ref1Email", ref1Email);

    formData.append("ref2FullName", ref2FullName);
    formData.append("ref2Organisation", ref2Organisation);
    formData.append("ref2Position", ref2Position);
    formData.append("ref2Telephone", ref2Telephone);
    formData.append("ref2Email", ref2Email);

    // Step 3
    if (cvFile) formData.append("cvFile", cvFile);
    if (proofOfIdFile) formData.append("proofOfIdFile", proofOfIdFile);
    if (photoIdCardFile) formData.append("photoIdCardFile", photoIdCardFile);
    if (proofOfAddressFile) formData.append("proofOfAddressFile", proofOfAddressFile);
    if (dbsCertFile) formData.append("dbsCertFile", dbsCertFile);
    if (qualificationsFile) formData.append("qualificationsFile", qualificationsFile);
    if (otherDocsFile) formData.append("otherDocsFile", otherDocsFile);

    const res = await submitOnboardingFormAction(formData);

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-brand-navy">Application Received!</h2>
        <p className="text-sm text-brand-slate font-medium leading-relaxed">
          Thank you for completing your full onboarding application and uploading your compliance documents. Our recruitment operations team is reviewing your file and will contact your references.
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-brand-navy max-w-md mx-auto">
          Reference Code: <strong className="text-emerald-700 font-mono">NES-ONBOARD-{token.slice(0, 8).toUpperCase()}</strong>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-2xl bg-brand-navy text-white font-bold text-xs hover:bg-slate-900 transition-all shadow-md"
        >
          Return to Main Website
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl space-y-8 font-sans max-w-3xl mx-auto my-6">
      {/* STEP INDICATOR HEADER */}
      <div className="space-y-4 border-b border-slate-100 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider">
            Candidate Onboarding Portal
          </span>
          <span className="text-xs font-bold text-slate-500">
            Step {step} of 3
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-brand-navy h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-3 text-center text-xs font-bold">
          <span className={step >= 1 ? "text-brand-navy" : "text-slate-400"}>
            1. Personal Info
          </span>
          <span className={step >= 2 ? "text-brand-navy" : "text-slate-400"}>
            2. References
          </span>
          <span className={step >= 3 ? "text-brand-navy" : "text-slate-400"}>
            3. Documents
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: PERSONAL & CONTACT INFORMATION */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
              <User className="w-5 h-5 text-brand-navy" /> Step 1: Personal & Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Amina Bello"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy font-bold focus:outline-none focus:border-brand-navy cursor-pointer"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Telephone Number</label>
                <input
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="e.g. 07555 123456"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. a.bello@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Full Home Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 4, Compass House, High Street"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Postcode</label>
                <input
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. LU1 2EY"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm text-brand-navy focus:outline-none focus:border-brand-navy font-medium uppercase"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-brand-navy text-white font-bold text-xs hover:bg-slate-900 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Proceed to References <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL DETAILS & REFERENCES */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-navy" /> Step 2: Professional Details & References
            </h2>

            {/* REFERENCE 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">
                Reference 1 (Previous Manager / Employer)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={ref1FullName}
                  onChange={(e) => setRef1FullName(e.target.value)}
                  placeholder="Full Name (e.g. Sarah Jenkins)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="text"
                  required
                  value={ref1Organisation}
                  onChange={(e) => setRef1Organisation(e.target.value)}
                  placeholder="Organisation (e.g. St. Jude Nursing Home)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="text"
                  required
                  value={ref1Position}
                  onChange={(e) => setRef1Position(e.target.value)}
                  placeholder="Position / Relationship (e.g. Care Home Manager)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="tel"
                  required
                  value={ref1Telephone}
                  onChange={(e) => setRef1Telephone(e.target.value)}
                  placeholder="Telephone (e.g. 07700 900123)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="email"
                  required
                  value={ref1Email}
                  onChange={(e) => setRef1Email(e.target.value)}
                  placeholder="Email (e.g. s.jenkins@stjude.co.uk)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium md:col-span-2"
                />
              </div>
            </div>

            {/* REFERENCE 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">
                Reference 2 (Second Employer / Supervisor)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={ref2FullName}
                  onChange={(e) => setRef2FullName(e.target.value)}
                  placeholder="Full Name (e.g. David Miller)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="text"
                  required
                  value={ref2Organisation}
                  onChange={(e) => setRef2Organisation(e.target.value)}
                  placeholder="Organisation (e.g. Compass Living)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="text"
                  required
                  value={ref2Position}
                  onChange={(e) => setRef2Position(e.target.value)}
                  placeholder="Position / Relationship (e.g. Senior Supervisor)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="tel"
                  required
                  value={ref2Telephone}
                  onChange={(e) => setRef2Telephone(e.target.value)}
                  placeholder="Telephone (e.g. 07700 900456)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium"
                />
                <input
                  type="email"
                  required
                  value={ref2Email}
                  onChange={(e) => setRef2Email(e.target.value)}
                  placeholder="Email (e.g. d.miller@compass.org)"
                  className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-brand-navy font-medium md:col-span-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 1
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl bg-brand-navy text-white font-bold text-xs hover:bg-slate-900 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Proceed to Document Uploads <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DOCUMENTS & VERIFICATION */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-brand-navy" /> Step 3: Documents & Verification Uploads
              </h2>
              <p className="text-xs text-brand-slate mt-1 font-medium">
                Upload your compliance documents directly to our secure Supabase Cloud Storage vault. Maximum allowed file size per document is <strong>5 MB</strong> (.PDF, .JPG, .PNG).
              </p>
            </div>

            {/* FILE UPLOAD SLOTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CV */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">1. Curriculum Vitae (CV) *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => handleFileChange(e, setCvFile, "cv")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.cv && <p className="text-[11px] font-bold text-rose-600">{fileErrors.cv}</p>}
              </div>

              {/* PROOF OF ID */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">2. Proof of Identity (Passport / ID) *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setProofOfIdFile, "proofOfId")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.proofOfId && <p className="text-[11px] font-bold text-rose-600">{fileErrors.proofOfId}</p>}
              </div>

              {/* PHOTO ID CARD */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">3. Photo ID Card *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setPhotoIdCardFile, "photoIdCard")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.photoIdCard && <p className="text-[11px] font-bold text-rose-600">{fileErrors.photoIdCard}</p>}
              </div>

              {/* PROOF OF ADDRESS */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">4. Proof of Address (Utility Bill) *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setProofOfAddressFile, "proofOfAddress")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.proofOfAddress && <p className="text-[11px] font-bold text-rose-600">{fileErrors.proofOfAddress}</p>}
              </div>

              {/* DBS CERTIFICATE */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">5. Enhanced DBS Certificate *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setDbsCertFile, "dbsCert")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.dbsCert && <p className="text-[11px] font-bold text-rose-600">{fileErrors.dbsCert}</p>}
              </div>

              {/* QUALIFICATIONS */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">6. Qualifications & Certificates *</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setQualificationsFile, "qualifications")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
                {fileErrors.qualifications && <p className="text-[11px] font-bold text-rose-600">{fileErrors.qualifications}</p>}
              </div>

              {/* OTHER DOCUMENTS */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-brand-navy">7. Other Supporting Documents (Optional)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setOtherDocsFile, "otherDocs")}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Step 2
              </button>

              <button
                type="submit"
                disabled={loading || Object.keys(fileErrors).length > 0}
                className="px-8 py-4 rounded-2xl bg-brand-navy hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Uploading Documents to Vault...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Submit Complete Onboarding Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
