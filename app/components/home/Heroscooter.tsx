"use client";

import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { GroupProps } from "@react-three/fiber";

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

export function HeroScooter(props: GroupProps) {
  const { nodes, materials } = useGLTF(
    "/3D/heroscooter.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.wheels_Wheel_0.geometry}
          material={materials.Wheel}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.second_color_Second_0.geometry}
          material={materials.Second}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.main_color_Base_0.geometry}
          material={materials.Base}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/3D/heroscooter.glb");

export default HeroScooter;