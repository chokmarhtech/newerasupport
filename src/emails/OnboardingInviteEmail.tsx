import * as React from "react";
import { Text, Heading, Link, Section } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";

interface OnboardingInviteEmailProps {
  candidateName: string;
  onboardingUrl: string;
}

export const OnboardingInviteEmail = ({
  candidateName = "Candidate",
  onboardingUrl = "https://newerasupport.co.uk/onboarding/demo-token",
}: OnboardingInviteEmailProps) => {
  return (
    <EmailLayout previewText="Complete Your Full Onboarding Application - New Era Support Ltd">
      <Heading style={heading}>Complete Your Onboarding Application</Heading>

      <Text style={paragraph}>
        Dear <strong>{candidateName}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for speaking with our recruitment team at <strong>New Era Support Ltd</strong>! Following our initial telephone screening, we are delighted to invite you to complete your full onboarding application.
      </Text>

      <Text style={paragraph}>
        To proceed with your application and join our healthcare, housing, and support worker team across Luton & Bedfordshire, please complete our 3-step onboarding form and upload your compliance documents.
      </Text>

      {/* CALL TO ACTION BUTTON */}
      <Section style={btnSection}>
        <Link href={onboardingUrl} style={button}>
          Complete Onboarding Form →
        </Link>
      </Section>

      <Section style={card}>
        <Text style={sectionHeader}>Mandatory Compliance Documents Required:</Text>
        <Text style={listText}>
          • Updated Curriculum Vitae (CV)<br />
          • Proof of Identity (Passport or National ID)<br />
          • Photo ID Card<br />
          • Proof of Address (Utility bill or bank statement within 3 months)<br />
          • Enhanced DBS Certificate / Status Update Check<br />
          • Relevant Healthcare Qualifications & Training Certificates
        </Text>
      </Section>

      <Text style={noteText}>
        <em>🔒 Note: This secure onboarding link is unique to your application and will expire in 7 days.</em>
      </Text>

      <Text style={paragraph}>
        If you have any questions or need assistance uploading your documents, please reply directly to this email or call our recruitment team on <strong>07950 850970</strong>.
      </Text>

      <Text style={signoff}>
        Warm regards,
        <br />
        <strong>The Recruitment Team</strong>
        <br />
        New Era Support Ltd
      </Text>
    </EmailLayout>
  );
};

export default OnboardingInviteEmail;

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

const btnSection = {
  textAlign: "center" as const,
  margin: "28px 0",
};

const button = {
  backgroundColor: "#0A192F",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  padding: "14px 28px",
  borderRadius: "12px",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const card = {
  backgroundColor: "#f8fafc",
  padding: "18px 20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  margin: "20px 0",
};

const sectionHeader = {
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

const noteText = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "16px",
};

const signoff = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#0A192F",
  marginTop: "20px",
};
