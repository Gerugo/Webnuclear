import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Sparkles, Radio } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const GenesisSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.tech-card',
        { opacity: 0, y: 45, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technologies = [
    {
      id: 'pet-spect',
      code: 'RAD_01',
      icon: Radio,
      badge: 'IMAGEN MOLECULAR',
      title: 'Trazadores PET / SPECT',
      summary: 'Radiofármacos emisores de positrones (¹⁸F, ⁶⁸Ga) y fotón único (⁹⁹ᵐTc) diseñados para afinidad metabólica celular instantánea.',
      details: 'La unión de radioisótopos de vida media ultra-corta a biomoléculas diana permite el mapeo cuantitativo de receptores oncológicos con resolución sub-milimétrica mediante reconstrucción tomográfica ACES.',
      metrics: [
        { label: 'ISÓTOPOS CLAVE', val: '¹⁸F-FDG / ⁶⁸Ga-PSMA' },
        { label: 'RESOLUCIÓN ESPACIAL', val: '< 1.8 mm' },
        { label: 'EMISIÓN FOTÓNICA', val: '511 keV Coincidencia' },
      ],
      glowColor: 'hover:border-neon-cyan/60 hover:shadow-[0_0_30px_rgba(0,245,212,0.2)]',
      accentColor: 'text-neon-cyan',
      borderColor: 'border-neon-cyan/40',
    },
    {
      id: 'pureza',
      code: 'RAD_02',
      icon: ShieldCheck,
      badge: 'CONTROL RADIOMÉTRICO',
      title: 'Pureza Isotópica >99.98%',
      summary: 'Separación electromagnética y enriquecimiento ciclotrónico para garantizar máxima actividad específica sin portador.',
      details: 'Sistemas de purificación por cromatografía líquida de alta resolución (HPLC) y espectrometría gamma que eliminan impurezas radiolíticas, reduciendo la exposición radiológica no dirigida del paciente.',
      metrics: [
        { label: 'PUREZA RADIONUCLEÍDICA', val: '99.994%' },
        { label: 'ACTIVIDAD ESPECÍFICA', val: '> 185 GBq/μmol' },
        { label: 'CONTROL DE CALIDAD', val: 'Instant HPLC / TLC' },
      ],
      glowColor: 'hover:border-neon-emerald/60 hover:shadow-[0_0_30px_rgba(0,255,157,0.2)]',
      accentColor: 'text-neon-emerald',
      borderColor: 'border-neon-emerald/40',
    },
    {
      id: 'sintesis',
      code: 'RAD_03',
      icon: Cpu,
      badge: 'CELDAS BLINDADAS GMP',
      title: 'Síntesis Automatizada',
      summary: 'Módulos microfluídicos robóticos operados en celdas calientes Clase A con aislamiento radiológico total.',
      details: 'Automatización de reacciones químicas en casetes de un solo uso, con trazabilidad criptográfica de lotes, dispensación volumétrica robotizada y monitoreo continuo de parámetros de radiación en tiempo real.',
      metrics: [
        { label: 'TIEMPO DE RADIOSÍNTESIS', val: '18.5 minutos' },
        { label: 'RENDIMIENTO RADIOQUÍMICO', val: '> 82.4%' },
        { label: 'BLINDAJE DE PLOMO', val: '75 mm Pb Eq' },
      ],
      glowColor: 'hover:border-neon-cobalt/60 hover:shadow-[0_0_30px_rgba(67,97,238,0.25)]',
      accentColor: 'text-neon-cobalt',
      borderColor: 'border-neon-cobalt/40',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="genesis"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Encabezado de Sección */}
        <div className="tech-header mb-14">
          <div className="flex items-center space-x-3 text-neon-cyan font-mono text-xs mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 tracking-[0.2em]">
              FASE 01 // TECNOLOGÍA
            </span>
            <span className="text-clinical-dim tracking-[0.15em]">// INGENIERÍA DE RADIOFÁRMACOS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.14em]">
            Tecnología &amp; <span className="text-neon-cyan text-glow-cyan">Radiofármacos</span>
          </h2>
          <p className="text-clinical-dim max-w-3xl text-base sm:text-lg mt-3 font-body leading-relaxed">
            Plataforma integral de síntesis, purificación e imagen molecular diseñada para maximizar la eficacia teranóstica y la seguridad biológica del paciente.
          </p>
        </div>

        {/* Grid de 3 Tarjetas con Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            const isSelected = activeCard === idx;

            return (
              <div
                key={tech.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCard(idx);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`tech-card backdrop-blur-md bg-white/5 border p-6 sm:p-7 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `border-white/30 bg-white/10 ${tech.glowColor}`
                    : 'border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                {/* Micro-resplandor ambiental de fondo */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 transition-opacity group-hover:opacity-35 bg-current ${tech.accentColor}`} />

                <div>
                  {/* Top Bar de Tarjeta */}
                  <div className="flex items-center justify-between mb-5 font-mono text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10">
                        <Icon className={`w-4 h-4 ${tech.accentColor}`} />
                      </div>
                      <span className="text-clinical-muted">// {tech.code}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-clinical-dim tracking-wider">
                      {tech.badge}
                    </span>
                  </div>

                  {/* Título de la Tarjeta */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 tracking-[0.08em] group-hover:text-neon-cyan transition-colors">
                    {tech.title}
                  </h3>

                  {/* Resumen */}
                  <p className="text-xs sm:text-sm text-clinical-dim leading-relaxed font-body mb-6">
                    {tech.summary}
                  </p>
                </div>

                {/* Métricas Principales */}
                <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
                  {tech.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-center py-0.5">
                      <span className="text-[11px] text-clinical-muted">{m.label}:</span>
                      <span className={`font-semibold ${tech.accentColor}`}>{m.val}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Panel Detallado de la Tarjeta Activa */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 corner-brackets relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-5 gap-3">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
              <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-[0.14em]">
                Especificaciones: {technologies[activeCard].title}
              </h4>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neon-emerald/10 border border-neon-emerald/30 text-neon-emerald flex items-center space-x-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-ping" />
              <span>ESTÁNDAR FARMACOPEA INTERNACIONAL</span>
            </span>
          </div>

          <p className="text-clinical-text/90 text-sm sm:text-base leading-relaxed font-body">
            {technologies[activeCard].details}
          </p>
        </div>

      </div>
    </section>
  );
};
