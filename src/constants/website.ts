export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Work For Us", href: "/work-for-us" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Healthcare Blog & Insights", href: "/blog" },
  { label: "Work For Us (Candidates)", href: "/work-for-us" },
  { label: "Request Staff (Clients)", href: "/request-staff" },
  { label: "Contact Us", href: "/contact" },
];

export const LEGAL_NAV_ITEMS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Modern Slavery Statement", href: "/slavery-statement" },
  { label: "Terms of Service", href: "/terms" },
];

export const COMPANY_CONTACT = {
  phone: "07950 850970",
  phoneRaw: "07950850970",
  telLink: "tel:07950850970",
  email: "info@newerasupport.co.uk",
  emailLink: "mailto:info@newerasupport.co.uk",
  address: {
    name: "New Era Support Ltd",
    line1: "Flat 10 The Compasses, 11 Farley Hill",
    line2: "Luton, Bedfordshire",
    short: "Luton, Bedfordshire • UK-Wide",
  },
};
