"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeToNewsletterAction } from "@/app/actions/blog";

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Check if user has already subscribed or dismissed the modal
    const dismissed = localStorage.getItem("hasSubscribedOrDismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4000); // 4 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSubscribedOrDismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("email", email.trim());

    const res = await subscribeToNewsletterAction(formData);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message || "Thank you for subscribing!");
      setEmail("");
      localStorage.setItem("hasSubscribedOrDismissed", "true");
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } else {
      setErrorMsg(res.error || "Failed to subscribe. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-slate-100 space-y-6 text-center">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* CENTERED AVATAR / BRAND BADGE */}
        <div className="mx-auto w-20 h-20 rounded-full bg-brand-navy border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative p-3">
          <Image
            src="/icon.jpg"
            alt="New Era Support Ltd"
            width={64}
            height={64}
            className="object-contain rounded-full"
          />
        </div>

        {/* HEADING & SUBTITLE */}
        <div className="space-y-1.5">
          <h3 className="text-2xl font-black text-brand-navy tracking-tight">
            Discover more from New Era Insights
          </h3>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Healthcare • Staffing • CQC Compliance
          </p>
        </div>

        {/* FEEDBACK MESSAGES */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-medium flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-navy focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Subscribe"}
          </button>
        </form>

        {/* TERMS & PRIVACY FOOTER */}
        <p className="text-[11px] text-slate-500 leading-relaxed px-2">
          By subscribing, you agree to New Era Support&apos;s{" "}
          <Link href="/terms" className="underline hover:text-brand-navy">
            Terms of Use
          </Link>
          , and acknowledge its{" "}
          <Link href="/privacy" className="underline hover:text-brand-navy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
