// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import BootstrapJS from "../src/components/BootstrapJs"; // client-only JS loader
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css"; // optional global CSS

export const metadata = {
  title: "HKFinance – Accounting & Tax Experts",
  description: "Professional accounting and finance services for your business.",
  icons: {
    icon: "/favicon.png", // sets favicon for all pages
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
