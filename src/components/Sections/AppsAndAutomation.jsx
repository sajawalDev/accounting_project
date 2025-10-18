"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Styles from "../../CSS/AppsandAutoamtion.module.css";

const categories = [
  { title: "Accounting & Bookkeeping", images: Array.from({ length: 9 }, (_, i) => `/assets/bookkeepings/img${i + 1}.JPG`) },
  { title: "Document Tracking & Publishing", images: Array.from({ length: 11 }, (_, i) => `/assets/documenttracking/img${i + 1}.JPG`) },
  { title: "AR & AP Solutions", images: Array.from({ length: 14 }, (_, i) => `/assets/arapsolutions/img${i + 1}.JPG`) },
  { title: "Payroll", images: Array.from({ length: 13 }, (_, i) => `/assets/payroll/img${i + 1}.JPG`) },
  { title: "Tax Preparation", images: Array.from({ length: 3 }, (_, i) => `/assets/taxprep/img${i + 1}.JPG`) },
  { title: "Working Papers", images: Array.from({ length: 5 }, (_, i) => `/assets/workingpapers/img${i + 1}.JPG`) },
  { title: "Performance Analytics (Fractional CFO)", images: Array.from({ length: 4 }, (_, i) => `/assets/perfprmanceanalytics/img${i + 1}.JPG`) },
  { title: "Inventory", images: Array.from({ length: 3 }, (_, i) => `/assets/inventory/img${i + 1}.JPG`) },
  { title: "Practice & Workflow Management", images: Array.from({ length: 17 }, (_, i) => `/assets/practice/img${i + 1}.JPG`) },
  { title: "Communication & Security", images: Array.from({ length: 4 }, (_, i) => `/assets/communication/img${i + 1}.JPG`) },
  { title: "ERP", images: Array.from({ length: 4 }, (_, i) => `/assets/erp/img${i + 1}.JPG`) },
  { title: "Real Estate Management Industry", images: Array.from({ length: 2 }, (_, i) => `/assets/realestate/img${i + 1}.JPG`) },
  { title: "E-commerce", images: Array.from({ length: 6 }, (_, i) => `/assets/ecommerce/img${i + 1}.JPG`) },
  { title: "Technology", images: Array.from({ length: 2 }, (_, i) => `/assets/technology/img${i + 1}.JPG`) },
  { title: "Healthcare", images: ["/assets/healthcare/img1.JPG"] },
  { title: "Construction", images: Array.from({ length: 3 }, (_, i) => `/assets/construction/img${i + 1}.JPG`) },
  { title: "Law", images: ["/assets/law/img1.JPG"] },
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
                  className={`${Styles.autoBtn} ${
                    activeIndex === index ? Styles.active : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {cat.title}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className={`${Styles.navBtn} swiper-button-prev`}></div>
          <div className={`${Styles.navBtn} swiper-button-next`}></div>
        </div>

        {/* ===== Image Grid ===== */}
        <div className={`row ${Styles.imageContainer}`}>
          {categories[activeIndex].images.map((img, idx) => (
            <div
              key={idx}
              className="col-4 col-sm-4 col-md-3 mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "60%",
                  aspectRatio: "4 / 3",
                  borderRadius: "10px",
                  backgroundColor: "#f2f2f2",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={img}
                  alt={`${categories[activeIndex].title} example ${idx + 1}`}
                  fill
                  unoptimized={true}
                  quality={100}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    borderRadius: "10px",
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
