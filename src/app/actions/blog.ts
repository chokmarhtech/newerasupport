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

import { supabase } from "@/lib/supabase";

// 1. IMAGE UPLOAD SERVER ACTION (SUPABASE STORAGE WITH LOCAL DISK FALLBACK)
export async function uploadBlogImageAction(formData: FormData): Promise<BlogActionResponse> {
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "No image file provided" };
    }

    const folder = (formData.get("folder") as string) || "blog";
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-]/g, "_");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;

    // 1. TRY SUPABASE CLOUD STORAGE (PERFECT FOR VERCEL & LIVE PRODUCTION)
    if (supabase) {
      try {
        const storagePath = `${sanitizedFolder}/${uniqueFilename}`;
        const { data, error } = await supabase.storage
          .from("candidate-documents")
          .upload(storagePath, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from("candidate-documents")
            .getPublicUrl(storagePath);
          return { success: true, url: urlData.publicUrl };
        }
      } catch (supaErr) {
        console.warn("Supabase blog image upload notice:", supaErr);
      }
    }

    // 2. LOCAL DISK STORAGE FALLBACK (LOCAL DEV ENVIRONMENT)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", sanitizedFolder);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueFilename);
      await fs.promises.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${sanitizedFolder}/${uniqueFilename}`;
      return { success: true, url: publicUrl };
    } catch (fsErr: any) {
      console.warn("Local disk upload failed (likely read-only serverless environment):", fsErr);
      // Data URL fallback for read-only serverless filesystem
      const base64 = buffer.toString("base64");
      const mime = file.type || "image/jpeg";
      const dataUrl = `data:${mime};base64,${base64}`;
      return { success: true, url: dataUrl };
    }
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
      console.warn("Prisma blog creation failed:", dbErr);
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
  } catch (error) {
    console.error("createBlogPostAction error:", error);
  }
}

// 3. UPDATE BLOG POST SERVER ACTION
export async function updateBlogPostAction(id: string, formData: FormData): Promise<void> {
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

    try {
      await prisma.blogPost.update({
        where: { id },
        data: {
          title: validated.title,
          category: validated.category,
          excerpt: validated.excerpt,
          content: validated.content,
          coverImage: validated.coverImage,
          authorName: validated.authorName,
          readTime: validated.readTime,
        },
      });
    } catch (dbErr) {
      console.warn("Prisma blog update failed:", dbErr);
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
  } catch (error) {
    console.error("updateBlogPostAction error:", error);
  }
}

// 4. TOGGLE BLOG POST STATUS ACTION
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

// 5. DELETE BLOG POST ACTION
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

// 6. BLOG CATEGORY ACTIONS
export async function createBlogCategoryAction(formData: FormData): Promise<BlogActionResponse> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const name = (formData.get("name") as string || "").trim();
    if (!name || name.length < 2) {
      return { success: false, error: "Category name must be at least 2 characters" };
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existing = await prisma.blogCategory.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });

    if (existing) {
      return { success: false, error: "Category already exists" };
    }

    await prisma.blogCategory.create({
      data: { name, slug },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, message: "Category created successfully" };
  } catch (error: any) {
    console.error("createBlogCategoryAction error:", error);
    return { success: false, error: error.message || "Failed to create category" };
  }
}

export async function deleteBlogCategoryAction(id: string): Promise<BlogActionResponse> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.blogCategory.delete({
      where: { id },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, message: "Category deleted successfully" };
  } catch (error: any) {
    console.error("deleteBlogCategoryAction error:", error);
    return { success: false, error: error.message || "Failed to delete category" };
  }
}

export async function getBlogCategoriesAction() {
  try {
    if (!prisma || !prisma.blogCategory) {
      return [];
    }
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (error) {
    console.error("getBlogCategoriesAction error:", error);
    return [];
  }
}

import { Resend } from "resend";
import NewsletterWelcomeEmail from "@/emails/NewsletterWelcomeEmail";

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey && resendApiKey.length > 5 ? new Resend(resendApiKey) : null;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "New Era Support <onboarding@contact.newerasupport.co.uk>";

export async function updateBlogCategoryAction(id: string, formData: FormData): Promise<BlogActionResponse> {
  const currentSession = await getAdminSession();
  if (!currentSession || !canPublishBlog(currentSession.role)) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const name = (formData.get("name") as string || "").trim();
    if (!name || name.length < 2) {
      return { success: false, error: "Category name must be at least 2 characters" };
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existing = await prisma.blogCategory.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          { OR: [{ name }, { slug }] },
        ],
      },
    });

    if (existing) {
      return { success: false, error: "Category with this name or slug already exists" };
    }

    await prisma.blogCategory.update({
      where: { id },
      data: { name, slug },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, message: "Category updated successfully" };
  } catch (error: any) {
    console.error("updateBlogCategoryAction error:", error);
    return { success: false, error: error.message || "Failed to update category" };
  }
}

// 7. NEWSLETTER SUBSCRIPTION & NOTIFICATION ACTIONS
export async function subscribeToNewsletterAction(formData: FormData): Promise<BlogActionResponse> {
  try {
    const email = (formData.get("email") as string || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (prisma && prisma.blogSubscriber) {
      const existing = await prisma.blogSubscriber.findUnique({
        where: { email },
      });

      if (existing) {
        if (!existing.isActive) {
          await prisma.blogSubscriber.update({
            where: { id: existing.id },
            data: { isActive: true },
          });
        }
        return { success: true, message: "You are already subscribed to our newsletter!" };
      }

      await prisma.blogSubscriber.create({
        data: { email, isActive: true },
      });
    }

    // Send Welcome Email
    if (resend) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: email,
          subject: "Welcome to New Era Healthcare & CQC Insights",
          react: NewsletterWelcomeEmail({ email }),
        });
      } catch (emailErr) {
        console.warn("Newsletter welcome email dispatch notice:", emailErr);
      }
    }

    return {
      success: true,
      message: "Thank you for subscribing! You will receive our latest healthcare insights.",
    };
  } catch (error: any) {
    console.error("subscribeToNewsletterAction error:", error);
    return { success: false, error: error.message || "Failed to subscribe to newsletter." };
  }
}

export async function notifySubscribersNewPostAction(postTitle: string, postSlug: string, postExcerpt: string): Promise<void> {
  try {
    if (!prisma || !prisma.blogSubscriber || !resend) return;

    const subscribers = await prisma.blogSubscriber.findMany({
      where: { isActive: true },
      select: { email: true },
    });

    if (subscribers.length === 0) return;

    const articleUrl = `https://newerasupport.co.uk/blog/${postSlug}`;

    for (const sub of subscribers) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: sub.email,
          subject: `📰 New Healthcare Article: ${postTitle}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #0A192F;">
              <h2>${postTitle}</h2>
              <p style="color: #475569; font-size: 14px;">${postExcerpt}</p>
              <a href="${articleUrl}" style="background-color: #0A192F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-top: 12px;">
                Read Full Article →
              </a>
            </div>
          `,
        });
      } catch (err) {
        console.warn(`Failed to notify subscriber ${sub.email}:`, err);
      }
    }
  } catch (error) {
    console.error("notifySubscribersNewPostAction error:", error);
  }
}


