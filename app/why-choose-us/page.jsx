"use client";

import Styles from "../../src/CSS/Wcu.module.css";

const WhyChooseUs = () => {
  const comparisonData = [
    { title: "Price", hkf: "60% More Affordable", contract: "Expensive" },
    { title: "Turnover", hkf: "Less than 2%", contract: "Every Year" },
    { title: "Technology & Tools", hkf: "Included", contract: "Not Included" },
    { title: "Scaling", hkf: "Easy", contract: "Difficult" },
    { title: "Requirement Expenses", hkf: "None", contract: "High" },
  ];

  const qaData = [
    {
      question: "Experienced Certified Accountants & Bookkeepers",
      answer:
        "Access financial experts for compliance, accuracy, and insights—no hiring hassle.",
    },
    {
      question: "Streamlined Workflows",
      answer:
        "Efficient processes free your team to focus on growth, not admin tasks.",
    },
    {
      question: "Cost Efficiency",
      answer:
        "Flexible outsourcing lets you pay only for what you need, eliminating in-house overhead.",
    },
    {
      question: "Transparent Reporting",
      answer:
        "Real-time reports keep you informed and empower smarter decisions.",
    },
    {
      question: "Tech-Driven Solutions",
      answer:
        "Automate tasks and secure data with cloud-based, cutting-edge tools.",
    },
    {
      question: "Enhanced Cashflow",
      answer:
        "Proactive AR/AP management ensures better control of inflows and outflows.",
    },
    {
      question: "Certified Data Security",
      answer:
        "ISO 27001 and SOC 2 certifications + GDPR compliance protects your financial information.",
    },
    {
      question: "Seamless Integration",
      answer:
        "Our team aligns with your goals, ensuring smooth communication and execution.",
    },
    {
      question: "Global Expertise",
      answer:
        "Experts ensure accuracy and compliance with local and international standards.",
    },
  ];

  return (
    <div className={Styles.mainContainer}>
      <div className="container">
        <div className={Styles.containerHeading}>
          <h1>Why Choose Us</h1>
          <p>
            We customize our solutions for each client, backed by cutting-edge
            security measures and real-time insights, ensuring peace of mind and
            the financial transparency you need to make informed decisions while
            saving valuable time and resources.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-5">
            <div className={Styles.hkfContainer}>
              <h4 className="text-center">HAK Financials</h4>
              {comparisonData.map((item, index) => (
                <div key={index} className={Styles.headingContent}>
                  <div className={Styles.contetnHead}>
                    <h5>{item.title}</h5>
                  </div>
                  <div className={Styles.contentValue}>
                    <h5>{item.hkf}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-1 text-center my-3">
            <h3>VS.</h3>
          </div>

          <div className="col-lg-5">
            <div className={Styles.ContractBaseContainer}>
              <h4 className="text-center">
                Hiring In-House / Contract Base
              </h4>
              {comparisonData.map((item, index) => (
                <div key={index} className={Styles.headingContent}>
                  <div className={Styles.contetnHead}>
                    <h5>{item.title}</h5>
                  </div>
                  <div className={Styles.contentValue}>
                    <h5>{item.contract}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={Styles.SecondContainer}>
          <div className={Styles.secondHeadingg}>
            <h1>Benefits of Outsourcing to HAK Financials</h1>
            <p>
              Our accountants and bookkeepers undergo a rigorous selection
              process, including comprehensive training and continuous
              professional development, ensuring quality meets the highest
              industry standards.
            </p>
          </div>

          {qaData.map((item, index) => (
            <div key={index} className="row justify-content-between my-3">
              <div className="col-lg-6">
                <h4>{item.question}</h4>
              </div>
              <div className="col-lg-6">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
