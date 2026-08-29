import * as React from "react";
import { Text, Section, Heading } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface CandidateApplicationConfirmationProps {
  fullName?: string;
  interestedRoles?: string[];
  availability?: string;
  hasValidDbs?: boolean;
}

export const CandidateApplicationConfirmation = ({
  fullName = "Sarah Jenkins",
  interestedRoles = ["Registered Nurse", "1:1 Support Worker"],
  availability = "Full-Time",
  hasValidDbs = true,
}: CandidateApplicationConfirmationProps) => {
  return (
    <EmailLayout previewText={`Application Received - Welcome to New Era Support Ltd`}>
      <Heading style={heading}>Candidate Registration Received</Heading>

      <Text style={paragraph}>
        Dear <strong>{fullName}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for submitting your application to join the team at <strong>New Era Support Ltd</strong>! We are excited about the prospect of working together.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>Your Application Summary</Text>
        <Text style={cardItem}>
          <strong>Applicant Name:</strong> {fullName}
        </Text>
        <Text style={cardItem}>
          <strong>Target Role(s):</strong> {interestedRoles.join(", ")}
        </Text>
        <Text style={cardItem}>
          <strong>Availability:</strong> {availability}
        </Text>
        <Text style={cardItem}>
          <strong>Enhanced DBS Status:</strong> {hasValidDbs ? "Verified / Update Service" : "Pending Verification"}
        </Text>
      </Section>

      <Text style={paragraph}>
        <strong>What Happens Next?</strong>
      </Text>

      <Section style={stepsBox}>
        <Text style={stepItem}>
          1. <strong>Compliance Review:</strong> Our recruitment team will review your CV and vetting declarations.
        </Text>
        <Text style={stepItem}>
          2. <strong>Document Verification:</strong> A Admin will contact you to verify original DBS certificates and UK Right to Work documentation.
        </Text>
        <Text style={stepItem}>
          3. <strong>Orientation & Placements:</strong> Once verified, you will receive shift bookings matching your availability and preferences.
        </Text>
      </Section>

      <Text style={paragraph}>
        If you have any questions regarding your application status, feel free to reply directly to this email or call our compliance team at <strong>07565 805795</strong>.
      </Text>
    </EmailLayout>
  );
};

export default CandidateApplicationConfirmation;

// STYLES
const heading = {
  color: "#0A192F",
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 16px 0",
};

const paragraph = {
  color: "#334155",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 16px 0",
};

const card = {
  backgroundColor: "#f8fafc",
  padding: "18px 20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  margin: "20px 0",
};

const cardTitle = {
  color: "#0A192F",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 12px 0",
};

const cardItem = {
  color: "#475569",
  fontSize: "13px",
  margin: "4px 0",
};

const stepsBox = {
  backgroundColor: "#f1f5f9",
  padding: "16px 18px",
  borderRadius: "10px",
  margin: "12px 0 20px 0",
};

const stepItem = {
  color: "#334155",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "6px 0",
};
