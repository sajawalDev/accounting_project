"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Styles from "../../src/CSS/Services.module.css"; // same CSS

import FAQs from "../../src/components/Sections/Faq";

const TaxServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualHover, setIsManualHover] = useState(false);

  const services = [
    {
      title: "Tax Planning & Strategy",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Maximize savings and minimize liabilities with proactive tax planning designed around your business goals.",
      points: [
        "Tailored tax planning for individuals and businesses",
        "Strategic advice to reduce tax exposure legally",
        "Profit optimization and reinvestment strategies",
        "Year-round tax consultation and forecasting",
        "Cross-border and multi-jurisdiction tax planning",
        "Compliance with FBR and international tax laws",
      ],
      button: "Get Started",
    },
    {
      title: "Tax Preparation & Filing",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Stay stress-free during tax season. We handle all your filings with accuracy, compliance, and timely submission.",
      points: [
        "Preparation of corporate and individual tax returns",
        "FBR and provincial tax return submissions",
        "Income, sales, and withholding tax compliance",
        "Reconciliation of accounts and tax records",
        "Support during audits and tax inquiries",
        "Digital filing and submission through IRIS portal",
      ],
      button: "Get Started",
    },
    {
      title: "Tax Compliance & Advisory",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Navigate complex tax regulations with ease. Our experts ensure your business remains fully compliant and audit-ready.",
      points: [
        "Ongoing compliance monitoring and reporting",
        "Advisory on tax reforms, exemptions, and incentives",
        "Tax risk assessment and mitigation strategies",
        "Corporate tax governance implementation",
        "Review of internal policies for tax efficiency",
        "Representation before tax authorities when required",
      ],
      button: "Get Started",
    },
  ];

  // Auto card highlight animation
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
        style={{ backgroundImage: `url('/assets/services/taximg1.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h1>Tax Services</h1>
          <p>
            Simplify your taxes with <strong>HKFinance</strong>. From planning
            and filing to compliance and advisory, we help you stay compliant,
            save more, and manage taxes strategically.
          </p>
          <Link href="/contact">
            <button className={Styles.freebtn}>Book Free Tax Consultation</button>
          </Link>
        </div>
      </div>

      {/* === Services Cards === */}
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
                  className={`${Styles.card} ${
                    isActive ? Styles.hovered : ""
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
        style={{ backgroundImage: `url('/assets/services/taximg2.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Accurate Filing. Zero Stress.</h2>
          <p>
            From corporate filings to personal tax returns, our professionals
            handle everything with precision—ensuring timely submissions and
            full FBR compliance.
          </p>
        </div>
      </div>

      {/* === Parallax Section 3 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/taximg3.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Trusted Tax Experts at Your Side</h2>
          <p>
            Whether it’s resolving tax notices, responding to audits, or
            optimizing your tax position, our advisors protect your financial
            peace of mind every step of the way.
          </p>
        </div>
      </div>

      {/* === Closing Banner === */}
      <div className={Styles.servicebanner}>
        <h4>
          Join hundreds of businesses saving time and money with HKFinance’s
          professional tax planning and filing services.
        </h4>
      </div>

      <FAQs />
    </div>
  );
};

export default TaxServices;
