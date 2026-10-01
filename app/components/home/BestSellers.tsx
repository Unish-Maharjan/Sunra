"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  seriesNumber: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  specs: Spec[];
  href: string;
}

const BEST_SELLERS: Product[] = [
  {
    id: "robo-s",
    name: "SUNRA ROBO-S",
    category: "DUAL BATTERY COMMUTER",
    seriesNumber: "01",
    tagline: "Intelligent Metropolitan Flagship",
    description:
      "Dual 72V lithium platform engineered for instantaneous torque, keyless fingerprint biometric activation, and 135 km real-world city range.",
    image: "/image/products/robo_s_stage.png",
    price: "$3,290",
    specs: [
      { label: "RANGE", value: "135 KM" },
      { label: "TOP SPEED", value: "80 KM/H" },
      { label: "POWER", value: "4000W" },
      { label: "CHARGING", value: "4.0 HRS" },
    ],
    href: "/vehicles?model=robo-s",
  },
  {
    id: "miku-super",
    name: "SUNRA MIKU SUPER",
    category: "URBAN SPORT MOTO",
    seriesNumber: "02",
    tagline: "Floating Monoshock Architecture",
    description:
      "Radical naked-street geometry featuring dual-motor dynamics, high-visibility LED matrix illumination, and CBS performance disc braking.",
    image: "/image/product1.png",
    price: "$2,890",
    specs: [
      { label: "RANGE", value: "100 KM" },
      { label: "TOP SPEED", value: "80 KM/H" },
      { label: "POWER", value: "3000W" },
      { label: "CHARGING", value: "3.5 HRS" },
    ],
    href: "/vehicles?model=miku-super",
  },
  {
    id: "crystal",
    name: "SUNRA CRYSTAL",
    category: "NEO-RETRO CLASSIC",
    seriesNumber: "03",
    tagline: "Timeless European Silhouette",
    description:
      "A seamless fusion of vintage Italian lines and modern high-efficiency BOSCH electric powertrain for effortless metropolitan cruising.",
    image: "/image/heroscooter copy.png",
    price: "$1,990",
    specs: [
      { label: "RANGE", value: "65 KM" },
      { label: "TOP SPEED", value: "45 KM/H" },
      { label: "POWER", value: "2000W" },
      { label: "CHARGING", value: "4.0 HRS" },
    ],
    href: "/vehicles?model=crystal",
  },
  {
    id: "hawk",
    name: "SUNRA HAWK",
    category: "DYNAMIC SMART COMMUTER",
    seriesNumber: "04",
    tagline: "Integrated Audio & Telemetry",
    description:
      "Built-in Bluetooth stereo acoustic system, digital cockpit, and dual-speed performance tailored for high-energy city riders.",
    image: "/image/.png",
    price: "$2,190",
    specs: [
      { label: "RANGE", value: "80 KM" },
      { label: "TOP SPEED", value: "45 KM/H" },
      { label: "POWER", value: "1800W" },
      { label: "CHARGING", value: "3.5 HRS" },
    ],
    href: "/vehicles?model=hawk",
  },
];

