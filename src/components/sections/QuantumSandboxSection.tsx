import React, { useEffect, useRef } from 'react';
import { Sparkles, Check, Sliders, Dna, Activity, Heart, Brain } from 'lucide-react';
import gsap from 'gsap';
import { type SandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface QuantumSandboxSectionProps {
  config: SandboxConfig;
  onUpdateConfig: (newConfig: SandboxConfig) => void;
}

export const QuantumSandboxSection: React.FC<QuantumSandboxSectionProps> = ({ config, onUpdateConfig }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sandbox-preset-card',
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        '.spec-matrix-table',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const presets: Array<{
    name: string;
    tag: string;
    icon: typeof Dna;
    desc: string;
    config: Partial<SandboxConfig>;
    colorText: string;
    buttonClass: string;
  }> = [
    {
      name: 'PET Oncológico (¹⁸F-FDG)',
      tag: 'DIAGNÓSTICO TUMORAL',
      icon: Dna,
      desc: 'Alta resolución de coincidencia fotónica para el mapeo metabólico del consumo de glucosa celular.',
      colorText: 'text-neon-cyan',
      buttonClass: 'hover:bg-cyan-500 hover:text-slate-950',
      config: {
        speed: 1.2,
        distortion: 1.1,
        particleDensity: 1.2,
        wireframe: false,
        colorScheme: 'cyan',
        bloomIntensity: 1.6,
      },
    },
    {
      name: 'Terapia con Radioligandos (¹⁷⁷Lu)',
      tag: 'TERAPIA METABÓLICA',
      icon: Activity,
      desc: 'Emisión beta dirigida de corto alcance para destruir células metastásicas sin dañar el tejido circundante.',
      colorText: 'text-neon-emerald',
      buttonClass: 'hover:bg-emerald-500 hover:text-slate-950',
      config: {
        speed: 0.8,
        distortion: 0.9,
        particleDensity: 0.9,
        wireframe: false,
        colorScheme: 'emerald',
        bloomIntensity: 1.4,
      },
    },
    {
      name: 'Neuroimagen Cortical (¹⁸F-Tau)',
      tag: 'NEUROLOGÍA MOLECULAR',
      icon: Brain,
      desc: 'Visualización de ovillos proteicos corticales y receptores neuronales en fases iniciales.',
      colorText: 'text-neon-violet',
      buttonClass: 'hover:bg-purple-500 hover:text-white',
      config: {
        speed: 1.0,
        distortion: 1.4,
        particleDensity: 1.1,
        wireframe: false,
        colorScheme: 'violet',
        bloomIntensity: 1.8,
      },
    },
    {
      name: 'Perfusión Miocárdica (¹³N)',
      tag: 'CARDIOLOGÍA CUANTITATIVA',
      icon: Heart,
      desc: 'Evaluación de la dinámica de flujo coronario absoluto y viabilidad celular post-infarto.',
      colorText: 'text-neon-amber',
      buttonClass: 'hover:bg-amber-500 hover:text-slate-950',
      config: {
        speed: 1.4,
        distortion: 1.3,
        particleDensity: 1.2,
        wireframe: false,
        colorScheme: 'amber',
        bloomIntensity: 1.7,
      },
    },
  ];

  const applyPreset = (presetConfig: Partial<SandboxConfig>) => {
    soundEngine.playScan();
    onUpdateConfig({
      ...config,
      ...presetConfig,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="sandbox"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Encabezado */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-neon-cyan font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neon-cyan tracking-wider">
              04 // SIMULADOR CLÍNICO
            </span>
            <span className="text-clinical-muted">•</span>
            <span className="text-clinical-dim">DOSIMETRÍA Y COMPORTAMIENTO MOLECULAR</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Simulador de <span className="text-neon-cyan">Trazadores Moleculares</span>
          </h2>
          <p className="text-clinical-dim max-w-2xl text-base sm:text-lg mt-3 font-body leading-relaxed">
            Explora de forma interactiva el comportamiento de emisión y afinidad de los principales radiofármacos teranósticos.
          </p>
        </div>

        {/* Tarjetas de Presets Clínicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {presets.map((p, idx) => {
            const PresetIcon = p.icon;
            return (
              <div
                key={idx}
                onClick={() => applyPreset(p.config)}
                onMouseEnter={() => soundEngine.playHover()}
                className="sandbox-preset-card backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-6 rounded-2xl hover:border-white/[0.22] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 text-[10px]">
                      {p.tag}
                    </span>
                    <PresetIcon className={`w-4 h-4 ${p.colorText}`} />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </h3>
                  
                  <p className="text-xs text-clinical-dim leading-relaxed font-body mb-5">
                    {p.desc}
                  </p>
                </div>

                <button className={`w-full py-2.5 rounded-xl backdrop-blur-md bg-white/[0.05] border border-white/[0.1] text-xs font-body font-semibold text-slate-200 transition-all flex items-center justify-center space-x-1.5 ${p.buttonClass}`}>
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simular Trazador</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Tabla de Estándares de Dosimetría y Farmacopea */}
        <div className="spec-matrix-table backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-display font-bold text-lg text-white">
                Garantías de Calidad y Cumplimiento Regulatorio
              </h3>
            </div>
            <span className="text-xs font-body text-emerald-400 flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>Instalaciones Certificadas por Autoridades Sanitarias</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-xs text-slate-300">
            <div className="space-y-2.5">
              <div className="text-slate-400 uppercase font-mono text-[11px] font-semibold">// FABRICACIÓN GMP</div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Celdas de Producción:</span>
                <span className="text-white font-medium">Clase A Blindada (75mm Pb)</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Esterilidad y Asepsia:</span>
                <span className="text-white font-medium">100% Casetes Desechables</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Control HPLC:</span>
                <span className="text-neon-cyan font-medium">Liberación Digital Automática</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-slate-400 uppercase font-mono text-[11px] font-semibold">// DOSIMETRÍA Y SEGURIDAD</div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Protección al Paciente:</span>
                <span className="text-white font-medium">Dosis ALARA Optimizada</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Calibración de Actividad:</span>
                <span className="text-neon-emerald font-medium">Activímetro Trazable NIST</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Vida Media Residual:</span>
                <span className="text-neon-emerald font-medium">Sincronización al Minuto</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-slate-400 uppercase font-mono text-[11px] font-semibold">// RED Y DISTRIBUCIÓN</div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Transporte Radioactivo:</span>
                <span className="text-white font-medium">Contenedores ADR Tipo A</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.05] py-1">
                <span className="text-clinical-dim">Cadena de Frío:</span>
                <span className="text-neon-emerald font-medium">Registrador Térmico Activo</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Cobertura de Entrega:</span>
                <span className="text-neon-cyan font-medium">Hospitales Nacionales 24/7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
