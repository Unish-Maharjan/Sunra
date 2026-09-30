"use client";

import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroScooter } from "./Heroscooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScooterScene = () => {
  const modelRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!modelRef.current) return;

    // Animate 3D model rotation from [0, -0.7, 0] to [0, 0.7, 0] on scroll down to About
    gsap.to(modelRef.current.rotation, {
      x: 0,
      y: 0.7,
      z: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#hero-section",
        endTrigger: "#about-section",
        start: "top top",
        end: "center center",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0.15, 6.4]} fov={36} />

      {/* Studio Lighting System */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[6, 8, 5]} intensity={2.8} castShadow />
      <directionalLight position={[-5, 4, 4]} intensity={1.6} />
      <directionalLight position={[0, 5, -5]} intensity={1.8} />
      <pointLight position={[4, 2, -2]} intensity={0.7} color="#FAC000" />

      {/* 3D Scooter Model: Initial rotation [0, -0.7, 0] in Hero */}
      <Center position={[0, -0.4, 0]}>
        <group ref={modelRef} rotation={[0, -0.7, 0]}>
          <HeroScooter scale={1.6} />
        </group>
      </Center>

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.88}
        scale={9}
        blur={2.6}
        far={3.8}
        resolution={512}
        color="#000000"
      />
    </>
  );
};

export const ScooterImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scooterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Smooth ScrollTrigger animation driving the 3D scooter container down from Hero into About
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          endTrigger: "#about-section",
          start: "top top",
          end: "center center",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scooterRef.current, {
        yPercent: 80,
        xPercent: 14,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 select-none overflow-visible"
    >
      <div className="relative max-w-360 mx-auto w-full h-full">
        {/* Animated Floating 3D Scooter Container */}
        <div
          ref={scooterRef}
          className="absolute left-1/2 top-1/2 translate-x-[-40%] translate-y-[-65%] 
          w-[720px] md:w-[860px] lg:w-[1020px] xl:w-[1180px] h-[600px] md:h-[700px] lg:h-[800px] 
          xl:h-[900px] flex items-center justify-center will-change-transform"
        >
          {/* Atmospheric Studio Glow - softer at the top, focused down to tires */}
          <div className="absolute -inset-x-16 top-16 -bottom-20 bg-[radial-gradient(ellipse_at_50%_62%,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.04)_40%,rgba(250,192,0,0.02)_58%,transparent_76%)] blur-3xl pointer-events-none -z-10" />

          {/* Lower Ground & Tire Area Glow */}
          <div className="absolute w-[85%] h-[50%] bottom-0 left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10)_0%,rgba(250,192,0,0.03)_40%,transparent_74%)] blur-2xl pointer-events-none -z-10" />

          {/* Subtle Ambient Aura */}
          <div className="absolute w-[80%] h-[75%] top-[18%] bg-linear-to-b from-white/4 via-white/2 to-transparent rounded-full blur-3xl -z-10" />

          {/* 3D Scooter Canvas */}
          <div className="w-full h-full">
            <Suspense fallback={null}>
              <Canvas
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                className="w-full h-full"
              >
                <ScooterScene />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScooterImage;
