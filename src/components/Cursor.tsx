import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, { stiffness: 1400, damping: 80, mass: 0.2 });
  const dotY = useSpring(my, { stiffness: 1400, damping: 80, mass: 0.2 });
  const ringX = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 320, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor]"));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[96] h-1.5 w-1.5 rounded-full bg-[#d4ff3f]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 rounded-full border border-[#d4ff3f] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.7 : hover ? 1.9 : 1, opacity: hover ? 1 : 0.65 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
