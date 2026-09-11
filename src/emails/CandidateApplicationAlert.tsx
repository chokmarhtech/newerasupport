import React from "react";
import { Heading, Text, Hr, Link, Section } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";

interface CandidateApplicationAlertProps {
  fullName: string;
  email: string;
  phone: string;
  interestedRoles: string[];
  hasValidDbs: boolean;
  hasRightToWork: boolean;
  resumeFileUrl: string;
  availability?: string;
}

export default function CandidateApplicationAlert({
  fullName = "John Doe",
  email = "john.doe@example.com",
  phone = "07700 900088",
  interestedRoles = ["Support Worker", "Catering Staff"],
  hasValidDbs = true,
  hasRightToWork = true,
  resumeFileUrl = "https://example.com/resumes/john_doe_resume.pdf",
  availability = "Full-Time",
}: CandidateApplicationAlertProps) {
  return (
    <EmailLayout previewText={`New Candidate Application: ${fullName}`}>
      <Heading style={heading}>Candidate Application Alert</Heading>
      <Text style={subheading}>
        A new candidate application has been received from the web portal.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>Candidate Contact Information</Text>
        <Text style={itemText}><strong>Full Name:</strong> {fullName}</Text>
        <Text style={itemText}>
          <strong>Email Address:</strong>{" "}
          <Link href={`mailto:${email}`} style={link}>{email}</Link>
        </Text>
        <Text style={itemText}><strong>Phone Number:</strong> {phone}</Text>
        <Text style={itemText}><strong>Preferred Availability:</strong> {availability}</Text>
      </Section>

      <Section style={card}>
        <Text style={cardTitle}>Roles of Interest</Text>
        <Text style={itemText}>{interestedRoles.join(", ")}</Text>
      </Section>

      <Section style={card}>
        <Text style={cardTitle}>Vetting & Compliance Check</Text>
        <Text style={itemText}>
          <strong>Enhanced DBS Check:</strong>{" "}
          <span style={hasValidDbs ? passPill : failPill}>
            {hasValidDbs ? "Vetted / Valid DBS" : "Needs DBS Check"}
          </span>
        </Text>
        <Text style={itemText}>
          <strong>UK Right-To-Work:</strong>{" "}
          <span style={hasRightToWork ? passPill : failPill}>
            {hasRightToWork ? "Confirmed" : "Awaiting Proof"}
          </span>
        </Text>
      </Section>

      <Section style={card}>
        <Text style={cardTitle}>Attached Documents</Text>
        <Text style={itemText}>
          <strong>Resume / CV:</strong>{" "}
          <Link href={resumeFileUrl} style={button}>
            View / Download Resume
          </Link>
        </Text>
      </Section>

      <Hr style={hr} />
      <Text style={footerNote}>
        This is an automated candidate alert sent from the New Era Support Ltd Corporate Web Portal. Log into your Admin Portal to review or send full onboarding documents.
      </Text>
    </EmailLayout>
  );
}

// --- Email Styles ---
const heading = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#0A192F",
  marginBottom: "4px",
};

const subheading = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "20px",
};

const card = {
  backgroundColor: "#f8fafc",
  padding: "16px 20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  marginBottom: "16px",
};

const cardTitle = {
  color: "#0A192F",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 10px 0",
};

const itemText = {
  color: "#334155",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "6px 0",
};

const link = {
  color: "#0A192F",
  textDecoration: "underline",
};

const button = {
  backgroundColor: "#0A192F",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "8px 14px",
  textDecoration: "none",
  marginLeft: "6px",
};

const hr = {
  borderColor: "#cbd5e1",
  margin: "20px 0 12px 0",
};

const passPill = {
  backgroundColor: "#d1fae5",
  color: "#065f46",
  padding: "3px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: "bold",
  display: "inline-block",
};

const failPill = {
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  padding: "3px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: "bold",
  display: "inline-block",
};

const footerNote = {
  color: "#64748b",
  fontSize: "11px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
