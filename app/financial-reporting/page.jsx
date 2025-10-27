import FinancialReporting from "./FinancialReportingClient";

export const metadata = {
  title: "Financial Reporting & Analysis Services | HAK Financials",
  description:
    "Unlock strategic insights with HAK Financials’ financial reporting and analysis services. Transform data into decisions that drive profitability and growth.",
  keywords:
    "financial reporting, financial analysis, business intelligence, outsourced accounting, IFRS reporting, GAAP compliance, financial statements, performance tracking, management reports, data analytics accounting",
  alternates: {
    canonical:
      "https://hakfinancials.com/services/financial-reporting-and-analysis",
  },
  openGraph: {
    title: "Financial Reporting & Analysis | HAK Financials",
    description:
      "Turn your financial data into business intelligence with HAK Financials’ expert analysis and reporting services. Smarter insights. Better performance.",
    url: "https://hakfinancials.com/services/financial-reporting-and-analysis",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/og-financial-reporting.jpg", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Financial Reporting and Analysis - HAK Financials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Reporting & Analysis Services | HAK Financials",
    description:
      "Comprehensive financial reports and strategic insights to help your business thrive. Partner with HAK Financials today.",
    images: ["/assets/og-financial-reporting.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FinancialReportingPage() {
  return <FinancialReporting />;
}
