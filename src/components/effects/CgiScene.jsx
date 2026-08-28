import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  QuadraticBezierLine,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#a8906c";
const SAGE = "#8e8880";
const CREAM = "#f0ebe3";

/** Living LLM core — organic distortion + inner lattice */
function LLMCore({ scrollY }) {
  const shellRef = useRef(null);
  const glowRef = useRef(null);

  useFrame(({ clock }) => {
    const breathe = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
    const scrollDim = Math.max(0.7, 1 - scrollY / 1200);

    if (shellRef.current) {
      shellRef.current.rotation.y = clock.elapsedTime * 0.1;
      shellRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.12;
      shellRef.current.scale.setScalar(breathe);
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.1) * 0.04;
      glowRef.current.scale.setScalar((1.35 + Math.sin(clock.elapsedTime * 0.6) * 0.08) * scrollDim);
    }
  });

  return (
    <Float speed={0.85} rotationIntensity={0.1} floatIntensity={0.22}>
      <group>
        <mesh>
          <sphereGeometry args={[0.46, 48, 48]} />
          <MeshDistortMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.42}
            distort={0.18}
            speed={1.6}
            roughness={0.12}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh ref={shellRef} scale={1.12}>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshBasicMaterial color={CREAM} wireframe transparent opacity={0.1} />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.62, 24, 24]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.1} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}

/** Tilted orbit — “reasoning loop” around the core */
function OrbitalHalo() {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2.35 + Math.sin(clock.elapsedTime * 0.28) * 0.06;
    ref.current.rotation.z = clock.elapsedTime * 0.045;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.95, 0.014, 8, 96]} />
      <meshBasicMaterial color={CREAM} transparent opacity={0.32} />
    </mesh>
  );
}

const CHUNK_SLOTS = [
  { angle: -0.5, radius: 3.1, y: 0.2, lift: 0.85 },
  { angle: 1.8, radius: 3.25, y: -0.15, lift: 1.05 },
  { angle: 3.6, radius: 3.15, y: 0.1, lift: 0.75 },
];

/** Curved retrieval arc with a single traveling pulse */
function RetrievalArc({ start, lift, phase }) {
  const pulseRef = useRef(null);
  const mid = useMemo(
    () => [start[0] * 0.38, start[1] + lift, start[2] * 0.38],
    [start, lift]
  );

  const curve = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(0, 0, 0);
    const m = new THREE.Vector3(...mid);
    return new THREE.QuadraticBezierCurve3(s, m, e);
  }, [start, mid]);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = (Math.sin(clock.elapsedTime * 1.15 + phase) + 1) / 2;
    pulseRef.current.position.copy(curve.getPoint(t));
  });

  return (
    <group>
      <QuadraticBezierLine
        start={start}
        end={[0, 0, 0]}
        mid={mid}
        color={ACCENT}
        lineWidth={0.55}
        transparent
        opacity={0.22}
        dashed
        dashSize={0.12}
        gapSize={0.08}
      />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function KnowledgeChunks() {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.022;
  });

  return (
    <group ref={group}>
      {CHUNK_SLOTS.map((slot, i) => {
        const x = Math.cos(slot.angle) * slot.radius;
        const z = Math.sin(slot.angle) * slot.radius;
        const start = [x, slot.y, z];
        return (
          <group key={i}>
            <group position={start}>
              <Float speed={1.2 + i * 0.15} rotationIntensity={0.35} floatIntensity={0.25}>
                <RoundedBox args={[0.3, 0.4, 0.045]} radius={0.018} smoothness={3}>
                  <meshStandardMaterial
                    color={CREAM}
                    emissive={i === 1 ? SAGE : CREAM}
                    emissiveIntensity={0.14}
                    metalness={0.55}
                    roughness={0.38}
                    transparent
                    opacity={0.78}
                  />
                </RoundedBox>
              </Float>
            </group>
            <RetrievalArc start={start} lift={slot.lift} phase={i * 1.4} />
          </group>
        );
      })}
    </group>
  );
}

/** Embedding helix — vectors spiraling into the knowledge base */
function EmbeddingHelix() {
  const ref = useRef(null);
  const count = 14;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = t * Math.PI * 2.2;
      const r = 2.9 - t * 0.6;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = -1.4 + t * 2.2;
      arr[i * 3 + 2] = -1.6 + Math.sin(angle) * 0.25;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.018;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.034}
          color={SAGE}
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/** Soft outer ring — production pipeline boundary */
function PipelineAura() {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2;
    ref.current.rotation.z = clock.elapsedTime * 0.025;
    const s = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.015;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.35, 0.01, 6, 80]} />
      <meshBasicMaterial color={SAGE} transparent opacity={0.14} />
    </mesh>
  );
}

export default function CgiScene({ scrollY = 0 }) {
  const root = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!root.current) return;
    const t = clock.elapsedTime;
    root.current.rotation.y = t * 0.028 + mouse.current.x * 0.12 + scrollY * 0.00014;
    root.current.rotation.x = mouse.current.y * 0.05 + scrollY * 0.00007;
    root.current.position.y = -scrollY * 0.0012;
  });

  return (
    <>
      <fog attach="fog" args={["#0a0908", 8, 24]} />
      <ambientLight intensity={0.24} />
      <pointLight position={[4, 3, 5]} color={ACCENT} intensity={10} distance={24} />
      <pointLight position={[-5, -2, 4]} color={SAGE} intensity={6} distance={22} />
      <spotLight
        position={[0, 5, 3]}
        angle={0.5}
        penumbra={1}
        color={CREAM}
        intensity={0.45}
      />

      <group ref={root} position={[2.4, 0.1, 0]}>
        <PipelineAura />
        <EmbeddingHelix />
        <OrbitalHalo />
        <LLMCore scrollY={scrollY} />
        <KnowledgeChunks />
      </group>

      <Sparkles
        count={18}
        scale={[4, 3, 3]}
        size={1.6}
        speed={0.18}
        color={ACCENT}
        opacity={0.22}
        position={[2.4, 0.1, 0]}
      />
    </>
  );
}
