import Bookkeeping from "./BookkeepingClient";

export const metadata = {
  title: "Bookkeeping & Accounting Services | HAK Financials",
  description:
    "Streamline your financial operations with HAK Financials’ professional bookkeeping and accounting services. Accurate records, compliance, and peace of mind guaranteed.",
  keywords:
    "bookkeeping services, accounting outsourcing, virtual accountant, small business bookkeeping, accounting firms, online bookkeeping Pakistan, outsourced accounting HAK Financials",
  alternates: {
    canonical: "https://hakfinancials.com/services/bookkeeping-and-accounting",
  },
  openGraph: {
    title: "Bookkeeping & Accounting | HAK Financials",
    description:
      "Simplify your finances with HAK Financials. Our expert accountants deliver accuracy, transparency, and efficiency for firms and businesses worldwide.",
    url: "https://hakfinancials.com/services/bookkeeping-and-accounting",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/og-bookkeeping.jpg",
        width: 1200,
        height: 630,
        alt: "Bookkeeping and Accounting Services - HAK Financials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookkeeping & Accounting Services | HAK Financials",
    description:
      "Expert bookkeeping and accounting solutions tailored for businesses of all sizes. Partner with HAK Financials today.",
    images: ["/assets/og-bookkeeping.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookkeepingPage() {
  return <Bookkeeping />;
}
