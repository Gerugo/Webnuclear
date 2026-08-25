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
      accentColor: 'text-neon-cyan',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
      activeBg: 'bg-cyan-500/[0.08]',
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
      accentColor: 'text-neon-violet',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-400/20',
      activeBg: 'bg-purple-500/[0.08]',
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
      accentColor: 'text-neon-emerald',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
      activeBg: 'bg-emerald-500/[0.08]',
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
          <div className="flex items-center space-x-2 text-neon-violet font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neon-violet tracking-wider">
              03 // APLICACIONES CLÍNICAS
            </span>
            <span className="text-clinical-muted">•</span>
            <span className="text-clinical-dim">ESPECIALIDADES MÉDICAS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Áreas de <span className="text-neon-violet">Especialidad</span>
          </h2>
          <p className="text-clinical-dim max-w-3xl text-base sm:text-lg mt-3 font-body leading-relaxed">
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
                className={`clinical-area-card backdrop-blur-xl bg-white/[0.04] border p-6 sm:p-7 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `border-white/[0.25] ${area.activeBg} shadow-[0_8px_30px_rgba(0,0,0,0.25)]`
                    : 'border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.18]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1]">
                      <AreaIcon className={`w-5 h-5 ${area.accentColor}`} />
                    </div>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${area.badgeBg}`}>
                      ÁREA {area.code}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {area.title}
                  </h3>

                  <div className="text-xs font-body text-slate-300 mb-3 font-medium">
                    {area.tagline}
                  </div>

                  <p className="text-xs text-clinical-dim leading-relaxed font-body mb-5">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-body text-slate-300 group-hover:text-white transition-colors">
                  <span>Ver biomarcadores y dianas</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-neon-cyan" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Desplegado del Área Seleccionada */}
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] rounded-2xl p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3.5">
              <CurrentIcon className={`w-6 h-6 ${currentArea.accentColor}`} />
              <div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                  {currentArea.title} // Protocolos y Trazadores
                </h4>
                <p className="text-xs font-body text-slate-300 mt-0.5">
                  {currentArea.theranosticPair}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 flex items-center space-x-2 w-fit">
              <Activity className="w-3.5 h-3.5 text-neon-cyan" />
              <span>Afinidad Celular &gt; 98.6%</span>
            </div>
          </div>

          {/* Grid de Biomarcadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentArea.biomarkers.map((bio, i) => (
              <div key={i} className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08] p-4 rounded-xl">
                <div className="flex items-center space-x-2 text-xs font-mono mb-1.5">
                  <Target className={`w-3.5 h-3.5 ${currentArea.accentColor}`} />
                  <span className="font-bold text-white">{bio.name}</span>
                </div>
                <div className="text-xs font-body text-clinical-dim leading-relaxed">
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
