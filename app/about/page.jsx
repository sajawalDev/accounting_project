import WhyChooseUs from './WhyChooseUs';
import OurStory from './OurStory';

export const metadata = {
  title: "Why Choose HKFinance | Accounting Outsourcing & Bookkeeping Experts",
  description:
    "Discover why businesses trust HKFinance for affordable, secure, and professional accounting outsourcing. Compare cost efficiency, scalability, and certified expertise.",
  keywords: [
    "HKFinance",
    "accounting outsourcing",
    "virtual accountant",
    "bookkeeping services",
    "affordable accountants",
    "financial management",
    "ISO 27001 certified accounting",
  ],
  openGraph: {
    title: "Why Choose HKFinance | Certified Accounting Outsourcing Partner",
    description:
      "HKFinance offers 60% more affordable, secure, and scalable accounting outsourcing with certified expertise and data protection.",
    url: "https://hkfinance.com/about",
    siteName: "HKFinance",
    images: [
      {
        url: "https://hkfinance.com/images/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Why Choose HKFinance - Trusted Accounting Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://hkfinance.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <WhyChooseUs />
      <OurStory />
    </>
  );
}

