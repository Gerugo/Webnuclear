import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Heart, Dna, Clock, CheckCircle2, Sparkles } from 'lucide-react';
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
        y: -60,
        opacity: 0.6,
      });

      gsap.to(telemetryRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -30,
        opacity: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 pt-28 pb-16 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Badge Institucional en Blanco & Teal */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="hero-tag inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-teal-700 font-mono text-xs tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="font-bold">NUCLIA HEALTH</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">TERANÓSTICA MOLECULAR</span>
          </div>
          <div className="hero-tag hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CERTIFICACIÓN GMP / EANM</span>
          </div>
        </div>

        {/* Título Principal Nítido sobre Fondo Blanco */}
        <div className="relative mb-8">
          <div className="hero-tag font-mono text-xs text-teal-600 tracking-[0.2em] uppercase mb-3 flex items-center space-x-2 font-bold">
            <Dna className="w-4 h-4 text-teal-600 animate-bounce" />
            <span>// HIBRIDACIÓN GENÓMICA &amp; TERAPIA DIRIGIDA</span>
          </div>
          
          <h1
            ref={titleRef}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.06]"
          >
            Medicina Nuclear <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600">
              de Alta Precisión
            </span>
          </h1>

          {/* Subtítulo Empático y de Alta Claridad */}
          <h2
            ref={subtitleRef}
            className="font-body font-normal text-lg sm:text-2xl text-slate-600 mt-5 max-w-3xl leading-relaxed"
          >
            Desarrollamos radiofármacos dirigidos y trazadores moleculares que localizan y tratan el cáncer a escala celular, preservando el tejido sano y guiados por el mapa genético del paciente.
          </h2>
        </div>

        {/* Grid Informativo & Tarjeta de Confianza */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Puntos Clave de Valor */}
          <div className="lg:col-span-7 space-y-4 font-body">
            <p className="text-base text-slate-600 leading-relaxed">
              Al descender por la página, la <strong className="text-slate-900 font-semibold">doble hélice de ADN interactiva en 3D</strong> se une progresivamente, simbolizando la afinidad de nuestros ligandos teranósticos con los receptores celulares.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-body text-xs text-slate-700">
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Trazadores PET/SPECT (¹⁸F, ⁶⁸Ga)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <Heart className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="font-medium">Radioligandos Terapéuticos (¹⁷⁷Lu)</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Confianza Clínica en Cristal Blanco */}
          <div
            ref={telemetryRef}
            className="lg:col-span-5 backdrop-blur-xl bg-white/85 border border-slate-200/90 p-6 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 font-body text-xs text-slate-500">
              <span className="flex items-center space-x-2 text-slate-900 font-bold">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>SERVICIO HOSPITALARIO</span>
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                24/7 ACTIVO
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-body">PUREZA ISOTÓPICA:</span>
                <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded">&gt; 99.98%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-body">TRAZABILIDAD DE LOTES:</span>
                <span className="text-teal-700 font-bold">100% Criptográfica</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-body">HOSPITALES CONECTADOS:</span>
                <span className="text-blue-700 font-bold">48+ Centros</span>
              </div>
            </div>
          </div>

        </div>

        {/* Botones de Acción */}
        <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExplore();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-body font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center space-x-2.5"
          >
            <span>Explorar Tecnología &amp; Trazadores</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-body text-sm font-semibold hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/50 shadow-2xs transition-all cursor-pointer flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 cursor-pointer text-slate-400 hover:text-teal-600 transition-colors select-none"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-slate-400">DESPLAZAR PARA UNIR ADN</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-teal-600" />
      </div>
    </section>
  );
};
