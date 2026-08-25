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
      color: 'text-teal-600',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      progressVal: f18Activity,
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      code: '⁶⁸Ga',
      name: 'Galio-68 (DOTATOC)',
      halfLife: '67.7 min',
      currentActivity: `${ga68Activity}%`,
      status: 'CALIBRACIÓN',
      destination: 'Instituto Oncológico // PET-MR',
      eta: '09 min estimados',
      color: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      progressVal: ga68Activity,
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      code: '¹⁷⁷Lu',
      name: 'Lutecio-177 (Teranóstica)',
      halfLife: '6.65 días',
      currentActivity: `${lu177Activity}%`,
      status: 'PROGRAMADO',
      destination: 'Servicio de Medicina Nuclear',
      eta: 'Inyección en Turno',
      color: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      progressVal: lu177Activity,
      gradient: 'from-blue-500 to-blue-600',
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
          <div className="flex items-center space-x-2 text-emerald-700 font-mono text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-bold tracking-wider">
              02 // LOGÍSTICA HOSPITALARIA
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">CADENA JUST-IN-TIME</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
                Logística y <span className="text-emerald-600">Vida Media</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3 font-body max-w-2xl leading-relaxed">
                Los radiofármacos de vida media corta exigen una sincronización milimétrica. Nuestro sistema coordina la producción en ciclotrón con la hora programada de administración a cada paciente.
              </p>
            </div>

            {/* Módulo de Telemetría Hospitalaria */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="backdrop-blur-xl bg-white/90 border border-slate-200/90 p-5 rounded-3xl w-full sm:w-auto shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-xs font-mono font-medium">VENTANA CLÍNICA RESTANTE</span>
                  <Timer className="w-4 h-4 text-emerald-600 animate-pulse" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-slate-900">
                  {formatTime(transitSeconds)}
                </div>
                <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-slate-100 text-xs font-body text-slate-600">
                  <Truck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dosis administradas hoy: <strong className="text-slate-900 font-bold">{deliveredDoses}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tarjetas de Isótopos y Decaimiento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {isotopes.map((iso, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="logistics-card backdrop-blur-xl bg-white/90 border border-slate-200/90 p-6 sm:p-7 rounded-3xl hover:border-slate-300 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5">
                  <span className={`text-xl font-bold font-mono ${iso.color}`}>{iso.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    T½: {iso.halfLife}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${iso.badgeBg}`}>
                  {iso.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {iso.name}
              </h3>

              {/* Barra de Actividad Residual */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-500 font-body">Actividad residual:</span>
                  <span className={`font-bold ${iso.color}`}>{iso.currentActivity}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${iso.gradient} transition-all duration-1000 rounded-full`}
                    style={{ width: `${Math.min(100, Math.max(0, iso.progressVal))}%` }}
                  />
                </div>
              </div>

              {/* Destino y Ventana */}
              <div className="pt-3.5 border-t border-slate-100 space-y-2 text-xs font-body text-slate-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{iso.destination}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5 font-mono text-[11px]">
                  <span className="text-slate-500 font-body">Llegada prevista:</span>
                  <span className="text-slate-900 font-bold">{iso.eta}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Garantías de Seguridad en Transporte */}
        <div className="backdrop-blur-xl bg-white/90 border border-slate-200/90 rounded-3xl p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
              <Thermometer className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-mono font-medium">Control Térmico</div>
              <div className="text-slate-900 font-bold mt-0.5">4.2 °C (Criocontrol Continuo)</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-mono font-medium">Blindaje Radiológico</div>
              <div className="text-slate-900 font-bold mt-0.5">Contenedor Tipo A Certificado</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
              <Gauge className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-mono font-medium">Trazabilidad Satelital</div>
              <div className="text-slate-900 font-bold mt-0.5">Monitoreo GPS y Telemetría</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
