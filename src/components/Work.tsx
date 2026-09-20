import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./ui";
import imgMenu from "../assets/work-menu.jpg";
import imgPosters from "../assets/work-posters.jpg";
import imgWebsite from "../assets/work-website.jpg";
import imgStationery from "../assets/work-stationery.jpg";
import imgMarket from "../assets/work-market.jpg";

const PROJECTS = [
  { img: imgMenu, title: "Nova Café", tag: "Menus & Flyers", year: "2025" },
  { img: imgPosters, title: "Neon District", tag: "Poster Series", year: "2025" },
  { img: imgWebsite, title: "Atlas Realty", tag: "Website Design", year: "2026" },
  { img: imgStationery, title: "Bloom & Co", tag: "Print Brand Kit", year: "2024" },
  { img: imgMarket, title: "Citrus Fest", tag: "Campaign & Flyers", year: "2025" },
];

export default function Work({ onNav }: { onNav: (sel: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current)
        setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const bar = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section ref={sectionRef} id="work" className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* header */}
        <div className="absolute left-6 right-6 top-20 z-10 flex items-end justify-between md:left-12 md:right-12">
          <Eyebrow>Selected work</Eyebrow>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.35em] text-white/30 md:block">
            2024 — 2026
          </span>
        </div>

        {/* sliding track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-5 pl-6 pr-[14vw] md:gap-8 md:pl-12"
        >
          {/* intro panel */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center md:w-[34vw]">
            <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-7xl">
              Loud on <span className="text-[#d4ff3f]">paper</span>.<br />
              Louder <span className="text-outline">online</span>.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50 md:text-base">
              A slice of the campaigns, print runs and websites we've shipped
              for owners who refuse to blend in.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/40">
              Keep scrolling
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4 text-[#d4ff3f]" />
              </motion.span>
            </div>
          </div>

          {/* project cards */}
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              data-cursor
              className="group relative h-[56vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-white/10 md:h-[64vh] md:w-[44vw]"
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

              <span className="absolute left-5 top-5 rounded-full bg-black/50 px-3 py-1.5 font-display text-[11px] font-bold tracking-[0.25em] text-white/80 backdrop-blur">
                {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="absolute right-5 top-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#d4ff3f] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-display text-2xl font-extrabold uppercase leading-tight md:text-4xl">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    {p.tag}
                  </span>
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    {p.year}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* CTA panel */}
          <button
            onClick={() => onNav("#contact")}
            className="group relative flex h-[56vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-[#d4ff3f] p-8 text-left text-black transition-colors md:h-[64vh] md:w-[36vw] md:p-10"
          >
            <span className="font-display text-sm font-bold tracking-[0.3em] text-black/50">
              NEXT UP
            </span>
            <div>
              <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
                Your project belongs here.
              </h3>
              <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform duration-300 group-hover:scale-105">
                Start yours
                <ArrowUpRight className="h-4 w-4 text-[#d4ff3f] transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
            <span className="pointer-events-none absolute -bottom-10 -right-6 select-none font-display text-[11rem] font-extrabold leading-none text-black/10 md:text-[15rem]">
              ?
            </span>
          </button>
        </motion.div>

        {/* progress */}
        <div className="absolute bottom-8 left-1/2 h-px w-[min(400px,60vw)] -translate-x-1/2 bg-white/10">
          <motion.div
            style={{ scaleX: bar }}
            className="h-full origin-left bg-[#d4ff3f]"
          />
        </div>
      </div>
    </section>
  );
}
