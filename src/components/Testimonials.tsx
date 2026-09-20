import { Quote, Star } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";

const QUOTES = [
  {
    quote:
      "Our menu flyers got picked up so fast we ran out in a weekend. The new website paid for itself in nine days.",
    name: "Rosa Mendes",
    role: "Owner, Nova Café",
    initials: "RM",
  },
  {
    quote:
      "The gym's opening posters stopped traffic — literally. 214 trial sign-ups in the very first week.",
    name: "Deshawn Carter",
    role: "Founder, Peak Fitness",
    initials: "DC",
  },
  {
    quote:
      "They treated my flower shop like a flagship brand. Stationery, posters, website — all impossibly beautiful.",
    name: "Amara Lee",
    role: "Owner, Bloom & Co",
    initials: "AL",
  },
];

export default function Testimonials() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>Wall of love</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                Businesses that got{" "}
                <span className="text-outline">louder</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="md:col-span-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#d4ff3f] text-[#d4ff3f]" />
              ))}
            </div>
            <p className="mt-3 text-sm text-white/50">
              4.9 / 5 average across 180+ owner reviews
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1} className="h-full">
              <figure className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#d4ff3f]/50 md:p-10">
                <Quote className="h-8 w-8 fill-[#d4ff3f] text-[#d4ff3f]" />
                <blockquote className="mt-8 flex-1 text-lg leading-relaxed text-white/80">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d4ff3f]/10 font-display text-sm font-bold text-[#d4ff3f]">
                    {q.initials}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold uppercase tracking-wide">
                      {q.name}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-white/40">
                      {q.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
