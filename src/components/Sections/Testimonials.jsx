'use client';

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Styles from "../../CSS/Testimonials.module.css";

const Testimonials = () => {
    const testimonials = [
        {
            img: "/assets/testimonials/img1.jpg",
            name: "Diana Maldonado",
            text: "I’ve been working with HKFinance for over three years, and their expertise has been invaluable. They manage my QuickBooks bookkeeping clients, prepare financial statements, handle tax filings, and provide exceptional support.",
        },
        {
            img: "/assets/testimonials/img2.jpg",
            name: "Shannon Whittington",
            text: "The HKFinance team are incredible to work with. We’ve collaborated for four years, and they are always professional, creative, and detail-oriented. Finding Haris has been a blessing—he’s a gem!",
        },
        {
            img: "/assets/testimonials/img3.jpg",
            name: "Roszetta Pringle",
            text: "HKFinance are highly skilled in accounting and back-office support. Their attention to detail and efficiency have significantly improved my business operations.",
        },
        {
            img: "/assets/testimonials/img4.jpg",
            name: "Dr. Arna Brammer",
            text: "HKFinance have been an essential part of my business. Their financial expertise and professionalism give me peace of mind.",
        },
        {
            img: "/assets/testimonials/img5.jpg",
            name: "Dr. Stephanie",
            text: "HKFinance are extremely reliable and efficient. They manage my day-to-day operations, back-office support, and account management seamlessly.",
        },
        {
            img: "/assets/testimonials/img6.jpeg",
            name: "Martin",
            text: "Working with HKFinance has been a great experience. They helped me manage QuickBooks Online for several of my clients with accuracy, consistency, and professionalism.",
        },
    ];

    return (
        <div className={Styles.testimonialsSection}>
            <h1 className="text-center my-5">Testimonials</h1>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                speed={10000}
                freeMode={{ enabled: true, momentum: false }}   // ✅ fixed
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                allowTouchMove={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >

                {testimonials.map((client, index) => (
                    <SwiperSlide key={index}>
                        <div className={Styles.card}>
                            <div className={Styles.imageWrapper}>
                                <Image
                                    src={client.img}
                                    alt={client.name}
                                    fill
                                    unoptimized={true}
                                    className={Styles.image}
                                />
                            </div>
                            <h3 className={Styles.name}>{client.name}</h3>
                            <p className={Styles.text}>"{client.text}"</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-center my-3">
                <Link href="/testimonials" className={Styles.Moreoption}>
                    <span>See more </span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
            </div>
        </div>
    );
};

export default Testimonials;
