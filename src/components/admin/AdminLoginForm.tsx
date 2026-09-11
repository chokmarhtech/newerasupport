"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAdminAction } from "@/app/actions/admin";
import { ShieldAlert } from "lucide-react";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const isIdleSignout = searchParams.get("reason") === "idle";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* BRAND TOP HEADER NAVBAR */}
      <header className="w-full bg-white px-6 md:px-12 py-5 flex items-center justify-between border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo-1.png"
            alt="New Era Support Ltd"
            width={170}
            height={42}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-brand-slate">
          <Link href="/contact" className="hover:text-brand-navy transition-colors uppercase tracking-wider">
            Contact Support
          </Link>
          <Link href="/blog" className="hover:text-brand-navy transition-colors uppercase tracking-wider">
            Blog Insights
          </Link>
        </div>
      </header>

      {/* UNBOXED, SLEEK CENTERED AUTHENTICATION FORM */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-7">
          {/* IDLE SIGNOUT SECURITY NOTICE BANNER */}
          {isIdleSignout && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-3 shadow-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You were automatically signed out after 20 minutes of inactivity for CQC security compliance.</span>
            </div>
          )}

          {/* TITLE & SUBTITLE */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">Welcome back!</h1>
            <p className="text-sm text-brand-slate font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          {/* CLEAN LOGIN FORM */}
          <form
            action={async (formData) => {
              setLoading(true);
              setErrorMessage("");
              const res = await loginAdminAction(null, formData);
              if (res && !res.success) {
                setErrorMessage(res.message || "Failed to log in.");
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#EBF2FA] border border-transparent focus:border-brand-navy rounded-xl px-4 py-3.5 text-sm text-brand-navy placeholder-slate-500 focus:bg-white focus:outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-1">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#EBF2FA] border border-transparent focus:border-brand-navy rounded-xl px-4 py-3.5 text-sm text-brand-navy placeholder-slate-500 focus:bg-white focus:outline-none transition-all font-medium"
              />
            </div>

            {/* FULL-WIDTH NAVY BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-brand-navy hover:bg-slate-900 text-white font-bold text-sm transition-all cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {loading ? "Authenticating Session..." : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
