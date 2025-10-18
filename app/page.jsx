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
import AnimatedSection from "@/components/Animation/page";

export default function Home() {
  return (
    <>
      <MouseSymbol />

      <AnimatedSection><Banner /></AnimatedSection>
      <AnimatedSection delay={0.2}><Trust /></AnimatedSection>
      <AnimatedSection delay={0.3}><HowItWorks /></AnimatedSection>
      <AnimatedSection delay={0.4}><Expertise /></AnimatedSection>
      <AnimatedSection delay={0.5}><AppsAndAutomation /></AnimatedSection>
      <AnimatedSection delay={0.6}><OurAccountants /></AnimatedSection>
      <AnimatedSection delay={0.7}><Cca /></AnimatedSection>
      <AnimatedSection delay={0.8}><DataSecurity /></AnimatedSection>
      <AnimatedSection delay={0.9}><Faq /></AnimatedSection>
      <AnimatedSection delay={1.0}><Testimonials /></AnimatedSection>
    </>
  );
}
