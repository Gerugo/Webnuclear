import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../audio/soundSynth';

interface NavbarProps {
  onScrollTo: (target: string) => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none">
      <div 
        className={`pointer-events-auto max-w-4xl w-full mx-auto px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between backdrop-blur-2xl ${
          isScrolled 
            ? 'bg-white/85 border border-black/8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' 
            : 'bg-white/70 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
        }`}
      >
        {/* Identidad de Marca Minimalista Estilo Apple */}
        <div 
          onClick={() => { soundEngine.playClick(); onScrollTo('#hero'); }}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-6 h-6 rounded-full bg-[#1D1D1F] flex items-center justify-center text-white">
            <span className="font-display font-bold text-xs">N</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-display font-semibold tracking-tight text-sm text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              Nuclia
            </span>
            <span className="text-xs font-normal text-[#86868B]">
              Health
            </span>
          </div>
        </div>

        {/* Enlaces de Navegación Limpios */}
        <nav className="hidden md:flex items-center space-x-6 font-body font-normal text-xs text-[#515154]">
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
            className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
          >
            Tecnología
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
            className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
          >
            Logística
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
            className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
          >
            Áreas Clínicas
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#calculadora'); }}
            className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer font-medium text-[#0071E3] hover:text-[#0077ED]"
          >
            Calculadora
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#contacto'); }}
            className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        {/* Botón CTA Píldora Apple */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => { soundEngine.playClick(); onScrollTo('#contacto'); }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-xs shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            Solicitar Dosis
          </button>
        </div>

      </div>
    </header>
  );
};
