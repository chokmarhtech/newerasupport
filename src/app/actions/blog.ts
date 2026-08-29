"use server";

import fs from "fs";
import path from "path";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession, canPublishBlog } from "@/lib/auth";

export interface BlogActionResponse {
  success: boolean;
  message?: string;
  url?: string;
  error?: string;
  errors?: Record<string, string[] | undefined>;
}

// 1. LOCAL IMAGE UPLOAD SERVER ACTION FOR TIPTAP EDITOR
export async function uploadBlogImageAction(formData: FormData): Promise<BlogActionResponse> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No image file provided" };
    }

    const folder = (formData.get("folder") as string) || "blog";
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-]/g, "_");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", sanitizedFolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${sanitizedFolder}/${uniqueFilename}`;
    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Blog image upload error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}

// 2. CREATE BLOG POST SERVER ACTION
const CreateBlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  category: z.string().min(2, "Category is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(500),
  content: z.string().min(20, "Content must be at least 20 characters"),
  coverImage: z.string().optional(),
  authorName: z.string().default("New Era Editorial Team"),
  readTime: z.string().default("5 min read"),
});

export async function createBlogPostAction(formData: FormData): Promise<void> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return;
  }

  try {
    const rawTitle = formData.get("title") as string;
    const rawCategory = formData.get("category") as string;
    const rawExcerpt = formData.get("excerpt") as string;
    const rawContent = formData.get("content") as string;
    const rawCoverImage = (formData.get("coverImage") as string) || undefined;
    const rawAuthor = (formData.get("authorName") as string) || "New Era Editorial Team";
    const rawReadTime = (formData.get("readTime") as string) || "5 min read";

    const validated = CreateBlogPostSchema.parse({
      title: rawTitle,
      category: rawCategory,
      excerpt: rawExcerpt,
      content: rawContent,
      coverImage: rawCoverImage,
      authorName: rawAuthor,
      readTime: rawReadTime,
    });

    const slug = validated.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString(36);

    try {
      await prisma.blogPost.create({
        data: {
          slug,
          title: validated.title,
          category: validated.category,
          excerpt: validated.excerpt,
          content: validated.content,
          coverImage: validated.coverImage,
          authorName: validated.authorName,
          readTime: validated.readTime,
          status: "PUBLISHED",
        },
      });
    } catch (dbErr) {
      console.warn("Prisma blog creation failed, running in mock mode:", dbErr);
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
  } catch (error) {
    console.error("createBlogPostAction error:", error);
  }
}

// 3. TOGGLE BLOG POST STATUS ACTION
export async function updateBlogPostStatusAction(id: string, status: any): Promise<void> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return;
  }

  try {
    await prisma.blogPost.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
  } catch (err) {
    console.warn("Prisma status update failed:", err);
  }
}

// 4. DELETE BLOG POST ACTION
export async function deleteBlogPostAction(id: string): Promise<void> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return;
  }

  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
  } catch (err) {
    console.warn("Prisma post delete failed:", err);
  }
}
