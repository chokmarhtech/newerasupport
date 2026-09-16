import * as React from "react";
import { Text, Heading, Link, Section } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";

interface NewsletterWelcomeEmailProps {
  email: string;
}

export const NewsletterWelcomeEmail = ({
  email = "subscriber@example.com",
}: NewsletterWelcomeEmailProps) => {
  return (
    <EmailLayout previewText="Welcome to New Era Healthcare & CQC Insights">
      <Heading style={heading}>Welcome to New Era Support Insights!</Heading>

      <Text style={paragraph}>
        Thank you for subscribing to our newsletter!
      </Text>

      <Text style={paragraph}>
        You are now on our priority list to receive expert healthcare workforce guides, CQC safeguarding updates, and supported housing industry trends directly to your inbox.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>What You Can Expect:</Text>
        <Text style={listText}>
          • <strong>CQC Safeguarding Audits:</strong> Up-to-date compliance checklists and regulatory guidance.<br />
          • <strong>Staffing Strategies:</strong> Operational tips to manage rota surges and emergency shift cover.<br />
          • <strong>Housing & Community Care:</strong> Best practices in independent living and mental health support.<br />
          • <strong>Industry Insights:</strong> Exclusive healthcare workforce reports for Luton, Bedfordshire, and the UK.
        </Text>
      </Section>

      <Text style={paragraph}>
        Need urgent staffing cover for your facility right now? Visit our web portal at{" "}
        <Link href="https://newerasupport.co.uk/request-staff" style={link}>
          newerasupport.co.uk/request-staff
        </Link>{" "}
        or call our 24/7 hotline at <strong>07950 850970</strong>.
      </Text>

      <Text style={signoff}>
        Warm regards,
        <br />
        <strong>The New Era Editorial & Care Team</strong>
        <br />
        New Era Support Ltd
      </Text>
    </EmailLayout>
  );
};

export default NewsletterWelcomeEmail;

const heading = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#0A192F",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#334155",
  marginBottom: "14px",
};

const card = {
  backgroundColor: "#f8fafc",
  padding: "18px 20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  margin: "20px 0",
};

const cardTitle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#0A192F",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "10px",
};

const listText = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#475569",
  margin: "0",
};

const link = {
  color: "#0A192F",
  textDecoration: "underline",
};

const signoff = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#0A192F",
  marginTop: "20px",
};
