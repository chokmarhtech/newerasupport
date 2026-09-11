import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  
  // If user is already authenticated, redirect them straight to the dashboard
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
