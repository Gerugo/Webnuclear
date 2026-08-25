import React from 'react';

interface ScrollyProgressHUDProps {
  progress: number;
  onSelectPhase: (target: string) => void;
}

export const ScrollyProgressHUD: React.FC<ScrollyProgressHUDProps> = ({ progress, onSelectPhase }) => {
  const waypoints = [
    { id: '#hero', label: '00 // INICIO', name: 'Despliegue ADN' },
    { id: '#genesis', label: '01 // TECNOLOGÍA', name: 'Trazadores PET/SPECT' },
    { id: '#bio-synth', label: '02 // LOGÍSTICA', name: 'Vida Media & JIT' },
    { id: '#deep-warp', label: '03 // CLÍNICA', name: 'Oncología & Receptores' },
    { id: '#sandbox', label: '04 // SIMULADOR', name: 'Dosimetría 3D' },
    { id: '#contacto', label: '05 // CONTACTO', name: 'Solicitud de Dosis' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start select-none">
      {/* Barra Vertical de Progreso */}
      <div className="relative pl-6 space-y-7">
        <div className="absolute left-1.5 top-2 bottom-2 w-[2px] bg-slate-200" />
        <div
          className="absolute left-1.5 top-2 w-[2px] bg-teal-600 transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />

        {waypoints.map((wp, i) => {
          const threshold = i / (waypoints.length - 1);
          const isActive = Math.abs(progress - threshold) < 0.12;

          return (
            <div
              key={wp.id}
              onClick={() => onSelectPhase(wp.id)}
              className="group flex items-center space-x-3 cursor-pointer"
            >
              {/* Punto Indicador */}
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 -ml-[23px] relative z-10 ${
                  isActive
                    ? 'border-teal-600 bg-teal-600 scale-125 shadow-[0_0_10px_rgba(13,148,136,0.5)]'
                    : 'border-slate-300 bg-white group-hover:border-teal-400 group-hover:scale-110'
                }`}
              />

              {/* Etiqueta */}
              <div className="flex flex-col transition-all duration-300">
                <span
                  className={`font-mono text-[10px] font-semibold tracking-wider ${
                    isActive ? 'text-teal-700 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {wp.label}
                </span>
                <span
                  className={`font-body text-xs ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {wp.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
