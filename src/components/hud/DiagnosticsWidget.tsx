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
    { id: 'cyan', name: 'PET (¹⁸F)', color: 'bg-teal-600' },
    { id: 'emerald', name: 'SPECT (⁹⁹ᵐTc)', color: 'bg-emerald-600' },
    { id: 'violet', name: 'TERAPIA (¹⁷⁷Lu)', color: 'bg-purple-600' },
    { id: 'amber', name: 'CARDIO (¹³N)', color: 'bg-amber-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      {/* Cajón de Control de Dosimetría */}
      {isOpen && (
        <div className="mr-3 w-80 md:w-96 backdrop-blur-2xl bg-white/95 border border-slate-200/90 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200 font-body">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h3 className="font-display font-bold text-sm text-slate-900">
                Simulador de Emisión y ADN 3D
              </h3>
            </div>
            <button
              onClick={handleReset}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs font-body flex items-center space-x-1 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>

          {/* Selector de Espectro / Radioisótopo */}
          <div className="mb-4">
            <label className="text-xs font-mono text-slate-500 block mb-2 font-semibold uppercase">
              // Espectro de Emisión
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleUpdate('colorScheme', opt.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-xl text-xs font-body transition-all cursor-pointer ${
                    config.colorScheme === opt.id
                      ? 'border border-teal-500 bg-teal-50 text-teal-900 font-bold shadow-2xs'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${opt.color}`} />
                  <span className="truncate">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Velocidad de Giro */}
          <div className="mb-3.5">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-600">Velocidad de giro:</span>
              <span className="text-teal-600 font-mono font-bold">{config.speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.05"
              value={config.speed}
              onChange={(e) => handleUpdate('speed', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Slider 2: Densidad de Trazadores */}
          <div className="mb-3.5">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-600">Trazadores moleculares:</span>
              <span className="text-teal-600 font-mono font-bold">{(config.particleDensity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.6"
              step="0.1"
              value={config.particleDensity}
              onChange={(e) => handleUpdate('particleDensity', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Slider 3: Resplandor Fotónico */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1 font-body">
              <span className="text-slate-600">Intensidad luminosa:</span>
              <span className="text-teal-600 font-mono font-bold">{config.bloomIntensity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.6"
              step="0.1"
              value={config.bloomIntensity}
              onChange={(e) => handleUpdate('bloomIntensity', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Modo Malla Estructural */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-body text-slate-600">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Modo Estructura Cristalina</span>
            </div>
            <button
              onClick={() => handleUpdate('wireframe', !config.wireframe)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-3 py-1 rounded-lg text-xs font-body font-semibold transition-all cursor-pointer ${
                config.wireframe
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {config.wireframe ? 'Activado' : 'Desactivado'}
            </button>
          </div>
        </div>
      )}

      {/* Botón Flotante */}
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer shadow-lg ${
          isOpen
            ? 'bg-teal-600 text-white border-teal-600 shadow-[0_0_20px_rgba(13,148,136,0.4)]'
            : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-md'
        }`}
        title="Configurar Emisión 3D"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
};
