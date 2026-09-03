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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none">
      <div className="pointer-events-auto max-w-5xl w-full mx-auto relative">
        <div 
          className={`w-full px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between backdrop-blur-2xl ${
            isScrolled 
              ? 'bg-white/85 border border-black/8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' 
              : 'bg-white/70 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
          }`}
        >
          {/* Identidad de Marca */}
          <div 
            onClick={() => handleNavClick('#hero')}
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
                Health Perú
              </span>
            </div>
          </div>

          {/* Enlaces de Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-5 font-body font-normal text-xs text-[#515154]">
            <button
              onClick={() => handleNavClick('#genesis')}
              className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
            >
              Tecnología
            </button>
            <button
              onClick={() => handleNavClick('#partners')}
              className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer font-medium text-[#1D1D1F]"
            >
              Alianzas Globales
            </button>
            <button
              onClick={() => handleNavClick('#bio-synth')}
              className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
            >
              Logística
            </button>
            <button
              onClick={() => handleNavClick('#deep-warp')}
              className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
            >
              Áreas Clínicas
            </button>
            <button
              onClick={() => handleNavClick('#calculadora')}
              className="hover:text-[#0077ED] transition-colors py-1 cursor-pointer font-semibold text-[#0071E3]"
            >
              Calculadora
            </button>
            <button
              onClick={() => handleNavClick('#contacto')}
              className="hover:text-[#1D1D1F] transition-colors py-1 cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Botones de Acción y Controles */}
          <div className="flex items-center space-x-2">
            {/* Control de Audio */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Activar efectos de audio clínico' : 'Silenciar audio'}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/4 hover:bg-black/8 text-[#515154] hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#0071E3]" />}
            </button>

            {/* Botón CTA Píldora */}
            <button
              onClick={() => handleNavClick('#contacto')}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-xs shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer hidden sm:block"
            >
              Solicitar Dosis
            </button>

            {/* Botón Menú Hamburguesa Móvil */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-black/4 text-[#1D1D1F] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Panel Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/8 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider px-2 pb-1 border-b border-black/5">
              Navegación
            </div>
            <div className="flex flex-col space-y-1 font-body text-sm text-[#1D1D1F]">
              <button
                onClick={() => handleNavClick('#genesis')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                Tecnología e Imagen Molecular
              </button>
              <button
                onClick={() => handleNavClick('#partners')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer font-medium text-[#0071E3]"
              >
                Alianzas Globales (Curium, Tema, Mirion)
              </button>
              <button
                onClick={() => handleNavClick('#bio-synth')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                Logística Just-In-Time (Hub Callao)
              </button>
              <button
                onClick={() => handleNavClick('#deep-warp')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer"
              >
                Especialidades Clínicas
              </button>
              <button
                onClick={() => handleNavClick('#calculadora')}
                className="text-left px-3 py-2 rounded-xl bg-[#0071E3]/8 text-[#0071E3] font-semibold transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>Calculadora de Deterioro</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0071E3] text-white">Exclusivo</span>
              </button>
              <button
                onClick={() => handleNavClick('#contacto')}
                className="text-left px-3 py-2 rounded-xl hover:bg-black/3 transition-colors cursor-pointer font-medium"
              >
                Atención y Pedidos Hospitalarios
              </button>
            </div>

            <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#86868B] px-2">
              <span>Guardia 24h Perú: +51 987 654 321</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
