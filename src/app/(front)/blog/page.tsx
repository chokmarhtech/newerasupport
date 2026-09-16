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
