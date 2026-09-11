import React from "react";
import { getAdminSession } from "@/lib/auth";
import { logoutAdminAction } from "@/app/actions/admin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminIdleTimer from "@/components/admin/AdminIdleTimer";
import { getRoleBadge } from "@/constants/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  const badge = getRoleBadge(session?.role);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-row font-sans">
      {/* CQC IDLE TIMEOUT MONITOR */}
      {session && <AdminIdleTimer />}

      {/* DESKTOP COLLAPSIBLE SIDEBAR */}
      {session && (
        <AdminSidebar session={session} logoutAction={logoutAdminAction} />
      )}

      {/* MAIN RIGHT COLUMN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-50">
        {/* TOP HEADER WITH AVATAR DROPDOWN */}
        {session && (
          <AdminHeader
            session={session}
            badge={badge}
            logoutAction={logoutAdminAction}
          />
        )}

        {/* WORKSPACE PAGE CONTENT */}
        <main
          className={`flex-1 overflow-y-auto ${
            session ? "p-4 md:p-8" : "p-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
