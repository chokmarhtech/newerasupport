import * as React from "react";
import { Text, Section, Heading } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface ClientRequestConfirmationProps {
  organizationName?: string;
  contactName?: string;
  requiredRoles?: string[];
  shiftUrgency?: string;
  location?: string;
}

export const ClientRequestConfirmation = ({
  organizationName = "Holborn Housing Ltd",
  contactName = "Jane Doe",
  requiredRoles = ["Registered Nurse", "Care Assistant"],
  shiftUrgency = "Immediate",
  location = "Luton, Bedfordshire",
}: ClientRequestConfirmationProps) => {
  return (
    <EmailLayout previewText={`Staffing Request Received for ${organizationName} - New Era Support Ltd`}>
      <Heading style={heading}>Request Confirmation</Heading>

      <Text style={paragraph}>
        Dear <strong>{contactName}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for submitting your staffing request for <strong>{organizationName}</strong>. We have received your details and our 24/7 workforce coordination team is processing your requirements.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>Summary of Requested Staffing</Text>
        <Text style={cardItem}>
          <strong>Organization:</strong> {organizationName}
        </Text>
        <Text style={cardItem}>
          <strong>Facility Location:</strong> {location}
        </Text>
        <Text style={cardItem}>
          <strong>Required Role(s):</strong> {requiredRoles.join(", ")}
        </Text>
        <Text style={cardItem}>
          <strong>Shift Urgency:</strong>{" "}
          <span style={urgencyBadge}>{shiftUrgency}</span>
        </Text>
      </Section>

      <Text style={paragraph}>
        {shiftUrgency === "Immediate" ? (
          <span style={urgentNotice}>
            ⚡ <strong>Immediate Dispatch Notice:</strong> Because you requested immediate cover, a senior Admin is actively matching available, vetted personnel for your location right now.
          </span>
        ) : (
          "A dedicated account manager will review your rota dates and contact you shortly to confirm placement details."
        )}
      </Text>

      <Text style={paragraph}>
        If you need to make urgent updates to this shift request, please call our 24/7 Rapid Deployment hotline directly at <strong>07565 805795</strong>.
      </Text>
    </EmailLayout>
  );
};

export default ClientRequestConfirmation;

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

const urgencyBadge = {
  color: "#0A192F",
  backgroundColor: "#00E699",
  padding: "2px 8px",
  borderRadius: "6px",
  fontWeight: "700",
  fontSize: "11px",
};

const urgentNotice = {
  color: "#0A192F",
  backgroundColor: "#fef3c7",
  padding: "12px 14px",
  borderRadius: "8px",
  display: "block",
  fontSize: "13px",
  border: "1px solid #fde68a",
};
