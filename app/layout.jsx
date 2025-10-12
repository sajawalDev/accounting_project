// import "./globals.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapJS from "../src/components/BootstrapJs"; // client-only JS loader
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "HKFinance – Accounting & Tax Experts",
  description: "Professional accounting and finance services for your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      /></head>

      <body>
        <BootstrapJS />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
