"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GLTFResult = GLTF & {
  nodes: {
    wheels_Wheel_0: THREE.Mesh;
    second_color_Second_0: THREE.Mesh;
    main_color_Base_0: THREE.Mesh;
  };
  materials: {
    Wheel: THREE.MeshStandardMaterial;
    Second: THREE.MeshStandardMaterial;
    Base: THREE.MeshStandardMaterial;
  };
};

export type HeroScooterProps = ThreeElements["group"] & {
  targetColor?: string;
  initialColor?: string;
};

export function HeroScooter({
  targetColor = "#E51924",
  initialColor = "#FFFFFF",
  ...props
}: HeroScooterProps) {
  const { nodes, materials } = useGLTF(
    "/3D/heroscooter.glb"
  ) as unknown as GLTFResult;

  // Clone materials to keep instances clean and allow smooth color tweening
  const clonedMaterials = useMemo(() => {
    if (!materials) return null;

    const wheel = materials.Wheel?.clone();
    if (wheel) {
      wheel.transparent = false;
      wheel.opacity = 1;
      wheel.depthWrite = true;
    }

    const second = materials.Second?.clone();
    if (second) {
      second.transparent = false;
      second.opacity = 1;
      second.depthWrite = true;
    }

    const base = materials.Base?.clone();
    if (base) {
      base.transparent = false;
      base.opacity = 1;
      base.depthWrite = true;
      // Clear white emissive so paint color is pure and reacts to scene lighting
      base.emissive = new THREE.Color(0x000000);
      base.emissiveIntensity = 0;
    }

    return { wheel, second, base };
  }, [materials]);

  // Smoothly animate base paint color to red as scooter reaches final position in About section
  useGSAP(() => {
    if (!clonedMaterials?.base) return;

    const baseMat = clonedMaterials.base;
    const startColorObj = new THREE.Color(initialColor);
    const endColorObj = new THREE.Color(targetColor);

    baseMat.color.set(startColorObj);

    gsap.to(baseMat.color, {
      r: endColorObj.r,
      g: endColorObj.g,
      b: endColorObj.b,
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
  }, [clonedMaterials, initialColor, targetColor]);

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.wheels_Wheel_0.geometry}
          material={clonedMaterials?.wheel || materials.Wheel}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.second_color_Second_0.geometry}
          material={clonedMaterials?.second || materials.Second}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.main_color_Base_0.geometry}
          material={clonedMaterials?.base || materials.Base}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3D/heroscooter.glb");

export default HeroScooter;