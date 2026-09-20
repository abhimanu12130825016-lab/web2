import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import Scene3D from "./Scene3D";
import { EASE, Magnetic, Marquee } from "./ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const lineV = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};
const fadeV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const STRIP = [
  "Pamphlets",
  "Posters",
  "Websites",
  "Menus",
  "Flyers",
  "Brand Kits",
  "Banners",
  "Business Cards",
];

export default function Hero({
  started,
  onNav,
}: {
  started: boolean;
  onNav: (sel: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden">
      {/* 3D layer */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_18%,rgba(124,108,255,0.14),transparent_55%),radial-gradient(ellipse_at_18%_82%,rgba(212,255,63,0.09),transparent_50%)]" />
        <Scene3D />
        <div className="hero-scanlines" aria-hidden />
        <div className="hero-glass-panel hero-glass-panel--top" aria-hidden>
          <span className="hero-panel-dot" />
          <span>Spatial identity / 01</span>
          <span className="hero-panel-rule" />
          <span>Live composition</span>
        </div>
        <div className="hero-glass-panel hero-glass-panel--bottom" aria-hidden>
          <span className="font-display text-lg text-white/80">03</span>
          <span className="hero-panel-copy">Layers in motion</span>
        </div>
      </motion.div>

      {/* readability fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-64 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/60 to-transparent" />

      {/* copy */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 pb-20 md:px-12"
      >
        <motion.p
          variants={fadeV}
          className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d4ff3f]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4ff3f]" />
          Design studio for business owners
          <span className="text-white/30">— EST. 2018</span>
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,10.5vw,9.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineV} className="block">
              Pamphlets.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineV} className="text-outline block">
              Posters.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span variants={lineV} className="block text-[#d4ff3f]">
              Websites.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            variants={fadeV}
            className="max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            We arm restaurants, gyms, salons &amp; shops with print that lands on
            doorsteps and pixels that win customers. One studio — every
            touchpoint your brand touches.
          </motion.p>

          <motion.div variants={fadeV} className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <button
                onClick={() => onNav("#contact")}
                className="group inline-flex items-center gap-3 rounded-full bg-[#d4ff3f] px-7 py-4 text-sm font-bold uppercase tracking-widest text-black"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <button
              onClick={() => onNav("#work")}
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              See the work
              <span className="h-px w-8 bg-white/40 transition-all duration-300 group-hover:w-12 group-hover:bg-[#d4ff3f]" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-24 right-6 z-10 hidden items-center gap-3 md:right-12 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-[#d4ff3f]" />
        </motion.span>
      </motion.div>

      {/* bottom ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#0b0b0e]/70 backdrop-blur-md">
        <Marquee duration={24} className="py-4">
          {STRIP.map((w) => (
            <span
              key={w}
              className="mx-5 flex items-center gap-10 font-display text-xl font-bold uppercase tracking-wide text-white/80 md:text-2xl"
            >
              {w}
              <Asterisk className="h-5 w-5 text-[#d4ff3f] md:h-6 md:w-6" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
