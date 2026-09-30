"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    image: "/image/products/miku_super_stage.png",
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
    image: "/image/products/hawk_stage.png",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const total = BEST_SELLERS.length;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length === 0) return;

      // Initialize all slide opacities and transforms
      slides.forEach((slide, idx) => {
        const image = slide.querySelector(".product-image-container");
        const content = slide.querySelector(".product-content-container");

        if (idx === 0) {
          gsap.set(slide, { opacity: 1, pointerEvents: "auto", visibility: "visible" });
          if (image) gsap.set(image, { opacity: 1, scale: 1, y: 0 });
          if (content) gsap.set(content, { opacity: 1, y: 0 });
        } else {
          gsap.set(slide, { opacity: 0, pointerEvents: "none", visibility: "hidden" });
          if (image) gsap.set(image, { opacity: 0, scale: 0.92, y: 40 });
          if (content) gsap.set(content, { opacity: 0, y: 30 });
        }
      });

      // Total scroll distance for the pinned sequence
      const scrollDistance = (total - 1) * (typeof window !== "undefined" ? window.innerHeight : 900) * 1.1;

      // Master Timeline pinned to section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const computedIndex = Math.min(
              total - 1,
              Math.max(0, Math.floor(progress * total + 0.05))
            );
            setActiveIndex(computedIndex);
          },
        },
      });

      triggerRef.current = tl.scrollTrigger ?? null;

      // Build transitions between each product
      for (let i = 0; i < total - 1; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];

        const currentImg = currentSlide?.querySelector(".product-image-container");
        const currentContent = currentSlide?.querySelector(".product-content-container");
        const nextImg = nextSlide?.querySelector(".product-image-container");
        const nextContent = nextSlide?.querySelector(".product-content-container");

        const stepLabel = `step_${i}`;
        tl.addLabel(stepLabel);

        // Current product exits
        if (currentImg) {
          tl.to(
            currentImg,
            {
              opacity: 0,
              scale: 1.04,
              y: -30,
              duration: 1.0,
              ease: "power2.in",
            },
            stepLabel
          );
        }

        if (currentContent) {
          tl.to(
            currentContent,
            {
              opacity: 0,
              y: -20,
              duration: 0.8,
              ease: "power2.in",
            },
            stepLabel
          );
        }

        tl.to(
          currentSlide,
          {
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
            duration: 0.1,
          },
          `${stepLabel}+=0.8`
        );

        // Next product enters
        tl.to(
          nextSlide,
          {
            opacity: 1,
            visibility: "visible",
            pointerEvents: "auto",
            duration: 0.1,
          },
          `${stepLabel}+=0.5`
        );

        if (nextImg) {
          tl.fromTo(
            nextImg,
            { opacity: 0, scale: 0.92, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" },
            `${stepLabel}+=0.5`
          );
        }

        if (nextContent) {
          tl.fromTo(
            nextContent,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
            `${stepLabel}+=0.65`
          );
        }
      }
    },
    { scope: sectionRef }
  );

  // Smooth scroll jump when clicking product indicator (01, 02, 03, 04)
  const handleJumpToProduct = useCallback(
    (targetIndex: number) => {
      if (!triggerRef.current) return;
      const st = triggerRef.current;
      const progressTarget = targetIndex / (total - 1);
      const scrollPos = st.start + progressTarget * (st.end - st.start);

      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    },
    [total]
  );

  return (
    <section
      ref={sectionRef}
      id="best-sellers-section"
      className="relative w-full h-screen min-h-[640px] bg-[#0C0D0C] select-none overflow-hidden flex flex-col justify-between"
    >
      {/* ============================================================
          1. PERMANENT GARAGE BACKGROUND STAGE (High Visibility)
         ============================================================ */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        <Image
          src="/image/garage.jpg"
          alt="Sunra Engineering Garage Stage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.96] contrast-[1.04]"
        />

        {/* Subtle, Balanced Ambient Vignette (Keeps Garage Bright & Clearly Visible) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/55 pointer-events-none"
        />
      </div>

      {/* ============================================================
          2. EDITORIAL SECTION HEADER (Top Bar)
         ============================================================ */}
      <header className="relative z-30 max-w-360 mx-auto w-full px-6 sm:px-10 lg:px-16 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex flex-col items-start drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="font-heading text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#E5B558] uppercase">
            BEST SELLERS
          </span>
          <h2 className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl text-white tracking-tight mt-0.5">
            Built to move with you.
          </h2>
        </div>

        {/* Top Series Counter Indicator */}
        <div className="flex items-center gap-2 text-xs font-heading tracking-widest text-white/80 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
          <span className="text-[#E5B558] font-bold text-sm sm:text-base">
            {BEST_SELLERS[activeIndex].seriesNumber}
          </span>
          <span>/</span>
          <span>0{total}</span>
        </div>
      </header>

      {/* ============================================================
          3. PRODUCT SHOWCASE STAGE (One Product Owns Entire Viewport)
         ============================================================ */}
      <div className="relative z-20 flex-1 max-w-360 mx-auto w-full px-6 sm:px-10 lg:px-16 flex items-center justify-center">
        {BEST_SELLERS.map((product, idx) => {
          return (
            <div
              key={product.id}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-14 py-4 lg:py-8 will-change-transform"
            >
              {/* --------------------------------------------------------
                  LEFT: Large Vehicle Standing Naturally on Garage Floor
                 -------------------------------------------------------- */}
              <div className="product-image-container relative flex-1 w-full h-[42vh] sm:h-[50vh] lg:h-[68vh] flex flex-col items-center justify-end will-change-transform select-none">
                {/* Vehicle Cutout Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    className="object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Ground Contact Shadow on Concrete Floor */}
                <div
                  aria-hidden="true"
                  className="w-[75%] sm:w-[65%] lg:w-[70%] h-6 sm:h-8 lg:h-10 -mt-3 sm:-mt-5 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.5)_50%,transparent_75%)] blur-md sm:blur-lg rounded-full pointer-events-none"
                />
              </div>

              {/* --------------------------------------------------------
                  RIGHT: Editorial Product Information with Crisp Frosted Backdrop
                 -------------------------------------------------------- */}
              <div className="product-content-container relative w-full lg:w-[460px] xl:w-[500px] shrink-0 flex flex-col justify-center text-white will-change-transform p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
                {/* Category Tag & Badge */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#E5B558] uppercase">
                    {product.category}
                  </span>
                  <span className="h-2.5 w-px bg-white/30" />
                  <span className="text-[11px] text-white/70 tracking-wider font-heading uppercase">
                    SERIES {product.seriesNumber}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-heading font-black text-3xl sm:text-4xl xl:text-5xl text-white tracking-tight leading-[1.05]">
                  {product.name}
                </h3>

                {/* Narrative Description */}
                <p className="text-white/80 text-xs sm:text-sm xl:text-base font-sans mt-2.5 leading-relaxed max-w-120">
                  {product.description}
                </p>

                {/* 4-Stat Telemetry Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 sm:gap-3 my-4 pt-4 border-t border-white/15">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2.5 sm:p-3 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 flex flex-col"
                    >
                      <span className="font-heading font-black text-sm sm:text-base lg:text-lg text-white tracking-tight">
                        {spec.value}
                      </span>
                      <span className="text-white/50 text-[9px] sm:text-[10px] tracking-widest font-heading uppercase mt-0.5">
                        {spec.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price and Action CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <div className="flex flex-col">
                    <span className="text-white/50 text-[10px] uppercase font-heading tracking-widest">
                      Starting Price
                    </span>
                    <span className="font-heading font-black text-xl sm:text-2xl text-white">
                      {product.price}
                    </span>
                  </div>

                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#0C0D0C] font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#E5B558] hover:text-[#0C0D0C] transition-all duration-300 shadow-xl group"
                  >
                    <span>EXPLORE PRODUCT</span>
                    <svg
                      className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33337 8H12.6667M12.6667 8L8.66671 4M12.6667 8L8.66671 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          4. VERTICAL PRODUCT NAVIGATION (Right Viewport Edge)
         ============================================================ */}
      <aside
        aria-label="Product Navigation"
        className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-4 bg-black/40 backdrop-blur-md py-4 px-2.5 rounded-full border border-white/10 shadow-lg"
      >
        {BEST_SELLERS.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => handleJumpToProduct(idx)}
              aria-label={`Scroll to product ${item.name}`}
              className="group flex items-center gap-2 cursor-pointer py-1 select-none"
            >
              {/* Visual Label */}
              <span
                className={`font-heading font-bold text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-[#E5B558] scale-115 opacity-100"
                    : "text-white/40 group-hover:text-white/80 opacity-60"
                }`}
              >
                {item.seriesNumber}
              </span>

              {/* Progress Bar Indicator */}
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-[#E5B558]"
                    : "w-2 bg-white/30 group-hover:bg-white/60 group-hover:w-3.5"
                }`}
              />
            </button>
          );
        })}
      </aside>
    </section>
  );
};

export default BestSellers;