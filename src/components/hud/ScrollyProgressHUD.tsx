import React from 'react';
import { global3DState } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface ScrollyProgressHUDProps {
  progress: number;
  onSelectPhase: (target: string) => void;
}

export const ScrollyProgressHUD: React.FC<ScrollyProgressHUDProps> = ({ progress, onSelectPhase }) => {
  const milestones = [
    { id: '#hero', label: 'ORIGEN', stage: '00', code: 'HERO' },
    { id: '#genesis', label: 'TECNOLOGÍA', stage: '01', code: 'TECH' },
    { id: '#bio-synth', label: 'LOGÍSTICA', stage: '02', code: 'TIME' },
    { id: '#deep-warp', label: 'CLÍNICA', stage: '03', code: 'CLIN' },
    { id: '#sandbox', label: 'SIMULADOR', stage: '04', code: 'SIMU' },
  ];

  const currentIdx = progress < 0.15 ? 0 : progress < 0.38 ? 1 : progress < 0.65 ? 2 : progress < 0.88 ? 3 : 4;

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start space-y-6 pointer-events-auto select-none">
      
      {/* Telemetría Espacial Superior */}
      <div className="font-mono text-[10px] text-clinical-dim space-y-0.5 border-l border-neon-cyan/40 pl-2.5">
        <div>FASE: <strong className="text-neon-cyan">{milestones[currentIdx].stage}</strong></div>
        <div>TRAVERSAL: <strong className="text-clinical-text">{(progress * 100).toFixed(0)}%</strong></div>
        <div className="text-[9px] text-clinical-muted">Z-INDEX: {(-progress * 45).toFixed(1)}Z</div>
      </div>

      {/* Línea de Hitos Vertical Interactiva */}
      <div className="relative flex flex-col space-y-5 pl-2 border-l border-white/10">
        
        {/* Indicador de barra de progreso con gradiente cian/esmeralda */}
        <div
          className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-[#4361EE] to-neon-emerald transition-all duration-150"
          style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />

        {milestones.map((m, idx) => {
          const isActive = currentIdx === idx;
          const isPassed = currentIdx >= idx;

          return (
            <div
              key={m.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectPhase(m.id);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="group flex items-center space-x-3 cursor-pointer"
            >
              {/* Waypoint Dot */}
              <div
                className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-cyan ring-4 ring-neon-cyan/20 scale-125 shadow-[0_0_12px_#00F5D4]'
                    : isPassed
                    ? 'bg-neon-cyan/70'
                    : 'bg-white/20 group-hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-neon-cyan animate-ping opacity-75" />
                )}
              </div>

              {/* Waypoint Label */}
              <div className="flex items-center space-x-2 font-display text-xs tracking-[0.18em]">
                <span className={isActive ? 'text-neon-cyan font-bold' : 'text-clinical-muted group-hover:text-clinical-dim'}>
                  {m.stage}
                </span>
                <span
                  className={`transition-colors uppercase text-[11px] ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-clinical-muted group-hover:text-clinical-dim'
                  }`}
                >
                  {m.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini coordenadas de mouse */}
      <div className="font-mono text-[9px] text-clinical-muted pl-2.5">
        <span>X: {global3DState.mouse.x.toFixed(2)}</span>
        <span className="ml-2">Y: {global3DState.mouse.y.toFixed(2)}</span>
      </div>

    </aside>
  );
};
