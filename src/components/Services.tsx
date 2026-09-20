import { ArrowUpRight, Asterisk, Image, MonitorSmartphone, Printer } from "lucide-react";
import { Eyebrow, Marquee, Reveal, Tilt } from "./ui";

const CLIENTS = [
  "Nova Café",
  "Atlas Realty",
  "Bloom & Co",
  "Neon District",
  "Citrus Fest",
  "Peak Fitness",
  "Urban Bites",
  "Loop Studio",
];

const SERVICES = [
  {
    id: "01",
    icon: Printer,
    title: "Pamphlets & Flyers",
    desc: "Menus, price lists, door-drops and tri-folds engineered to be picked up, kept and acted on. Print-ready files in 48 hours.",
    chips: ["Tri-folds", "Menus", "Price lists", "Door drops"],
    price: "From $99",
  },
  {
    id: "02",
    icon: Image,
    title: "Posters & Large Format",
    desc: "Window posters, event walls and banners with typography loud enough to stop foot traffic mid-stride. Any size, any finish.",
    chips: ["A2 – A0", "Window clings", "Banners", "Event walls"],
    price: "From $149",
  },
  {
    id: "03",
    icon: MonitorSmartphone,
    title: "Websites & Digital",
    desc: "Fast, mobile-first websites with booking, menus and maps baked in. Designed, built and launched — you just watch the calls come in.",
    chips: ["Landing pages", "E-commerce", "Booking systems", "SEO basics"],
    price: "From $499",
  },
];

export default function Services({ onNav }: { onNav: (sel: string) => void }) {
  return (
    <section id="services" className="relative py-24 md:py-36">
      {/* client strip */}
      <div className="mb-20 border-y border-white/[0.07] py-5 md:mb-28">
        <Marquee duration={32}>
          {CLIENTS.map((c) => (
            <span
              key={c}
              className="mx-7 flex items-center gap-14 text-sm font-semibold uppercase tracking-[0.35em] text-white/35"
            >
              {c}
              <Asterisk className="h-4 w-4 text-[#d4ff3f]/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                Everything your business needs to be{" "}
                <span className="text-[#d4ff3f]">seen</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <p className="text-base leading-relaxed text-white/50">
              From the pavement to the pocket — we design every surface your
              customer meets. Paper for the street, pixels for the scroll.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1} className="h-full">
              <Tilt className="group h-full" max={7}>
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 group-hover:border-[#d4ff3f]/50 group-hover:bg-white/[0.05] md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm font-bold tracking-[0.3em] text-white/30 transition-colors duration-500 group-hover:text-[#d4ff3f]">
                      /{s.id}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d4ff3f]/10 text-[#d4ff3f] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      <s.icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-12 font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55 md:text-base">
                    {s.desc}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors duration-500 group-hover:border-[#d4ff3f]/30"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onNav("#pricing")}
                    className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-left"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-white/70 transition-colors group-hover:text-white">
                      {s.price}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#d4ff3f] group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
