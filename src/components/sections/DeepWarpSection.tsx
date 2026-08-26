import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const DeepWarpSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.deepwarp-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.deepwarp-card',
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

  const clinicalAreas = [
    {
      id: 'oncologia',
      code: '01',
      title: 'Oncología Teranóstica',
      tagline: 'Diagnóstico temprano y terapia dirigida.',
      desc: 'Identificación precisa de dianas biológicas tumorales mediante PET y destrucción de lesiones metastásicas respetando los órganos sanos.',
      biomarkers: ['PSMA-617 / PSMA-11', 'DOTATATE / DOTATOC', 'FAPI (Fibroblastos)'],
      pair: '⁶⁸Ga-PSMA (Diagnóstico) ➔ ¹⁷⁷Lu-PSMA (Terapia)',
    },
    {
      id: 'neurologia',
      code: '02',
      title: 'Neurología Molecular',
      tagline: 'Neuroimagen precoz y cuantitativa.',
      desc: 'Detección in vivo de placas amiloides y proteína tau años antes de la manifestación de síntomas clínicos en Alzheimer y Parkinson.',
      biomarkers: ['¹⁸F-Florbetapir (Amiloide)', '¹⁸F-MK-6240 (Tau)', '¹²³I-DaTscan (Dopamina)'],
      pair: 'PET Amiloide + PET Tau para Estadificación',
    },
    {
      id: 'cardiologia',
      code: '03',
      title: 'Cardiología Molecular',
      tagline: 'Perfusión miocárdica absoluta.',
      desc: 'Evaluación no invasiva del flujo coronario absoluto (MBF) y de la viabilidad celular para orientar decisiones de revascularización.',
      biomarkers: ['¹³N-Amoníaco / ⁸²Rb', '¹⁸F-FDG Cardíaco', '⁹⁹ᵐTc-DPD (Amiloidosis)'],
      pair: 'Reserva de Flujo Coronario PET',
    },
  ];

  const currentArea = clinicalAreas[selectedArea];

  return (
    <section
      ref={sectionRef}
      id="deep-warp"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado */}
        <div className="deepwarp-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Especialidades Médicas
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Áreas de aplicación clínica.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Soluciones teranósticas que aportan información diagnóstica decisiva a los especialistas y sus pacientes.
          </p>
        </div>

        {/* 3 Tarjetas de Especialidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {clinicalAreas.map((area, idx) => {
            const isSelected = selectedArea === idx;

            return (
              <div
                key={area.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArea(idx);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`deepwarp-card p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-2xl ${
                  isSelected
                    ? 'bg-white/90 border border-[#0071E3]/30 shadow-[0_8px_30px_rgb(0,113,227,0.08)] ring-1 ring-[#0071E3]/20'
                    : 'bg-white/65 border border-black/5 hover:bg-white/80 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#86868B] uppercase mb-4">
                    Área {area.code}
                  </div>

                  <h3 className="font-display font-semibold text-xl text-[#1D1D1F] mb-1 tracking-tight">
                    {area.title}
                  </h3>

                  <div className="text-xs text-[#0071E3] font-medium mb-4">
                    {area.tagline}
                  </div>

                  <p className="text-sm text-[#515154] leading-relaxed font-normal">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 text-xs font-medium text-[#0071E3]">
                  {isSelected ? 'Seleccionado' : 'Ver biomarcadores'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detalle de Biomarcadores */}
        <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-2xl border border-black/5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-black/5 gap-2">
            <div>
              <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                {currentArea.title}
              </div>
              <div className="text-sm text-[#515154]">
                Protocolo: <strong className="text-[#1D1D1F]">{currentArea.pair}</strong>
              </div>
            </div>
            <div className="text-xs font-medium text-[#86868B] bg-black/4 px-3 py-1 rounded-full w-fit">
              Afinidad Celular &gt; 98.6%
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentArea.biomarkers.map((b, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/60 border border-black/4">
                <div className="text-xs font-semibold text-[#1D1D1F]">{b}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
