'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Styles from "../../CSS/Expertise.module.css";

const Expertise = () => {
  const data = [
    {
      img: "/assets/img1.JPG",
      title: "Bookkeeping",
      text: "HAK Financials collaborates with accounting firms to manage client bookkeeping portfolios using platforms such as QBO, Xero, Sage, Dext, and Hubdoc. Our skilled team oversees data entry, reconciliation, and reporting to maintain accuracy and efficiency across all client accounts. We help your firm concentrate on client engagement and strategic expansion while we handle the daily bookkeeping operations.",
    },
    {
      img: "/assets/img2.JPG",
      title: "AR / AP Management",
      text: "HAK Financials streamlines AR/AP operations for mid-market companies through advanced tools like QBO, Xero, SAP Business One, and Microsoft Dynamics. From invoicing to payment tracking and vendor coordination, we deliver smooth workflows that boost accuracy, cash flow, and overall efficiency in financial management.",
    },
    {
      img: "/assets/image3.JPG",
      title: "Payroll Management",
      text: "HAK Financials offers specialized payroll management for Canadian businesses, leveraging reliable platforms like Wagepoint and Ceridian Dayforce to deliver precise payroll processing, regulatory compliance, and efficient management of tax filings and deductions. We simplify operations, minimize errors, and enable businesses to focus on growth.",
    },
    {
      img: "/assets/img4.JPG",
      title: "Preparation of Sales Tax Returns",
      text: "HAK Financials assists accounting firms with professional HST/GST return preparation for Canadian businesses. Leveraging advanced tools like QuickBooks and ProFile alongside deep expertise in Canadian tax laws, we guarantee accuracy and compliance. Our team stays current with evolving regulations to reduce errors and protect your clients from penalties.",
    },
    {
      img: "/assets/img5.JPG",
      title: "Preparation of Financial Statements",
      text: "HAK Financials supports accounting firms with professional preparation of financial statements, including year-end accounts, compilations, and review engagements for Canadian clients. Utilizing CaseWare (desktop and cloud) and Countable, we ensure full compliance with ASPE standards and CPA requirements, delivering precise and timely financial reports for your clients.",
    },
    {
      img: "/assets/img6.JPG",
      title: "Preparation of Tax Returns",
      text: "HAK Financials assists accounting firms with professional tax return preparation for Canadian clients, specializing in personal (T1), corporate (T2), and partnership (T5013) filings, as well as GST/HST returns. Leveraging tools like ProFile and TaxPrep, we ensure accuracy and compliance, delivering timely submissions while minimizing errors for your clients.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer;
    if (activeIndex !== null) {
      const fullText = data[activeIndex].text.trim().split(" ");
      let current = 0;
      setDisplayedText("");
      timer = setInterval(() => {
        if (current < fullText.length) {
          setDisplayedText((prev) =>
            prev ? `${prev} ${fullText[current]}` : fullText[current]
          );
          current++;
        } else {
          clearInterval(timer);
        }
      }, 50);
    } else {
      setDisplayedText("");
    }
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="container mt-5">
      <div className={Styles.cardBoxHeading}>
        <h1>Our Staff Expertise</h1>
        <p>
          Unlock your business potential with HAK Financials dedicated team,
          providing customized financial solutions that guarantee smooth
          operations and exceptional support for all your accounting
          requirements.
        </p>
      </div>

      <div className="row">
        {data.map((item, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-4"
          >
            <div
              className={Styles.cardBox}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={Styles.boxcontent}>
                <div className={Styles.boxImg} style={{ position: "relative", width: "40%", height: "100px",objectFit:'contain' }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    unoptimized={true}
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                  />
                </div>
                <h3>{item.title}</h3>
              </div>

              <div
                className={`${Styles.hoverContent} ${
                  activeIndex === index ? Styles.show : ""
                }`}
              >
                <div className={Styles.hoverInner}>
                  <h5>{item.title}</h5>
                  <p>{activeIndex === index ? displayedText : ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
