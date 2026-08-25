import React, { useState, useEffect, useRef } from 'react';
import { Dna, Brain, HeartPulse, ChevronRight, Activity, Target } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const DeepWarpSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 30 },
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
        '.clinical-area-card',
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
      icon: Dna,
      title: 'Oncología Teranóstica',
      tagline: 'Diagnóstico Temprano y Terapia Radiometabólica Dirigida',
      desc: 'Localización y tratamiento selectivo de células tumorales. Permite identificar la diana biológica exacta mediante PET y destruir las lesiones metastásicas respetando los órganos sanos.',
      biomarkers: [
        { name: 'PSMA-617 / PSMA-11', target: 'Cáncer de Próstata Resistente a Castración' },
        { name: 'DOTATATE / DOTATOC', target: 'Tumores Neuroendocrinos Gastrointestinales' },
        { name: 'FAPI (Inhibidores FAP)', target: 'Mapeo de Fibroblastos en Múltiples Neoplasias' },
      ],
      theranosticPair: '⁶⁸Ga-PSMA (Diagnóstico por Imagen) ➔ ¹⁷⁷Lu / ²²⁵Ac-PSMA (Tratamiento Dirigido)',
      accentColor: 'text-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      activeBorder: 'border-teal-500 shadow-md ring-2 ring-teal-500/10',
    },
    {
      id: 'neurologia',
      code: '02',
      icon: Brain,
      title: 'Neurología Molecular',
      tagline: 'Neuroimagen Precoz de Enfermedades Neurodegenerativas',
      desc: 'Detección cuantitativa in vivo de biomarcadores cerebrales años antes de la manifestación de síntomas clínicos en deterioro cognitivo, Alzheimer y Parkinson.',
      biomarkers: [
        { name: '¹⁸F-Florbetapir / Florbetaben', target: 'Depósitos de Placas de Amiloide-Beta (Alzheimer)' },
        { name: '¹⁸F-MK-6240 / Flortaucipir', target: 'Ovillos de Proteína Tau Cortical' },
        { name: '¹²³I-FP-CIT (DaTscan)', target: 'Integridad del Sistema Dopaminérgico (Parkinson)' },
      ],
      theranosticPair: 'PET Amiloide + PET Tau para Estadificación y Diagnóstico Diferencial',
      accentColor: 'text-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      activeBorder: 'border-purple-500 shadow-md ring-2 ring-purple-500/10',
    },
    {
      id: 'cardiologia',
      code: '03',
      icon: HeartPulse,
      title: 'Cardiología Molecular',
      tagline: 'Perfusión Miocárdica Cuantitativa y Viabilidad Celular',
      desc: 'Evaluación no invasiva del flujo sanguíneo coronario absoluto (MBF) y de la viabilidad celular post-infarto para orientar decisiones de revascularización y tratamiento.',
      biomarkers: [
        { name: '¹³N-Amoníaco / ⁸²Rb', target: 'Cuantificación Absoluta del Flujo Miocárdico (mL/min/g)' },
        { name: '¹⁸F-FDG Cardíaco', target: 'Detección de Tejido Miocárdico Hibernado y Viable' },
        { name: '⁹⁹ᵐTc-DPD / PYP', target: 'Diagnóstico No Invasivo de Amiloidosis Cardíaca (ATTR)' },
      ],
      theranosticPair: 'Reserva de Flujo Coronario PET + MIBG de Inervación Simpática',
      accentColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      activeBorder: 'border-blue-500 shadow-md ring-2 ring-blue-500/10',
    },
  ];

  const currentArea = clinicalAreas[selectedArea];
  const CurrentIcon = currentArea.icon;

  return (
    <section
      ref={sectionRef}
      id="deep-warp"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Encabezado de Sección */}
        <div ref={bannerRef} className="mb-12">
          <div className="flex items-center space-x-2 text-purple-700 font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 font-bold tracking-wider">
              03 // APLICACIONES CLÍNICAS
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">ESPECIALIDADES MÉDICAS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Áreas de <span className="text-purple-600">Especialidad</span>
          </h2>
          <p className="text-slate-600 max-w-3xl text-base sm:text-lg mt-3 font-body leading-relaxed">
            Soluciones teranósticas aplicadas en los principales retos de la salud moderna, aportando información diagnóstica decisiva para los especialistas y sus pacientes.
          </p>
        </div>

        {/* Cuadrícula de 3 Áreas Clínicas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {clinicalAreas.map((area, idx) => {
            const AreaIcon = area.icon;
            const isSelected = selectedArea === idx;

            return (
              <div
                key={area.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArea(idx);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`clinical-area-card backdrop-blur-xl bg-white/90 border p-6 sm:p-7 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `${area.activeBorder} bg-white`
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <AreaIcon className={`w-5 h-5 ${area.accentColor}`} />
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-bold ${area.badgeBg}`}>
                      ÁREA {area.code}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {area.title}
                  </h3>

                  <div className="text-xs font-body text-slate-700 mb-3 font-semibold">
                    {area.tagline}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-body mb-5">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-body font-semibold text-slate-600 group-hover:text-teal-600 transition-colors">
                  <span>Ver biomarcadores y dianas</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-teal-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Desplegado del Área Seleccionada */}
        <div className="backdrop-blur-xl bg-white/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 relative shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3.5">
              <CurrentIcon className={`w-6 h-6 ${currentArea.accentColor}`} />
              <div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  {currentArea.title} // Protocolos y Trazadores
                </h4>
                <p className="text-xs font-body text-slate-500 mt-0.5">
                  {currentArea.theranosticPair}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 flex items-center space-x-2 w-fit font-bold">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Afinidad Celular &gt; 98.6%</span>
            </div>
          </div>

          {/* Grid de Biomarcadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentArea.biomarkers.map((bio, i) => (
              <div key={i} className="bg-slate-50/80 border border-slate-200/80 p-4 rounded-2xl">
                <div className="flex items-center space-x-2 text-xs font-mono mb-1.5">
                  <Target className={`w-3.5 h-3.5 ${currentArea.accentColor}`} />
                  <span className="font-bold text-slate-900">{bio.name}</span>
                </div>
                <div className="text-xs font-body text-slate-600 leading-relaxed">
                  {bio.target}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
