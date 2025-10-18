"use client";

import Image from "next/image";
import Styles from "../../src/CSS/OurStory.module.css";

const OurStory = () => {
  const storyData = [
    {
      heading: "Our Ethos",
      text: "Under Promise, Over Deliver. We believe precision and deadlines define our reliability. At HAKFinances, our team consistently goes beyond expectations, ensuring accurate and timely outcomes without added pressure. We handle the stress, so you can focus on peace of mind.",
      img: "/assets/ourstory/accounts.png",
      alt: "Accounting teamwork",
    },
    {
      heading: "Our Aspiration",
      text: "We aim to reshape the future of outsourced accounting services. HAK Finances is dedicated to building success stories for firms and mid-market businesses by offering adaptive, cost-efficient solutions that scale with your needs, helping you achieve greater results with fewer resources.",
      img: "/assets/ourstory/accounts2.png",
      alt: "Financial collaboration",
    },
  ];

  return (
    <div className={Styles.mainContainer}>
      <div className="container">
        <div className={Styles.mainHeading}>
          <h1>HAK Financials – Delivering Accuracy Through Collaboration</h1>
          <p>
            At HAK Financials, we’re more than accountants — we’re your trusted ally in
            financial transparency and operational excellence. Dedicated to empowering
            accounting firms and mid-market businesses alike, our expertise extends far
            beyond numbers and reports. We’re committed to advancing your firm or
            business with customized, performance-focused outsourcing solutions.
          </p>
        </div>

        {storyData.map((item, index) => (
          <div
            key={index}
            className={`row align-items-center ${index % 2 === 0
              ? "flex-md-row-reverse flex-column-reverse"
              : "flex-md-row flex-column-reverse"
              }`}
          >
            <div className="col-12 col-md-6 text-center">
              <Image
                src={item.img}
                alt={item.alt}
                width={500}      // adjust based on your design
                height={300}     // adjust proportionally
                className="img-fluid"

              />

            </div>

            <div className="col-12 col-md-6">
              <h4>{item.heading}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}

        <div className={Styles.globalContent}>
          <h2 className="text-center">Global Footprint</h2>
          <p>
            We’re proud to serve clients worldwide from our strategic locations, extending our expertise across continents to bring you seamless support wherever you operate. Our global presence means we bring localized insights and international standards to every client. Whether you’re a firm in Canada or a business in the US, our team is always within reach to meet your unique needs.
          </p>
        </div>
      </div>

      <div className={Styles.FooterGlobalimg}>
        <Image
          src="/assets/ourstory/global.png"
          alt="Global network illustration"
          width={1200}   // set according to your design
          height={400}   // set proportionally
        />
      
      </div>
    </div>
  );
};

export default OurStory;
