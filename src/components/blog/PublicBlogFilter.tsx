"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, Search, BookOpen, ArrowRight, Filter } from "lucide-react";
import { FadeIn, HoverCard } from "@/components/ui/motion";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage?: string | null;
  readTime: string;
  authorName: string;
  createdAt: any;
}

interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface PublicBlogFilterProps {
  initialPosts: BlogPostItem[];
  categories: BlogCategoryItem[];
}

export default function PublicBlogFilter({
  initialPosts,
  categories,
}: PublicBlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Filter posts by category and search query
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;
  const gridPosts = sortedPosts.length > 1 ? sortedPosts.slice(1) : [];

  return (
    <div className="space-y-12 font-sans">
      {/* SEARCH BAR & CATEGORY PILLS FILTER BAR */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword, topic, or compliance title..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-medium text-brand-navy focus:outline-none focus:border-brand-navy shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full px-2 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          {/* SORT DROPDOWN */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-brand-navy focus:outline-none focus:border-brand-navy cursor-pointer transition-all shadow-xs"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200/60 pt-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "All"
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Articles ({initialPosts.length})
          </button>

          {categories.map((cat) => {
            const count = initialPosts.filter(
              (p) => p.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-brand-navy text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-brand-navy border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTS MESSAGING IF NONE MATCH */}
      {sortedPosts.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-brand-navy">No matching articles found</h3>
          <p className="text-xs text-brand-slate max-w-md mx-auto">
            We couldn't find any articles matching "{searchQuery}". Try searching with a different term or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-navy text-white font-bold text-xs hover:bg-slate-900 transition-all mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FEATURED SPOTLIGHT ARTICLE (IF MATCHES EXIST) */}
      {featuredPost && (
        <FadeIn>
          <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-8">
            <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src={featuredPost.coverImage || "/images/hero_caregiver_nurse.jpg"}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-xs text-brand-mint px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured Insight
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-semibold text-brand-slate">
                <span className="bg-brand-mint/20 text-brand-navy font-bold px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-brand-navy leading-tight">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="hover:text-brand-mint transition-colors"
                >
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm text-brand-slate leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-slate flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-navy" /> {featuredPost.authorName}
                </span>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-brand-navy text-white hover:bg-brand-navy/90 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  Read Full Article <ArrowRight className="w-4 h-4 text-brand-mint" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* ARTICLES GRID */}
      {gridPosts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-brand-navy flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-mint" /> Healthcare Guides & Sector Insights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <HoverCard key={post.id}>
                <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col h-full">
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={post.coverImage || "/images/about_care_team.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy/90 text-brand-mint px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-brand-slate">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-brand-mint" /> {post.readTime}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-brand-navy leading-snug line-clamp-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-brand-mint transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-brand-slate line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-brand-slate">
                        {post.authorName}
                      </span>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-brand-navy hover:text-brand-mint transition-colors flex items-center gap-1"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              </HoverCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
