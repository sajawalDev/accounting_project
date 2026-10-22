"use client";
import Styles from "../../CSS/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={Styles.FooterContainer}>
      <div className="container pt-5 pb-2">
        <div className={Styles.Footerheading}>
          <h2>Let’s Create a Plan That Works</h2>
        </div>

        <div className="row justify-content-between mt-5">
          {/* Left Column */}
          <div className="col-lg-5 col-md-6">
            <div className={Styles.footerContent}>
              <h3>HAK Financials</h3>
              <p>Location: 685 Third Avenue, New York, NY 10017</p>
              <p>Email: Hakfinancials@gmail.com</p>
              {/* <p>+1 (647) 342 4354</p> */}
            </div>
          </div>

          {/* Middle Column */}
          <div className="col-lg-4 col-md-5 col-6 mt-lg-0 mt-md-3 mt-4">
            <ul>
              <li>
                <Link href="/bookkeeping-accounting" className={Styles.listitems}>
                  Bookkeeping & Accounting
                </Link>
              </li>
              <li>
                <Link href="/financial-reporting" className={Styles.listitems}>
                  Financial Reporting & Analysis
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us" className={Styles.listitems}>
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className={Styles.listitems}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className={Styles.listitems}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="col-lg-3 col-md-6 col-6 mt-lg-0 mt-md-3 mt-4">
            <ul>
              <li>
                <Link href="/our-story" className={Styles.listitems}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className={Styles.listitems}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={Styles.listitems}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/data-security" className={Styles.listitems}>
                  Data Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={Styles.copyright}>
          <p>Copyright © 2025 HAKFinances | Powered by <a href="https://bossdigitalsol.com/">BOSS DIGITAL SOLUTIONS</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
