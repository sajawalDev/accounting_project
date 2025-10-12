// app/TestimonialPage/page.jsx
"use client";

import Image from "next/image";
import Styles from "../../src/CSS/TestimonialPage.module.css";



const TestimonialPage = () => {
  const testimonials = [
    {
      img: "/assets/testimonials/img1.jpg",
      name: "Diana Maldonado",
      text: "I’ve been working with Haris for over three years, and his expertise has been invaluable. He manages my QuickBooks bookkeeping clients, prepares financial statements, handles income tax filings, and provides exceptional back-office support. He’s professional, reliable, and genuinely cares about delivering quality work.",
    },
    {
      img: "/assets/testimonials/img2.jpg",
      name: "Shannon Whittington",
      text: "Muhammad Haris and his team are incredible to work with. We’ve been collaborating for four years, and he’s always professional, creative, and detail-oriented. Finding Haris has truly been a blessing—he’s a gem!",
    },
    {
      img: "/assets/testimonials/img3.jpg",
      name: "Roszetta Pringle",
      text: "Haris is highly skilled in accounting and back-office support. His attention to detail and efficiency have made a noticeable difference in my business operations.",
    },
    {
      img: "/assets/testimonials/img4.jpg",
      name: "Dr. Arna Brammer",
      text: "Haris and his team at HAK Financials have been an essential part of my business. Their financial expertise and professionalism have provided me with peace of mind.",
    },
    {
      img: "/assets/testimonials/img5.jpg",
      name: "Dr. Stephanie",
      text: "Haris and his team are extremely reliable and efficient. They manage my day-to-day operations, back-office support, and account management seamlessly.",
    },
    {
      img: "/assets/testimonials/img6.jpeg",
      name: "Martin",
      text: "Working with Haris has been a great experience. He helped me manage QuickBooks Online for several of my clients with accuracy, consistency, and professionalism.",
    },
  ];

  return (
    <div className={`container py-5 ${Styles.testimonialPage}`}>
      <div className={Styles.Headingz}>
        <h1>Listen to Our Happy Clients</h1>
        <p className="my-3">
          Explore how our clients enhanced their financial workflows and
          secured lasting success using our expert-driven and custom solutions.
        </p>
      </div>

      <div className="row g-4">
        {testimonials.map((client, index) => (
          <div className="col-12 col-md-6" key={index}>
            <div className={Styles.card}>
              <Image
                src={client.img}
                alt={client.name}
                className={Styles.image}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
              <h3 className={Styles.name}>{client.name}</h3>
              <p className={Styles.text}>"{client.text}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialPage;
