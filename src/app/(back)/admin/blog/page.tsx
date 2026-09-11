import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession, canPublishBlog } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BlogAdminTabs from "@/components/admin/BlogAdminTabs";

export default async function AdminBlogCMSPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB fetch failed for blog posts:", err);
  }

  let categories: any[] = [];
  try {
    if (prisma && prisma.blogCategory) {
      categories = await prisma.blogCategory.findMany({
        orderBy: { name: "asc" },
      });
    }
  } catch (err) {
    console.warn("DB fetch failed for blog categories:", err);
  }

  return (
    <BlogAdminTabs
      posts={posts}
      categories={categories}
      canPublish={canPublishBlog(session.role)}
    />
  );
}
