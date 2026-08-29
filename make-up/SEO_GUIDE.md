# 🔍 New Era Support Ltd - Complete SEO & Google Indexing Guide

This guide documents the complete Search Engine Optimization (SEO) setup, Google Search Console configuration, and step-by-step verification methods to confirm when your website is indexed on Google.

---

## 📌 Table of Contents
1. [Codebase Technical SEO Setup](#1-codebase-technical-seo-setup)
2. [Google Search Console Setup & Verification](#2-google-search-console-setup--verification)
3. [How to Check When Your Site is Indexed (24–48 Hours)](#3-how-to-check-when-your-site-is-indexed-2448-hours)
4. [Ongoing SEO Best Practices](#4-ongoing-seo-best-practices)

---

## 1. Codebase Technical SEO Setup

Your Next.js App Router project is configured with full technical SEO best practices:

### A. Dynamic Sitemap (`/sitemap.xml`)
- **File Location:** [`src/app/sitemap.ts`](file:///c:/Users/Godspower%20Similoluwa/Documents/GitHub/newerasupport/src/app/sitemap.ts)
- **Live URL:** `https://www.newerasupport.co.uk/sitemap.xml`
- **Purpose:** Automatically lists all public pages (`/`, `/about`, `/services`, `/contact`, `/work-for-us`, `/request-staff`) along with priority scores and update frequencies so Googlebot can discover all pages in one read.

### B. Search Engine Crawler Directives (`/robots.txt`)
- **File Location:** [`src/app/robots.ts`](file:///c:/Users/Godspower%20Similoluwa/Documents/GitHub/newerasupport/src/app/robots.ts)
- **Live URL:** `https://www.newerasupport.co.uk/robots.txt`
- **Purpose:** Gives search engine crawlers (Googlebot, Bingbot) explicit permission to index all public pages while protecting private `/admin/` and `/api/` endpoints.

### C. JSON-LD Structured Data Schema
- **File Location:** [`src/app/layout.tsx`](file:///c:/Users/Godspower%20Similoluwa/Documents/GitHub/newerasupport/src/app/layout.tsx)
- **Schema Types:** `LocalBusiness`, `EmploymentAgency`, `MedicalOrganization`
- **Details Included:**
  - **Business Name:** `New Era Support Ltd`
  - **Phone:** `07565 805795`
  - **Address:** `Flat 10 The Compasses, 11 Farley Hill, Luton, Bedfordshire`
  - **Operating Hours:** 24/7 Rapid Shift Cover
  - **Geo-Coordinates:** Luton, UK (`51.8787`, `-0.4200`)
  - **Services:** Healthcare Staffing, Registered Nurses, Care Assistants, Housing Support, Hospitality & Catering Cover.

---

## 2. Google Search Console Setup & Verification

Google Search Console is configured and active for `https://www.newerasupport.co.uk/`:

1. **Property Created:** `https://www.newerasupport.co.uk/`
2. **Ownership Verification:** Status is `✔ You are a verified owner`.
3. **robots.txt Validation:** Status is `Valid`.
4. **Sitemap Submission:** `/sitemap.xml` submitted with status **`Success`** and **`6 Discovered Pages`**.

---

## 3. How to Check When Your Site is Indexed (24–48 Hours)

Google takes 24 to 48 hours to process new sitemaps and index new domains. Use the following 4 methods to verify when it is ready:

### 1️⃣ Method 1: The Google Search Command (Quickest Test)
Open Google Search and type:
```text
site:newerasupport.co.uk
```
> **What it means when ready:** Google will display a list of all 6 indexed pages (`Home`, `About Us`, `Our Services`, `Contact Us`, `Work For Us`, `Request Staff`).

### 2️⃣ Method 2: Check the "Pages" Tab in Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Click **Pages** under the *Indexing* section in the left sidebar.
3. Check the **Indexed** count box.
> **What it means when ready:** The count will change from `0` to **`6`** in green.

### 3️⃣ Method 3: Use the "URL Inspection" Tool
1. In the top search bar of Google Search Console, type: `https://www.newerasupport.co.uk/`
2. Press **Enter**.
> **What it means when ready:** The card will show a green checkmark saying **"URL is on Google"**.

### 4️⃣ Method 4: Business Brand Search
Type into Google Search:
```text
"New Era Support Ltd" Luton
```
> **What it means when ready:** Your website appears as the top search result with title, description, and phone number snippet.

---

## 4. Ongoing SEO Best Practices

To maintain high rankings on Google Search:
1. **Publish Blog Articles:** Regularly add healthcare staffing guides, CQC compliance tips, and agency news to build domain authority.
2. **Google Business Profile:** Claim and link a free Google Business Profile for your Luton office.
3. **Core Web Vitals:** Keep page load times under 1.5 seconds (maintained via Next.js App Router).
