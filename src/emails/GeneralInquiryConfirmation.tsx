import * as React from "react";
import { Text, Section, Heading } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

interface GeneralInquiryConfirmationProps {
  fullName?: string;
  subject?: string;
  message?: string;
}

export const GeneralInquiryConfirmation = ({
  fullName = "Robert Taylor",
  subject = "Staffing Information Request",
  message = "Hello, I would like to inquire about your staffing coverage rates for residential care homes in Luton.",
}: GeneralInquiryConfirmationProps) => {
  return (
    <EmailLayout previewText={`Thank you for contacting New Era Support Ltd`}>
      <Heading style={heading}>Message Received</Heading>

      <Text style={paragraph}>
        Dear <strong>{fullName}</strong>,
      </Text>

      <Text style={paragraph}>
        Thank you for contacting <strong>New Era Support Ltd</strong>. We have received your inquiry and a member of our support team will reply to you shortly.
      </Text>

      <Section style={card}>
        <Text style={cardTitle}>Copy of Your Message</Text>
        {subject && (
          <Text style={cardItem}>
            <strong>Subject / Topic:</strong> {subject}
          </Text>
        )}
        <Text style={messageQuote}>"{message}"</Text>
      </Section>

      <Text style={paragraph}>
        If your request is urgent or requires immediate shift cover, please call our 24/7 Rapid Deployment Line directly at <strong>07565 805795</strong>.
      </Text>
    </EmailLayout>
  );
};

export default GeneralInquiryConfirmation;

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
  margin: "4px 0 8px 0",
};

const messageQuote = {
  color: "#334155",
  fontSize: "13px",
  fontStyle: "italic",
  backgroundColor: "#ffffff",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  margin: "6px 0 0 0",
};
