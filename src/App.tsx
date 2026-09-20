import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.stop();
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (loaded) lenisRef.current?.start();
  }, [loaded]);

  const scrollTo = useCallback((sel: string) => {
    lenisRef.current?.scrollTo(sel, {
      offset: sel === "#top" ? 0 : -64,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  }, []);

  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative min-h-screen bg-[#0b0b0e] text-[#edede6] antialiased">
      <AnimatePresence>
        {!loaded && <Preloader onDone={handleDone} />}
      </AnimatePresence>

      <div className="noise-layer" aria-hidden />
      <Cursor />
      <Navbar started={loaded} onNav={scrollTo} />

      <main>
        <Hero started={loaded} onNav={scrollTo} />
        <Services onNav={scrollTo} />
        <Work onNav={scrollTo} />
        <Process />
        <Testimonials />
        <Pricing onNav={scrollTo} />
        <Footer onNav={scrollTo} />
      </main>
    </div>
  );
}
