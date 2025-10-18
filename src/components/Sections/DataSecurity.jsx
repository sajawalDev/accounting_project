'use client';

import Image from "next/image";
import Styles from "../../CSS/DataSecurity.module.css";

const DataSecurity = () => {
  const cards = [
    { img: "/assets/DataSecurity/img1.JPG", title: "Risk Management", desc: "Identifying and mitigating data risks." },
    { img: "/assets/DataSecurity/img2.JPG", title: "Data Encryption", desc: "Utilizing advanced encryption protocols to protect sensitive information." },
    { img: "/assets/DataSecurity/img3.JPG", title: "Access Control", desc: "Ensuring only authorized personnel can access confidential data." },
    { img: "/assets/DataSecurity/img4.JPG", title: "Regulatory Compliance", desc: "Adhering to GDPR, ISO, and other international data protection standards." },
    { img: "/assets/DataSecurity/img5.JPG", title: "24/7 Monitoring", desc: "Constantly monitoring systems to detect and prevent breaches." },
    { img: "/assets/DataSecurity/img6.JPG", title: "Secure Backups", desc: "Regularly performing encrypted backups to prevent data loss." },
  ];

  return (
    <div className="container mt-5">
      <div className={Styles.dataHeading}>
        <h1>Data Security</h1>
        <p>
          We prioritize your data security with advanced encryption and
          compliance with global standards, ensuring your sensitive information
          is always safe and secure. Key aspects of our security framework
          include:
        </p>
      </div>

      <div className="row">
        {cards.map((card, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className={Styles.card}>
              <div
                className={Styles.cardImg}
                style={{ position: "relative", width: "100%", height: "50px" }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  fill
                  unoptimized={true}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={Styles.cardContent}>
                <h5>{card.title}</h5>
                <p>{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSecurity;
