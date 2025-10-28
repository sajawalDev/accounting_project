"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Styles from "../../CSS/AppsandAutoamtion.module.css";

const categories = [
  { title: "Accounting & Bookkeeping", images: Array.from({ length: 9 }, (_, i) => `/assets/bookkeeping/img${i + 1}.png`) },
  { title: "Document Tracking & Publishing", images: Array.from({ length: 10 }, (_, i) => `/assets/documenttracking/img${i + 1}.png`) },
  { title: "AR & AP Solutions", images: Array.from({ length: 14 }, (_, i) => `/assets/arapsolution/img${i + 1}.png`) },
  { title: "Payroll", images: Array.from({ length: 9 }, (_, i) => `/assets/payroll/img${i + 1}.png`) },
  { title: "Tax Preparation", images: Array.from({ length: 3 }, (_, i) => `/assets/taxprep/img${i + 1}.png`) },
  { title: "Working Papers", images: Array.from({ length: 5 }, (_, i) => `/assets/workingpapers/img${i + 1}.png`) },
  { title: "Performance Analytics (Fractional CFO)", images: Array.from({ length: 4 }, (_, i) => `/assets/performance/img${i + 1}.png`) },
  { title: "Inventory", images: Array.from({ length: 3 }, (_, i) => `/assets/inventory/img${i + 1}.png`) },
  { title: "Practice & Workflow Management", images: Array.from({ length: 17 }, (_, i) => `/assets/practice/img${i + 1}.png`) },
  { title: "Communication & Security", images: Array.from({ length: 4 }, (_, i) => `/assets/communication/img${i + 1}.png`) },
  { title: "ERP", images: Array.from({ length: 4 }, (_, i) => `/assets/erp/img${i + 1}.png`) },
  { title: "Real Estate Management Industry", images: Array.from({ length: 2 }, (_, i) => `/assets/realestate/img${i + 1}.png`) },
  { title: "E-commerce", images: Array.from({ length: 6 }, (_, i) => `/assets/ecommerce/img${i + 1}.png`) },
  { title: "Technology", images: Array.from({ length: 2 }, (_, i) => `/assets/technology/img${i + 1}.png`) },
  { title: "Healthcare", images: ["/assets/healthcare/img1.png"] },
  { title: "Construction", images: Array.from({ length: 3 }, (_, i) => `/assets/construction/img${i + 1}.png`) },
  { title: "Law", images: ["/assets/law/img1.png"] },
];

const Automation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className={Styles.mainContainer}>
      <div className="container mt-5">
        <div className={Styles.Automationheading}>
          <h1>Apps & Automation</h1>
          <p>
            Our breadth of application and automation expertise is unparalleled
            in the industry’s outsourcing providers.
          </p>
        </div>

        {/* ===== Swiper Slider ===== */}
        <div className={Styles.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView="auto"
            spaceBetween={5}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className={Styles.swiperContainer}
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <button
                  className={`${Styles.autoBtn} ${activeIndex === index ? Styles.active : ""
                    }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {cat.title}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className={`${Styles.navBtnLeft} swiper-button-prev`}></div>
          <div className={`${Styles.navBtnRight} swiper-button-next`}></div>
        </div>
        <div className={Styles.imageContainer}>
          {categories[activeIndex].images.map((img, idx) => (
            <div key={idx} className={Styles.imageItem}>
              <div className={Styles.imageBox}>
                <Image
                  src={img}
                  alt={`${categories[activeIndex].title} example ${idx + 1}`}
                  fill
                  quality={100}
                  priority={idx < 4}
                  sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, 16vw"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    transition: "transform 0.3s ease",
                  }}
                  className={Styles.autoImg}
                />

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Automation;
