"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateBlogPostAction, uploadBlogImageAction, getBlogCategoriesAction } from "@/app/actions/blog";
import RichTextEditor from "@/components/ui/rich-text-editor";
import SafeImage from "@/components/ui/safe-image";
import { Save, Upload, Loader2, Image as ImageIcon } from "lucide-react";

export default function EditBlogForm({ post }: { post: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title || "");
  const [category, setCategory] = useState(post.category || "Healthcare Insights");
  const [categoriesList, setCategoriesList] = useState<{ id: string; name: string }[]>([]);
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [content, setContent] = useState(post.content || "");
  const [coverImage, setCoverImage] = useState(post.coverImage || "");
  const [authorName, setAuthorName] = useState(post.authorName || "New Era Editorial Team");
  const [readTime, setReadTime] = useState(post.readTime || "5 min read");
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  React.useEffect(() => {
    async function loadCategories() {
      const cats = await getBlogCategoriesAction();
      if (cats && cats.length > 0) {
        setCategoriesList(cats);
      } else {
        setCategoriesList([
          { id: "1", name: "Healthcare Insights" },
          { id: "2", name: "Safeguarding Updates" },
          { id: "3", name: "Staffing Advice" },
          { id: "4", name: "Housing & Community" },
        ]);
      }
    }
    loadCategories();
  }, []);


  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog");

    try {
      const res = await uploadBlogImageAction(formData);
      if (res.success && res.url) {
        setCoverImage(res.url);
      } else {
        alert(res.error || "Failed to upload image. Please try again or paste image URL.");
      }
    } catch (err: any) {
      console.error("Cover upload error:", err);
      alert("Failed to upload image: " + (err.message || "Unknown error"));
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    await updateBlogPostAction(post.id, formData);

    setLoading(false);
    router.push("/admin/blog");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-brand-navy mb-2 uppercase tracking-wider">
            Article Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-navy mb-2 uppercase tracking-wider">
            Category Sector
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy font-bold focus:outline-none focus:border-brand-navy focus:bg-white cursor-pointer transition-all"
          >
            {categoriesList.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-brand-navy mb-2 uppercase tracking-wider">
          Short Excerpt / Summary
        </label>
        <textarea
          required
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium transition-all"
        />
      </div>

      {/* COVER IMAGE UPLOADER */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
          Featured Cover Image
        </label>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {coverImage ? (
            <div className="relative h-28 w-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
              <SafeImage src={coverImage} fallbackSrc="/images/hero_caregiver_nurse.jpg" alt="Cover preview" fill className="object-cover" />
            </div>
          ) : (
            <div className="h-28 w-44 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-xs font-semibold shrink-0">
              <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
              <span>No Image Selected</span>
            </div>
          )}

          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center gap-3">
              <label className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-brand-navy text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2">
                {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>{uploadingCover ? "Uploading..." : "Upload Device Image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
            </div>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Or paste image URL (e.g. /images/hero_caregiver_nurse.jpg)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-brand-navy mb-2 uppercase tracking-wider">
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-navy mb-2 uppercase tracking-wider">
            Read Time
          </label>
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white font-medium transition-all"
          />
        </div>
      </div>

      {/* TIPTAP RICH TEXT EDITOR */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
          Article Content Body
        </label>
        <RichTextEditor content={content} onChange={(html) => setContent(html)} />
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
        <Link
          href="/admin/blog"
          className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:text-brand-navy font-bold text-xs cursor-pointer transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-2xl bg-brand-navy hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
