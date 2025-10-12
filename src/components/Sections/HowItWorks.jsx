'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Styles from "../../CSS/HowItWorks.module.css";
import Image from "next/image";

const slidesData = [
    {
        id: "01",
        title: "Consult",
        img: "/assets/image4.png",
        text: "Book your preferred 30-minute consultation slot online. In this call, we’ll discuss your customized service plan—whether ad hoc, part-time, or full-time—and suggest the accountant level that best fits your requirements.",
        bgColor: "#A6CFFF",
    },
    {
        id: "02",
        title: "Onboard",
        img: "/assets/img5.png",
        text: "Our offshore team will reach out to finalize your plan and outline the next steps. We’ll confirm job roles, preferred software, and standard operating procedures to ensure a seamless transition. Operations begin on EST, functioning just like an in-house team.",
        bgColor: "#CFDCFF",
    },
    {
        id: "03",
        title: "Collaborate",
        img: "/assets/img6.png",
        text: "You can share your data with our accountants through various secure channels, including Dropbox, Google Drive, Hubdoc, Expensify, or our HKFinance Portal, ensuring smooth and secure access.",
        bgColor: "#B03CFF",
    },
    {
        id: "04",
        title: "Access",
        img: "/assets/img7.png",
        text: "Our accountants use secure logins to access cloud-based software or connect remotely to desktop applications. Backup files can be uploaded through the HKFinance Portal as needed.",
        bgColor: "#BBD8FA",
    },
    {
        id: "05",
        title: "Deliver",
        img: "/assets/img8.png",
        text: "Connect directly with your team via Skype, Slack, Teams, or HKFinance’s portal. Expect seamless handling of bookkeeping, AR/AP, payroll, tax returns, custom reporting, and finance consulting.",
        bgColor: "#B03CFF",
    },
    {
        id: "06",
        title: "Monitor",
        img: "/assets/img9.png",
        text: "View timesheets and expenses through TSheets or HKFinance Portal for full transparency into ongoing work. Adjust hours as needed for optimal efficiency.",
        bgColor: "#CFDCFF",
    },
];

const Section3 = () => {
    return (
        <div className="container-fluid mt-5">
            <div className={Styles.containerHeading}>
                <h1>How it Works</h1>
                <p>
                    We integrate seamlessly into your operations, ensuring smooth, secure
                    access to your financial data and <br /> dedicated support every step
                    of the way.
                </p>
            </div>

            <Swiper
                modules={[Autoplay]}
                loop={true}
                slidesPerView={3}
                spaceBetween={30}
                speed={8000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                freeMode={true}
                allowTouchMove={true}
                grabCursor={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={Styles.card}
                            style={{ backgroundColor: slide.bgColor }}
                        >
                            {/* Image container with fill */}
                            <div
                                className={Styles.cardImg}
                                style={{ position: "relative", width: "100%", height: "200px" }}
                            >
                                <Image
                                    src={slide.img}
                                    alt={slide.title}
                                    width={300}   // set desired width
                                    height={200}  // set desired height
                                    style={{ objectFit: "contain" }}
                                />

                            </div>

                            {/* Card content */}
                            <div className={Styles.cardContent}>
                                <div className={Styles.cardDynamicContent}>
                                    <h3>{slide.id}</h3>
                                    <p className={Styles.LinEffect}></p>
                                </div>
                                <div className={Styles.ActualContent}>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.text}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Section3;
