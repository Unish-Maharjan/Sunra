import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faGaugeHigh,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ScooterImage from "./ScooterImage";

const Hero = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen pt-14 bg-[#0C0D0C] 
    bg-[radial-gradient(ellipse_at_55%_48%,#1C1E1C_0%,#0E100E_55%,#080908_100%)] 
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
          {/* LEFT: Headline & Description */}
          <div className="max-w-135 z-20 flex flex-col items-start">
            {/* Top Label with Yellow Badge */}
            <div className="flex items-center gap-3">
              <span className="text-white text-3xl lg:text-4xl font-light font-heading tracking-tight">
                Best Quality
              </span>
              <span
                className="inline-flex items-center justify-center px-4 py-1 rounded-full border 
              border-secondary text-secondary"
              >
                <FontAwesomeIcon icon={faBolt} className="w-3 h-3" />
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-white 
            mt-3"
            >
              RIDE THE FUTURE. YOUR WAY.
            </h1>

            {/* Subtitle */}
            <p
              className="text-gray-500 text-xs sm:text-sm font-sans font-normal max-w-90 mt-5 
            leading-relaxed"
            >
              Discover electric scooters from leading brands, all in one place
            </p>

            {/* CTA Button */}
            <Link
              href="/order"
              className="mt-8 inline-flex items-center justify-center w-50 px-6 py-3 rounded-full
               bg-white/[0.07] border border-white/20 text-white font-heading
                 text-sm font-medium cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
            </Link>
          </div>

          {/* CENTER: Dedicated Animated Scooter Image Component */}
          <ScooterImage />

          {/* RIGHT: Floating Specification Cards */}
          <div className="hidden md:flex flex-col gap-4 z-20">
            {/* Motor Power */}
            <div className="flex items-center gap-4 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md min-w-50">
              <div
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
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
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
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
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
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