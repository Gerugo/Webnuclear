import React, { useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          metricsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex flex-col justify-center items-center text-center px-4 md:px-8 pt-32 pb-20 z-10 select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Micro-etiqueta Apple */}
        <div className="hero-eyebrow mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#0071E3] bg-[#0071E3]/8 px-3.5 py-1 rounded-full border border-[#0071E3]/15">
            Nuclia Health • Medicina Nuclear de Precisión
          </span>
        </div>

        {/* Titular Principal Estilo Apple Keynote */}
        <h1
          ref={titleRef}
          className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#1D1D1F] leading-[1.04] mb-6"
        >
          Medicina nuclear. <br />
          <span className="text-[#86868B]">
            Reinventada para salvar vidas.
          </span>
        </h1>

        {/* Subtítulo Limpio y Empático */}
        <p
          ref={subtitleRef}
          className="font-body text-lg sm:text-2xl text-[#515154] max-w-2xl font-normal leading-relaxed mb-8"
        >
          Trazadores y terapias con radioligandos guiados por el mapa genético celular para diagnosticar y tratar el cáncer de forma personalizada y no invasiva.
        </p>

        {/* Botones de Acción Estilo Apple */}
        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExplore();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-sm tracking-normal shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            Conocer Radiofármacos
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              const el = document.querySelector('#deep-warp');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group px-5 py-3 rounded-full text-[#0071E3] hover:text-[#0077ED] font-body font-medium text-sm transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Ver Áreas Clínicas</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Métricas Minimalistas */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 pt-6 border-t border-black/5 text-[#515154] font-body text-xs"
        >
          <div>
            <div className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight">&gt; 99.98%</div>
            <div className="text-[#86868B] mt-0.5">Pureza Farmacéutica</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight">100%</div>
            <div className="text-[#86868B] mt-0.5">Trazabilidad Satelital</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight">24/7</div>
            <div className="text-[#86868B] mt-0.5">Entrega Hospitalaria JIT</div>
          </div>
        </div>

      </div>

      {/* Indicador de Desplazamiento Sutil */}
      <div 
        onClick={() => {
          soundEngine.playClick();
          onExplore();
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 cursor-pointer text-[#86868B] hover:text-[#1D1D1F] transition-colors"
      >
        <span className="text-[11px] font-medium tracking-wide">Desplaza para ver interactuar el video</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#0071E3]" />
      </div>
    </section>
  );
};
