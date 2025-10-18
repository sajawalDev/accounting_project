'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Styles from '../../CSS/FAQ.module.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does HAK Financials offer?",
      answer: `HAK Financials provides both onshore and offshore accountants who seamlessly integrate with your team to manage bookkeeping, payroll, AR/AP processing, financial statement preparation, tax filing, CFO support, administrative tasks, and more. 

Our approach includes:
• Operating in your local time zone
• A 3-month training and testing program for every accountant
• Practice Manager oversight for quality assurance
• Secure, ISO 27001-certified local servers ensuring no data leaves the country
• Tailored expertise matching based on your business needs

You can choose from full-time virtual employees, part-time plans, or Practice Manager-led services for customized support.`
    },
    {
      question: "How does communication and workflow with the offshore team work?",
      answer:
        "We adapt our communication style to your preferences. You can collaborate via Slack, Microsoft Teams, or workflow tools like Financial Cents, Karbon, and ClickUp. Some clients prefer managing everything through email and regular video calls. Communication covers job instructions, reviews, and deadlines from your side, while your HKFinance accountants provide updates, queries, and task progress reports."
    },
    {
      question: "How does HAK Financials track and report productivity?",
      answer:
        "We use timesheets—through QuickBooks Time or workflow management software—to log working hours per task. This ensures transparency, allowing you to see exactly where time and money are spent. We maintain high productivity standards, and clients can request timesheet reviews anytime for complete visibility."
    },
    {
      question: "How does HAK Financials ensure data security?",
      answer:
        "HAK Financials is ISO 27001 and SOC 2 certified, protecting your sensitive financial data with advanced encryption, strict access controls, and 24/7 system monitoring to maintain top-tier security at all times."
    },
    {
      question: "What types of businesses are best suited for HAK Financials services?",
      answer:
        "We support accounting firms aiming to scale and mid-sized businesses looking to streamline financial processes. Our flexible models suit organizations across various industries and business stages."
    },
    {
      question: "Which industries does HAK Financials specialize in?",
      answer:
        "HAK Financials has deep expertise in industries including technology, e-commerce, real estate, construction, retail, healthcare, FMCG, and non-profits. Each Practice Manager focuses on one or two industries, ensuring customized service that aligns with industry-specific demands."
    },
    {
      question: "How quickly can HAK Financials integrate with our existing accounting systems?",
      answer:
        "Our experienced team works efficiently with multiple accounting platforms and can integrate seamlessly—typically within days—ensuring your business operations continue smoothly without disruption."
    },
    {
      question: "What makes HAK Financials different from others?",
      answer:
        "HAK Financials stands out through certified expertise, a secure infrastructure, real-time reporting, and a client-centric model. We deliver customized, cost-effective solutions that go beyond traditional outsourcing."
    },
    {
      question: "Can I try HAK Financials before committing?",
      answer:
        "Absolutely! HAK Financials offers a free 5-day trial, giving you firsthand experience of our team’s quality, efficiency, and commitment before you make a decision."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`container mt-5 ${Styles.faqContainer}`}>
      <h1 className={Styles.faqHeading}>Frequently Asked Questions</h1>
      <div className={Styles.faqList}>
        {faqs.map((item, index) => (
          <div key={index} className={Styles.faqItem}>
            <div
              className={Styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <h4>{item.question}</h4>
              <span className={Styles.icon}>
                {activeIndex === index ? <Minus /> : <Plus />}
              </span>
            </div>

            <div
              className={`${Styles.faqAnswerWrapper} ${
                activeIndex === index ? Styles.active : ""
              }`}
            >
              <p className={Styles.faqAnswer}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
