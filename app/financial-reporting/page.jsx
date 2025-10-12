"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "../../src/CSS/Services.module.css"; // same stylesheet reused

import FAQs from "../../src/components/Sections/Faq";

const FinancialReporting = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualHover, setIsManualHover] = useState(false);

  const services = [
    {
      title: "Monthly & Quarterly Financial Reports",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Get precise, timely, and fully customized reports that give you a crystal-clear view of your business performance.",
      points: [
        "Comprehensive balance sheets, P&L, and cash flow statements",
        "Custom financial dashboards and KPIs",
        "Variance and trend analysis for better forecasting",
        "Monthly or quarterly reporting cycles",
        "Delivered in presentation-ready format",
        "Assistance with management review sessions",
      ],
      button: "Get Started",
    },
    {
      title: "Advanced Financial Analysis",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Turn raw data into meaningful insights that drive profitability, growth, and smarter decision-making.",
      points: [
        "Profitability and margin analysis across segments",
        "Year-over-year performance comparisons",
        "Expense ratio and cost efficiency studies",
        "Financial modeling and scenario planning",
        "KPI benchmarking against industry standards",
        "Actionable insights delivered by financial analysts",
      ],
      button: "Get Started",
    },
    {
      title: "Management & Investor Reporting",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Professional-grade reporting packages designed for board meetings, investors, and executive decision-makers.",
      points: [
        "Custom executive summary reports",
        "Data visualization and charts for quick insights",
        "Comprehensive narrative analysis by experts",
        "Compliance with IFRS/GAAP presentation standards",
        "Investor-ready reports for funding discussions",
        "Collaborative review sessions with your HKFinance advisor",
      ],
      button: "Get Started",
    },
  ];

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
        style={{ backgroundImage: `url('/assets/services/fimg1.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h1>Financial Reporting & Analysis</h1>
          <p>
            Transform your numbers into business intelligence with{" "}
            <strong>HKFinance</strong>. Our expert reports and insights help you
            monitor performance, identify trends, and make data-driven decisions
            with confidence.
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
                className={`col-md-4 mb-4 ${
                  isActive ? Styles.activeCard : ""
                }`}
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
        style={{ backgroundImage: `url('/assets/services/fimg2.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Measure What Matters Most</h2>
          <p>
            Stay ahead by tracking critical financial KPIs. Our experts ensure
            your reports reveal true performance, efficiency, and opportunity.
          </p>
        </div>
      </div>

      {/* === Parallax Section 3 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/fimg3.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Expert Analysts You Can Trust</h2>
          <p>
            Our analysts blend precision with strategy — helping your business
            grow smarter, stronger, and more profitable.
          </p>
        </div>
      </div>

      {/* === Banner Section === */}
      <div className={Styles.servicebanner}>
        <h4>
          Join hundreds of businesses making data-driven decisions with
          HKFinance’s expert financial analysts.
        </h4>
      </div>

      <FAQs />
    </div>
  );
};

export default FinancialReporting;
