// app/case-study/[slug]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import caseStudies from "../../Resources/CaseStudiesData"; // adjust path
import Styles from "../../../src/CSS/CaseStudy.module.css";

const CaseStudyDetail = () => {
  const params = useParams();
  const { slug } = params;
  const [cs, setCs] = useState(null);

  useEffect(() => {
    const found = caseStudies.find((item) => item.slug === slug);
    setCs(found || null);
  }, [slug]);

  if (!cs) return <p className={Styles.notFound}>Case Study not found.</p>;

  return (
    <div className={Styles.detailContainer}>
      {/* Parallax Hero Section */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url(${cs.image})` }}
      >
        <div className={Styles.overlay}>
          <h1 className={Styles.title}>{cs.title}</h1>
          <p className={Styles.clientName}>Client: {cs.clientName}</p>
        </div>
      </div>

      {/* Case Study Content */}
      <div className={`container ${Styles.content}`}>
        <section className={Styles.section}>
          <h2 className={Styles.sectionTitle}>Industry</h2>
          <p>{cs.industry}</p>
        </section>

        <section className={Styles.section}>
          <h2 className={Styles.sectionTitle}>The Challenge</h2>
          <ul>
            {cs.challenge.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>

        <section className={Styles.section}>
          <h2 className={Styles.sectionTitle}>Our Approach</h2>
          <ul>
            {cs.approach.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

        <section className={Styles.section}>
          <h2 className={Styles.sectionTitle}>Results</h2>
          <ul>
            {cs.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>

        <section className={Styles.section}>
          <h2 className={Styles.sectionTitle}>Client Testimonial</h2>
          <blockquote className={Styles.testimonial}>{cs.testimonial}</blockquote>
        </section>

        {cs.additionalDetails && (
          <section className={Styles.section}>
            <h2 className={Styles.sectionTitle}>Additional Details</h2>
            <p>{cs.additionalDetails}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default CaseStudyDetail;
