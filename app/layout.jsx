// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BootstrapJS from "../src/components/BootstrapJs"; // client-only JS loader
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css"; // optional global CSS

// ✅ Import Google Fonts via next/font
import { Poppins, Inter, Montserrat } from "next/font/google";

// Define font families for different sections
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

// Metadata
export const metadata = {
  title: "HKFinance – Accounting & Tax Experts",
  description: "Professional accounting and finance services for your business.",
  icons: {
    icon: "/favicon.png",
  },
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body>
        {/* Client-only scripts */}
        <BootstrapJS />

        {/* Navbar at top */}
        <Navbar />

        {/* Main page content */}
        {children}

        {/* Footer at bottom */}
        <Footer />
      </body>
    </html>
  );
}
