"use client";

import Link from "next/link";
import Styles from "../../CSS/Banner.module.css";
// import bannerImg from "../../../assets/homebanner2.png";

/**
 * HomeBanner Component
 * - Hero section for the homepage
 * - Includes background image, CTA button, and intro text
 */
const HomeBanner = () => {
  return (
    <section
      className={Styles.parallax}
      style={{
        backgroundImage: `url(${'/assets/homebanner2.png'})`,
      }}
    >
      <div className={Styles.parallaxContent}>
        <h1>Welcome to HKFinance</h1>
        <p>
          Empowering businesses with reliable bookkeeping, audit, tax, and
          financial reporting services — delivered by experts who care about
          your growth.
        </p>
        <Link href="/contact">
          <button className={Styles.btn}>Get Free Consultation</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeBanner;
