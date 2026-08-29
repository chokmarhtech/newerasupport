import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn, HoverCard } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import {
  FileText,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Calendar,
  User,
} from "lucide-react";

export const metadata = {
  title: "Healthcare Staffing & CQC Insights Blog | New Era Support Ltd",
  description:
    "Read the latest healthcare staffing insights, CQC safeguarding guides, housing support trends, and agency updates from New Era Support Ltd.",
};

export default async function PublicBlogHubPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB fetch failed for blog posts, using fallback editorial posts:", err);
  }

  if (posts.length === 0) {
    posts = [
      {
        id: "post-1",
        slug: "effective-cqc-safeguarding-strategies-for-care-homes",
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
            <li><strong>Right to Work & Identity Audits:</strong> Keep digital copies of UK Right to Work documentation readily available.</li>
            <li><strong>Continuous Training Updates:</strong> Maintain current certification in Moving & Handling, Safeguarding Vulnerable Adults (SOVA), and Medication Administration.</li>
        `,
        coverImage: "/images/hero_caregiver_nurse.jpg",
        authorName: "New Era Compliance Team",
        readTime: "6 min read",
        createdAt: new Date(),
      },
      {
        id: "post-2",
        slug: "managing-urgent-shift-shortages-in-residential-care",
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
      },
      {
        id: "post-3",
        slug: "housing-support-worker-best-practices",
        title: "The Evolving Role of Supported Housing Assistants in Community Care",
        category: "Housing & Community",
        excerpt:
          "Exploring how trained housing support workers empower vulnerable individuals to achieve independence in supported living environments.",
        content: `
          <h2>Empowering Independence in Supported Housing</h2>
          <p>Supported living facilities require compassionate, skilled personnel who balance risk management with individual empowerment. Our housing support officers provide tailored assistance across Luton and surrounding regions.</p>
        `,
        coverImage: "/images/service_housing.jpg",
        authorName: "Housing Services Team",
        readTime: "5 min read",
        createdAt: new Date(Date.now() - 86400000 * 5),
      },
    ];
  }

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-12 pb-20">
        {/* HERO BANNER */}
        <section className="bg-brand-navy text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Healthcare & Staffing Insights Hub
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-2">
                Knowledge, Compliance & Industry Trends
              </h1>
              <p className="text-lg text-brand-canvas/80 max-w-2xl mx-auto">
                Expert articles on CQC safeguarding, emergency shift cover management, and healthcare workforce solutions.
              </p>
            </FadeIn>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
          {/* FEATURED SPOTLIGHT POST */}
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
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-brand-navy flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-mint" /> Recent Articles & Guides
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

          {/* NEED STAFF CTA BANNER */}
          <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl font-black text-white">Need Urgent Shift Cover for Your Facility?</h2>
            <p className="text-base text-brand-canvas/80 max-w-xl mx-auto">
              Our Luton-based 24/7 rapid deployment team provides vetted nurses, care assistants, and housing support staff within 60 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-staff"
                className="px-6 py-3 rounded-2xl bg-brand-mint text-brand-navy font-bold text-sm hover:bg-brand-mint/90 transition-all shadow-lg shadow-brand-mint/20"
              >
                Request Staff Now
              </Link>
              <Link
                href="tel:07565805795"
                className="px-6 py-3 rounded-2xl bg-white/10 border border-brand-mint/30 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                Call 24/7 Hotline: 07565 805795
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