export const BestSellers: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = BEST_SELLERS.length;

  const handleNext = useCallback(() => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleGoTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? "next" : "prev");
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Autoplay carousel every 6 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="best-sellers-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full lg:py-28 bg-[#0C0D0C] select-none overflow-hidden 
      flex flex-col justify-between"
    >
      {/* Background Vertical MOPED Typography */}
      <div className="absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-heading font-black text-[11vw] tracking-[0.25em] text-white/[0.035] uppercase [writing-mode:vertical-rl] leading-none">
          SUNRA
        </span>
      </div>

      {/* 1. PERMANENT GARAGE BACKGROUND COVER */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/image/garage.jpg"
          alt="Sunra Engineering Garage Stage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.95] contrast-[1.05]"
        />

        {/* Ambient Vignette & Gradient Overlays for Readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/45 pointer-events-none"
        />
      </div>

      {/* 2. DEDICATED EDITORIAL SECTION HEADING (Styled like Hero & About) */}
      <div className="relative z-10 max-w-360 mx-auto w-full px-8 xl:px-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 lg:pb-8">
        <div className="max-w-140 flex flex-col items-start">
          {/* Eyebrow Accent Badge */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
              BEST SELLERS
            </span>
          </div>

          {/* Main Section Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-white tracking-tight mt-3 leading-[1.06]">
            BUILT TO MOVE WITH YOU.
          </h2>
        </div>

        {/* Series Counter Badge */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-secondary font-heading font-bold text-sm sm:text-base">
            {BEST_SELLERS[activeIndex].seriesNumber}
          </span>
          <span className="text-white/40 text-xs font-heading">/</span>
          <span className="text-white/70 text-xs font-heading">0{total}</span>
        </div>
      </div>

      {/* 3. PRODUCT CAROUSEL SHOWCASE STAGE WITH LEFT & RIGHT CONTROLS */}
      <div className="relative z-20 max-w-360 mx-auto w-full px-8 xl:px-14 min-h-[580px] sm:min-h-[640px]
       lg:min-h-[700px] flex items-center justify-center my-4">
        {/* Floating LEFT Carousel Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Product Slide"
          className="absolute left-2 sm:left-4 xl:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full
           bg-black/60 backdrop-blur-xl border border-white/15 hover:border-secondary hover:bg-secondary hover:text-[#0C0D0C] 
           text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl active:scale-90 group"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Floating RIGHT Carousel Button */}
        <button
          onClick={handleNext}
          aria-label="Next Product Slide"
          className="absolute right-2 sm:right-4 xl:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14
           rounded-full bg-black/60 backdrop-blur-xl border border-white/15 hover:border-secondary hover:bg-secondary 
           hover:text-[#0C0D0C] text-white flex items-center justify-center transition-all duration-300 cursor-pointer
            shadow-2xl active:scale-90 group"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Product Slides */}
        {BEST_SELLERS.map((product, idx) => {
          const isActive = activeIndex === idx;

          // Compute directional translate classes based on navigation direction
          const contentTranslateInitial =
            direction === "next" ? "translate-x-16" : "-translate-x-16";
          const contentTranslateExit =
            direction === "next" ? "-translate-x-16" : "translate-x-16";

          const imageTranslateInitial =
            direction === "next" ? "translate-x-24" : "-translate-x-24";
          const imageTranslateExit =
            direction === "next" ? "-translate-x-24" : "translate-x-24";

          return (
            <div
              key={product.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8
                 lg:gap-14 px-8 sm:px-14 xl:px-20 py-2 transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 pointer-events-auto visible z-10"
                  : "opacity-0 pointer-events-none invisible z-0"
              }`}
            >
              {/* LEFT: Editorial Product Information with directional slide animation */}
              <div
                className={`product-content-container relative w-full lg:w-[440px] xl:w-[480px] 
                  shrink-0 flex flex-col justify-center text-white mr-10 transition-all duration-700 
                  ease-out delay-75 ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : `${direction === "next" ? contentTranslateExit : contentTranslateInitial} opacity-0`
                }`}
              >
                <div className="pl-20">
                {/* Product Name */}
                <h3 className="font-heading font-black text-3xl sm:text-4xl xl:text-5xl text-white 
                tracking-tight">
                  {product.name}
                </h3>

                {/* Narrative Description */}
                <p className="text-white text-xs sm:text-sm xl:text-base font-sans mt-2.5 leading-relaxed max-w-120">
                  {product.description}
                </p>

                {/* 4-Stat Telemetry Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3 my-5 pt-4">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col"
                    >
                      <span className="font-heading font-black text-base sm:text-lg lg:text-xl text-white tracking-tight">
                        {spec.value}
                      </span>
                      <span className="text-foreground-subtle text-[9px] sm:text-[10px] tracking-widest font-heading uppercase mt-0.5">
                        {spec.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price and Action CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/15">
                  <div className="flex flex-col">
                    <span className="text-foreground-subtle text-[10px] uppercase font-heading tracking-widest">
                      Starting Price
                    </span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                      {product.price}
                    </span>
                  </div>

                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary text-[#0C0D0C] font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary-hover hover:text-[#0C0D0C] transition-all duration-300 shadow-xl group"
                  >
                    <span>EXPLORE PRODUCT</span>
                  </Link>
                </div>
                </div>
              </div>

              {/* RIGHT: Large Vehicle with directional entrance/exit */}
              <div
                className={`product-image-container relative flex-1 w-full lg:w-3/5 h-[46vh] sm:h-[56vh] lg:h-[70vh]
                   xl:h-[76vh] flex flex-col items-center justify-end select-none transition-all duration-700 ease-out delay-150 ${
                  isActive
                    ? "translate-x-0 opacity-100 scale-100"
                    : `${direction === "next" ? imageTranslateExit : imageTranslateInitial} opacity-0 scale-95`
                }`}
              >
                {/* Vehicle Cutout Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 95vw, 65vw"
                    className="object-contain object-bottom drop-shadow-[0_28px_45px_rgba(0,0,0,0.95)]"
                  />
                </div>

                {/* Ground Contact Shadow on Concrete Floor */}
                <div
                  aria-hidden="true"
                  className="w-[85%] sm:w-[80%] lg:w-[85%] h-8 sm:h-10 lg:h-14 -mt-4 sm:-mt-6 
                  bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.5)_50%,transparent_75%)] blur-md sm:blur-lg
                   rounded-full pointer-events-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellers;