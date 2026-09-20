import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { EASE, Magnetic } from "./ui";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Services", sel: "#services" },
  { label: "Work", sel: "#work" },
  { label: "Process", sel: "#process" },
  { label: "Pricing", sel: "#pricing" },
  { label: "Contact", sel: "#contact" },
];

export default function Navbar({
  started,
  onNav,
}: {
  started: boolean;
  onNav: (sel: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={started ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-colors duration-500",
          scrolled && !open
            ? "border-b border-white/[0.06] bg-[#0b0b0e]/70 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
          <button
            onClick={() => onNav("#top")}
            className="font-display text-lg font-extrabold uppercase tracking-tight"
            aria-label="Go to top"
          >
            Paper<span className="text-[#d4ff3f]">&amp;</span>Pixel
            <span className="align-super text-[9px] text-white/50">®</span>
          </button>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {LINKS.map((l, i) => (
              <button
                key={l.sel}
                onClick={() => onNav(l.sel)}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55 transition-colors hover:text-white"
              >
                <span className="mr-1.5 text-[9px] text-[#d4ff3f]/70">
                  0{i + 1}
                </span>
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#d4ff3f] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <button
                onClick={() => onNav("#contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-transparent hover:bg-[#d4ff3f] hover:text-black"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-[#0b0b0e] px-6 py-6 md:px-12"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-extrabold uppercase tracking-tight">
                Paper<span className="text-[#d4ff3f]">&amp;</span>Pixel
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-[#d4ff3f] hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 md:gap-2">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.sel}
                  initial={{ opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: EASE }}
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => onNav(l.sel), 350);
                  }}
                  className="group flex items-baseline gap-5 text-left font-display text-[13vw] font-extrabold uppercase leading-[1.05] text-white/85 transition-colors hover:text-[#d4ff3f] sm:text-6xl md:text-7xl"
                >
                  <span className="font-body text-sm font-medium tracking-[0.3em] text-white/30">
                    0{i + 1}
                  </span>
                  {l.label}
                  <ArrowUpRight className="h-7 w-7 self-center opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100" />
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
            >
              <a href="mailto:hello@paperpixel.studio" className="hover:text-[#d4ff3f]">
                hello@paperpixel.studio
              </a>
              <span>NYC — Worldwide</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
