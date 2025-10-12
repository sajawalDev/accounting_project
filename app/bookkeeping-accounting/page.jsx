"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "../../src/CSS/Services.module.css";


import FAQs from "../../src/components/Sections/Faq";

const Bookkeeping = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManualHover, setIsManualHover] = useState(false);

  const services = [
    {
      title: "Full-Time Bookkeeper & Accountant",
      img: "/assets/services/cardsbg.jpg",
      description:
        "A dedicated professional working exclusively on your business during your operating hours.",
      points: [
        "One or more dedicated virtual bookkeeper(s) or accountant(s)",
        "40 hours a week per dedicated team member",
        "Pay monthly after completion of the month",
        "14 annual paid leaves per employee",
        "Direct communication and control over your assigned staff",
        "Choose from 3 experience levels: junior, mid-level, or senior",
      ],
      button: "Get Started",
    },
    {
      title: "Capped Fixed Hours Plan",
      img: "/assets/services/cardsbg.jpg",
      description:
        "Ideal for small businesses or startups with limited accounting needs. Get reliable support for a set number of hours each week.",
      points: [
        "One part-time designated virtual bookkeeper/accountant",
        "Minimum 10 hours a week (fixed monthly cap)",
        "Pay monthly after completion of the month",
        "14 annual unpaid leaves – no backup",
        "Direct communication and supervision",
        "Choose from 3 experience levels: junior, mid-level, or senior",
      ],
      button: "Get Started",
    },
    {
      title: "Manager-Led Accounting Plan",
      img: "/assets/services/cardsbg.jpg",
      description:
        "A premium solution where a senior accounting manager oversees your financials, ensuring accuracy, compliance, and efficiency.",
      points: [
        "10–200 hours per week with a virtual team managed by an Accounting Manager",
        "Option for full-time or fixed hours",
        "Pay monthly after completion of the month",
        "No annual leaves – backup support provided",
        "Managed communication and reporting through your dedicated manager",
        "Access to all experience levels within one plan",
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
        style={{ backgroundImage: `url('/assets/services/bookkimg1.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h1>Bookkeeping & Accounting</h1>
          <p>
            Simplify your finances and stay compliant with{" "}
            <strong>HKFinance</strong>. Our bookkeeping experts help you manage
            daily records, maintain accuracy, and ensure your business runs
            smoothly.
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
                className={`col-md-4 mb-4 ${isActive ? Styles.activeCard : ""
                  }`}
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
        style={{ backgroundImage: `url('/assets/services/bookkimg2.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Accurate Books, Confident Decisions</h2>
          <p>
            Keep your books precise, organized, and up to date. Our bookkeepers
            ensure your financials reflect reality—so you can make better
            business decisions.
          </p>
        </div>
      </div>

      {/* === Parallax Section 3 === */}
      <div
        className={Styles.parallax}
        style={{ backgroundImage: `url('/assets/services/bookkimg3.png')` }}
      >
        <div className={Styles.parallaxContent}>
          <h2>Trusted Accounting Expertise</h2>
          <p>
            Our team handles everything—from data entry to reconciliations—so
            you can focus on growth, not spreadsheets.
          </p>
        </div>
      </div>

      {/* === Banner Section === */}
      <div className={Styles.servicebanner}>
        <h4>
          Join hundreds of Accounting firms growing their practices with{" "}
          HKFinance’s expert accountants.
        </h4>
      </div>

      <FAQs />
    </div>
  );
};

export default Bookkeeping;
