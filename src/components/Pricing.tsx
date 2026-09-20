import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { cn } from "../utils/cn";

const TIERS = [
  {
    name: "Paper Trail",
    price: "99",
    unit: "per design",
    desc: "A single print piece, perfected fast.",
    features: [
      "1 print design — pamphlet, poster or flyer",
      "2 revision rounds",
      "Print-ready files in 48 hours",
      "Paper & finish guidance",
    ],
    featured: false,
    cta: "Book this sprint",
  },
  {
    name: "Print + Pixel",
    price: "449",
    unit: "the bundle",
    desc: "The street-and-screen combo most owners pick.",
    features: [
      "3-piece print bundle",
      "3-page website, mobile-first",
      "Menu / booking / maps built in",
      "SEO basics & Google profile",
      "Launch in 2 weeks",
    ],
    featured: true,
    cta: "Book the bundle",
  },
  {
    name: "Full Send",
    price: "1,299",
    unit: "takeover",
    desc: "Total brand presence, done for you.",
    features: [
      "Complete print kit — 6+ designs",
      "8-page website + CMS",
      "Logo & mini brand kit",
      "Priority 24h support",
      "Quarterly refresh credit",
    ],
    featured: false,
    cta: "Go full send",
  },
];

export default function Pricing({ onNav }: { onNav: (sel: string) => void }) {
  return (
    <section
      id="pricing"
      className="relative border-t border-white/[0.06] bg-[radial-gradient(ellipse_at_50%_100%,rgba(212,255,63,0.06),transparent_55%)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>Pricing</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                Straightforward sprints.{" "}
                <span className="text-[#d4ff3f]">Zero agency fog.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <p className="text-base leading-relaxed text-white/50">
              * Final quote lands after a free 20-minute call — always before
              any work starts. No retainers required.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-8 md:p-10",
                  t.featured
                    ? "bg-[#d4ff3f] text-black shadow-[0_0_90px_-10px_rgba(212,255,63,0.45)] lg:scale-[1.045]"
                    : "border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-white/25"
                )}
              >
                {t.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4ff3f]">
                    Most booked
                  </span>
                )}

                <h3 className="font-display text-xl font-extrabold uppercase tracking-wide">
                  {t.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    t.featured ? "text-black/60" : "text-white/50"
                  )}
                >
                  {t.desc}
                </p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                    from
                  </span>
                  <span className="font-display text-6xl font-extrabold tracking-tight md:text-7xl">
                    <span className="align-top text-3xl">$</span>
                    {t.price}
                  </span>
                  <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                    / {t.unit}
                  </span>
                </div>

                <ul
                  className={cn(
                    "mt-8 flex-1 space-y-3.5 border-t pt-8",
                    t.featured ? "border-black/15" : "border-white/10"
                  )}
                >
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          t.featured ? "text-black" : "text-[#d4ff3f]"
                        )}
                      />
                      <span className={t.featured ? "text-black/80" : "text-white/65"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNav("#contact")}
                  className={cn(
                    "group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300",
                    t.featured
                      ? "bg-black text-white hover:opacity-85"
                      : "border border-white/20 hover:border-transparent hover:bg-[#d4ff3f] hover:text-black"
                  )}
                >
                  {t.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
