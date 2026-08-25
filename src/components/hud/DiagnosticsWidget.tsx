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
    { id: 'cyan', name: 'CYAN', color: 'bg-[#00F5D4]' },
    { id: 'emerald', name: 'EMERALD', color: 'bg-[#00ff9d]' },
    { id: 'violet', name: 'PLASMA', color: 'bg-[#9d4edd]' },
    { id: 'amber', name: 'SOLAR', color: 'bg-[#ffb703]' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      {/* Expanded Control Matrix Drawer - Glassmorphism */}
      {isOpen && (
        <div className="mr-3 w-80 md:w-96 backdrop-blur-md bg-[#080B10]/85 border border-white/10 rounded-lg p-5 shadow-[0_0_30px_rgba(0,245,212,0.15)] animate-in fade-in slide-in-from-right-5 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <h3 className="font-display font-bold text-sm tracking-wider text-clinical-text uppercase">
                3D Diagnostic Matrix
              </h3>
            </div>
            <button
              onClick={handleReset}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-[11px] font-mono flex items-center space-x-1 text-clinical-dim hover:text-neon-cyan transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>

          {/* Color Scheme Selector */}
          <div className="mb-4">
            <label className="text-[11px] font-mono text-clinical-dim block mb-2 uppercase">
              // Quantum Spectrum
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleUpdate('colorScheme', opt.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded font-mono text-[10px] border transition-all ${
                    config.colorScheme === opt.id
                      ? 'border-neon-cyan bg-neon-cyan/20 text-white font-bold shadow-[0_0_10px_rgba(0,245,212,0.4)]'
                      : 'border-white/10 backdrop-blur-md bg-white/5 text-clinical-dim hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Distortion */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-clinical-dim">SURFACE DISTORTION:</span>
              <span className="text-neon-cyan font-bold">{config.distortion.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.05"
              value={config.distortion}
              onChange={(e) => handleUpdate('distortion', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 2: Orbital Speed */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-clinical-dim">ANGULAR VELOCITY:</span>
              <span className="text-neon-cyan font-bold">{config.speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.05"
              value={config.speed}
              onChange={(e) => handleUpdate('speed', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 3: Particle Density */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-clinical-dim">PARTICLE FLUX:</span>
              <span className="text-neon-cyan font-bold">{(config.particleDensity * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.8"
              step="0.1"
              value={config.particleDensity}
              onChange={(e) => handleUpdate('particleDensity', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Slider 4: Bloom Radiance */}
          <div className="mb-4">
            <div className="flex justify-between text-[11px] font-mono mb-1">
              <span className="text-clinical-dim">PHOTON RADIANCE:</span>
              <span className="text-neon-cyan font-bold">{config.bloomIntensity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="3.0"
              step="0.1"
              value={config.bloomIntensity}
              onChange={(e) => handleUpdate('bloomIntensity', parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
            />
          </div>

          {/* Wireframe Mode Toggle */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-clinical-dim">
              <Layers className="w-3.5 h-3.5 text-neon-cyan" />
              <span>WIREFRAME MESH</span>
            </div>
            <button
              onClick={() => handleUpdate('wireframe', !config.wireframe)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-3 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                config.wireframe
                  ? 'bg-neon-cyan text-cyber-950 shadow-[0_0_12px_#00F5D4]'
                  : 'backdrop-blur-md bg-white/5 border border-white/10 text-clinical-dim hover:border-neon-cyan/50 hover:bg-white/10'
              }`}
            >
              {config.wireframe ? 'ACTIVE' : 'INACTIVE'}
            </button>
          </div>
        </div>
      )}

      {/* Trigger Toggle Button */}
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEngine.playHover()}
        className={`p-3.5 rounded-full border transition-all duration-300 backdrop-blur-md flex items-center justify-center ${
          isOpen
            ? 'bg-neon-cyan text-cyber-950 border-neon-cyan shadow-[0_0_20px_rgba(0,245,212,0.6)]'
            : 'bg-white/5 text-neon-cyan border-white/10 hover:border-neon-cyan hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,245,212,0.3)]'
        }`}
        title="Open 3D Diagnostics & Sandbox"
      >
        <Sliders className="w-5 h-5 animate-pulse" />
      </button>
    </div>
  );
};
