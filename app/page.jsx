"use client";

import Banner from "../src/components/Sections/Banner";
import Trust from "../src/components/Sections/Trust";
import HowItWorks from "../src/components/Sections/HowItWorks";
import Expertise from "../src/components/Sections/Expertise";
import AppsAndAutomation from "../src/components/Sections/AppsAndAutomation";
import OurAccountants from "../src/components/Sections/OurAccountants";
import Cca from "../src/components/Sections/Cca";
import DataSecurity from "../src/components/Sections/DataSecurity";
import Faq from "../src/components/Sections/Faq";
import Testimonials from "../src/components/Sections/Testimonials";

// export const metadata = {
//   title: "HKFinance — Professional Accounting & Bookkeeping Services",
//   description:
//     "Reliable bookkeeping, audit, tax, and financial reporting services by HKFinance — empowering your business growth.",
//   keywords: [
//     "HKFinance",
//     "bookkeeping",
//     "accounting",
//     "audit",
//     "tax services",
//     "financial analysis",
//   ],
//   openGraph: {
//     title: "HKFinance — Expert Accounting & Bookkeeping",
//     description:
//       "Empowering businesses with certified financial services and expert accountants.",
//     url: "https://hkfinance.com",
//     siteName: "HKFinance",
//     images: [
//       {
//         url: "/assets/homebanner2.png",
//         width: 1200,
//         height: 630,
//         alt: "HKFinance banner",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

export default function Home() {
  return (
    <>
      <Banner />
      <Trust />
      <HowItWorks />
      <Expertise />
      <AppsAndAutomation />
      <OurAccountants />
      <Cca />
      <DataSecurity />
      <Faq />
      <Testimonials />
    </>
  );
}
