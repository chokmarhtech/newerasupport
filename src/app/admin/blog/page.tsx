"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createBlogPostAction, updateBlogPostStatusAction, deleteBlogPostAction } from "@/app/actions/blog";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  FileText,
  Plus,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function AdminBlogCMSPage() {
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Healthcare Insights");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("New Era Editorial Team");
  const [readTime, setReadTime] = useState("5 min read");
  const [loading, setLoading] = useState(false);

  // Initial pre-populated sample articles if DB is fresh
  const [posts, setPosts] = useState([
    {
      id: "post-1",
      slug: "effective-cqc-safeguarding-strategies-for-care-homes",
      title: "Effective CQC Safeguarding Strategies for UK Care Homes in 2026",
      category: "Safeguarding Updates",
      excerpt: "A comprehensive guide on maintaining 100% CQC safeguarding compliance and rapid emergency staff deployment.",
      readTime: "6 min read",
      authorName: "New Era Compliance Team",
      status: "PUBLISHED",
      createdAt: new Date(),
    },
    {
      id: "post-2",
      slug: "managing-urgent-shift-shortages-in-residential-care",
      title: "How Care Managers Can Manage Urgent Shift Shortages in Luton & Bedfordshire",
      category: "Staffing Advice",
      excerpt: "Key operational steps care facility managers must take when facing last-minute shift cancellations.",
      readTime: "4 min read",
      authorName: "Workforce Operations Team",
      status: "PUBLISHED",
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
  ]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("coverImage", coverImage);
    formData.append("authorName", authorName);
    formData.append("readTime", readTime);

    await createBlogPostAction(formData);

    // Append locally for instant preview
    const newPost = {
      id: `post-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      category,
      excerpt,
      readTime,
      authorName,
      status: "PUBLISHED",
      createdAt: new Date(),
    };

    setPosts([newPost, ...posts]);
    setLoading(false);
    setShowEditorModal(false);

    // Reset Form
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
  };

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" /> Content Management System
          </div>
          <h1 className="text-3xl font-black text-white">Blog Article CMS</h1>
          <p className="text-sm text-slate-400 mt-1">
            Create, edit, and publish healthcare insights & CQC compliance guides directly to your website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowEditorModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Write New Article
        </button>
      </div>

      {/* ARTICLES TABLE LIST */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-700"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{post.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <Eye className="w-4 h-4 text-emerald-400" /> Preview
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* TIPTAP ARTICLE PUBLISHING MODAL */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Tiptap WYSIWYG Editor
                </span>
                <h2 className="text-xl font-black text-white">Create & Publish Blog Article</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowEditorModal(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Navigating CQC Safeguarding Audits"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category Sector
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Healthcare Insights">Healthcare Insights</option>
                    <option value="Safeguarding Updates">Safeguarding Updates</option>
                    <option value="Staffing Advice">Staffing Advice</option>
                    <option value="Housing & Community">Housing & Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Short Excerpt / Summary (for Article Cards)
                </label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Provide a 2-sentence summary for search engines and article previews..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* TIPTAP RICH TEXT EDITOR COMPONENT */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Article Body Content (Tiptap Rich Text Editor with Formatting & Device Image Upload)
                </label>
                <RichTextEditor content={content} onChange={(html) => setContent(html)} />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Publishing Article..." : "🚀 Publish Article Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
