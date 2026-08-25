import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Heart, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
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
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          telemetryRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );

      // Parallax sutil y elegante
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -70,
        opacity: 0.4,
      });

      gsap.to(telemetryRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -40,
        opacity: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 pt-24 pb-16 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Badge Institucional y Hospitalario */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="hero-tag inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-neon-cyan font-mono text-xs tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-semibold text-white">NUCLIA HEALTH</span>
            <span className="text-clinical-muted">|</span>
            <span>CENTRO TERANÓSTICO DE PRECISIÓN</span>
          </div>
          <div className="hero-tag hidden sm:flex items-center space-x-2 text-xs font-mono text-clinical-dim">
            <ShieldCheck className="w-3.5 h-3.5 text-neon-emerald" />
            <span>CERTIFICACIÓN GMP / EANM CLASE A</span>
          </div>
        </div>

        {/* Título Principal Limpio y Hospitalario */}
        <div className="relative mb-8">
          <div className="hero-tag font-mono text-xs text-neon-cyan/90 tracking-[0.2em] uppercase mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span>// TERANÓSTICA MOLECULAR DIRIGIDA</span>
          </div>
          
          <h1
            ref={titleRef}
            className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]"
          >
            Medicina Nuclear <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyan-200 to-neon-cobalt">
              de Alta Precisión
            </span>
          </h1>

          {/* Subtítulo Empático y Humano */}
          <h2
            ref={subtitleRef}
            className="font-body font-normal text-lg sm:text-2xl text-slate-300 mt-5 max-w-3xl leading-relaxed"
          >
            Diagnóstico celular y terapias radiometabólicas diseñadas para tratar el cáncer de forma personalizada, respetando el tejido sano y mejorando la calidad de vida de los pacientes.
          </h2>
        </div>

        {/* Grid Informativo & Tarjeta de Confianza Hospitalaria */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Puntos Clave de Valor */}
          <div className="lg:col-span-7 space-y-4 font-body">
            <p className="text-base text-clinical-dim leading-relaxed">
              En <strong className="text-white">Nuclia Health</strong> combinamos ciclotrones médicos de última generación, síntesis automatizada y logística Just-in-Time para entregar radiofármacos de vida media ultracorta directamente en los centros hospitalarios.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-clinical-text">
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <CheckCircle2 className="w-4 h-4 text-neon-emerald shrink-0" />
                <span>Trazadores PET/SPECT (¹⁸F, ⁶⁸Ga)</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <Heart className="w-4 h-4 text-neon-cyan shrink-0" />
                <span>Terapia con Radioligandos (¹⁷⁷Lu)</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Confianza Clínica (Frosted Glass) */}
          <div
            ref={telemetryRef}
            className="lg:col-span-5 backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] font-mono text-xs text-clinical-dim">
              <span className="flex items-center space-x-2 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-neon-cyan" />
                <span>SERVICIO HOSPITALARIO EN VIVO</span>
              </span>
              <span className="text-neon-emerald font-semibold">24/7 ACTIVO</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-clinical-muted">PUREZA ISOTÓPICA:</span>
                <span className="text-white font-bold bg-white/[0.06] px-2 py-0.5 rounded">&gt; 99.98%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-clinical-muted">TRAZABILIDAD DE LOTES:</span>
                <span className="text-neon-cyan font-bold">100% Criptográfica</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-clinical-muted">RED DE HOSPITALES:</span>
                <span className="text-neon-emerald font-bold">48+ Centros Conectados</span>
              </div>
            </div>
          </div>

        </div>

        {/* Botones de Acción Cálidos y Accesibles */}
        <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExplore();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-cyan-400 text-slate-950 font-body font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(0,212,178,0.35)] hover:shadow-[0_8px_32px_rgba(0,212,178,0.5)] hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center space-x-2.5"
          >
            <span>Conocer Tecnología &amp; Trazadores</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-3.5 rounded-xl backdrop-blur-md bg-white/[0.04] border border-white/[0.12] text-white font-body text-sm font-medium hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all cursor-pointer flex items-center space-x-2"
          >
            <span>Simulador de Dosimetría</span>
          </button>
        </div>

      </div>

      {/* Indicador de Desplazamiento */}
      <div 
        onClick={() => {
          soundEngine.playClick();
          onExplore();
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 cursor-pointer text-slate-400 hover:text-neon-cyan transition-colors select-none"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-slate-400">DESPLAZAR</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
