import TaxServicesClient from "./TaxServicesClient";

export const metadata = {
  title: "Tax Planning, Filing & Compliance Services | HAK Financials",
  description:
    "Simplify your taxes with HAK Financials — from planning and filing to compliance and advisory. We ensure accuracy, compliance with FBR, and maximum savings for your business or personal taxes.",
  keywords:
    "tax services, tax filing Pakistan, FBR compliance, corporate tax, individual tax, tax planning, tax advisor Pakistan, tax compliance, tax audit, HAK Financials",
  openGraph: {
    title: "Tax Planning, Filing & Compliance Services | HAK Financials",
    description:
      "Stay compliant and maximize savings with HAK Financials’ professional tax planning, preparation, and filing services.",
    url: "https://hakfinancials.com/tax-services",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/services/taximg1.png",
        width: 1200,
        height: 630,
        alt: "Tax Services - HAK Financials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Planning, Filing & Compliance | HAK Financials",
    description:
      "Expert tax planning and filing services by HAK Financials. Ensure compliance, save money, and file taxes accurately with our professionals.",
    images: ["/assets/services/taximg1.png"],
  },
};

export default function Page() {
  return <TaxServicesClient />;
}
