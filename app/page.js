"use client";

import { useCallback, useState } from "react";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  // Held false until the preloader curtain lifts, so the hero's entrance
  // animation plays for the visitor instead of behind the overlay.
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <>
      <SmoothScroll />
      <Preloader onDone={handleReady} />
      <Cursor />
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero start={ready} />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
