import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

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
    Html && (
      <Html>
        <Head />
        <Preview>New Candidate Application: {fullName}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={header}>
              <Heading style={headerTitle}>NEW ERA SUPPORT LTD</Heading>
              <Text style={headerSub}>Candidate Application Alert</Text>
            </Section>

            <Section style={content}>
              <Heading style={sectionTitle}>Candidate Contact Information</Heading>
              <Text style={itemText}><strong>Full Name:</strong> {fullName}</Text>
              <Text style={itemText}><strong>Email Address:</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link></Text>
              <Text style={itemText}><strong>Phone Number:</strong> {phone}</Text>
              <Text style={itemText}><strong>Preferred Availability:</strong> {availability}</Text>

              <Hr style={hr} />

              <Heading style={sectionTitle}>Roles of Interest</Heading>
              <Text style={itemText}>{interestedRoles.join(", ")}</Text>

              <Hr style={hr} />

              <Heading style={sectionTitle}>Vetting & Compliance Check</Heading>
              <Text style={itemText}>
                <strong>Enhanced DBS Check Status:</strong>{" "}
                <span style={hasValidDbs ? passPill : failPill}>
                  {hasValidDbs ? "Vetted / Valid DBS" : "Needs DBS Check"}
                </span>
              </Text>
              <Text style={itemText}>
                <strong>UK Right-To-Work Confirmed:</strong>{" "}
                <span style={hasRightToWork ? passPill : failPill}>
                  {hasRightToWork ? "Confirmed" : "Awaiting Proof"}
                </span>
              </Text>

              <Hr style={hr} />

              <Heading style={sectionTitle}>Attached Documents</Heading>
              <Text style={itemText}>
                <strong>Resume / CV:</strong>{" "}
                <Link href={resumeFileUrl} style={button}>
                  View / Download Resume
                </Link>
              </Text>

              <Hr style={hr} />
              <Text style={footerText}>
                This is an automated candidate alert sent from the New Era Support Ltd Corporate Web Portal. Please check the admin dashboard or reply directly to the candidate&apos;s email above.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    )
  );
}

// --- Email Styles ---
const main = {
  backgroundColor: "#F7F7F7",
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "16px",
  margin: "40px auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#1E1958",
  padding: "32px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "2px",
};

const headerSub = {
  color: "#84E5A4",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "8px 0 0 0",
};

const content = {
  padding: "40px 32px",
};

const sectionTitle = {
  color: "#1E1958",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "12px",
};

const itemText = {
  color: "#4A5E7A",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "8px 0",
};

const link = {
  color: "#1E1958",
  textDecoration: "underline",
};

const button = {
  backgroundColor: "#1E1958",
  borderRadius: "4px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "13px",
  fontWeight: "bold",
  lineHeight: "1.6",
  padding: "10px 16px",
  textDecoration: "none",
  textAlign: "center" as const,
  marginTop: "6px",
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "24px 0",
};

const passPill = {
  backgroundColor: "#D1FAE5",
  color: "#065F46",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-block",
};

const failPill = {
  backgroundColor: "#FEE2E2",
  color: "#991B1B",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-block",
};

const footerText = {
  color: "#4A5E7A",
  fontSize: "11px",
  lineHeight: "1.5",
  textAlign: "center" as const,
  marginTop: "24px",
  opacity: "0.7",
};
