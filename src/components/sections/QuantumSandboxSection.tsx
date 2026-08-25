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
      colorText: 'text-teal-600',
      buttonClass: 'bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white border border-teal-200',
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
      name: 'Terapia Radioligandos (¹⁷⁷Lu)',
      tag: 'TERAPIA METABÓLICA',
      icon: Activity,
      desc: 'Emisión beta dirigida de corto alcance para destruir células metastásicas sin dañar el tejido circundante.',
      colorText: 'text-emerald-600',
      buttonClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200',
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
      colorText: 'text-purple-600',
      buttonClass: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white border border-purple-200',
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
      colorText: 'text-amber-600',
      buttonClass: 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white border border-amber-200',
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
          <div className="flex items-center space-x-2 text-teal-700 font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 font-bold tracking-wider">
              04 // SIMULADOR CLÍNICO
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">DOSIMETRÍA Y COMPORTAMIENTO MOLECULAR</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Simulador de <span className="text-teal-600">Trazadores Moleculares</span>
          </h2>
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg mt-3 font-body leading-relaxed">
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
                className="sandbox-preset-card backdrop-blur-xl bg-white/90 border border-slate-200/90 p-6 rounded-3xl hover:border-slate-300 hover:shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {p.tag}
                    </span>
                    <PresetIcon className={`w-4 h-4 ${p.colorText}`} />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {p.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-body mb-5">
                    {p.desc}
                  </p>
                </div>

                <button className={`w-full py-2.5 rounded-xl text-xs font-body font-semibold transition-all flex items-center justify-center space-x-1.5 ${p.buttonClass}`}>
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simular Trazador</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Tabla de Estándares de Dosimetría */}
        <div className="spec-matrix-table backdrop-blur-xl bg-white/90 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">
                Garantías de Calidad y Cumplimiento Regulatorio
              </h3>
            </div>
            <span className="text-xs font-body font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>Instalaciones Certificadas por Autoridades Sanitarias</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-xs text-slate-700">
            <div className="space-y-2.5">
              <div className="text-slate-500 uppercase font-mono text-[11px] font-bold">// FABRICACIÓN GMP</div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Celdas de Producción:</span>
                <span className="text-slate-900 font-semibold">Clase A Blindada (75mm Pb)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Esterilidad y Asepsia:</span>
                <span className="text-slate-900 font-semibold">100% Casetes Desechables</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Control HPLC:</span>
                <span className="text-teal-700 font-bold">Liberación Digital</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-slate-500 uppercase font-mono text-[11px] font-bold">// DOSIMETRÍA Y SEGURIDAD</div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Protección al Paciente:</span>
                <span className="text-slate-900 font-semibold">Dosis ALARA Optimizada</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Calibración de Actividad:</span>
                <span className="text-emerald-700 font-bold">Activímetro NIST</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Vida Media Residual:</span>
                <span className="text-emerald-700 font-bold">Precisión al Minuto</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="text-slate-400 uppercase font-mono text-[11px] font-bold">// RED Y DISTRIBUCIÓN</div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Transporte Radioactivo:</span>
                <span className="text-slate-900 font-semibold">Contenedores Tipo A</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <span className="text-slate-500">Cadena de Frío:</span>
                <span className="text-emerald-700 font-bold">4.2 °C Registrador</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Cobertura de Entrega:</span>
                <span className="text-teal-700 font-bold">Hospitales 24/7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
