"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Styles from "../../src/CSS/Services.module.css";

import FAQs from "../../src/components/Sections/Faq";

const AuditAndCompliance = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualHover, setIsManualHover] = useState(false);

  const services = [
    {
      title: "Internal Audit Services",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Gain confidence in your internal controls and risk management with detailed, independent audits tailored to your operations.",
      points: [
        "Comprehensive review of financial controls and processes",
        "Evaluation of internal risk management frameworks",
        "Fraud detection and prevention analysis",
        "Operational efficiency and process improvement insights",
        "Detailed audit reports with actionable recommendations",
        "Compliance reviews aligned with local and international standards",
      ],
      button: "Get Started",
    },
    {
      title: "External Audit Support",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Ensure your financial statements meet the highest standards of accuracy, transparency, and compliance with regulatory requirements.",
      points: [
        "Preparation and assistance for statutory audits",
        "Audit-ready financial statements and reconciliations",
        "Liaison support with external auditors",
        "Documentation and evidence management",
        "IFRS and GAAP compliance assurance",
        "Error detection and financial integrity checks",
      ],
      button: "Get Started",
    },
    {
      title: "Regulatory & Compliance Advisory",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Stay compliant with ever-changing laws, standards, and tax regulations through expert guidance and proactive compliance management.",
      points: [
        "Regulatory compliance reviews and risk assessments",
        "Corporate governance advisory and implementation",
        "Policy and control framework development",
        "Assistance with FBR, SECP, and tax audit requirements",
        "Data protection and anti-money laundering compliance",
        "Periodic compliance reporting and updates",
      ],
      button: "Get Started",
    },
  ];

  // Auto rotate between cards
  useEffect(() => {
    if (isManualHover) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isManualHover, services.length]);

  return (
    <div className={Styles.mianContainer}>
      {/* === Parallax Section 1 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/auditimg1.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h1>Audit & Compliance</h1>
          <p>
            Protect your business with precise, transparent, and compliant audit
            services. At <strong>HAK Financials</strong>, we help you maintain trust,
            transparency, and integrity through rigorous audits and regulatory
            compliance support.
          </p>
          <Link href="/contact">
            <button className={Styles.freebtn}>Get Free Consultation</button>
          </Link>
        </div>
      </div>

      {/* === Services Section === */}
      <div className="container mt-5">
        <div className="row">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                className={`col-md-4 mb-4 ${isActive ? Styles.activeCard : ""}`}
                key={index}
                onMouseEnter={() => {
                  setIsManualHover(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => setIsManualHover(false)}
              >
                <div
                  className={`${Styles.card} ${isActive ? Styles.hovered : ""
                    }`}
                >
                  <div className={Styles.cardImage}>
                    <div className={Styles.overlay}>
                      <h3>{service.title}</h3>
                    </div>
                  </div>
                  <div className={Styles.cardContent}>
                    <p>{service.description}</p>
                    <ul>
                      {service.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <Link href="/contact">
                        <button className={Styles.btn}>{service.button}</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === Parallax Section 2 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/auditimg2.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Build Trust with Transparent Audits</h2>
          <p>
            Our <strong>HAK Financials</strong> audit experts ensure your business operates
            with transparency and credibility—strengthening investor confidence
            and enhancing your reputation in the marketplace.
          </p>
        </div>
      </div>

      {/* === Parallax Section 3 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/auditimg3.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Stay Ahead of Compliance Risks</h2>
          <p>
            Avoid costly penalties and reputational risks. We help you identify
            compliance gaps, streamline internal controls, and stay updated with
            evolving financial and tax regulations.
          </p>
          <h3>Audit Expertise You Can Rely On</h3>
          <p>
            Our team of seasoned auditors and compliance specialists bring deep
            industry experience and technical knowledge to every engagement,
            making compliance effortless for your organization.
          </p>
        </div>
      </div>

      {/* === Banner + FAQs === */}
      <div className={Styles.servicebanner}>
        <h4>
          Join hundreds of businesses ensuring accuracy and compliance with{" "}
          HAK Financials expert audit professionals.
        </h4>
      </div>

      <FAQs />
    </div>
  );
};

export default AuditAndCompliance;
