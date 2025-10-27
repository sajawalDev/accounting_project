import AuditAndComplianceClient from "./AuditAndComplianceClient";

export const metadata = {
  title: "Audit & Compliance Services | HAK Financials",
  description:
    "Ensure transparency, accuracy, and compliance with HAK Financials' expert audit and regulatory services. Build investor trust and stay compliant with SECP, FBR, and IFRS standards.",
  keywords:
    "audit services, compliance, accounting audit, SECP compliance, FBR audit, financial audit Pakistan, regulatory compliance, HAK Financials",
  openGraph: {
    title: "Audit & Compliance Services | HAK Financials",
    description:
      "Protect your business with precise, transparent, and compliant audit services from HAK Financials.",
    url: "https://hakfinancials.com/audit-and-compliance",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/services/auditimg1.png",
        width: 1200,
        height: 630,
        alt: "Audit & Compliance - HAK Financials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit & Compliance Services | HAK Financials",
    description:
      "Transparent, trusted, and compliant audit solutions for your business by HAK Financials.",
    images: ["/assets/services/auditimg1.png"],
  },
};

export default function Page() {
  return <AuditAndComplianceClient />;
}
