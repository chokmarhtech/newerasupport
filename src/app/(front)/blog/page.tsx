import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";
import PublicBlogFilter from "@/components/blog/PublicBlogFilter";
import NewsletterModal from "@/components/blog/NewsletterModal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Healthcare Staffing & CQC Insights Blog | New Era Support Ltd",
  description:
    "Read the latest healthcare staffing insights, CQC safeguarding guides, housing support trends, and agency updates from New Era Support Ltd.",
};

const DEFAULT_FALLBACK_POSTS = [
  {
    id: "fallback-1",
    slug: "effective-cqc-safeguarding-strategies-for-care-homes",
    title: "Effective CQC Safeguarding Strategies for UK Care Homes in 2026",
    category: "Safeguarding Updates",
    excerpt:
      "A practical operational blueprint for care home managers to ensure 100% CQC safeguarding audit readiness while maintaining rapid emergency shift cover.",
    coverImage: "/images/blog/cqc-safeguarding.jpg",
    authorName: "New Era Compliance Team",
    readTime: "6 min read",
    createdAt: new Date(),
  },
  {
    id: "fallback-2",
    slug: "winter-surge-preparation-care-homes-2026",
    title: "Winter Surge Staffing: Managing Capacity Pressures in Residential Care",
    category: "Healthcare Insights",
    excerpt:
      "Actionable strategies for care coordinators and nursing managers to navigate winter respiratory surges, bed capacity spikes, and emergency rota gaps.",
    coverImage: "/images/blog/winter-surge-prep.jpg",
    authorName: "Workforce Operations Team",
    readTime: "5 min read",
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: "fallback-3",
    slug: "managing-urgent-shift-shortages-in-residential-care",
    title: "How Care Managers Can Manage Urgent Shift Shortages in Luton & Bedfordshire",
    category: "Staffing Advice",
    excerpt:
      "Operational strategies for care managers facing last-minute shift cancellations to ensure zero disruption in resident care.",
    coverImage: "/images/blog/emergency-staffing.jpg",
    authorName: "Workforce Operations Team",
    readTime: "4 min read",
    createdAt: new Date(Date.now() - 86400000 * 4),
  },
  {
    id: "fallback-4",
    slug: "supported-housing-pathways-vulnerable-adults",
    title: "Supported Housing Staffing: Fostering Independence in Vulnerable Adults",
    category: "Housing & Community",
    excerpt:
      "A guide for supported living providers on deploying qualified support workers who balance risk management with resident empowerment.",
    coverImage: "/images/blog/supported-housing.jpg",
    authorName: "Housing Services Lead",
    readTime: "5 min read",
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
  {
    id: "fallback-5",
    slug: "starting-a-healthcare-assistant-career-uk",
    title: "Starting a Healthcare Assistant Career in the UK: Qualifications & Pathways",
    category: "Staffing Advice",
    excerpt:
      "Everything aspiring care workers need to know about Care Certificate requirements, mandatory training, and career progression in the care sector.",
    coverImage: "/images/blog/hca-career.jpg",
    authorName: "Recruitment & Onboarding Team",
    readTime: "7 min read",
    createdAt: new Date(Date.now() - 86400000 * 10),
  },
];

const DEFAULT_FALLBACK_CATEGORIES = [
  { id: "cat-1", name: "Healthcare Insights", slug: "healthcare-insights" },
  { id: "cat-2", name: "Safeguarding Updates", slug: "safeguarding-updates" },
  { id: "cat-3", name: "Staffing Advice", slug: "staffing-advice" },
  { id: "cat-4", name: "Housing & Community", slug: "housing-community" },
];

export default async function PublicBlogHubPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("DB fetch failed for blog posts:", err);
  }

  if (!posts || posts.length === 0) {
    posts = DEFAULT_FALLBACK_POSTS;
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

  if (!categories || categories.length === 0) {
    categories = DEFAULT_FALLBACK_CATEGORIES;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* HERO BANNER */}
        <section className="bg-brand-navy text-white py-16 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider">
                 Healthcare & Staffing Insights Hub
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
          {/* SEARCH, CATEGORY FILTER & ARTICLES GRID */}
          <PublicBlogFilter initialPosts={posts} categories={categories} />

          {/* URGENT STAFF CTA BANNER */}
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
                href="tel:07950850970"
                className="px-6 py-3 rounded-2xl bg-white/10 border border-brand-mint/30 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                Call 24/7 Hotline: 07950 850970
              </Link>
            </div>
          </div>
        </div>
      </main>

      <NewsletterModal />

      <Footer />
    </div>
  );
}
