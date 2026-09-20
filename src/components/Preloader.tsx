import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 10 + 5;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        window.setTimeout(onDone, 400);
      }
      setN(Math.floor(v));
    }, 46);
    return () => {
      clearInterval(t);
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#0b0b0e] px-6 py-6 md:px-12 md:py-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
        <span>
          P<span className="text-[#d4ff3f]">&amp;</span>P® Studio
        </span>
        <span className="hidden sm:block">Design for business</span>
      </div>

      <div className="flex items-center gap-4 self-center">
        {["PAPER", "PIXEL", "PUBLISH"].map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.14, duration: 0.6 }}
            className="hidden items-center gap-4 text-xs font-medium uppercase tracking-[0.5em] text-white/40 sm:flex"
          >
            {w}
            {i < 2 && <span className="h-1 w-1 rounded-full bg-[#d4ff3f]" />}
          </motion.span>
        ))}
        <span className="text-xs font-medium uppercase tracking-[0.5em] text-white/40 sm:hidden">
          Loading the good stuff
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="relative mb-2 h-px w-full max-w-sm bg-white/10">
          <div
            className="absolute left-0 top-0 h-px bg-[#d4ff3f] transition-[width] duration-150 ease-out"
            style={{ width: `${n}%` }}
          />
        </div>
        <span className="font-display text-[24vw] font-extrabold leading-[0.8] text-[#edede6] md:text-[13vw]">
          {n}
          <span className="text-[#d4ff3f]">%</span>
        </span>
      </div>
    </motion.div>
  );
}
