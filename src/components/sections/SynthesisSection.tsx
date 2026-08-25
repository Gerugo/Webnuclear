import React, { useState, useEffect, useRef } from 'react';
import { Timer, Plane, ShieldAlert, Cpu, MapPin, Gauge } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const SynthesisSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Estados de cálculo de decaimiento en tiempo real frente al reloj
  const [f18Activity, setF18Activity] = useState(87.4);
  const [ga68Activity, setGa68Activity] = useState(62.1);
  const [lu177Activity, setLu177Activity] = useState(99.4);
  const [transitSeconds, setTransitSeconds] = useState(2538); // 42 min 18 s
  const [deliveredDoses, setDeliveredDoses] = useState(1482);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulación matemática del decaimiento exponencial N(t) = N0 * e^(-lambda * t)
      setF18Activity((prev) => Math.max(10, Number((prev - 0.04).toFixed(2))));
      setGa68Activity((prev) => Math.max(5, Number((prev - 0.08).toFixed(2))));
      setLu177Activity((prev) => Math.max(50, Number((prev - 0.005).toFixed(3))));
      setTransitSeconds((prev) => (prev > 0 ? prev - 1 : 2500));
    }, 1000);

    const doseInterval = setInterval(() => {
      setDeliveredDoses((prev) => prev + 1);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(doseInterval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.logistics-header',
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
        '.logistics-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isotopes = [
    {
      code: '¹⁸F',
      name: 'Flúor-18 (FDG / PSMA)',
      halfLife: '109.7 min',
      currentActivity: `${f18Activity}%`,
      status: 'EN RUTA',
      destination: 'Hospital Universitario // PET-CT 04',
      eta: '18 min',
      color: 'text-neon-cyan',
      borderColor: 'border-neon-cyan/40',
      badgeBg: 'bg-neon-cyan/10 text-neon-cyan',
      progressVal: f18Activity,
    },
    {
      code: '⁶⁸Ga',
      name: 'Galio-68 (DOTATOC)',
      halfLife: '67.7 min',
      currentActivity: `${ga68Activity}%`,
      status: 'CALIBRACIÓN FINAL',
      destination: 'Instituto Oncológico // PET-MR 02',
      eta: '09 min',
      color: 'text-neon-emerald',
      borderColor: 'border-neon-emerald/40',
      badgeBg: 'bg-neon-emerald/10 text-neon-emerald',
      progressVal: ga68Activity,
    },
    {
      code: '¹⁷⁷Lu',
      name: 'Lutecio-177 (Teranóstica)',
      halfLife: '6.65 días',
      currentActivity: `${lu177Activity}%`,
      status: 'DISPENSADO',
      destination: 'Centro de Terapia Metabólica',
      eta: 'Inyección Programada',
      color: 'text-[#c084fc]',
      borderColor: 'border-neon-violet/40',
      badgeBg: 'bg-neon-violet/15 text-[#c084fc]',
      progressVal: lu177Activity,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="bio-synth"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Encabezado de Sección */}
        <div className="logistics-header mb-12">
          <div className="flex items-center space-x-3 text-neon-emerald font-mono text-xs mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-neon-emerald/10 border border-neon-emerald/30 tracking-[0.2em]">
              FASE 02 // LOGÍSTICA &amp; VIDA MEDIA
            </span>
            <span className="text-clinical-dim tracking-[0.15em]">// CADENA DE SUMINISTRO JUST-IN-TIME</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.14em]">
                Precisión Temporal &amp; <span className="text-neon-emerald text-glow-emerald">Decaimiento</span>
              </h2>
              <p className="text-clinical-dim text-base sm:text-lg mt-3 font-body max-w-2xl leading-relaxed">
                Debido a la vida media ultracorta de los radioisótopos médicos, cada segundo cuenta. Algoritmos predictivos sincronizan la producción del ciclotrón con la hora exacta de inyección al paciente.
              </p>
            </div>

            {/* Módulo de Telemetría Global JIT */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="backdrop-blur-md bg-white/5 border border-neon-emerald/40 p-5 rounded-xl font-mono text-xs shadow-[0_0_25px_rgba(0,255,157,0.15)] w-full sm:w-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-clinical-muted text-[10px] tracking-wider">TIEMPO VENTANA CRÍTICO</span>
                  <Timer className="w-4 h-4 text-neon-emerald animate-pulse" />
                </div>
                <div className="text-2xl font-bold font-mono text-neon-emerald tracking-wider">
                  {formatTime(transitSeconds)}
                </div>
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-white/10 text-[11px] text-clinical-dim">
                  <Plane className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>Dosis Entregadas Hoy: <strong className="text-white">{deliveredDoses}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tarjetas de Isótopos y Decaimiento en Tiempo Real */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isotopes.map((iso, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="logistics-card backdrop-blur-md bg-white/5 border border-white/10 p-6 sm:p-7 rounded-xl hover:border-white/30 hover:bg-white/8 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <span className={`text-xl font-bold font-mono ${iso.color}`}>{iso.code}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-clinical-dim">
                    T½ = {iso.halfLife}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 ${iso.badgeBg}`}>
                  {iso.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-3 tracking-[0.08em] group-hover:text-neon-emerald transition-colors">
                {iso.name}
              </h3>

              {/* Barra de Actividad Residual en Tiempo Real */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-clinical-muted">ACTIVIDAD RESIDUAL:</span>
                  <span className={`font-bold ${iso.color}`}>{iso.currentActivity}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-emerald transition-all duration-1000"
                    style={{ width: `${Math.min(100, Math.max(0, iso.progressVal))}%` }}
                  />
                </div>
              </div>

              {/* Datos de Telemetría Logística */}
              <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-xs text-clinical-dim">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-clinical-muted shrink-0" />
                  <span className="truncate text-[11px]">{iso.destination}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-clinical-muted">VENTANA ETA:</span>
                  <span className="text-white font-semibold">{iso.eta}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Banner de Monitoreo de Cadena de Frío y Blindaje Radiológico */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-white/10">
              <Gauge className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <div className="text-[10px] text-clinical-muted uppercase">MONITOREO TÉRMICO</div>
              <div className="text-sm font-bold text-white mt-0.5">4.2 °C (±0.1°C Estable)</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-white/10">
              <ShieldAlert className="w-5 h-5 text-neon-emerald" />
            </div>
            <div>
              <div className="text-[10px] text-clinical-muted uppercase">BLINDAJE DE TRANSPORTE</div>
              <div className="text-sm font-bold text-white mt-0.5">Tipo A (Tungsteno 45mm)</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-white/10">
              <Cpu className="w-5 h-5 text-[#c084fc]" />
            </div>
            <div>
              <div className="text-[10px] text-clinical-muted uppercase">SINCRONIZACIÓN SATELITAL</div>
              <div className="text-sm font-bold text-white mt-0.5">GPS / Galileo Telemetry</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
