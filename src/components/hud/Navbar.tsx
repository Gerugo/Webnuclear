import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Activity, Dna } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all duration-300 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Identidad de Marca: NUCLIA HEALTH */}
        <div 
          onClick={() => { soundEngine.playClick(); onScrollTo('#hero'); }}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl border border-teal-500/20 bg-teal-50 flex items-center justify-center group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(13,148,136,0.15)] transition-all">
            <Dna className="w-5 h-5 text-teal-600 animate-spin" style={{ animationDuration: '14s' }} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold tracking-tight text-base text-slate-900 group-hover:text-teal-600 transition-colors">
                NUCLIA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-bold">
                HEALTH
              </span>
            </div>
            <p className="text-[10px] font-body font-medium text-slate-500 tracking-wider uppercase">
              Precision Nuclear Medicine
            </p>
          </div>
        </div>

        {/* Telemetría Médica Central en Tiempo Real */}
        <div className="hidden lg:flex items-center space-x-5 px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 font-mono text-[11px] text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <span>CICLOTRÓN: <strong className="text-emerald-700 font-bold">ONLINE</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>LATENCIA: <strong className="text-slate-800">{latency}ms</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span>FPS: <strong className="text-teal-700 font-bold">{fps}</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-slate-700 font-medium">
            ENSAMBLE ADN: <span className="text-teal-600 font-bold">[{(scrollProgress * 100).toFixed(0)}%]</span>
          </div>
        </div>

        {/* Navegación Clínica & Audio */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <nav className="hidden md:flex items-center space-x-5 font-body font-medium text-xs tracking-wide text-slate-600">
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-teal-600 transition-colors py-1 cursor-pointer"
            >
              Tecnología
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-teal-600 transition-colors py-1 cursor-pointer"
            >
              Logística
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-teal-600 transition-colors py-1 cursor-pointer"
            >
              Áreas Clínicas
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#sandbox'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hover:text-teal-600 transition-colors py-1 cursor-pointer"
            >
              Simulador
            </button>
            <button
              onClick={() => { soundEngine.playClick(); onScrollTo('#contacto'); }}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-3.5 py-1.5 rounded-full bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-xs transition-all cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Sintetizador de Audio Médico */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            title={isAudioActive ? 'Silenciar Audio' : 'Activar Audio Celular'}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 border cursor-pointer ${
              isAudioActive
                ? 'bg-teal-50 border-teal-300 text-teal-700 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                <span className="hidden sm:inline">Audio: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Audio</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
