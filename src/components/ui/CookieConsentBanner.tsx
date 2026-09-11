"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Check, X } from "lucide-react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    const savedConsent = localStorage.getItem("new_era_cookie_consent");
    if (!savedConsent) {
      // Show banner after a slight 1-second delay for smooth entry
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("new_era_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("new_era_cookie_consent", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="bg-brand-navy/95 backdrop-blur-md border border-slate-700 text-white rounded-3xl p-5 shadow-2xl space-y-4">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Cookie className="w-5 h-5" />
            <h4 className="text-sm font-extrabold tracking-wide uppercase">Cookie & Privacy Policy</h4>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MESSAGE */}
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          We use essential cookies to ensure our website functions securely and to analyze traffic in accordance with <strong>UK GDPR & PECR regulations</strong>.
        </p>

        {/* CQC SAFEGUARDING BADGE */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% CQC Compliant & Data Encrypted</span>
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-brand-navy font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4 text-brand-navy stroke-[3]" /> Accept All Cookies
          </button>

          <button
            onClick={handleEssentialOnly}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
