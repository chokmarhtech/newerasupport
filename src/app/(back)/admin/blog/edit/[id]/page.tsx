import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, canPublishBlog } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditBlogForm from "./EditBlogForm";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  if (!canPublishBlog(session.role)) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-sm font-sans">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-brand-navy">Access Restricted</h2>
        <p className="text-sm text-brand-slate font-medium">
          You do not have permission to edit blog posts.
        </p>
        <Link
          href="/admin/blog"
          className="inline-block px-5 py-2.5 bg-brand-navy text-white font-bold text-xs rounded-xl"
        >
          ← Return to Blog List
        </Link>
      </div>
    );
  }

  const resolvedParams = await params;
  let post = null;

  // Only query PostgreSQL if ID is a valid UUID format to avoid syntax errors
  if (UUID_REGEX.test(resolvedParams.id)) {
    try {
      post = await prisma.blogPost.findUnique({
        where: { id: resolvedParams.id },
      });
    } catch (err) {
      console.warn("Failed to fetch blog post for edit:", err);
    }
  }

  // Fallback mock post if DB record not found or ID is editorial placeholder
  if (!post) {
    post = {
      id: resolvedParams.id,
      title: "Effective CQC Safeguarding Strategies for UK Care Homes in 2026",
      category: "Safeguarding Updates",
      excerpt: "A comprehensive guide on maintaining 100% CQC safeguarding compliance and rapid emergency staff deployment.",
      content: "<h2>CQC Safeguarding Audit Checklist 2026</h2><p>Maintaining CQC compliance requires robust incident logging, staff vetting, and ongoing training across residential care facilities in Luton and Bedfordshire.</p>",
      authorName: "New Era Compliance Team",
      readTime: "6 min read",
      coverImage: "",
    };
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-navy mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Article List
          </Link>
          <h1 className="text-3xl font-black text-brand-navy">Edit Blog Article</h1>
          <p className="text-sm text-brand-slate mt-1 font-medium">
            Update article content, metadata, or formatting.
          </p>
        </div>
      </div>

      <EditBlogForm post={post} />
    </div>
  );
}
