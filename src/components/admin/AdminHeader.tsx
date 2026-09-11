"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Menu,
  LogOut,
  ShieldCheck,
  ExternalLink,
  User,
  ChevronDown,
  Lock,
} from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/constants/admin";

interface AdminHeaderProps {
  session: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  badge: {
    label: string;
    color: string;
    icon?: string;
  };
  logoutAction: () => Promise<void>;
}

export default function AdminHeader({ session, badge, logoutAction }: AdminHeaderProps) {
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const canManageTeam = (role?: string) => role === "SUPER_ADMIN" || role === "ADMIN";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAvatarDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between">
      {/* LEFT: MOBILE HAMBURGER SHEET MENU TRIGGER */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-brand-navy hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[300px] bg-white border-slate-200 p-6 text-slate-800 flex flex-col justify-between">
              <div>
                <SheetHeader className="border-b border-slate-200 pb-4 text-left">
                  <SheetTitle>
                    <Link href="/admin/dashboard" className="block">
                      <Image
                        src="/logos/logo-1.png"
                        alt="New Era Support Ltd"
                        width={160}
                        height={40}
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                  </SheetTitle>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-navy font-bold tracking-wider uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Navigation
                  </div>
                </SheetHeader>

                {/* MOBILE SHEET LINKS */}
                <nav className="flex flex-col gap-1.5 mt-6 font-semibold text-sm">
                  {ADMIN_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isRestricted = item.requiresRoleCheck && !canManageTeam(session.role);

                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                            isRestricted
                              ? "text-slate-400 hover:bg-slate-50"
                              : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-brand-navy" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                              {item.badge.text}
                            </span>
                          )}
                          {isRestricted && (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>
              </div>

              {/* SHEET FOOTER SIGN OUT ACTION */}
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-brand-navy transition-colors px-2 py-1"
                >
                  <span>View Main Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-start gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* MOBILE BRAND LOGO */}
        <Link href="/admin/dashboard" className="md:hidden block">
          <Image
            src="/logos/logo-1.png"
            alt="New Era Support Logo"
            width={140}
            height={35}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* RIGHT: INTERACTIVE AVATAR CIRCLE & DROPDOWN MENU (Inspired by Image 1) */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
          className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
          aria-label="User Account Menu"
        >
          <div className="w-9 h-9 rounded-full bg-brand-navy text-white font-bold text-sm flex items-center justify-center shadow-sm">
            {getInitials(session.name)}
          </div>
          <span className="hidden sm:inline text-xs font-bold text-brand-navy pr-1">{session.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
        </button>

        {/* AVATAR DROPDOWN MENU */}
        {showAvatarDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-50 space-y-4">
            {/* AVATAR HEADER & ROLE INFO */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0">
                {getInitials(session.name)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-brand-navy truncate">{session.name}</p>
                <p className="text-xs text-slate-500 truncate">{session.email}</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 ${badge.color}`}>
                  {badge.icon ? `${badge.icon} ` : ""}{badge.label}
                </span>
              </div>
            </div>

            {/* DROPDOWN LINKS */}
            <div className="space-y-1 text-xs font-semibold">
              <Link
                href="/admin/profile"
                onClick={() => setShowAvatarDropdown(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4 text-brand-navy" />
                <span>My Profile</span>
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-2">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
