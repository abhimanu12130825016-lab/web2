import { ArrowUpRight } from "lucide-react";
import { Counter, Eyebrow, Reveal } from "./ui";

const STATS = [
  { v: 320, suf: "+", label: "Projects shipped" },
  { v: 98, suf: "%", label: "Client happiness" },
  { v: 48, suf: "h", label: "Avg. first draft" },
  { v: 12, suf: "", label: "Design awards" },
];

const STEPS = [
  {
    id: "01",
    title: "Discover",
    desc: "A 20-minute call about your business, your street and what 'busy' looks like for you. Zero jargon.",
    time: "Day 0",
  },
  {
    id: "02",
    title: "Design",
    desc: "First loud drafts within 48 hours — real designs, not mood boards. You react, we sharpen.",
    time: "Day 2",
  },
  {
    id: "03",
    title: "Refine",
    desc: "Two tight revision rounds. We sweat the kerning, colour and paper stock so you don't have to.",
    time: "Week 1",
  },
  {
    id: "04",
    title: "Deliver",
    desc: "Print lands on your doorstep, the website goes live. Launch-week support included, always.",
    time: "Week 2",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/[0.06] bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,108,255,0.07),transparent_55%)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                Idea to ink in{" "}
                <span className="text-[#d4ff3f]">two weeks</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <p className="text-base leading-relaxed text-white/50">
              A sprint-based process built for owners who have a business to
              run. You approve; we obsess.
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0d0d11] p-8 md:p-10">
                <div className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
                  <Counter to={s.v} />
                  <span className="text-[#d4ff3f]">{s.suf}</span>
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* steps */}
        <div className="mt-20 md:mt-24">
          {STEPS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <div className="group -mx-4 grid cursor-default grid-cols-12 items-baseline gap-3 border-t border-white/10 px-4 py-8 transition-colors duration-300 last:border-b hover:bg-[#d4ff3f] md:-mx-6 md:gap-4 md:px-6 md:py-10">
                <span className="col-span-3 font-display text-sm font-bold tracking-[0.3em] text-white/25 transition-colors duration-300 group-hover:text-black/50 md:col-span-1">
                  {s.id}
                </span>
                <h3 className="col-span-9 font-display text-3xl font-extrabold uppercase tracking-tight transition-colors duration-300 group-hover:text-black md:col-span-4 md:text-5xl">
                  {s.title}
                </h3>
                <p className="col-span-10 col-start-4 mt-3 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-black/70 md:col-span-5 md:col-start-6 md:mt-0 md:text-base">
                  {s.desc}
                </p>
                <div className="col-span-12 mt-4 flex items-center justify-between md:col-span-1 md:mt-0 md:justify-end">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:border-black/40 group-hover:text-black/70 md:hidden">
                    {s.time}
                  </span>
                  <ArrowUpRight className="h-7 w-7 -translate-x-2 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
