import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollField } from "../../lib/scrollField";

/**
 * Ambient stellar field — baked points + scroll-reactive transforms.
 * Scroll drives spin, tilt, scale, and a subtle drift (GPU-cheap).
 */
export default function StellarSwarm({ count = 480, radius = 40 }) {
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const smooth = useRef({
    progress: 0,
    velocity: 0,
    spin: 0,
  });

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = i / count;
      const h1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      const h2 = Math.abs(Math.sin(i * 78.233) * 12543.123) % 1;
      const h3 = Math.abs(Math.sin(i * 45.164) * 98765.432) % 1;

      const theta = h1 * Math.PI * 2;
      const cphi = h2 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      const layer =
        t < 0.2 ? 0.18 : t < 0.45 ? 0.35 : t < 0.7 ? 0.55 : t < 0.88 ? 0.72 : 0.95;
      const rr = radius * layer * (0.85 + h3 * 0.3);

      positions[i3] = rr * sphi * Math.cos(theta);
      positions[i3 + 1] = rr * sphi * Math.sin(theta);
      positions[i3 + 2] = rr * cphi;

      const light = 0.28 + h3 * 0.35;
      color.setHSL(0.09, 0.38, light);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [count, radius]);

  materialRef.current = material;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const s = smooth.current;
    const dt = Math.min(delta, 0.05);

    s.progress += (scrollField.progress - s.progress) * Math.min(1, dt * 8);
    s.velocity += (scrollField.velocity - s.velocity) * Math.min(1, dt * 10);

    const speedBoost = 1 + Math.min(4, Math.abs(s.velocity) * 90);
    s.spin += dt * 0.035 * speedBoost + s.velocity * 1.8;

    // Scroll progress: deeper into the page → more tilt + orbit
    group.rotation.y = s.spin + s.progress * 1.65;
    group.rotation.x = 0.08 + s.progress * 0.55 + Math.sin(state.clock.elapsedTime * 0.25) * 0.03;
    group.rotation.z = s.velocity * 6 + Math.sin(s.progress * Math.PI) * 0.08;

    // Fling expands the field slightly; settles back when idle
    const fling = Math.min(0.14, Math.abs(s.velocity) * 12);
    const targetScale = 1 + fling + s.progress * 0.06;
    group.scale.setScalar(group.scale.x + (targetScale - group.scale.x) * Math.min(1, dt * 6));

    // Drift toward camera as you scroll down
    state.camera.position.z = 95 - s.progress * 22 - fling * 18;
    state.camera.lookAt(0, 0, 0);

    if (materialRef.current) {
      materialRef.current.opacity = 0.58 + s.progress * 0.18 + fling * 0.35;
      materialRef.current.size = 0.48 + fling * 0.55;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}
