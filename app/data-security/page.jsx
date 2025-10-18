'use client';

import Styles from '../../src/CSS/Security.module.css';
import Image from 'next/image';
import DataSecurity from '@/components/Sections/DataSecurity';
import FAQs from '@/components/Sections/Faq';

const Security = () => {
    const certifications = [
        {
            title: "SOC 2 Certification",
            description: (
                <>
                    <p>
                        SOC 2 (System and Organization Controls 2) is a comprehensive security framework
                        established by the American Institute of CPAs (AICPA) that emphasizes:
                    </p>
                    <div className={Styles.buttonGroup}>
                        <button>Security</button>
                        <button>Availability</button>
                        <button>Processing Integrity</button>
                        <button>Confidentiality</button>
                        <button>Privacy</button>
                    </div>
                </>
            ),
            image: "/assets/security/soc.png",
        },
        {
            title: "ISO 27001 Certification",
            description: (
                <>
                    <p>
                        Our ISO 27001 certification reinforces HAK Financials commitment to a structured and proactive
                        approach to information security management. This globally recognized framework covers:
                    </p>
                    <div className={Styles.buttonGroup}>
                        <button>Risk Management</button>
                        <button>Information Security Controls</button>
                        <button>Continuous Improvement</button>
                    </div>
                </>
            ),
            image: "/assets/security/iso.png",
        },
        {
            title: "GDPR Compliance",
            description: (
                <>
                    <p>
                        For clients operating within the EU or managing EU citizens’ data, HAK Financials ensures
                        full compliance with GDPR standards. This regulation focuses on:
                    </p>
                    <div className={Styles.buttonGroup}>
                        <button>Data Protection</button>
                        <button>Individual Privacy Rights</button>
                    </div>
                </>
            ),
            image: "/assets/security/gdpr.png",
        },
    ];

    const protectionData = [
        {
            title: "Data Encryption",
            description:
                "All sensitive data is encrypted both in storage and during transfer using advanced AES-256 standards, preventing any form of unauthorized access or data leaks.",
            image: "/assets/security/img1.svg",
        },
        {
            title: "Secure Access Controls",
            description:
                "HAK Financials enforces strict access management protocols to ensure only verified and authorized team members can handle confidential financial information.",
            image: "/assets/security/img2.svg",
        },
        {
            title: "Continuous Monitoring",
            description:
                "Our infrastructure is monitored 24/7, allowing immediate detection and mitigation of security threats, ensuring your information remains protected in real-time.",
            image: "/assets/security/img3.png",
        },
        {
            title: "2FA Authentication",
            description:
                "Every login within HAK Financials requires two-factor authentication (2FA), creating an added layer of defense to prevent unauthorized access and enhance overall system security.",
            image: "/assets/security/img4.svg",
        },
        {
            title: "Data Backup & Recovery",
            description:
                "We perform automated daily backups supported by robust recovery protocols, ensuring your financial data remains safe, redundant, and easily restorable when needed.",
            image: "/assets/security/img5.svg",
        },
        {
            title: "Regular Audits & Assessments",
            description:
                "Alongside our SOC 2 compliance, HAK Finances conducts regular internal audits and assessments to maintain adherence to global security regulations and best practices.",
            image: "/assets/security/img6.svg",
        },
    ];

    return (
        <>
            <div className={Styles.mainContainer}>
                <div className="container">
                    {/* Main Heading Section */}
                    <div className={Styles.mianHeading}>
                        <h2>Data Security & Compliance Standards</h2>
                        <p>
                            At HAK Financials, safeguarding client data isn’t merely an obligation — it’s a core
                            responsibility we uphold with unwavering precision. Through our SOC 2, ISO 27001,
                            and GDPR compliance certifications, we maintain the industry’s highest security
                            benchmarks to protect your information at every level of interaction.
                        </p>
                    </div>

                    {/* Certification Rows */}
                    {certifications.map((item, index) => (
                        <div className="row align-items-center my-5" key={index}>
                            <div className="col-lg-8 col-md-6 my-md-3">
                                <h3>{item.title}</h3>
                                {item.description}
                            </div>
                            <div className="col-lg-4 col-md-4 my-md-3 text-center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={250}
                                    height={250}
                                    unoptimized={true}
                                    className={Styles.securityImage}
                                />
                            </div>
                        </div>
                    ))}

                    {/* New Section: How HKFinance Protects Your Data */}
                    <div className={Styles.protectionSection}>
                        <h2 className="text-center mb-5">How HAK Financials Protects Your Data</h2>

                        {/* First Row */}
                        <div className="row align-items-start mb-5">
                            <div className="col-lg-6 col-md-8">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[0].image}  alt={protectionData[0].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[0].title}</h4>
                                    <p>{protectionData[0].description}</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[1].image} alt={protectionData[1].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[1].title}</h4>
                                    <p>{protectionData[1].description}</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[2].image} alt={protectionData[2].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[2].title}</h4>
                                    <p>{protectionData[2].description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="row align-items-start">
                            <div className="col-lg-3 col-md-4">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[3].image} alt={protectionData[3].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[3].title}</h4>
                                    <p>{protectionData[3].description}</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[4].image} alt={protectionData[4].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[4].title}</h4>
                                    <p>{protectionData[4].description}</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-8">
                                <div className={Styles.protectBox}>
                                    <Image src={protectionData[5].image} alt={protectionData[5].title} unoptimized={true} width={80} height={80} />
                                    <h4>{protectionData[5].title}</h4>
                                    <p>{protectionData[5].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataSecurity/>
                    <div className={Styles.ourCertifications}>
                        <h2 className='text-center'>Our Certifications</h2>
                        <div className='row justify-content-center'>
                            <div className='col-md-3 text-center'><Image src="/assets/security/c1.png" alt="certificates" unoptimized={true} className={Styles.Images} width={200} height={200}/></div>
                            <div className='col-md-3 text-center'><Image src="/assets/security/c2.png" alt="certificates" unoptimized={true} className={Styles.Images} width={200} height={200}/></div>
                            <div className='col-md-3 text-center'><Image src="/assets/security/c3.png" alt="certificates" unoptimized={true} className={Styles.Images} width={200} height={200}/></div>
                        </div>
                    </div>
                     <FAQs/>
                </div>
            </div>
        </>
    );
};

export default Security;
