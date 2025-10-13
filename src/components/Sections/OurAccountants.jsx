'use client';

import Image from "next/image";

const OurAccountants = () => {
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
        <div className="col" style={{ position: "relative", width: "100%", height: '500px' }}>
          <Image
            src="/assets/expertiselevel.jpg"
            alt="Our Accountant Levels"
            fill
            style={{ objectFit: "contain" }}
            priority
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default OurAccountants;
