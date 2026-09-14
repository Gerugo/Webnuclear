import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { soundEngine } from '../../audio/soundSynth';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenTerminal }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Animación de entrada: 0.8s, ascenso de 20px, una sola vez
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

      tl.fromTo(
        '.hero-nav-anim',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0 }
      )
        .fromTo(
          '.hero-badge-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.5'
        )
        .fromTo(
          '.hero-title-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.6'
        )
        .fromTo(
          '.hero-desc-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.6'
        )
        .fromTo(
          '.hero-buttons-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.6'
        )
        .fromTo(
          '.hero-video-anim',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Control de reproducción del video: Pausa fuera de pantalla y con movimiento reducido
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respeta preferencia de accesibilidad de movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (targetId: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-[#EDEEF5] text-[#18181b] overflow-hidden select-none"
    >
      {/* ── 1. NAVEGACIÓN SUPERIOR ────────────────────────────────────────── */}
      <header className="hero-nav-anim w-full max-w-6xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between relative z-30 font-inter">
        {/* Marca con icono de trébol estilizado */}
        <div 
          onClick={() => handleNavClick('#hero')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          {/* Icono de trébol */}
          <div className="w-8 h-8 rounded-full bg-[#18181b] text-[#9fff00] flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <circle cx="8" cy="8" r="4" />
              <circle cx="16" cy="8" r="4" />
              <circle cx="8" cy="16" r="4" />
              <circle cx="16" cy="16" r="4" />
              <circle cx="12" cy="12" r="2.5" fill="#18181b" />
            </svg>
          </div>
          <span className="font-outfit text-xl font-medium tracking-tight text-[#18181b]">
            nuclia
          </span>
        </div>

        {/* Enlaces de Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-normal text-[#18181b]/80">
          <button 
            onClick={() => handleNavClick('#genesis')}
            className="hover:text-[#18181b] transition-colors cursor-pointer"
          >
            servicios
          </button>
          <button 
            onClick={() => handleNavClick('#partners')}
            className="hover:text-[#18181b] transition-colors cursor-pointer"
          >
            nosotros
          </button>
          <button 
            onClick={() => handleNavClick('#bio-synth')}
            className="hover:text-[#18181b] transition-colors cursor-pointer"
          >
            logística
          </button>
          <button 
            onClick={() => handleNavClick('#calculadora')}
            className="hover:text-[#18181b] transition-colors cursor-pointer font-medium"
          >
            calculadora
          </button>
          <button 
            onClick={() => handleNavClick('#deep-warp')}
            className="hover:text-[#18181b] transition-colors cursor-pointer"
          >
            centro educativo
          </button>
          <button 
            onClick={() => handleNavClick('#contacto')}
            className="hover:text-[#18181b] transition-colors cursor-pointer"
          >
            buscar ayuda
          </button>
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick('#contacto')}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-5 py-2.5 rounded-full bg-[#18181b] hover:bg-black text-[#9fff00] hover:text-white text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs hover:scale-[1.02]"
          >
            empezar →
          </button>
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Abrir menú"
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/80 text-[#18181b] border border-black/5 shadow-xs cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Menú Desplegable Móvil (lista clara bajo la barra) */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-6 right-6 p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-black/8 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col space-y-3.5 text-base font-medium text-[#18181b]">
              <button 
                onClick={() => handleNavClick('#genesis')}
                className="text-left py-1 hover:text-[#0071E3] transition-colors cursor-pointer"
              >
                servicios
              </button>
              <button 
                onClick={() => handleNavClick('#partners')}
                className="text-left py-1 hover:text-[#0071E3] transition-colors cursor-pointer"
              >
                nosotros
              </button>
              <button 
                onClick={() => handleNavClick('#bio-synth')}
                className="text-left py-1 hover:text-[#0071E3] transition-colors cursor-pointer"
              >
                logística
              </button>
              <button 
                onClick={() => handleNavClick('#calculadora')}
                className="text-left py-1 text-[#0071E3] font-semibold transition-colors cursor-pointer"
              >
                calculadora de deterioro
              </button>
              <button 
                onClick={() => handleNavClick('#deep-warp')}
                className="text-left py-1 hover:text-[#0071E3] transition-colors cursor-pointer"
              >
                centro educativo
              </button>
              <button 
                onClick={() => handleNavClick('#contacto')}
                className="text-left py-1 hover:text-[#0071E3] transition-colors cursor-pointer"
              >
                buscar ayuda
              </button>

              <div className="pt-3 border-t border-black/5">
                <button
                  onClick={() => handleNavClick('#contacto')}
                  className="w-full py-3 rounded-full bg-[#18181b] text-[#9fff00] font-medium text-sm flex items-center justify-center cursor-pointer"
                >
                  empezar →
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── 2. CONTENIDO PRINCIPAL CENTRADO ─────────────────────────────────── */}
      {/* Empieza a 112 px en móvil y 160 px en escritorio */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-[112px] md:pt-[160px] pb-12 flex flex-col items-center text-center relative z-20">
        
        {/* Etiqueta Píldora */}
        <div className="hero-badge-anim mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs font-inter font-medium text-[#18181b] tracking-normal shadow-2xs">
            terapia con base científica
          </span>
        </div>

        {/* Título H1: 48, 60, 72 y 96 px según ancho, interlineado 0.98 y espaciado −0.03em */}
        <h1 className="hero-title-anim font-outfit font-normal text-[48px] sm:text-[60px] md:text-[72px] lg:text-[96px] leading-[0.98] tracking-[-0.03em] text-[#18181b] mb-6 max-w-4xl">
          La salud celular merece <br />
          <span className="relative inline-block mt-2">
            <span className="bg-[#9fff00] rounded-[16px] px-3.5 sm:px-5 py-0.5 sm:py-1 inline-block text-[#18181b]">
              tecnología
            </span>
          </span>{' '}
          de verdad.
        </h1>

        {/* Párrafo debajo: max-w 576 px, 16–18 px */}
        <p className="hero-desc-anim font-inter text-[16px] md:text-[18px] text-[#18181b]/80 max-w-[576px] leading-relaxed mb-8">
          Radiofármacos Curium, celdas Tema Sinergie y dosimetría Mirion trabajando juntos en un solo plan para el Perú. Sin listas de espera.
        </p>

        {/* Botones: negro y blanco translúcido (en móvil se apilan) */}
        <div className="hero-buttons-anim flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12 sm:mb-16">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#18181b] hover:bg-black text-[#9fff00] hover:text-white font-inter font-medium text-sm transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-1"
          >
            <span>empezar →</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onExplore();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#18181b] font-inter font-medium text-sm backdrop-blur-md border border-black/8 hover:border-black/15 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-2xs"
          >
            <span>cómo funciona</span>
          </button>
        </div>

        {/* ── 3. VIDEO HERO INTEGRADO ────────────────────────────────────────── */}
        {/* El video empieza visualmente bajo la cabecera y se funde suavemente con el fondo claro en su borde superior; no animes su posición */}
        <div className="hero-video-anim relative w-full max-w-5xl rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-black/5 aspect-[16/9] sm:aspect-[21/10] bg-[#18181b]/5">
          {/* Fundido superior suave con el fondo claro #EDEEF5 */}
          <div 
            className="absolute inset-x-0 top-0 h-28 sm:h-40 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, #EDEEF5 0%, rgba(237, 238, 245, 0.75) 30%, transparent 100%)',
            }}
          />

          {/* Reproductor de video: autoplay, muted, loop, playsinline, sin controles visibles, object-fit: cover */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/media/alba-interior-poster.jpg"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
            }}
          >
            <source src="/media/alba-interior-video.mp4" type="video/mp4" />
            <source src="https://media.dinamosites.com/library/v1/sections/alba-interior-video-33ea797fee02.mp4" type="video/mp4" />
          </video>

          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#18181b]/60 font-inter">
              Archivo de video pendiente de carga (/media/alba-interior-video.mp4)
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
