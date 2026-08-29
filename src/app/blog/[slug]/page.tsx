import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import {
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Share2,
  PhoneCall,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch (err) {}

  if (!post) {
    return {
      title: "Article Not Found | New Era Support Ltd",
    };
  }

  return {
    title: `${post.title} | New Era Support Ltd Insights`,
    description: post.excerpt,
  };
}

export default async function DynamicBlogPostPage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch (err) {}

  // Fallback demo posts matching default slugs
  if (!post) {
    if (slug === "effective-cqc-safeguarding-strategies-for-care-homes") {
      post = {
        title: "Effective CQC Safeguarding Strategies for UK Care Homes in 2026",
        category: "Safeguarding Updates",
        excerpt:
          "A practical operational blueprint for care home managers to ensure 100% CQC safeguarding audit readiness while maintaining rapid emergency shift cover.",
        content: `
          <h2>Understanding CQC Safeguarding Expectations</h2>
          <p>Care Quality Commission (CQC) inspections place rigorous emphasis on staffing compliance, continuous staff vetting, and rapid incident escalation protocols. In 2026, registered care facilities in Bedfordshire and across the UK must demonstrate robust staffing agency partner vetting.</p>
          <blockquote>"Safeguarding is not merely a compliance checklist—it is the foundation of person-centered care and resident dignity."</blockquote>
          <h3>3 Key Pillars of Safeguarding Audit Readiness:</h3>
          <ul>
            <li><strong>Enhanced DBS Verification:</strong> Ensure all active nursing and care assistant personnel have live DBS Update Service checks.</li>
            <li><strong>Right to Work & Identity Audits:</strong> Keep digital copies of UK Right to Work documentation readily available for inspector review.</li>
            <li><strong>Continuous Training Updates:</strong> Maintain current certification in Moving & Handling, Safeguarding Vulnerable Adults (SOVA), and Medication Administration.</li>
          </ul>
          <h3>Rapid Shift Cover Integration</h3>
          <p>When unexpected staff absence threatens operational nurse-to-resident ratios, care managers must deploy pre-vetted agency personnel within 60 minutes to preserve continuity of care.</p>
        `,
        coverImage: "/images/hero_caregiver_nurse.jpg",
        authorName: "New Era Compliance Team",
        readTime: "6 min read",
        createdAt: new Date(),
      };
    } else if (slug === "managing-urgent-shift-shortages-in-residential-care") {
      post = {
        title: "How Care Managers Can Manage Urgent Shift Shortages in Luton & Bedfordshire",
        category: "Staffing Advice",
        excerpt:
          "Operational strategies for care managers facing last-minute shift cancellations to ensure zero disruption in resident care.",
        content: `
          <h2>Navigating Emergency Rota Gaps</h2>
          <p>Unplanned staff sickness or sudden occupancy spikes can stretch residential care rotas to critical limits. Partnering with a 24/7 rapid deployment agency ensures seamless shift fill rates without compromising care standards.</p>
          <h3>Best Practices for Rapid Shift Cover:</h3>
          <ul>
            <li>Maintain a dedicated 24/7 hotline contact for immediate personnel dispatch.</li>
            <li>Provide clear, pre-populated shift handovers for incoming temporary nurses and support workers.</li>
          </ul>
        `,
        coverImage: "/images/about_care_team.jpg",
        authorName: "Workforce Operations Team",
        readTime: "4 min read",
        createdAt: new Date(Date.now() - 86400000 * 2),
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* BACK LINK */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy hover:text-brand-mint transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Hub
          </Link>

          {/* ARTICLE HEADER */}
          <FadeIn className="space-y-4 border-b border-slate-200 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-brand-mint/20 text-brand-navy font-bold px-3 py-1 rounded-full text-xs">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-brand-slate font-medium">
                <Clock className="w-3.5 h-3.5 text-brand-mint" /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-brand-slate font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-mint" />{" "}
                {new Date(post.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-brand-navy leading-tight">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-brand-slate leading-relaxed font-medium">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-mint flex items-center justify-center font-bold text-sm">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-navy">{post.authorName}</p>
                  <p className="text-[11px] text-brand-slate">Healthcare & Compliance Operations</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* COVER IMAGE */}
          {post.coverImage && (
            <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
            </div>
          )}

          {/* MAIN ARTICLE HTML CONTENT (TAILWIND .prose) */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm">
            <div
              className="prose prose-slate max-w-none text-brand-navy leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* AUTHOR & URGENT SHIFT CTA SIDEBAR BANNER */}
          <div className="bg-brand-navy text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-mint uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> 24/7 Urgent Shift Cover Line
              </div>
              <h3 className="text-xl font-bold text-white">Need Staffing Cover for Your Care Home?</h3>
              <p className="text-xs text-brand-canvas/80 max-w-md">
                Our workforce coordinators dispatch vetted RGNs, care assistants, and housing officers within 60 minutes across Luton & Bedfordshire.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/request-staff"
                className="px-5 py-2.5 rounded-xl bg-brand-mint text-brand-navy font-bold text-xs hover:bg-brand-mint/90 transition-all text-center"
              >
                Request Staff Now
              </Link>
              <Link
                href="tel:07565805795"
                className="px-5 py-2.5 rounded-xl bg-white/10 border border-brand-mint/30 text-white font-bold text-xs hover:bg-white/20 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-mint" /> 07565 805795
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
