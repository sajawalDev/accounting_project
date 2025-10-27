// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BootstrapJS from "../src/components/BootstrapJs";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css"; 

import { Poppins, Inter, Montserrat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// app/layout.js
export const metadata = {
  title: "HakFinancials – Accounting & Tax Services for Businesses",
  description:
    "HakFinancials provides expert accounting, bookkeeping, and tax solutions for startups and small businesses. Grow confidently with professional financial management.",
  keywords: [
    "accounting services",
    "bookkeeping",
    "tax filing",
    "financial consulting",
    "Pakistan accounting",
    "HakFinancials",
  ],
  authors: [{ name: "HakFinancials Team" }],
  openGraph: {
    title: "HakFinancials – Accounting & Tax Services",
    description:
      "Professional accounting and tax services for startups and small businesses in Pakistan.",
    url: "https://hakfinancials.com",
    siteName: "HakFinancials",
    images: [
      {
        url: "https://hakfinancials.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "HakFinancials Office",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  alternates: {
    canonical: "https://hakfinancials.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body>
        <BootstrapJS />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
