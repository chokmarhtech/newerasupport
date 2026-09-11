import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding Database...");

  // 1. SEED SUPERADMIN USER
  const superAdminEmail = "gpsimi01@gmail.com";
  const superAdminPassword = "Godspower19#";

  const existingUser = await prisma.adminUser.findUnique({
    where: { email: superAdminEmail },
  });

  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

  if (!existingUser) {
    const superAdmin = await prisma.adminUser.create({
      data: {
        name: "Godspower Similoluwa",
        email: superAdminEmail,
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log("SuperAdmin account created successfully:", superAdmin.email);
  } else {
    await prisma.adminUser.update({
      where: { email: superAdminEmail },
      data: {
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log("SuperAdmin account updated successfully:", superAdminEmail);
  }

  // 2. SEED BLOG CATEGORIES
  console.log("Seeding blog categories...");
  const categories = [
    { name: "Healthcare Insights", slug: "healthcare-insights" },
    { name: "Safeguarding Updates", slug: "safeguarding-updates" },
    { name: "Staffing Advice", slug: "staffing-advice" },
    { name: "Housing & Community", slug: "housing-community" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { name: cat.name },
      update: { slug: cat.slug },
      create: { name: cat.name, slug: cat.slug },
    });
  }
  console.log("Blog categories seeded successfully!");

  // 3. RE-SEED BLOG POSTS (Wipe old & seed fresh 4 UK articles)
  console.log("Clearing existing blog posts and seeding 4 high-value UK healthcare articles...");
  await prisma.blogPost.deleteMany();

  await prisma.blogPost.createMany({
    data: [
      {
        slug: "effective-cqc-safeguarding-strategies-for-care-homes",
        title: "Effective CQC Safeguarding Strategies for UK Care Homes in 2026",
        category: "Safeguarding Updates",
        excerpt:
          "A practical operational blueprint for care home managers to ensure 100% CQC safeguarding audit readiness while maintaining rapid emergency shift cover.",
        content: `
          <h2>Understanding CQC Safeguarding Expectations in 2026</h2>
          <p>Care Quality Commission (CQC) inspections place rigorous emphasis on staffing compliance, continuous staff vetting, and rapid incident escalation protocols. In 2026, registered care facilities across Bedfordshire, Luton, and the wider UK must demonstrate robust staffing agency partner vetting.</p>
          <blockquote>"Safeguarding is not merely a compliance checklist—it is the foundation of person-centered care and resident dignity."</blockquote>
          <h3>3 Key Pillars of Safeguarding Audit Readiness:</h3>
          <ul>
            <li><strong>Enhanced DBS Verification:</strong> Ensure all active nursing and care assistant personnel have live DBS Update Service checks verified prior to placement.</li>
            <li><strong>Right to Work & Identity Audits:</strong> Keep digital copies of UK Right to Work documentation readily accessible for inspector review.</li>
            <li><strong>Continuous Training Updates:</strong> Maintain current certification in Moving & Handling, Safeguarding Vulnerable Adults (SOVA), and Medication Administration.</li>
          </ul>
          <h3>Rapid Shift Cover & Compliance Integration</h3>
          <p>When unexpected staff absence threatens operational nurse-to-resident ratios, care managers must deploy pre-vetted agency personnel within 60 minutes to preserve continuity of care and meet regulatory standards.</p>
        `,
        coverImage: "/images/blog/cqc-safeguarding.jpg",
        authorName: "New Era Compliance Team",
        readTime: "6 min read",
        status: "PUBLISHED",
      },
      {
        slug: "managing-urgent-shift-shortages-in-residential-care",
        title: "Managing Urgent Shift Shortages in Residential & NHS Care",
        category: "Staffing Advice",
        excerpt:
          "Operational strategies for healthcare managers facing last-minute shift cancellations to ensure zero disruption in resident safety and high service standards.",
        content: `
          <h2>Navigating Emergency Rota Gaps</h2>
          <p>Unplanned staff sickness or sudden occupancy spikes can stretch residential care rotas to critical limits. Partnering with a 24/7 rapid deployment agency ensures seamless shift fill rates without compromising care standards.</p>
          <h3>Best Practices for Rapid Shift Cover:</h3>
          <ul>
            <li><strong>Maintain a 24/7 Hotline Connection:</strong> Have a direct line to recruitment consultants capable of dispatching qualified staff within 1 hour.</li>
            <li><strong>Clear Shift Handovers:</strong> Provide clear, pre-populated shift handovers for incoming temporary nurses and support workers to maintain routine continuity.</li>
            <li><strong>Skill Matching:</strong> Match specific resident care needs with specialized healthcare assistants trained in dementia care or end-of-life support.</li>
          </ul>
          <p>By establishing trusted agency relationships, care home operators in Luton and London maintain stability even during unpredictable staffing crunches.</p>
        `,
        coverImage: "/images/blog/emergency-staffing.jpg",
        authorName: "Workforce Operations Team",
        readTime: "5 min read",
        status: "PUBLISHED",
      },
      {
        slug: "housing-support-worker-best-practices",
        title: "The Evolving Role of Supported Housing Officers in Community Care",
        category: "Housing & Community",
        excerpt:
          "Exploring how trained housing support workers empower vulnerable individuals to achieve independence and mental wellbeing in supported living environments.",
        content: `
          <h2>Empowering Independence in Supported Housing</h2>
          <p>Supported living facilities require compassionate, skilled personnel who balance risk management with individual empowerment. Our housing support officers provide tailored assistance across Luton and surrounding regions.</p>
          <h3>Core Responsibilities of Modern Housing Support Officers:</h3>
          <ul>
            <li><strong>Tenancy Support & Budgeting:</strong> Assisting residents with utility management, tenancy rights, and personal budgeting skills.</li>
            <li><strong>Mental Health First Aid:</strong> Offering empathetic guidance during times of emotional distress or crisis intervention.</li>
            <li><strong>Multi-Agency Collaboration:</strong> Coordinating closely with social services, healthcare providers, and local councils to ensure holistic care plans.</li>
          </ul>
          <p>Effective supported housing bridging allows service users to build confidence and progress towards full independent living within their communities.</p>
        `,
        coverImage: "/images/blog/supported-housing.jpg",
        authorName: "Housing Services Team",
        readTime: "5 min read",
        status: "PUBLISHED",
      },
      {
        slug: "essential-hca-career-guide-uk",
        title: "Essential Career Guide for Healthcare Assistants (HCAs) in the UK",
        category: "Healthcare Insights",
        excerpt:
          "Step-by-step guidance for aspiring and experienced Healthcare Assistants looking to enhance their skills, gain Care Certificate credentials, and advance into nursing.",
        content: `
          <h2>Building a Rewarding Career in Healthcare Assistance</h2>
          <p>Healthcare Assistants (HCAs) form the backbone of the UK healthcare sector. Whether working in NHS trusts, private hospitals, or community residential homes, dedicated HCAs provide direct care that profoundly impacts patient recovery and quality of life.</p>
          <h3>Key Milestones for HCA Professional Growth:</h3>
          <ul>
            <li><strong>The Care Certificate:</strong> Completing 15 standards of care to demonstrate competence in privacy, dignity, and infection control.</li>
            <li><strong>Specialized Certifications:</strong> Gaining qualifications in Venepuncture, ECG recording, and Complex Behavioral Support.</li>
            <li><strong>Pathway to Nursing:</strong> Utilizing flexible agency work to fund Nursing Apprenticeships or University Degrees while maintaining hands-on experience.</li>
          </ul>
          <p>At New Era Support Solutions, we provide our temporary and permanent HCAs with continuous training opportunities and competitive shift rates to support career advancement.</p>
        `,
        coverImage: "/images/blog/hca-career.jpg",
        authorName: "Clinical Training Team",
        readTime: "7 min read",
        status: "PUBLISHED",
      },
    ],
  });
  console.log("4 high-value UK healthcare blog posts seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
