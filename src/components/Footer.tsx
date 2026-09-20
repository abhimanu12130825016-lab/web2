import {
  ArrowUpRight,
  Asterisk,
  AtSign,
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { Eyebrow, Magnetic, Reveal } from "./ui";

const SOCIALS = [
  { icon: Camera, label: "Instagram" },
  { icon: AtSign, label: "Threads" },
  { icon: Share2, label: "LinkedIn" },
  { icon: Globe, label: "Behance" },
];

export default function Footer({ onNav }: { onNav: (sel: string) => void }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] pt-24 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(124,108,255,0.1),transparent_55%)]" />

      {/* rotating badge */}
      <div className="pointer-events-none absolute right-[7%] top-16 hidden lg:block">
        <div className="spin-slow relative h-36 w-36">
          <svg viewBox="0 0 144 144" className="h-full w-full">
            <defs>
              <path
                id="badge-circle"
                d="M72,72 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
              />
            </defs>
            <text className="fill-white/50 text-[10px] font-semibold uppercase tracking-[0.2em]">
              <textPath href="#badge-circle">
                Start a project — Paper &amp; Pixel — Est. 2018 —
              </textPath>
            </text>
          </svg>
          <Asterisk className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[#d4ff3f]" />
        </div>
      </div>

      {/* CTA */}
      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-12">
        <Reveal>
          <Eyebrow className="justify-center">Say hello</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-8 max-w-6xl font-display text-[clamp(2.6rem,7.2vw,6.4rem)] font-extrabold uppercase leading-[0.94] tracking-tight">
            Got a business? <span className="text-outline">Let's make it</span>{" "}
            <span className="text-[#d4ff3f]">unmissable.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <Magnetic>
              <a
                href="mailto:hello@paperpixel.studio"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d4ff3f] px-8 py-5 text-sm font-bold uppercase tracking-widest text-black"
              >
                hello@paperpixel.studio
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <a
              href="tel:+15550131990"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#d4ff3f]" />
              +1 (555) 013-1990
            </a>
          </div>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="relative mt-24 border-t border-white/[0.06] md:mt-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-12 md:px-12">
          <div className="md:col-span-4">
            <span className="font-display text-xl font-extrabold uppercase tracking-tight">
              Paper<span className="text-[#d4ff3f]">&amp;</span>Pixel
              <span className="align-super text-[9px] text-white/50">®</span>
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              A design studio for businesses that refuse to blend in. Pamphlets,
              posters and websites — printed loud, published fast.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-transparent hover:bg-[#d4ff3f] hover:text-black"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Sitemap
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Services", sel: "#services" },
                { label: "Work", sel: "#work" },
                { label: "Process", sel: "#process" },
                { label: "Pricing", sel: "#pricing" },
              ].map((l) => (
                <li key={l.sel}>
                  <button
                    onClick={() => onNav(l.sel)}
                    className="text-white/60 transition-colors hover:text-[#d4ff3f]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>Pamphlets &amp; Flyers</li>
              <li>Posters &amp; Large Format</li>
              <li>Websites &amp; Digital</li>
              <li>Brand Kits &amp; Stationery</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Studio
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4ff3f]" />
                44 Mercer Street, SoHo,
                <br />
                New York, NY 10013
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#d4ff3f]" />
                hello@paperpixel.studio
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#d4ff3f]" />
                Mon–Fri, 9–6 EST
              </li>
            </ul>
          </div>
        </div>

        {/* giant mark */}
        <div className="select-none overflow-hidden px-6" aria-hidden>
          <div className="-mb-[4.5vw] text-center font-display text-[19vw] font-extrabold uppercase leading-[0.82] tracking-tight text-white/[0.045]">
            P&amp;P®
          </div>
        </div>

        <div className="relative border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 md:px-12">
            <span>© 2026 Paper &amp; Pixel Studio</span>
            <span>Printed &amp; published in NYC</span>
            <button
              onClick={() => onNav("#top")}
              className="transition-colors hover:text-[#d4ff3f]"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
