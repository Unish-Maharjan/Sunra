"use client";

import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScooterImage from "./ScooterImage";
import Button from "../ui/Button";

const Hero = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Cinematic initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(heroContentRef.current, {
        opacity: 0,
        y: 28,
        duration: 1.1,
      }).from(
        specsRef.current?.children || [],
        {
          opacity: 0,
          x: 20,
          stagger: 0.1,
          duration: 0.8,
        },
        "-=0.6"
      );
    },
    { scope: heroContentRef }
  );

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen pt-14 bg-[#0C0D0C] 
    overflow-x-clip flex flex-col justify-between select-none"
    >
      {/* Background Vertical MOPED Typography */}
      <div className="absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span
          className="font-heading font-black text-[11vw] tracking-[0.25em]
         text-white/[0.035] uppercase [writing-mode:vertical-rl] leading-none"
        >
          SUNRA
        </span>
      </div>

      {/* Main Hero Container */}
      <div
        className="relative z-10 max-w-360 mx-auto w-full px-8 xl:px-14
       pt-10 pb-6 flex-1 flex flex-col justify-between"
      >
        {/* Content Row */}
        <div className="relative w-full flex-1 flex items-center justify-between min-h-135">
          {/* LEFT: Headline & Story Introduction */}
          <div
            ref={heroContentRef}
            className="max-w-135 z-20 flex flex-col items-start"
          >
            {/* Small Eyebrow with Accent Badge */}
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
                THE FUTURE OF URBAN MOBILITY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-white tracking-tight mt-3 leading-[1.04]">
              RIDE THE FUTURE.
              <br />
              <span className="text-white/90">YOUR WAY.</span>
            </h1>

            {/* Short Supporting Copy - Human & Concise */}
            <p className="text-[#92958F] text-xs sm:text-sm font-sans font-normal max-w-95 mt-5 leading-relaxed">
              Everyday urban movement, made simpler, quieter, and effortlessly personal. Designed to bring freedom back to your daily commute.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                href="/order"
                variant="secondary"
                size="lg"
                className="uppercase tracking-wider font-semibold text-xs sm:text-sm shadow-lg 
                shadow-secondary/15 hover:shadow-secondary/25"
              >
                EXPLORE THE RIDES
              </Button>
            </div>
          </div>

          {/* CENTER: Dedicated Animated 3D Scooter Component */}
          <ScooterImage />

          {/* RIGHT: Floating Specification Cards */}
          <div
            ref={specsRef}
            className="hidden md:flex flex-col gap-4 z-20"
          >
            {/* Motor Power */}
            <div className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/5 border
             border-white/10 backdrop-blur-md min-w-50">
              <div
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center
                 justify-center
               text-white/80 shrink-0"
              >
                <svg
                  className="w-4 h-4 text-white/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-subtle text-[11px] font-medium leading-tight">
                  Motor Power
                </span>
                <span className="text-white font-bold text-sm leading-tight mt-0.5">
                  7000w
                </span>
              </div>
            </div>

            {/* Top Speed */}
            <div
              className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/5 
            border border-white/10 backdrop-blur-md min-w-50"
            >
              <div
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex 
                items-center justify-center
               text-white/80 shrink-0"
              >
                <FontAwesomeIcon
                  icon={faGaugeHigh}
                  className="w-3.5 h-3.5 text-white/90"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-subtle text-[11px] font-medium leading-tight">
                  Top Speed
                </span>
                <span className="text-white font-bold text-sm leading-tight mt-0.5">
                  75mph
                </span>
              </div>
            </div>

            {/* Range */}
            <div
              className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/5 
            border border-white/10 backdrop-blur-md min-w-50"
            >
              <div
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex 
                items-center justify-center
               text-white/80 shrink-0"
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="w-3.5 h-3.5 text-white/90"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-subtle text-[11px] font-medium leading-tight">
                  Range
                </span>
                <span className="text-white font-bold text-sm leading-tight mt-0.5">
                  85 miles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;