"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ADMIN_NAV_ITEMS, canManageTeam } from "@/constants/admin";

interface AdminSidebarProps {
  session: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  logoutAction: () => Promise<void>;
}

export default function AdminSidebar({ session, logoutAction }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Restore collapse state from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem("admin_sidebar_collapsed", String(nextState));
  };

  return (
    <aside
      className={`hidden md:flex h-screen sticky top-0 bg-white border-r border-slate-200 flex-col justify-between shrink-0 z-30 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20 p-3" : "w-64 p-6"
      }`}
    >
      <div className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
        {/* BRAND HEADER, LOGO & COLLAPSE ARROW TOGGLE */}
        <div className="border-b border-slate-100 pb-4">
          {!isCollapsed ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <Link href="/admin/dashboard" className="block truncate">
                  <Image
                    src="/logos/logo-1.png"
                    alt="New Era Support Ltd"
                    width={160}
                    height={40}
                    className="h-9 w-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-brand-navy hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer shrink-0"
                  title="Collapse Sidebar"
                  aria-label="Collapse Sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-brand-navy font-bold tracking-wider uppercase truncate">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Admin Dashboard</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {/* FULL LOGO ICON AT THE TOP */}
              <Link
                href="/admin/dashboard"
                className="block p-1 rounded-2xl hover:bg-slate-100 transition-colors"
                title="Admin Dashboard"
              >
                <Image
                  src="/icon.png"
                  alt="New Era Support Ltd Logo Icon"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain rounded-xl shadow-xs"
                  priority
                />
              </Link>

              {/* ARROW TOGGLE BUTTON DIRECTLY BELOW LOGO ICON */}
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-full flex items-center justify-center p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-brand-navy hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
                title="Expand Sidebar"
                aria-label="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* VERTICAL NAVIGATION LINKS */}
        <nav className="flex flex-col gap-1.5 text-sm font-semibold">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isRestricted = item.requiresRoleCheck && !canManageTeam(session.role as any);

            // Hide restricted items for non-SuperAdmin users
            if (isRestricted) return null;

            if (isCollapsed) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center p-3.5 rounded-2xl text-slate-600 hover:text-brand-navy hover:bg-slate-100/80 transition-colors relative group"
                  title={item.label}
                >
                  <Icon className="w-5 h-5 text-brand-navy shrink-0" />
                  {item.badge && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-slate-600 hover:text-brand-navy hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Icon className="w-4 h-4 text-brand-navy shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM-PINNED ACTIONS (VIEW WEBSITE & SIGN OUT) */}
      <div className="border-t border-slate-100 pt-4 space-y-2 shrink-0">
        {!isCollapsed ? (
          <>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-brand-navy transition-colors px-3 py-1"
            >
              <span>View Main Website</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors w-full cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-3 rounded-2xl text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition-colors"
              title="View Main Website"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>

            <form action={logoutAction} className="w-full flex justify-center">
              <button
                type="submit"
                className="p-3 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
}
