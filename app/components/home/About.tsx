"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const partTwoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(partTwoRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: partTwoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full bg-white text-foreground
        py-28 md:py-36 xl:py-44 flex items-center justify-center overflow-x-clip select-none"
    >
      <div className="relative z-10 max-w-360 mx-auto w-full px-8 xl:px-14 flex flex-col items-start">
        {/* Background Vertical MOPED Typography */}
        <div className="absolute left-4 xl:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <span
            className="font-heading font-black text-[10vw] tracking-[0.25em]
           text-black/[0.035] uppercase [writing-mode:vertical-rl] leading-none"
          >
            SUNRA
          </span>
        </div>

        {/* Narrative Container aligned with Hero text column */}
        <div className="max-w-140 z-20 flex flex-col items-start">
          {/* PART 2: The Purpose / Resolution */}
          <div
            ref={partTwoRef}
            className="flex flex-col items-start w-full"
          >
            {/* Bridge Statement */}
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-[#B38300] uppercase">
              OUR PURPOSE
            </span>

            <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight leading-[1.08] mt-3">
              SO WE CHANGED THE WAY WE MOVE.
            </h3>

            {/* Supporting Explanation */}
            <p className="text-[#5F635E] text-xs sm:text-sm font-sans font-normal max-w-115 mt-5 leading-relaxed">
              Everyday journeys don&apos;t need to be complicated. Electric mobility brings a cleaner,
              quieter, and more natural rhythm back to modern streets personal transit built around your pace, not the traffic&apos;s.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                href="/vehicles"
                variant="primary"
                size="lg"
                className="uppercase font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg"
              >
                EXPLORE THE COLLECTION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;