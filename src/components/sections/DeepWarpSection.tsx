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
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.clinical-area-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
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
      code: 'CLIN_01',
      icon: Dna,
      title: 'Oncología Teranóstica',
      tagline: 'Diagnóstico & Terapia Radiometabólica Dirigida',
      desc: 'Visualización y tratamiento de neoplasias malignas a nivel molecular. Permite ver lo que se trata y tratar lo que se ve mediante pares teranósticos de alta afinidad.',
      biomarkers: [
        { name: 'PSMA-617 / PSMA-11', target: 'Cáncer de Próstata Resistente a Castración' },
        { name: 'DOTATATE / DOTATOC', target: 'Tumores Neuroendocrinos (SSTR2)' },
        { name: 'FDG / FAPI', target: 'Microambiente Tumoral y Fibroblastos' },
      ],
      theranosticPair: '⁶⁸Ga-PSMA (Diagnóstico) ➔ ¹⁷⁷Lu / ²²⁵Ac-PSMA (Terapia Alfa/Beta)',
      glowColor: 'hover:border-neon-cyan/60 hover:shadow-[0_0_35px_rgba(0,245,212,0.2)]',
      accentColor: 'text-neon-cyan',
      badgeBg: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
    },
    {
      id: 'neurologia',
      code: 'CLIN_02',
      icon: Brain,
      title: 'Neurología Molecular',
      tagline: 'Neuroimagen Cuántica de Procesos Neurodegenerativos',
      desc: 'Cuantificación in vivo de biomarcadores cerebrales antes de la aparición de síntomas clínicos. Detección temprana de amiloidopatías, taupatías y disfunción dopaminérgica.',
      biomarkers: [
        { name: '¹⁸F-Florbetapir / Florbetaben', target: 'Placas de Amiloide-Beta (Alzheimer)' },
        { name: '¹⁸F-MK-6240 / Flortaucipir', target: 'Depósitos de Proteína Tau Cortical' },
        { name: '¹²³I-FP-CIT (DaTscan)', target: 'Integridad del Transportador de Dopamina (Parkinson)' },
      ],
      theranosticPair: 'PET Amiloide + PET Tau para Estadificación Molecular Precoz',
      glowColor: 'hover:border-neon-violet/60 hover:shadow-[0_0_35px_rgba(157,78,221,0.25)]',
      accentColor: 'text-[#c084fc]',
      badgeBg: 'bg-neon-violet/15 text-[#c084fc] border-neon-violet/40',
    },
    {
      id: 'cardiologia',
      code: 'CLIN_03',
      icon: HeartPulse,
      title: 'Cardiología Molecular',
      tagline: 'Perfusión Miocárdica Cuantitativa y Viabilidad Celular',
      desc: 'Medición absoluta del flujo sanguíneo coronario (MBF) y reserva de flujo miocárdico en mililitros/minuto/gramo, superando las limitaciones relativas del SPECT convencional.',
      biomarkers: [
        { name: '¹³N-Amoníaco / ⁸²Rb', target: 'Cuantificación Absoluta de Perfusión Miocárdica' },
        { name: '¹⁸F-FDG Cardíaco', target: 'Viabilidad e Hibernación Miocárdica' },
        { name: '⁹⁹ᵐTc-DPD / PYP', target: 'Amiloidosis Cardíaca por Transtiretina (ATTR)' },
      ],
      theranosticPair: 'Mapeo de Flujo Coronario Absoluto + MIBG Simpático',
      glowColor: 'hover:border-neon-emerald/60 hover:shadow-[0_0_35px_rgba(0,255,157,0.2)]',
      accentColor: 'text-neon-emerald',
      badgeBg: 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/30',
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
          <div className="flex items-center space-x-3 text-neon-violet font-mono text-xs mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-neon-violet/15 border border-neon-violet/40 text-[#c084fc] tracking-[0.2em]">
              FASE 03 // ÁREAS CLÍNICAS
            </span>
            <span className="text-clinical-dim tracking-[0.15em]">// APLICACIONES MOLECULARES DE ALTA PRECISIÓN</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.14em]">
            Áreas <span className="text-[#c084fc] text-glow-violet">Clínicas</span>
          </h2>
          <p className="text-clinical-dim max-w-3xl text-base sm:text-lg mt-3 font-body leading-relaxed">
            Revolucionando el diagnóstico y abordaje terapéutico en los principales desafíos de la medicina moderna mediante el uso de radioisótopos dirigidos.
          </p>
        </div>

        {/* Cuadrícula de 3 Áreas Clínicas (Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                className={`clinical-area-card backdrop-blur-md bg-white/5 border p-6 sm:p-7 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? `border-white/30 bg-white/10 ${area.glowColor}`
                    : 'border-white/10 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-white/10">
                      <AreaIcon className={`w-5 h-5 ${area.accentColor}`} />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${area.badgeBg}`}>
                      {area.code}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-1.5 tracking-[0.08em] group-hover:text-white transition-colors">
                    {area.title}
                  </h3>

                  <div className={`text-xs font-mono mb-3 ${area.accentColor}`}>
                    {area.tagline}
                  </div>

                  <p className="text-xs text-clinical-dim leading-relaxed font-body mb-5">
                    {area.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-clinical-dim group-hover:text-white transition-colors">
                  <span>VER BIOMARCADORES</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Desplegado del Área Seleccionada */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 corner-brackets relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3">
              <CurrentIcon className={`w-6 h-6 ${currentArea.accentColor} animate-pulse`} />
              <div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-[0.12em]">
                  {currentArea.title} // Protocolo de Trazadores
                </h4>
                <p className="text-xs font-mono text-clinical-dim mt-0.5">
                  {currentArea.theranosticPair}
                </p>
              </div>
            </div>
            <div className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-clinical-text flex items-center space-x-1.5 w-fit">
              <Activity className="w-3.5 h-3.5 text-neon-cyan" />
              <span>AFINIDAD RECEPTOR &gt; 98.6%</span>
            </div>
          </div>

          {/* Grid de Biomarcadores y Dianas Celulares */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentArea.biomarkers.map((bio, i) => (
              <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-xs font-mono mb-1.5">
                  <Target className={`w-3.5 h-3.5 ${currentArea.accentColor}`} />
                  <span className="font-bold text-white">{bio.name}</span>
                </div>
                <div className="text-[11px] font-body text-clinical-dim leading-relaxed">
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
