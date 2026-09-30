"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScooterImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scooterRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial entrance on page load
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entranceTl.from(scooterRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 1.1,
      });

      // 2. Smooth ScrollTrigger animation driving the scooter down from dark Hero into white About
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          endTrigger: "#about-section",
          start: "top top",
          end: "+=100%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.to(scooterRef.current, {
        yPercent: 105,
        xPercent: 30,
        scale: 1.05,
        ease: "power1.inOut",
      });

      // Fade out the Hero studio glow as it moves to About
      if (glowRef.current) {
        scrollTl.to(
          glowRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
          },
          0
        );
      }

      // Completely remove ground shadow in the final stage
      if (shadowRef.current) {
        scrollTl.to(
          shadowRef.current,
          {
            opacity: 0,
            scaleX: 0.5,
            scaleY: 0,
            ease: "power1.inOut",
          },
          0
        );
      }

      // Completely remove image drop-shadow in the final stage
      if (imageInnerRef.current) {
        scrollTl.to(
          imageInnerRef.current,
          {
            filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
            ease: "power1.inOut",
          },
          0
        );
      }

      // 3. Cleanly fade out when scrolling past About section so it never overlaps Categories
      gsap.to(scooterRef.current, {
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: "#about-section",
          start: "bottom 75%",
          end: "bottom 25%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20 select-none overflow-visible"
    >
      <div className="relative max-w-360 mx-auto w-full h-full">
        {/* Animated Floating Scooter Container */}
        <div
          ref={scooterRef}
          className="absolute left-1/2 top-1/2 -translate-x-[42%] -translate-y-[52%] 
          w-[270px] sm:w-[370px] md:w-[450px] lg:w-[510px] xl:w-[570px] 2xl:w-[630px] 
          flex flex-col items-center justify-center will-change-transform"
        >
          {/* Luminous Studio Backlight & Atmosphere Glow for Hero */}
          <div
            ref={glowRef}
            className="absolute -inset-x-24 top-0 -bottom-16 pointer-events-none -z-10"
          >
            {/* Primary radiant aura */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(255,255,255,0.22)_0%,rgba(250,192,0,0.10)_36%,rgba(250,192,0,0.03)_58%,transparent_75%)] blur-3xl" />
            {/* Core bright ambient disc */}
            <div className="absolute w-[80%] h-[75%] top-[12%] left-[10%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,transparent_68%)] blur-2xl" />
          </div>

          {/* Scooter Image with animated drop-shadow */}
          <div
            ref={imageInnerRef}
            className="relative w-full aspect-square flex items-center justify-center will-change-[filter]"
            style={{ filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.65))" }}
          >
            <Image
              src="/image/heroscooter copy.png"
              alt="Sunra Electric Scooter"
              fill
              priority
              sizes="(max-width: 640px) 270px, (max-width: 768px) 370px, (max-width: 1024px) 450px, 630px"
              className="object-contain"
            />
          </div>

          {/* Ground Soft Contact Shadow (fades to 0 in final stage) */}
          <div
            ref={shadowRef}
            className="w-[72%] h-6 -mt-8 sm:-mt-10 lg:-mt-14 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.35)_45%,transparent_72%)] blur-md rounded-full pointer-events-none will-change-[opacity,transform]"
          />
        </div>
      </div>
    </div>
  );
};

export default ScooterImage;
