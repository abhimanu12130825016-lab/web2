import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* --------------------------- Procedural poster art -------------------------- */
function makePosterTexture(
  bgA: string,
  bgB: string,
  label: string,
  sub: string,
  accent: string
) {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 800;
  const ctx = c.getContext("2d")!;

  const g = ctx.createLinearGradient(0, 0, 640, 800);
  g.addColorStop(0, bgA);
  g.addColorStop(1, bgB);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 640, 800);

  // halftone dot field
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  for (let y = 24; y < 800; y += 46)
    for (let x = 24; x < 640; x += 46) {
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

  // giant ring
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(500, 190, 145, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // vertical side caption
  ctx.save();
  ctx.translate(42, 776);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "600 21px 'Space Grotesk', Arial, sans-serif";
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.85;
  ctx.fillText("PAPER & PIXEL — DESIGN STUDIO — EST. 2018", 0, 0);
  ctx.restore();

  // headline
  ctx.fillStyle = accent;
  ctx.font = "800 148px 'Syne', 'Arial Black', Arial, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, 58, 646);

  // sub headline
  ctx.font = "600 33px 'Space Grotesk', Arial, sans-serif";
  ctx.fillText(sub, 62, 702);

  // fake barcode
  let bx = 62;
  while (bx < 556) {
    const w = 3 + Math.random() * 9;
    ctx.fillRect(bx, 728, w, 38);
    bx += w + 4 + Math.random() * 9;
  }

  // film noise
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * 640, Math.random() * 800, 2, 2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

type V3 = [number, number, number];

function Poster({
  position,
  rotation,
  scale,
  texture,
  float = 1.1,
  reducedMotion = false,
}: {
  position: V3;
  rotation: V3;
  scale: number;
  texture: THREE.Texture;
  float?: number;
  reducedMotion?: boolean;
}) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.7}
      rotationIntensity={reducedMotion ? 0 : 0.45}
      floatIntensity={reducedMotion ? 0 : float}
    >
      <RoundedBox
        args={[1.7, 2.125, 0.07]}
        radius={0.045}
        smoothness={6}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <meshStandardMaterial map={texture} roughness={0.5} metalness={0.05} />
      </RoundedBox>
    </Float>
  );
}

function Shard({
  position,
  color,
  scale = 1,
  reducedMotion = false,
}: {
  position: V3;
  color: string;
  scale?: number;
  reducedMotion?: boolean;
}) {
  return (
    <Float
      speed={reducedMotion ? 0 : 2.4}
      rotationIntensity={reducedMotion ? 0 : 2.4}
      floatIntensity={reducedMotion ? 0 : 1.8}
    >
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Float>
  );
}

function WireKnot({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (reducedMotion) return;
    ref.current.rotation.y += dt * 0.06;
    ref.current.rotation.z += dt * 0.04;
  });
  return (
    <mesh ref={ref} position={[0.4, 0.2, -3.6]} scale={1.18}>
      <torusKnotGeometry args={[2.4, 0.74, 260, 28]} />
      <meshBasicMaterial wireframe color="#7c6cff" transparent opacity={0.09} />
    </mesh>
  );
}

/* --------------------------- Mouse parallax wrapper ------------------------- */
function Rig({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const g = useRef<THREE.Group>(null!);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: PointerEvent) => {
      if (!reducedMotion) {
        target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener("pointermove", h);
    return () => window.removeEventListener("pointermove", h);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (reducedMotion) {
      g.current.rotation.set(0, 0, 0);
      g.current.position.y = 0;
      return;
    }
    g.current.rotation.y = THREE.MathUtils.damp(
      g.current.rotation.y,
      target.current.x * 0.22,
      2.2,
      dt
    );
    g.current.rotation.x = THREE.MathUtils.damp(
      g.current.rotation.x,
      -target.current.y * 0.12 + Math.sin(t * 0.3) * 0.02,
      2.2,
      dt
    );
    g.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  return <group ref={g}>{children}</group>;
}

/* --------------------------------- The scene -------------------------------- */
export default function Scene3D() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const posters = useMemo(
    () => [
      {
        texture: makePosterTexture("#d4ff3f", "#a4cf0f", "P&P", "PRINT + PIXEL", "#0b0b0e"),
        position: [-3.9, 0.75, 0.5] as V3,
        rotation: [-0.05, 0.44, 0.07] as V3,
        scale: 1,
      },
      {
        texture: makePosterTexture("#edede6", "#c6c6bc", "SALE", "FEST WEEK '26", "#ff5c38"),
        position: [3.7, -0.55, 1.0] as V3,
        rotation: [0.06, -0.5, -0.05] as V3,
        scale: 1.06,
      },
      {
        texture: makePosterTexture("#7c6cff", "#4537c4", "WEB", "SITES THAT SELL", "#edede6"),
        position: [-2.0, -2.05, 1.9] as V3,
        rotation: [0.12, 0.26, 0.1] as V3,
        scale: 0.78,
      },
      {
        texture: makePosterTexture("#1a1a20", "#0b0b0e", "24H", "PRINT EXPRESS", "#d4ff3f"),
        position: [2.3, 2.25, -0.6] as V3,
        rotation: [-0.08, -0.34, 0.08] as V3,
        scale: 0.9,
      },
      {
        texture: makePosterTexture("#ff5c38", "#cf3a17", "OPEN", "GRAND OPENING", "#0b0b0e"),
        position: [-0.4, 2.6, -2.1] as V3,
        rotation: [-0.1, 0.14, -0.05] as V3,
        scale: 0.72,
      },
    ],
    []
  );

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="pointer-events-none !absolute inset-0"
    >
      <fog attach="fog" args={["#0b0b0e", 8.5, 17.5]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 6]} intensity={1.7} />
      <pointLight position={[-6, 3, 4]} intensity={0.55} decay={0} color="#d4ff3f" />
      <pointLight position={[6, -3, 3]} intensity={0.5} decay={0} color="#7c6cff" />

      <Rig reducedMotion={reducedMotion}>
        {posters.map((p, i) => (
          <Poster key={i} {...p} reducedMotion={reducedMotion} />
        ))}
        <Shard position={[-4.6, 2.4, -0.5]} color="#d4ff3f" scale={1.1} reducedMotion={reducedMotion} />
        <Shard position={[4.8, 1.9, 0.4]} color="#ff5c38" scale={0.9} reducedMotion={reducedMotion} />
        <Shard position={[1.2, -2.4, 1.8]} color="#7c6cff" scale={1.3} reducedMotion={reducedMotion} />
        <Shard position={[-3.1, -1.2, -1.4]} color="#edede6" scale={0.7} reducedMotion={reducedMotion} />
        <Shard position={[3.2, 0.4, -2]} color="#d4ff3f" scale={0.8} reducedMotion={reducedMotion} />
        <WireKnot reducedMotion={reducedMotion} />
      </Rig>

      <Sparkles
        count={reducedMotion ? 18 : 90}
        scale={[16, 9, 6]}
        size={1.7}
        speed={reducedMotion ? 0 : 0.35}
        color="#d4ff3f"
        opacity={0.5}
        position={[0, 0, -1]}
      />
    </Canvas>
  );
}
