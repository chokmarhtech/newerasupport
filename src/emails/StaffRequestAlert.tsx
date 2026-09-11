import React from "react";
import { Heading, Text, Hr, Link, Section } from "@react-email/components";
import EmailLayout from "./components/EmailLayout";

interface StaffRequestAlertProps {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  requiredRoles: string[];
  shiftUrgency?: string;
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
    <EmailLayout previewText={`New Staff Request from ${organizationName}`}>
      <Heading style={heading}>Client Staffing Request Alert</Heading>
      <Text style={subheading}>
        An urgent client staffing request has been logged via the corporate web portal.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>Organization Information</Text>
        <Text style={itemText}><strong>Organization Name:</strong> {organizationName}</Text>
        <Text style={itemText}><strong>Contact Person:</strong> {contactName}</Text>
        <Text style={itemText}>
          <strong>Email Address:</strong>{" "}
          <Link href={`mailto:${email}`} style={link}>{email}</Link>
        </Text>
        <Text style={itemText}><strong>Phone Number:</strong> {phone}</Text>
        <Text style={itemText}><strong>Location / Facility:</strong> {location}</Text>
      </Section>

      <Section style={card}>
        <Text style={cardTitle}>Request Specifications</Text>
        <Text style={itemText}><strong>Required Role(s):</strong> {requiredRoles.join(", ")}</Text>
        <Text style={itemText}>
          <strong>Shift Urgency:</strong>{" "}
          <span style={shiftUrgency === "Immediate" ? urgentPill : normalPill}>
            {shiftUrgency}
          </span>
        </Text>
      </Section>

      {notes && (
        <Section style={card}>
          <Text style={cardTitle}>Additional Rota / Facility Notes</Text>
          <Text style={notesText}>"{notes}"</Text>
        </Section>
      )}

      <Hr style={hr} />
      <Text style={footerNote}>
        This is an automated alert sent from the New Era Support Ltd Corporate Web Portal. Log into your Admin Portal to review or assign personnel.
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

const notesText = {
  color: "#334155",
  fontSize: "13px",
  fontStyle: "italic",
  backgroundColor: "#ffffff",
  padding: "12px",
  borderRadius: "8px",
  borderLeft: "3px solid #0A192F",
  margin: "4px 0",
  lineHeight: "20px",
};

const link = {
  color: "#0A192F",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cbd5e1",
  margin: "20px 0 12px 0",
};

const urgentPill = {
  backgroundColor: "#fee2e2",
  color: "#dc2626",
  padding: "3px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: "bold",
  display: "inline-block",
};

const normalPill = {
  backgroundColor: "#e0f2fe",
  color: "#0284c7",
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
