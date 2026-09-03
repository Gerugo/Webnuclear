import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const SynthesisSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [f18Activity, setF18Activity] = useState(87.4);
  const [ga68Activity, setGa68Activity] = useState(62.1);
  const [lu177Activity, setLu177Activity] = useState(99.4);
  const [transitSeconds, setTransitSeconds] = useState(2538); // 42 min 18 s

  useEffect(() => {
    const timer = setInterval(() => {
      setF18Activity((prev) => Math.max(10, Number((prev - 0.04).toFixed(2))));
      setGa68Activity((prev) => Math.max(5, Number((prev - 0.08).toFixed(2))));
      setLu177Activity((prev) => Math.max(50, Number((prev - 0.005).toFixed(3))));
      setTransitSeconds((prev) => (prev > 0 ? prev - 1 : 2500));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.synthesis-header',
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
        '.synthesis-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isotopes = [
    {
      code: '¹⁸F',
      name: 'Flúor-18',
      purpose: 'Diagnóstico PET Oncológico',
      halfLife: '109.7 min',
      currentActivity: `${f18Activity}%`,
      progressVal: f18Activity,
      status: 'En ruta hacia centros PET (Lima)',
    },
    {
      code: '⁶⁸Ga',
      name: 'Galio-68',
      purpose: 'Trazador Neuroendocrino',
      halfLife: '67.7 min',
      currentActivity: `${ga68Activity}%`,
      progressVal: ga68Activity,
      status: 'Control de calidad y elución',
    },
    {
      code: '¹⁷⁷Lu',
      name: 'Lutecio-177',
      purpose: 'Terapia con Radioligandos',
      halfLife: '6.65 días',
      currentActivity: `${lu177Activity}%`,
      progressVal: lu177Activity,
      status: 'Dosis teranóstica lista para infusión',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="bio-synth"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado */}
        <div className="synthesis-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Logística Just-In-Time
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Cada segundo cuenta.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Sincronización milimétrica entre la producción en ciclotrón y la administración programada a cada paciente.
          </p>
        </div>

        {/* Tarjeta Destacada de Tiempo Real */}
        <div className="synthesis-card p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse"></span>
              <span>Despacho Activo • Hub Callao / Jorge Chávez</span>
            </div>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[#1D1D1F] tracking-tight">
              Red Hospitalaria y Oncológica de Lima
            </h3>
            <p className="text-sm text-[#515154] mt-1">
              Lote #F18-PE94 en contenedor blindado Tipo A (4.2 °C) con telemetría en ruta hacia INEN y clínicas asociadas.
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="text-4xl sm:text-5xl font-mono font-bold text-[#0071E3] tracking-tight">
              {formatTime(transitSeconds)}
            </div>
            <div className="text-xs text-[#86868B] mt-1 font-medium">
              Tiempo estimado de entrega en destino
            </div>
          </div>
        </div>

        {/* 3 Tarjetas de Isótopos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isotopes.map((iso, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="synthesis-card p-8 rounded-3xl bg-white/65 backdrop-blur-2xl border border-black/5 hover:bg-white/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-[#1D1D1F]">{iso.code}</span>
                  <span className="text-xs font-medium text-[#86868B] bg-black/4 px-2.5 py-1 rounded-full">
                    T½: {iso.halfLife}
                  </span>
                </div>

                <h4 className="font-display font-semibold text-lg text-[#1D1D1F] mb-1">
                  {iso.name}
                </h4>
                <p className="text-xs text-[#86868B] mb-6">
                  {iso.purpose}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#86868B]">Actividad residual</span>
                  <span className="font-semibold text-[#1D1D1F]">{iso.currentActivity}</span>
                </div>

                <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#0071E3] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, Math.max(0, iso.progressVal))}%` }}
                  />
                </div>

                <div className="text-[11px] text-[#515154] font-medium">
                  {iso.status}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
