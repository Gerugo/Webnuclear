import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Sparkles, Radio, Check } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const GenesisSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.tech-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
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
      code: 'RAD-01',
      icon: Radio,
      badge: 'IMAGEN MOLECULAR',
      title: 'Trazadores PET y SPECT',
      summary: 'Radiofármacos emisores de positrones (¹⁸F, ⁶⁸Ga) y fotones individuales (⁹⁹ᵐTc) diseñados para una afinidad celular instantánea y de alta resolución.',
      details: 'La unión de radioisótopos de vida media corta a ligandos biológicos específicos permite visualizar con nitidez milimétrica receptores oncológicos, placas amiloides y perfusión miocárdica mediante tomógrafos PET-CT y SPECT-CT.',
      metrics: [
        { label: 'ISÓTOPOS PRINCIPALES', val: '¹⁸F-FDG / ⁶⁸Ga-PSMA' },
        { label: 'RESOLUCIÓN TOMOGRÁFICA', val: '< 1.8 mm' },
        { label: 'COINCIDENCIA FOTÓNICA', val: '511 keV PET' },
      ],
      accentColor: 'text-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      activeBorder: 'border-teal-500 shadow-md ring-2 ring-teal-500/10',
    },
    {
      id: 'pureza',
      code: 'RAD-02',
      icon: ShieldCheck,
      badge: 'CALIDAD FARMACÉUTICA',
      title: 'Pureza Isotópica >99.98%',
      summary: 'Procesos rigurosos de separación electromagnética y enriquecimiento para garantizar la máxima actividad específica sin portador.',
      details: 'Sistemas automatizados de purificación por cromatografía líquida HPLC y espectrometría gamma que eliminan trazas radiolíticas, asegurando que el paciente reciba la dosis terapéutica con la menor exposición innecesaria posible.',
      metrics: [
        { label: 'PUREZA RADIONUCLEÍDICA', val: '99.994%' },
        { label: 'ACTIVIDAD ESPECÍFICA', val: '> 185 GBq/μmol' },
        { label: 'CONTROL DE CALIDAD', val: 'HPLC Digital en Tiempo Real' },
      ],
      accentColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeBorder: 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10',
    },
    {
      id: 'sintesis',
      code: 'RAD-03',
      icon: Cpu,
      badge: 'PRODUCCIÓN GMP',
      title: 'Síntesis Automatizada',
      summary: 'Módulos microfluídicos robóticos en celdas blindadas estériles Clase A con aislamiento radiológico integral.',
      details: 'Reacciones de radiomarcaje 100% automatizadas en casetes desechables de un solo uso, dispensación volumétrica precisa y trazabilidad digital de lote conforme a los estándares de la Farmacopea Europea y la FDA.',
      metrics: [
        { label: 'TIEMPO DE RADIOSÍNTESIS', val: '18.5 minutos' },
        { label: 'RENDIMIENTO RADIOQUÍMICO', val: '> 82.4%' },
        { label: 'BLINDAJE DE PROTECCIÓN', val: '75 mm Equivalente Pb' },
      ],
      accentColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      activeBorder: 'border-blue-500 shadow-md ring-2 ring-blue-500/10',
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
        <div className="tech-header mb-12">
          <div className="flex items-center space-x-2 text-teal-700 font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 font-bold tracking-wider">
              01 // TECNOLOGÍA BIOMÉDICA
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">INGENIERÍA DE RADIOFÁRMACOS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Tecnología en <span className="text-teal-600">Radiofármacos</span>
          </h2>
          <p className="text-slate-600 max-w-3xl text-base sm:text-lg mt-3 font-body leading-relaxed">
            Plataforma integral de síntesis, purificación e imagen molecular orientada a maximizar la precisión diagnóstica y la seguridad en cada administración.
          </p>
        </div>

        {/* 3 Tarjetas en Cristal Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
                className={`tech-card backdrop-blur-xl bg-white/90 border p-6 sm:p-7 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `${tech.activeBorder} bg-white`
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5 font-mono text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Icon className={`w-5 h-5 ${tech.accentColor}`} />
                      </div>
                      <span className="text-slate-500 font-bold">{tech.code}</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-body font-semibold ${tech.badgeBg}`}>
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {tech.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body mb-6">
                    {tech.summary}
                  </p>
                </div>

                {/* Métricas Principales */}
                <div className="pt-4 border-t border-slate-100 space-y-2 font-mono text-xs">
                  {tech.metrics.map((m, i) => (
                    <div key={i} className="flex justify-between items-center py-0.5">
                      <span className="text-[11px] text-slate-500 font-body">{m.label}:</span>
                      <span className={`font-bold ${tech.accentColor}`}>{m.val}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Panel Detallado de la Tarjeta Seleccionada */}
        <div className="backdrop-blur-xl bg-white/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 relative shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">
                Especificaciones de Calidad: {technologies[activeCard].title}
              </h4>
            </div>
            <span className="font-body text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center space-x-1.5 w-fit">
              <Check className="w-3.5 h-3.5" />
              <span>Conforme a Farmacopea Internacional</span>
            </span>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-body">
            {technologies[activeCard].details}
          </p>
        </div>

      </div>
    </section>
  );
};
