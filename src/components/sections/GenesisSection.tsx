import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const GenesisSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.genesis-header',
        { opacity: 0, y: 25 },
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
        '.genesis-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
      tag: 'Imagen Molecular',
      title: 'Trazadores PET y SPECT',
      summary: 'Radiofármacos emisores de positrones (¹⁸F, ⁶⁸Ga) diseñados para una afinidad celular de máxima resolución.',
      details: 'La unión de radioisótopos de vida media corta a ligandos biológicos específicos permite visualizar con nitidez milimétrica receptores oncológicos, placas amiloides y perfusión miocárdica mediante tomógrafos PET-CT y SPECT-CT.',
      metric: '< 1.8 mm',
      metricLabel: 'Resolución Tomográfica',
    },
    {
      id: 'pureza',
      tag: 'Calidad Farmacéutica',
      title: 'Pureza >99.98%',
      summary: 'Procesos rigurosos de separación electromagnética para garantizar la máxima actividad específica sin portador.',
      details: 'Sistemas automatizados de purificación por cromatografía líquida HPLC y espectrometría gamma que eliminan trazas radiolíticas, asegurando que el paciente reciba la dosis terapéutica con la menor exposición innecesaria posible.',
      metric: '99.994%',
      metricLabel: 'Pureza Radionucleídica',
    },
    {
      id: 'sintesis',
      tag: 'Producción GMP',
      title: 'Síntesis Automatizada',
      summary: 'Módulos microfluídicos robóticos en celdas blindadas estériles Clase A con aislamiento radiológico integral.',
      details: 'Reacciones de radiomarcaje 100% automatizadas en casetes desechables de un solo uso, dispensación volumétrica precisa y trazabilidad digital de lote conforme a los estándares de la Farmacopea Europea y la FDA.',
      metric: '18.5 min',
      metricLabel: 'Tiempo de Radiosíntesis',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="genesis"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado Estilo Apple */}
        <div className="genesis-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Tecnología
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Ingeniería de radiofármacos.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Plataforma integral de síntesis, purificación e imagen molecular orientada a maximizar la precisión diagnóstica.
          </p>
        </div>

        {/* 3 Tarjetas Minimalistas Estilo Apple */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {technologies.map((tech, idx) => {
            const isSelected = activeCard === idx;

            return (
              <div
                key={tech.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCard(idx);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`genesis-card p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-2xl ${
                  isSelected
                    ? 'bg-white/90 border border-[#0071E3]/30 shadow-[0_8px_30px_rgb(0,113,227,0.08)] ring-1 ring-[#0071E3]/20'
                    : 'bg-white/65 border border-black/5 hover:bg-white/80 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#86868B] uppercase mb-4">
                    {tech.tag}
                  </div>

                  <h3 className="font-display font-semibold text-xl text-[#1D1D1F] mb-3 tracking-tight">
                    {tech.title}
                  </h3>

                  <p className="text-sm text-[#515154] leading-relaxed font-normal mb-8">
                    {tech.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <div className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">
                    {tech.metric}
                  </div>
                  <div className="text-xs text-[#86868B] mt-0.5">
                    {tech.metricLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detalle Ampliado de la Tarjeta Seleccionada */}
        <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-2xl border border-black/5 shadow-2xs">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Especificación Clínica // {technologies[activeCard].title}
          </div>
          <p className="text-[#1D1D1F] text-base leading-relaxed font-normal">
            {technologies[activeCard].details}
          </p>
        </div>

      </div>
    </section>
  );
};
