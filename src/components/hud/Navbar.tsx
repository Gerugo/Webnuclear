import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundEngine } from '../../audio/soundSynth';

interface NavbarProps {
  onScrollTo: (target: string) => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
  };

  const handleNavClick = (target: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    onScrollTo(target);
  };

  return (
    <header 
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none select-none ${
        isScrolled 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="pointer-events-auto max-w-5xl w-full mx-auto relative">
        <div 
          className="w-full px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between backdrop-blur-2xl bg-white/85 border border-black/8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          {/* Identidad de Marca */}
          <div 
            onClick={() => handleNavClick('#hero')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-full bg-[#18181b] flex items-center justify-center text-[#9fff00]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="8" cy="8" r="4" />
                <circle cx="16" cy="8" r="4" />
                <circle cx="8" cy="16" r="4" />
                <circle cx="16" cy="16" r="4" />
                <circle cx="12" cy="12" r="2.5" fill="#18181b" />
              </svg>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-outfit font-medium tracking-tight text-base text-[#18181b]">
                nuclia
              </span>
              <span className="text-xs font-normal text-[#18181b]/60">
                health perú
              </span>
            </div>
          </div>

          {/* Enlaces de Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-5 font-inter font-normal text-xs text-[#18181b]/80">
            <button
              onClick={() => handleNavClick('#genesis')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer"
            >
              servicios
            </button>
            <button
              onClick={() => handleNavClick('#partners')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer font-medium"
            >
              nosotros
            </button>
            <button
              onClick={() => handleNavClick('#bio-synth')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer"
            >
              logística
            </button>
            <button
              onClick={() => handleNavClick('#deep-warp')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer"
            >
              centro educativo
            </button>
            <button
              onClick={() => handleNavClick('#calculadora')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer font-semibold text-[#18181b]"
            >
              calculadora
            </button>
            <button
              onClick={() => handleNavClick('#contacto')}
              className="hover:text-[#18181b] transition-colors py-1 cursor-pointer"
            >
              buscar ayuda
            </button>
          </nav>

          {/* Botones de Acción y Controles */}
          <div className="flex items-center space-x-2">
            {/* Control de Audio */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Activar efectos de audio clínico' : 'Silenciar audio'}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/4 hover:bg-black/8 text-[#18181b] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#18181b]" />}
            </button>

            {/* Botón CTA Píldora */}
            <button
              onClick={() => handleNavClick('#contacto')}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-4 py-1.5 rounded-full bg-[#18181b] hover:bg-black text-[#9fff00] hover:text-white font-inter font-medium text-xs shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer hidden sm:block"
            >
              solicitar dosis →
            </button>

            {/* Botón Menú Hamburguesa Móvil */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-black/4 text-[#18181b] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Panel Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/8 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="text-xs font-semibold text-[#18181b]/60 uppercase tracking-wider px-2 pb-1 border-b border-black/5">
              Navegación
            </div>
            <div className="flex flex-col space-y-1 font-inter text-sm text-[#18181b]">
              <button
                onClick={() => handleNavClick('#genesis')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                servicios
              </button>
              <button
                onClick={() => handleNavClick('#partners')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer font-medium"
              >
                nosotros (alianzas globales)
              </button>
              <button
                onClick={() => handleNavClick('#bio-synth')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                logística (hub callao)
              </button>
              <button
                onClick={() => handleNavClick('#deep-warp')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                centro educativo
              </button>
              <button
                onClick={() => handleNavClick('#calculadora')}
                className="text-left px-3 py-2 rounded-xl bg-[#9fff00]/20 text-[#18181b] font-semibold transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>calculadora de deterioro</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18181b] text-[#9fff00]">Exclusivo</span>
              </button>
              <button
                onClick={() => handleNavClick('#contacto')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer font-medium"
              >
                buscar ayuda / contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
