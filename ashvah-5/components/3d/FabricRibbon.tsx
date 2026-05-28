"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Hero 3D fabric scene — two overlapping cloth sheets drifting in a soft-lit
 * studio with subtle atmospheric fog for depth. The primary sheet reacts to
 * cursor + scroll; the secondary drifts autonomously so the scene breathes
 * even when idle. Tuned to read as premium white/grey textile on bone.
 */

function ClothSheet({
  size,
  segments,
  color,
  roughness,
  speed,
  amplitude,
  opacity = 1,
  reactive = false,
  rotationBase = -0.25,
}: {
  size: [number, number];
  segments: [number, number];
  color: string;
  roughness: number;
  speed: number;
  amplitude: number;
  opacity?: number;
  reactive?: boolean;
  rotationBase?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(size[0], size[1], segments[0], segments[1]),
    [size, segments]
  );

  const original = useMemo(() => {
    const pos = geometry.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    const pos = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pos.length; i += 3) {
      const ox = original[i];
      const oy = original[i + 1];
      const w1 = Math.sin(ox * 1.2 + t * 0.9) * amplitude;
      const w2 = Math.cos(oy * 2.0 + t * 0.6) * (amplitude * 0.5);
      const w3 = Math.sin((ox + oy) * 0.7 + t * 0.4) * (amplitude * 0.7);
      pos[i + 2] = w1 + w2 + w3;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    if (reactive) {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const scrollTilt = Math.min(scrollY / 1200, 1) * 0.5;
      target.current.x = THREE.MathUtils.lerp(
        target.current.x,
        state.pointer.y * 0.15 + scrollTilt,
        0.04
      );
      target.current.y = THREE.MathUtils.lerp(
        target.current.y,
        state.pointer.x * 0.2,
        0.04
      );
      meshRef.current.rotation.x = rotationBase + target.current.x;
      meshRef.current.rotation.y = target.current.y;
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        roughness={roughness}
        metalness={0}
        clearcoat={0.05}
        clearcoatRoughness={0.85}
        sheen={1}
        sheenRoughness={0.8}
        sheenColor="#FFFFFF"
        transparent={opacity < 1}
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SceneFog() {
  const { scene } = useThree();
  useMemo(() => {
    scene.fog = new THREE.Fog("#FAF9F6", 6, 14);
  }, [scene]);
  return null;
}

function Scene() {
  return (
    <>
      <SceneFog />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#E8E6E0" />
      <Environment preset="studio" />

      <group position={[1.2, -0.4, -2.2]} rotation={[0, -0.4, 0.15]}>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
          <ClothSheet
            size={[5, 1.8]}
            segments={[60, 20]}
            color="#ECEBE6"
            roughness={0.8}
            speed={0.7}
            amplitude={0.14}
            opacity={0.5}
          />
        </Float>
      </group>

      <group position={[0, 0, 0]}>
        <ClothSheet
          size={[6, 2.2]}
          segments={[80, 28]}
          color="#F5F4F1"
          roughness={0.65}
          speed={1}
          amplitude={0.18}
          reactive
        />
      </group>
    </>
  );
}

export function FabricRibbon() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
