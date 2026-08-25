import React, { useState } from 'react';
import { Sliders, RotateCcw, Sparkles, Layers } from 'lucide-react';
import { type SandboxConfig, defaultSandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface DiagnosticsWidgetProps {
  config: SandboxConfig;
  onChange: (newConfig: SandboxConfig) => void;
}

export const DiagnosticsWidget: React.FC<DiagnosticsWidgetProps> = ({ config, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = <K extends keyof SandboxConfig>(key: K, value: SandboxConfig[K]) => {
    soundEngine.playScan();
    onChange({
      ...config,
      [key]: value,
    });
  };

  const handleReset = () => {
    soundEngine.playClick();
    onChange(defaultSandboxConfig);
  };

  const colorOptions: Array<{ id: SandboxConfig['colorScheme']; name: string; color: string }> = [
    { id: 'cyan', name: 'PET (¹⁸F)', color: 'bg-[#00D4B2]' },
    { id: 'emerald', name: 'SPECT (⁹⁹ᵐTc)', color: 'bg-[#10B981]' },
    { id: 'violet', name: 'TERAPIA (¹⁷⁷Lu)', color: 'bg-[#8B5CF6]' },
    { id: 'amber', name: 'CARDIO (¹³N)', color: 'bg-[#F59E0B]' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      {/* Cajón de Control de Dosimetría y Emisión */}
      {isOpen && (
        <div className="mr-3 w-80 md:w-96 backdrop-blur-2xl bg-[#0A0F1E]/90 border border-white/[0.12] rounded-3xl p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-right-4 duration-200 font-body">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <h3 className="font-display font-bold text-sm text-white">
                Simulador de Emisión 3D
              </h3>
            </div>
            <button
              onClick={handleReset}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs font-body flex items-center space-x-1 text-slate-400 hover:text-neon-cyan transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>

          {/* Selector de Espectro / Radioisótopo */}
          <div className="mb-4">
            <label className="text-xs font-mono text-slate-400 block mb-2 font-semibold uppercase">
              // Espectro del Radiofármaco
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleUpdate('colorScheme', opt.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-xl text-xs font-body transition-all cursor-pointer ${
                    config.colorScheme === opt.id
                      ? 'border border-cyan-400/50 bg-cyan-500/15 text-white font-semibold shadow-sm'
                      : 'border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${opt.color}`} />
                  <span className="truncate">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Deformación Molecular */}
          <div className="mb-3.5">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-300">Fluctuación de masa:</span>
              <span className="text-neon-cyan font-mono font-bold">{config.distortion.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.05"
              value={config.distortion}
              onChange={(e) => handleUpdate('distortion', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 2: Velocidad de Órbita */}
          <div className="mb-3.5">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-300">Velocidad cinética:</span>
              <span className="text-neon-cyan font-mono font-bold">{config.speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.05"
              value={config.speed}
              onChange={(e) => handleUpdate('speed', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 3: Densidad de Partículas */}
          <div className="mb-3.5">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-300">Densidad de trazadores:</span>
              <span className="text-neon-cyan font-mono font-bold">{(config.particleDensity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.6"
              step="0.1"
              value={config.particleDensity}
              onChange={(e) => handleUpdate('particleDensity', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 4: Resplandor Fotónico */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-300">Emisión fotónica:</span>
              <span className="text-neon-cyan font-mono font-bold">{config.bloomIntensity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.6"
              step="0.1"
              value={config.bloomIntensity}
              onChange={(e) => handleUpdate('bloomIntensity', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Modo Malla Estructural */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-body text-slate-300">
              <Layers className="w-3.5 h-3.5 text-neon-cyan" />
              <span>Modo Estructura Cristalina</span>
            </div>
            <button
              onClick={() => handleUpdate('wireframe', !config.wireframe)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-3 py-1 rounded-lg text-xs font-body font-semibold transition-all cursor-pointer ${
                config.wireframe
                  ? 'bg-neon-cyan text-slate-950 shadow-sm'
                  : 'bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:bg-white/[0.1]'
              }`}
            >
              {config.wireframe ? 'Activado' : 'Desactivado'}
            </button>
          </div>
        </div>
      )}

      {/* Botón Flotante Limpio */}
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer shadow-lg ${
          isOpen
            ? 'bg-neon-cyan text-slate-950 border-neon-cyan shadow-[0_0_25px_rgba(0,212,178,0.5)]'
            : 'bg-white/[0.06] text-white border-white/[0.15] hover:border-cyan-400/50 hover:bg-white/[0.1] hover:shadow-[0_0_20px_rgba(0,212,178,0.25)]'
        }`}
        title="Configurar Emisión 3D"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
};
