import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { global3DState } from './useScrollStore';
import { soundEngine } from '../audio/soundSynth';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastSectionRef = useRef<number>(0);

  useEffect(() => {
    // Scroll libre y continuo — sin snapping para que el video se mueva
    // de forma proporcional y natural al movimiento real del usuario
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      const p = Math.max(0, Math.min(1, e.progress));

      global3DState.progress = p;
      global3DState.velocity = e.velocity;

      setScrollProgress(p);
      setScrollVelocity(e.velocity);

      // Actualiza la sección activa para que VideoBackground la use si hace falta
      const section = p < 0.22 ? 0 : p < 0.47 ? 1 : p < 0.67 ? 2 : p < 0.87 ? 3 : 4;
      global3DState.activeSection = section;

      if (section !== lastSectionRef.current) {
        lastSectionRef.current = section;
        soundEngine.playWarpSweep();
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return { lenis: lenisRef.current, scrollProgress, scrollVelocity, scrollTo };
}
