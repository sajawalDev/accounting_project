// app/TestimonialPage/page.jsx
"use client";

import Image from "next/image";
import Styles from "../../src/CSS/TestimonialPage.module.css";



const TestimonialPage = () => {
  const testimonials = [
    {
      img: "/assets/testimonials/img1.jpg",
      name: "Diana Maldonado",
      text: "I’ve been working with HAK Financials for over three years, and their expertise has been invaluable. They manage my QuickBooks bookkeeping clients, prepare financial statements, handle income tax filings, and provide exceptional back-office support. The team is professional, reliable, and genuinely committed to delivering quality work.",
    },
    {
      img: "/assets/testimonials/img2.jpg",
      name: "Shannon Whittington",
      text: "The HAK Financials team is incredible to work with. We’ve been collaborating for four years, and they are always professional, creative, and detail-oriented. Working with Haris has truly been a blessing—he’s a real asset!",
    },
    {
      img: "/assets/testimonials/img3.jpg",
      name: "Roszetta Pringle",
      text: "HAK Financials is highly skilled in accounting and back-office support. Their attention to detail and efficiency have made a noticeable difference in my business operations.",
    },
    {
      img: "/assets/testimonials/img4.jpg",
      name: "Dr. Arna Brammer",
      text: "HAK Financials has been an essential part of my business. Their financial expertise and professionalism have given me complete peace of mind.",
    },
    {
      img: "/assets/testimonials/img5.jpg",
      name: "Dr. Stephanie",
      text: "The HAK Financials team is extremely reliable and efficient. They manage my day-to-day operations, back-office support, and account management seamlessly.",
    },
    {
      img: "/assets/testimonials/img6.jpeg",
      name: "Martin",
      text: "Working with HAK Financials has been a great experience. They have helped me manage QuickBooks Online for several of my clients with accuracy, consistency, and professionalism.",
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
