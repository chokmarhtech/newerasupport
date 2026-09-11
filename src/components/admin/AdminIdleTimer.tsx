"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin";
import { ShieldAlert, Clock, LogOut, CheckCircle2 } from "lucide-react";

const IDLE_WARNING_THRESHOLD_MS = 18 * 60 * 1000; // 18 minutes
const TOTAL_IDLE_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutes

export default function AdminIdleTimer() {
  const router = useRouter();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(120); // 2-minute countdown (120s)
  
  const lastActivityRef = useRef<number>(Date.now());
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleResetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (showWarningModal) {
      setShowWarningModal(false);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setRemainingSeconds(120);
  }, [showWarningModal]);

  const handleSignOut = useCallback(async () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    try {
      await logoutAdminAction();
    } catch (err) {
      // Fallback redirect
      router.push("/admin/login?reason=idle");
    }
  }, [router]);

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    const onUserActivity = () => {
      // Only reset timer if warning modal is NOT active
      if (!showWarningModal) {
        lastActivityRef.current = Date.now();
      }
    };

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, onUserActivity, { passive: true });
    });

    const checkIdleInterval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActivityRef.current;

      // 1. Hard Timeout reached (20 minutes)
      if (idleTime >= TOTAL_IDLE_TIMEOUT_MS) {
        clearInterval(checkIdleInterval);
        handleSignOut();
        return;
      }

      // 2. Warning Threshold reached (18 minutes)
      if (idleTime >= IDLE_WARNING_THRESHOLD_MS && !showWarningModal) {
        setShowWarningModal(true);
        const secondsLeft = Math.max(0, Math.floor((TOTAL_IDLE_TIMEOUT_MS - idleTime) / 1000));
        setRemainingSeconds(secondsLeft);
      }
    }, 2000);

    return () => {
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserActivity);
      });
      clearInterval(checkIdleInterval);
    };
  }, [showWarningModal, handleSignOut]);

  // Countdown timer effect when warning modal is visible
  useEffect(() => {
    if (showWarningModal) {
      countdownIntervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            handleSignOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [showWarningModal, handleSignOut]);

  if (!showWarningModal) return null;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedCountdown = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
        {/* ICON BANNER */}
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-brand-navy">Session Expiring Notice</h3>
          <p className="text-xs text-brand-slate font-medium leading-relaxed">
            You have been inactive for 18 minutes. For CQC safeguarding & GDPR security compliance, your admin session will automatically close.
          </p>
        </div>

        {/* COUNTDOWN DISPLAY */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time Remaining:</span>
          <div className="text-4xl font-black font-mono text-amber-600 flex items-center gap-2">
            <Clock className="w-6 h-6 animate-pulse text-amber-500" />
            <span>{formattedCountdown}</span>
          </div>
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetTimer}
            className="w-full py-3.5 px-4 rounded-2xl bg-brand-navy hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Keep Me Logged In
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <LogOut className="w-4 h-4 text-slate-500" /> Sign Out Now
          </button>
        </div>
      </div>
    </div>
  );
}
