import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

interface EmailLayoutProps {
  previewText: string;
  children: React.ReactNode;
}

export const EmailLayout = ({ previewText, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* BRAND HEADER WITH OFFICIAL LOGO */}
          <Section style={header}>
            <Img
              src="https://newerasupport.co.uk/logos/logo-1.png"
              width="210"
              height="52"
              alt="New Era Support Ltd"
              style={logo}
            />
            <Text style={headerSubtext}>
              Healthcare, Housing & Hospitality Staffing Solutions
            </Text>
          </Section>

          {/* MAIN CONTENT AREA */}
          <Section style={content}>{children}</Section>

          {/* URGENT HELPLINE BANNER */}
          <Section style={helplineBanner}>
            <Text style={helplineTitle}>Need Immediate Shift Cover?</Text>
            <Text style={helplineText}>
              24/7 Admin Hotline:{" "}
              <Link href="tel:07565805795" style={helplineLink}>
                07565 805795
              </Link>
            </Text>
          </Section>

          {/* FOOTER */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              <strong>New Era Support Ltd</strong>
              <br />
              Flat 10 The Compasses, 11 Farley Hill, Luton, Bedfordshire
              <br />
              Email:{" "}
              <Link href="mailto:info@newerasupport.co.uk" style={footerLink}>
                info@newerasupport.co.uk
              </Link>{" "}
              | Tel: 07565 805795
            </Text>
            <Text style={footerSubtext}>
              © {new Date().getFullYear()} New Era Support Ltd. All rights reserved. CQC Aligned & 100% Safeguarding Vetted.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailLayout;

// STYLES
const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 16px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#0A192F",
  padding: "28px 24px",
  borderRadius: "16px 16px 0 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto 8px text-center",
  display: "block",
};

const headerSubtext = {
  color: "#00E699",
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "6px 0 0 0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "36px 28px",
  borderLeft: "1px solid #e2e8f0",
  borderRight: "1px solid #e2e8f0",
};

const helplineBanner = {
  backgroundColor: "#0A192F",
  padding: "20px 24px",
  borderRadius: "0 0 16px 16px",
  textAlign: "center" as const,
};

const helplineTitle = {
  color: "#00E699",
  fontSize: "12px",
  fontWeight: 800,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 4px 0",
};

const helplineText = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  margin: "0",
};

const helplineLink = {
  color: "#00E699",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cbd5e1",
  margin: "24px 0 16px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#475569",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 8px 0",
};

const footerSubtext = {
  color: "#94a3b8",
  fontSize: "11px",
  margin: "0",
};

const footerLink = {
  color: "#0A192F",
  textDecoration: "underline",
};
