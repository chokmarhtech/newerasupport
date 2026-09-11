"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Clock,
  Tag,
  Search,
  FolderPlus,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  deleteBlogPostAction,
  createBlogCategoryAction,
  deleteBlogCategoryAction,
} from "@/app/actions/blog";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  authorName: string;
  status: string;
  createdAt: any;
}

interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
  createdAt: any;
}

interface BlogAdminTabsProps {
  posts: BlogPostItem[];
  categories: BlogCategoryItem[];
  canPublish: boolean;
}

export default function BlogAdminTabs({
  posts,
  categories,
  canPublish,
}: BlogAdminTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"articles" | "categories">("articles");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [isSubmittingCat, setIsSubmittingCat] = useState(false);
  const [catError, setCatError] = useState("");
  const [catSuccess, setCatSuccess] = useState("");
  
  // Deleting State
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  // Filter posts
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Category Creation
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setIsSubmittingCat(true);
    setCatError("");
    setCatSuccess("");

    const formData = new FormData();
    formData.append("name", newCatName.trim());

    const res = await createBlogCategoryAction(formData);

    setIsSubmittingCat(false);
    if (res.success) {
      setCatSuccess("Category created successfully!");
      setNewCatName("");
      setTimeout(() => {
        setIsCategoryModalOpen(false);
        setCatSuccess("");
        router.refresh();
      }, 1200);
    } else {
      setCatError(res.error || "Failed to create category");
    }
  };

  // Handle Category Delete
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;

    setDeletingCatId(id);
    const res = await deleteBlogCategoryAction(id);
    setDeletingCatId(null);

    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete category");
    }
  };

  // Handle Post Delete
  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingPostId(id);
    await deleteBlogPostAction(id);
    setDeletingPostId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER & TOP TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" /> Content Management System
          </div>
          <h1 className="text-3xl font-black text-brand-navy">Blog & Category CMS</h1>
          <p className="text-sm text-brand-slate mt-1 font-medium">
            Manage your UK healthcare articles, regulatory updates, and blog categories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "categories" && canPublish && (
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" /> Add Category
            </button>
          )}

          {activeTab === "articles" && canPublish && (
            <Link
              href="/admin/blog/create"
              className="px-5 py-3 rounded-2xl bg-brand-navy text-white font-bold text-xs hover:bg-slate-900 transition-all flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Write New Article
            </Link>
          )}
        </div>
      </div>

      {/* TAB NAVIGATION PILLS */}
      <div className="flex items-center justify-between gap-4 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 max-w-md">
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "articles"
              ? "bg-white text-brand-navy shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-brand-navy"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles</span>
          <span className="ml-1 bg-slate-100 text-brand-navy px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-slate-200">
            {posts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "categories"
              ? "bg-white text-brand-navy shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-brand-navy"
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Categories</span>
          <span className="ml-1 bg-slate-100 text-brand-navy px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-slate-200">
            {categories.length}
          </span>
        </button>
      </div>

      {/* TAB 1: ARTICLES TAB CONTENT */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          {/* SEARCH BAR */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, category, or summary..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-navy shadow-xs transition-all"
            />
          </div>

          {/* ARTICLES LIST */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-brand-slate font-medium text-sm">
                No articles match your search criteria.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-100 text-brand-navy border border-slate-200 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs font-medium text-brand-slate flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy">{post.title}</h3>
                    <p className="text-xs text-brand-slate line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 text-brand-navy hover:bg-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200 shadow-xs"
                      title="Preview Article Live"
                    >
                      <Eye className="w-4 h-4 text-brand-navy" /> Preview
                    </Link>

                    {canPublish && (
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors border border-emerald-200 shadow-xs"
                        title="Edit Article"
                      >
                        <Pencil className="w-4 h-4 text-emerald-700" /> Edit
                      </Link>
                    )}

                    {canPublish && (
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        disabled={deletingPostId === post.id}
                        className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200 shadow-xs cursor-pointer disabled:opacity-50"
                        title="Delete Article"
                      >
                        {deletingPostId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        )}
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES TAB CONTENT */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-brand-navy">Blog Categories</h2>
                <p className="text-xs text-brand-slate mt-0.5">
                  Organize healthcare topics for easy navigation on the public website.
                </p>
              </div>

              {canPublish && (
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Create Category
                </button>
              )}
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm font-medium">
                No categories created yet. Click "Create Category" to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const postCount = posts.filter((p) => p.category === cat.name).length;

                  return (
                    <div
                      key={cat.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-brand-navy" />
                          <h3 className="font-bold text-sm text-brand-navy">{cat.name}</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">/{cat.slug}</p>
                        <span className="inline-block text-[10px] font-bold bg-white text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full mt-1">
                          {postCount} {postCount === 1 ? "article" : "articles"}
                        </span>
                      </div>

                      {canPublish && (
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          disabled={deletingCatId === cat.id}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-100/70 border border-transparent hover:border-rose-200 transition-all cursor-pointer disabled:opacity-50"
                          title="Delete Category"
                        >
                          {deletingCatId === cat.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-brand-navy">Add Blog Category</h3>
              </div>
              <button
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setCatError("");
                  setCatSuccess("");
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {catError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{catError}</span>
              </div>
            )}

            {catSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{catSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Nursing & Clinical Support"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCat}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmittingCat && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
