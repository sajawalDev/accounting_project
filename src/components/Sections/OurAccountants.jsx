'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

const OurAccountants = () => {
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth < 600 ? 300 : 600);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="text-center">
        <h1>Our Accountants</h1>
        <p className="my-4">
          As per your budget plan and the skill set you require from your
          virtual accountant, you can choose a junior, mid, or senior level
          accountant.
        </p>
      </div>

      <div className="row">
        <div
          className="col"
          style={{ position: "relative", width: "100%", height: `${height}px` }}
        >
          <Image
            src="/assets/expertiselevel.JPG"
            alt="Our Accountant Levels"
            fill
            style={{ objectFit: "contain" }}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default OurAccountants;
