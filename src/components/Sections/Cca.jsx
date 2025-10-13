"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Styles from "../../CSS/CCA.module.css";

const CCA = () => {
  const cards = [
    {
      img: "/assets/CCA/img1.jpg",
      title: "90-Day Training",
      desc: "Junior accountants complete 90 days of rigorous training and evaluation, working under the guidance of a senior accountant.",
    },
    {
      img: "/assets/CCA/img2.jpg",
      title: "Comprehensive Testing",
      desc: "Each candidate is thoroughly tested on accounting principles, software proficiency, and practical case handling before certification.",
    },
    {
      img: "/assets/CCA/img3.jpg",
      title: "Continuous Development",
      desc: "Our accountants engage in ongoing professional education, ensuring their knowledge stays current with evolving financial regulations.",
    },
    {
      img: "/assets/CCA/img4.jpg",
      title: "Expert Supervision",
      desc: "Every trainee works closely with senior chartered accountants, gaining hands-on experience and learning industry best practices.",
    },
  ];

  return (
    <section className="container mt-5">
      <div className={Styles.CCAHeading}>
        <h1>Certified Chartered Accountants</h1>
        <p>
          Our accountants undergo a rigorous selection process, including
          comprehensive training and continuous professional development,
          ensuring quality meets the highest industry standards.
        </p>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className={Styles.card}>
              <div
                className={Styles.cardImg}
                style={{ position: "relative", width: "100%", height: "100px" }}
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination (for tablet & mobile) */}
      <div className="custom-pagination text-center"></div>
    </section>
  );
};

export default CCA;
