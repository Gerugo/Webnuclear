import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Activity, Atom } from 'lucide-react';
import { soundEngine } from '../../audio/soundSynth';

interface NavbarProps {
  onScrollTo: (target: string) => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo, scrollProgress }) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(0.24);

  const toggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsAudioActive(active);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Number((0.15 + Math.random() * 0.12).toFixed(2)));
      setFps(Math.floor(59 + Math.random() * 2));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all duration-300 backdrop-blur-md bg-[#080B10]/75 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Identidad de Marca: NUCLIA HEALTH */}
        <div 
          onClick={() => { soundEngine.playClick(); onScrollTo('#hero'); }}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-lg border border-white/15 backdrop-blur-md bg-white/5 flex items-center justify-center group-hover:border-neon-cyan group-hover:shadow-[0_0_20px_rgba(0,245,212,0.4)] transition-all">
            <Atom className="w-5 h-5 text-neon-cyan animate-spin" style={{ animationDuration: '12s' }} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-emerald animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold tracking-[0.22em] text-base text-white group-hover:text-neon-cyan transition-colors">
                NUCLIA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-semibold">
                HEALTH
              </span>
            </div>
            <p className="text-[9px] font-display font-medium text-clinical-dim tracking-[0.18em] uppercase">
              Precision Nuclear Medicine
            </p>
          </div>
        </div>

        {/* Telemetría Médica Central en Tiempo Real */}
        <div className="hidden lg:flex items-center space-x-6 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 font-mono text-[11px] text-clinical-dim">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald shadow-[0_0_8px_#00ff9d]" />
            <span>CICLOTRÓN: <strong className="text-neon-emerald font-semibold">ONLINE</strong></span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3 h-3 text-neon-cyan" />
            <span>LATENCIA JIT: <strong className="text-clinical-text">{latency}ms</strong></span>
          </div>
          <span className="text-white/20">|</span>
          <div>
            <span>FPS: <strong className="text-neon-cyan">{fps}</strong></span>
          </div>
          <span className="text-white/20">|</span>
          <div className="text-neon-cyan/80">
            TRAVERSAL: <span>[{(scrollProgress * 100).toFixed(0)}%]</span>
          </div>
        </div>

        {/* Navegación Clínica & Audio */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <nav className="hidden md:flex items-center space-x-4 font-display font-medium text-xs tracking-[0.18em] text-clinical-dim">
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-neon-cyan transition-colors py-1 px-2 relative group cursor-pointer"
            >
              // TECNOLOGÍA
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-neon-cyan transition-colors py-1 px-2 relative group cursor-pointer"
            >
              // LOGÍSTICA
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-neon-cyan transition-colors py-1 px-2 relative group cursor-pointer"
            >
              // ÁREAS CLÍNICAS
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#sandbox'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-neon-cyan transition-colors py-1 px-2 relative group cursor-pointer"
            >
              // SIMULADOR
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#contacto'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-neon-cyan transition-colors py-1 px-2 relative group cursor-pointer"
            >
              // CONTACTO
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Sintetizador de Audio Médico */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            title={isAudioActive ? 'Silenciar Audio' : 'Activar Audio Cuántico'}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border cursor-pointer ${
              isAudioActive
                ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                : 'backdrop-blur-md bg-white/5 border-white/10 text-clinical-dim hover:text-white hover:border-white/20'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
                <span className="hidden sm:inline tracking-wider">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline tracking-wider">AUDIO: MUTED</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
