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

interface StaffRequestAlertProps {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  requiredRoles: string[];
  shiftUrgency: string;
  notes?: string;
}

export default function StaffRequestAlert({
  organizationName = "Care Home Ltd",
  contactName = "Jane Doe",
  email = "jane@example.com",
  phone = "07700 900077",
  location = "London",
  requiredRoles = ["Registered Nurse", "Care Assistant"],
  shiftUrgency = "Immediate",
  notes = "Urgent cover needed for weekend night shifts due to staff sickness.",
}: StaffRequestAlertProps) {
  return (
    <Html>
      <Head />
      <Preview>New Client Staffing Request from {organizationName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>NEW ERA SUPPORT LTD</Heading>
            <Text style={headerSub}>Client Staffing Request Alert</Text>
          </Section>
          
          <Section style={content}>
            <Heading style={sectionTitle}>Organization Information</Heading>
            <Text style={itemText}><strong>Organization Name:</strong> {organizationName}</Text>
            <Text style={itemText}><strong>Contact Name:</strong> {contactName}</Text>
            <Text style={itemText}><strong>Email Address:</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link></Text>
            <Text style={itemText}><strong>Phone Number:</strong> {phone}</Text>
            <Text style={itemText}><strong>Location/Facility:</strong> {location}</Text>
            
            <Hr style={hr} />
            
            <Heading style={sectionTitle}>Request Specifications</Heading>
            <Text style={itemText}><strong>Required Roles:</strong> {requiredRoles.join(", ")}</Text>
            <Text style={itemText}>
              <strong>Shift Urgency: </strong> 
              <span style={shiftUrgency === "Immediate" ? urgentPill : normalPill}>
                {shiftUrgency}
              </span>
            </Text>
            
            {notes && (
              <>
                <Hr style={hr} />
                <Heading style={sectionTitle}>Additional Notes</Heading>
                <Text style={notesText}>"{notes}"</Text>
              </>
            )}
            
            <Hr style={hr} />
            <Text style={footerText}>
              This is an automated alert sent from the New Era Support Ltd Corporate Web Portal. Please check the admin dashboard or reply directly to the contact email above.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
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

const notesText = {
  color: "#4A5E7A",
  fontSize: "14px",
  fontStyle: "italic",
  backgroundColor: "#F7F7F7",
  padding: "16px",
  borderRadius: "8px",
  borderLeft: "4px solid #1E1958",
  margin: "8px 0",
  lineHeight: "1.6",
};

const link = {
  color: "#1E1958",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e0e0e0",
  margin: "24px 0",
};

const urgentPill = {
  backgroundColor: "#FEE2E2",
  color: "#DC2626",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "inline-block",
};

const normalPill = {
  backgroundColor: "#E0F2FE",
  color: "#0284C7",
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
