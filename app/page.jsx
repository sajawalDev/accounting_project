"use client";

import Banner from "../src/components/Sections/Banner";
import Trust from "../src/components/Sections/Trust";
import HowItWorks from "../src/components/Sections/HowItWorks";
import Expertise from "../src/components/Sections/Expertise";
import AppsAndAutomation from "../src/components/Sections/AppsAndAutomation";
import OurAccountants from "../src/components/Sections/OurAccountants";
import Cca from "../src/components/Sections/Cca";
import DataSecurity from "../src/components/Sections/DataSecurity";
import Faq from "../src/components/Sections/Faq";
import Testimonials from "../src/components/Sections/Testimonials";
import MouseSymbol from "@/components/MouseSymbol/page";


export default function Home() {
  return (
    <>
    <MouseSymbol/>
      <Banner />
      <Trust />
      <HowItWorks />
      <Expertise />
      <AppsAndAutomation />
      <OurAccountants />
      <Cca />
      <DataSecurity />
      <Faq />
      <Testimonials />
    </>
  );
}
