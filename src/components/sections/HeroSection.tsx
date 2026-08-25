import React, { useEffect, useRef } from 'react';
import { ChevronDown, Atom, Radio, Zap, ArrowUpRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenTerminal }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          telemetryRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );

      // Parallax scroll scrub effect
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0.2,
      });

      gsap.to(telemetryRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -60,
        opacity: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 pt-20 pb-16 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Badge de Estatus Clínico */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="hero-tag flex items-center space-x-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-neon-cyan/40 text-neon-cyan font-mono text-xs tracking-wider shadow-[0_0_15px_rgba(0,245,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span className="font-bold">NUCLIA HEALTH // CICLOTRÓN SINCRONIZADO</span>
          </div>
          <div className="hero-tag hidden sm:flex items-center space-x-2 font-mono text-xs text-clinical-dim tracking-wider">
            <Radio className="w-3.5 h-3.5 text-neon-emerald animate-pulse" />
            <span>TERANÓSTICA DE ALTA PRECISIÓN</span>
          </div>
        </div>

        {/* Título de Impacto: Medicina Nuclear de Precisión */}
        <div className="relative mb-8">
          <div className="hero-tag font-mono text-xs text-neon-cyan/90 tracking-[0.25em] uppercase mb-3 flex items-center space-x-2">
            <Atom className="w-4 h-4 text-neon-cyan animate-spin" style={{ animationDuration: '8s' }} />
            <span>// NUCLIA HEALTH • TERANÓSTICA MOLECULAR v4.9</span>
          </div>
          
          <h1
            ref={titleRef}
            className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] uppercase leading-[1.02] text-white"
          >
            Medicina Nuclear <br />
            <span className="text-neon-cyan text-glow-cyan">de Precisión</span>
          </h1>

          {/* Subtítulo Clínico */}
          <h2
            ref={subtitleRef}
            className="font-display font-medium text-lg sm:text-2xl md:text-3xl tracking-[0.14em] uppercase text-clinical-dim mt-5 max-w-4xl"
          >
            Teranóstica Molecular Avanzada <span className="text-white font-semibold">&amp; Radiofármacos Guiados por IA</span>
          </h2>
        </div>

        {/* Subtítulo Explicativo & Telemetría */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg text-clinical-dim leading-relaxed font-body">
              En <strong className="text-white font-semibold">Nuclia Health</strong> integramos simulación cuántica por GPU, trazadores emisores de positrones de vida media ultracorta y terapias radiometabólicas dirigidas para transformar el abordaje oncológico a escala subcelular.
            </p>
            <p className="text-xs sm:text-sm font-mono text-neon-emerald/90 flex items-center space-x-2 tracking-wide">
              <Zap className="w-4 h-4 text-neon-emerald" />
              <span>Desplaza hacia abajo para iniciar la exploración volumétrica del núcleo y radioisótopos.</span>
            </p>
          </div>

          {/* Tarjeta de Telemetría Clínica - Glassmorphism */}
          <div
            ref={telemetryRef}
            className="lg:col-span-5 backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-lg border-l-2 border-l-neon-cyan shadow-[0_0_25px_rgba(0,245,212,0.15)]"
          >
            <div className="text-[11px] font-mono text-clinical-dim flex justify-between border-b border-white/10 pb-2 mb-3 tracking-wider">
              <span>DIAGNÓSTICO CELULAR NUCLIA</span>
              <span className="text-neon-emerald flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neon-emerald" />
                <span>AFINIDAD RECEPTOR 99.98%</span>
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-clinical-muted">ACTIVIDAD RADIACTIVA:</span>
                <span className="text-clinical-text">370 MBq (10 mCi)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-clinical-muted">DENSIDAD ISOTÓPICA:</span>
                <span className="text-neon-cyan">12,000+ VECTORES</span>
              </div>
              <div className="flex justify-between">
                <span className="text-clinical-muted">SINCRONIZACIÓN GPU:</span>
                <span className="text-neon-emerald font-semibold">GSAP + LENIS + R3F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón CTA con Brillo Cian & Controles */}
        <div ref={buttonsRef} className="flex flex-wrap items-center gap-5">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExplore();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative px-8 py-4 rounded bg-neon-cyan text-cyber-950 font-display font-bold text-xs sm:text-sm tracking-[0.22em] uppercase overflow-hidden shadow-[0_0_35px_rgba(0,245,212,0.6)] hover:shadow-[0_0_55px_rgba(0,245,212,0.9)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="relative z-10 flex items-center space-x-3">
              <Atom className="w-4 h-4 text-cyber-950 animate-spin" style={{ animationDuration: '6s' }} />
              <span>EXPLORAR SISTEMA TERANÓSTICO</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-4 rounded backdrop-blur-md bg-white/5 border border-white/10 text-neon-cyan font-display font-semibold text-xs tracking-[0.2em] uppercase hover:border-neon-cyan/60 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,245,212,0.25)] transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>CONSOLA DE COMANDOS CLI</span>
          </button>
        </div>

      </div>

      {/* Indicador de Scroll hacia abajo */}
      <div 
        onClick={() => {
          soundEngine.playClick();
          onExplore();
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer text-clinical-muted hover:text-neon-cyan transition-colors"
      >
        <span className="font-display font-semibold text-[10px] tracking-[0.25em] uppercase">SCROLL PARA EXPLORAR</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
