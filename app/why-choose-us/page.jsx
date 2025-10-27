import WhyChooseUs from "./WhyChooseUsClient";

export const metadata = {
  title: "Why Choose HAK Financials | Affordable Accounting & Bookkeeping Experts",
  description:
    "Discover why businesses and startups choose HAK Financials for accounting, bookkeeping, and automation services. Certified experts, secure systems, and cost-efficient solutions.",
  keywords:
    "why choose HAK Financials, accounting outsourcing, bookkeeping, affordable accountants, financial automation, virtual bookkeeping, accounting firm Pakistan, small business accounting",
  alternates: {
    canonical: "https://hakfinancials.com/why-choose-us",
  },
  openGraph: {
    title: "Why Choose HAK Financials | Trusted Accounting & Bookkeeping Experts",
    description:
      "Compare HAK Financials to in-house hiring — affordable, secure, and tech-driven accounting solutions for modern businesses.",
    url: "https://hakfinancials.com/why-choose-us",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/og-banner.jpg", // update path if needed
        width: 1200,
        height: 630,
        alt: "HAK Financials Accounting Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose HAK Financials | Affordable Accounting & Automation",
    description:
      "Learn how HAK Financials helps you save time, cut costs, and stay compliant with expert accounting support.",
    images: ["/assets/og-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WhyChooseUsPage() {
  return <WhyChooseUs />;
}
