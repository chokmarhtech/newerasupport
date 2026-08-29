"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAdminAction } from "@/app/actions/admin";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("superadmin@newerasupport.co.uk");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<"SUPER_ADMIN" | "ADMIN" | "SUPERVISOR_1" | "SUPERVISOR_2">("SUPER_ADMIN");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDemoSelect = (demoEmail: string, role: "SUPER_ADMIN" | "ADMIN" | "SUPERVISOR_1" | "SUPERVISOR_2") => {
    setEmail(demoEmail);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* TOP GLOW DECORATION */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full blur-xs" />

        {/* LOGO & TITLE */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logos/logo-2.png"
              alt="New Era Support Ltd Logo"
              width={200}
              height={50}
              className="h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Staffing Operations Portal
          </div>
          <h1 className="text-2xl font-black text-white">Admin Sign In</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access staff requests, candidate applications & team permissions.
          </p>
        </div>

        {/* DEMO ROLE SWITCHER PILLS */}
        <div className="mb-6 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Demo Testing Persona Selector:
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleDemoSelect("superadmin@newerasupport.co.uk", "SUPER_ADMIN")}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedRole === "SUPER_ADMIN"
                  ? "bg-amber-400/20 text-amber-300 border-amber-400/50 ring-1 ring-amber-400/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              👑 SuperAdmin
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect("admin@newerasupport.co.uk", "ADMIN")}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedRole === "ADMIN"
                  ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/50 ring-1 ring-emerald-400/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              🛡️ Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect("supervisor1@newerasupport.co.uk", "SUPERVISOR_1")}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedRole === "SUPERVISOR_1"
                  ? "bg-cyan-400/20 text-cyan-300 border-cyan-400/50 ring-1 ring-cyan-400/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              📋 Supervisor 1
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect("supervisor2@newerasupport.co.uk", "SUPERVISOR_2")}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedRole === "SUPERVISOR_2"
                  ? "bg-slate-400/20 text-slate-200 border-slate-400/50 ring-1 ring-slate-400/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              🔍 Supervisor 2
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        <form
          action={async (formData) => {
            setLoading(true);
            setErrorMessage("");
            formData.set("demoRole", selectedRole);
            const res = await loginAdminAction(null, formData);
            if (res && !res.success) {
              setErrorMessage(res.message || "Failed to log in.");
              setLoading(false);
            }
          }}
          className="space-y-4"
        >
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating Session..." : "Enter Operations Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
          >
            ← Return to Main Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
