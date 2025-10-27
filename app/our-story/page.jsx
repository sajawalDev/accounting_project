import OurStory from "./OurStoryClient";

export const metadata = {
  title: "Our Story | HAK Financials – Trusted Accounting Partners Worldwide",
  description:
    "Learn about HAK Financials — our ethos, our global reach, and how we empower firms and businesses with reliable, precise, and scalable accounting services.",
  keywords:
    "our story HAK Financials, accounting firm story, global accounting, outsourced accounting, bookkeeping company, accounting professionals Pakistan, financial collaboration",
  alternates: {
    canonical: "https://hakfinancials.com/our-story",
  },
  openGraph: {
    title: "Our Story | HAK Financials – Delivering Accuracy Through Collaboration",
    description:
      "Discover how HAK Financials delivers precision, trust, and global support to firms and mid-market businesses through innovative outsourcing.",
    url: "https://hakfinancials.com/our-story",
    siteName: "HAK Financials",
    images: [
      {
        url: "/assets/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "HAK Financials Team Collaboration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | HAK Financials – Trusted Accounting Partners",
    description:
      "At HAK Financials, we combine precision and reliability to help businesses thrive globally. Learn about our journey and commitment.",
    images: ["/assets/og-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OurStoryPage() {
  return <OurStory />;
}
