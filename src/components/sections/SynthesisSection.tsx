import React, { useState, useEffect, useRef } from 'react';
import { Timer, Truck, ShieldCheck, Thermometer, MapPin, Gauge } from 'lucide-react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const SynthesisSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [f18Activity, setF18Activity] = useState(87.4);
  const [ga68Activity, setGa68Activity] = useState(62.1);
  const [lu177Activity, setLu177Activity] = useState(99.4);
  const [transitSeconds, setTransitSeconds] = useState(2538); // 42 min 18 s
  const [deliveredDoses, setDeliveredDoses] = useState(1482);

  useEffect(() => {
    const timer = setInterval(() => {
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
      destination: 'Hospital Universitario // PET-CT',
      eta: '18 min estimados',
      color: 'text-neon-cyan',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
      progressVal: f18Activity,
    },
    {
      code: '⁶⁸Ga',
      name: 'Galio-68 (DOTATOC)',
      halfLife: '67.7 min',
      currentActivity: `${ga68Activity}%`,
      status: 'CALIBRACIÓN',
      destination: 'Instituto Oncológico // PET-MR',
      eta: '09 min estimados',
      color: 'text-neon-emerald',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
      progressVal: ga68Activity,
    },
    {
      code: '¹⁷⁷Lu',
      name: 'Lutecio-177 (Teranóstica)',
      halfLife: '6.65 días',
      currentActivity: `${lu177Activity}%`,
      status: 'PROGRAMADO',
      destination: 'Servicio de Medicina Nuclear',
      eta: 'Inyección en Turno',
      color: 'text-neon-cobalt',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-400/20',
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
          <div className="flex items-center space-x-2 text-neon-emerald font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neon-emerald tracking-wider">
              02 // LOGÍSTICA HOSPITALARIA
            </span>
            <span className="text-clinical-muted">•</span>
            <span className="text-clinical-dim">CADENA DE SUMINISTRO JUST-IN-TIME</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
                Logística y <span className="text-neon-emerald">Vida Media</span>
              </h2>
              <p className="text-clinical-dim text-base sm:text-lg mt-3 font-body max-w-2xl leading-relaxed">
                Los radiofármacos de vida media corta exigen una sincronización milimétrica. Nuestro sistema coordina la producción en ciclotrón con la hora programada de administración a cada paciente.
              </p>
            </div>

            {/* Módulo de Telemetría Hospitalaria */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] p-5 rounded-2xl w-full sm:w-auto shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs font-mono">VENTANA CLÍNICA RESTANTE</span>
                  <Timer className="w-4 h-4 text-neon-emerald animate-pulse" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {formatTime(transitSeconds)}
                </div>
                <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-white/[0.08] text-xs font-body text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>Dosis administradas hoy: <strong className="text-white font-semibold">{deliveredDoses}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tarjetas de Isótopos y Decaimiento en Tiempo Real */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {isotopes.map((iso, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="logistics-card backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-6 sm:p-7 rounded-2xl hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <span className={`text-xl font-bold font-mono ${iso.color}`}>{iso.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300">
                    T½: {iso.halfLife}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${iso.badgeBg}`}>
                  {iso.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {iso.name}
              </h3>

              {/* Barra de Actividad Residual en Tiempo Real */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Actividad residual:</span>
                  <span className={`font-bold ${iso.color}`}>{iso.currentActivity}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-emerald transition-all duration-1000 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, iso.progressVal))}%` }}
                  />
                </div>
              </div>

              {/* Destino y Ventana */}
              <div className="pt-3.5 border-t border-white/[0.08] space-y-2 text-xs font-body text-slate-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{iso.destination}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5 font-mono text-[11px]">
                  <span className="text-slate-400">Llegada prevista:</span>
                  <span className="text-white font-medium">{iso.eta}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Garantías de Seguridad en Transporte y Cadena de Frío */}
        <div className="backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
              <Thermometer className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Control Térmico</div>
              <div className="text-white font-semibold mt-0.5">4.2 °C (Criocontrol Continuo)</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
              <ShieldCheck className="w-5 h-5 text-neon-emerald" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Blindaje Radiológico</div>
              <div className="text-white font-semibold mt-0.5">Contenedor Tipo A Certificado</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
              <Gauge className="w-5 h-5 text-neon-cobalt" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Trazabilidad Satelital</div>
              <div className="text-white font-semibold mt-0.5">Monitoreo GPS y Telemetría</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
