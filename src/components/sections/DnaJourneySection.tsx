import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundEngine } from '../../audio/soundSynth';
import { ChevronRight, ArrowDown, Activity, ShieldCheck, Zap, Crosshair, Sparkles } from 'lucide-react';
import dnaVideoUrl from '../../assets/dna_background.mp4';

export interface JourneyScene {
  id: string;
  label: string;
  kicker: string;
  title: string;
  body: string;
  note: string;
  metric: {
    value: string;
    label: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

export const medicalScenes: JourneyScene[] = [
  {
    id: 'target',
    label: '01 · Diana Molecular',
    kicker: '01 · Detección Celular Precoz',
    title: 'El mapa genético del tumor.',
    body: 'Antes de que se manifieste cualquier síntoma visible o cambio anatómico, los radiotrazadores identifican la sobreexpresión de receptores a escala molecular en cada célula.',
    note: 'Resolución PET-CT · 1.2 mm',
    metric: {
      value: '< 1.2 mm',
      label: 'Resolución espacial sub-celular',
    },
    icon: Crosshair,
  },
  {
    id: 'synthesis',
    label: '02 · Marcaje Radioquímico',
    kicker: '02 · Pureza Farmacéutica',
    title: 'Átomos de precisión médica.',
    body: 'Isótopos puros de Curium Pharma formulados en salas blancas ISO 5. Cada dosis viaja ligada a péptidos de máxima afinidad biológica para unirse exclusivamente a la lesión.',
    note: 'Curium Pharma · Pureza > 99.98%',
    metric: {
      value: '> 99.98%',
      label: 'Pureza radioquímica certificada',
    },
    icon: ShieldCheck,
  },
  {
    id: 'logistics',
    label: '03 · Logística JIT',
    kicker: '03 · Carrera Contra el Decaimiento',
    title: 'La batalla contra la vida media.',
    body: 'Con vidas medias ultrarrápidas (F-18 en 109.7 min, Ga-68 en 68 min), la logística Just-In-Time desde el Hub Callao monitoriza por telemetría cada minuto hasta el quirófano.',
    note: 'Hub Callao · Entrega Hospitalaria JIT',
    metric: {
      value: '24 / 7',
      label: 'Cadena de frío y blindaje activo',
    },
    icon: Zap,
  },
  {
    id: 'affinity',
    label: '04 · Afinidad y Captación',
    kicker: '04 · Unión Selectiva Nanomolar',
    title: 'Fijación celular sin daño colateral.',
    body: 'El radiofármaco se internaliza de forma selectiva en los receptores tumorales. El tejido sano adyacente queda protegido de radiación innecesaria gracias a la rápida depuración renal.',
    note: 'Afinidad Receptora · Ki < 5 nM (PSMA-11)',
    metric: {
      value: 'Ki < 5nM',
      label: 'Afinidad nanomolar específica',
    },
    icon: Activity,
  },
  {
    id: 'theranostics',
    label: '05 · Teranóstica Molecular',
    kicker: '05 · Diagnóstico y Tratamiento',
    title: 'Ver para tratar en un solo paso.',
    body: 'La frontera de la medicina oncológica: visualizamos cada micrometástasis con Galio-68 y administramos Lutecio-177 para destruir las células tumorales desde su propio ADN.',
    note: 'Teranóstica · ¹⁷⁷Lu-PSMA-617 & ¹⁷⁷Lu-DOTATATE',
    metric: {
      value: '100% Target',
      label: 'Terapia molecular guiada por imagen',
    },
    icon: Sparkles,
  },
];

interface DnaJourneySectionProps {
  onOpenCalculator: () => void;
  onExplorePartners: () => void;
}

const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));

export const DnaJourneySection: React.FC<DnaJourneySectionProps> = ({
  onOpenCalculator,
  onExplorePartners,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shellState, setShellState] = useState<'before' | 'fixed' | 'after'>('fixed');
  const currentVideoTime = useRef(0);
  const targetVideoTime = useRef(0);
  const rafId = useRef<number>(0);

  // Smooth scroll handler
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalHeight = container.offsetHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const currentY = -rect.top;
    const progress = clamp(currentY / totalHeight, 0, 1);
    setScrollProgress(progress);

    // Dynamic shell positioning: eliminates sticky overflow bugs
    if (rect.top > 0) {
      setShellState('before');
    } else if (currentY >= totalHeight) {
      setShellState('after');
    } else {
      setShellState('fixed');
    }

    // Calculate active scene (0 to 4)
    const exactScene = progress * (medicalScenes.length - 1);
    const sceneIndex = Math.min(
      medicalScenes.length - 1,
      Math.max(0, Math.round(exactScene))
    );
    setActiveScene(sceneIndex);

    // Calculate target video scrubbing time
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      targetVideoTime.current = progress * (video.duration - 0.05);
    }
  }, []);

  // Animation frame loop for glass-smooth video interpolation (Abhay Tiwari inertia technique)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isRunning = true;

    const updateLoop = () => {
      if (!isRunning) return;

      if (video && Number.isFinite(video.duration) && !video.seeking) {
        // Linear interpolation with 0.18 easing factor for buttery response
        const diff = targetVideoTime.current - currentVideoTime.current;
        if (Math.abs(diff) > 0.005) {
          currentVideoTime.current += diff * 0.18;
          try {
            video.currentTime = clamp(currentVideoTime.current, 0, video.duration - 0.02);
          } catch {
            // Safe fallback if browser busy seeking
          }
        }
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Jump smoothly to a specific chapter
  const jumpToChapter = (index: number) => {
    soundEngine.playClick();
    const container = containerRef.current;
    if (!container) return;

    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetY = container.offsetTop + (index / (medicalScenes.length - 1)) * totalHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full select-none"
      style={{ height: `${medicalScenes.length * 105}vh` }}
    >
      <div id="genesis" className="absolute top-0 pointer-events-none" />
      <div id="dna-journey" className="absolute top-0 pointer-events-none" />
      {/* ── IMMERSIVE SHELL: Locked full-screen viewport during the journey, releases cleanly at end ── */}
      <div 
        className={`left-0 w-full h-screen overflow-hidden isolate bg-[#F8FAFC] ${
          shellState === 'fixed'
            ? 'fixed top-0 z-20'
            : shellState === 'after'
            ? 'absolute bottom-0 z-10'
            : 'absolute top-0 z-10'
        }`}
      >
        
        {/* 1. VIDEO 3D BACKGROUND A 60 FPS ALL-INTRA */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            ref={videoRef}
            src={dnaVideoUrl}
            playsInline
            muted
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover object-center scale-[1.02]"
            style={{
              opacity: 0.94,
              filter: 'contrast(103%) brightness(101%) saturate(106%)',
            }}
          />
        </div>

        {/* 2. OPTICAL VIGNETTE & CONTRAST SHADE (Format Inspired by "The Way of the Leaf") */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, 
                rgba(248, 250, 252, 0.96) 0%, 
                rgba(248, 250, 252, 0.88) 36%, 
                rgba(248, 250, 252, 0.40) 62%, 
                rgba(248, 250, 252, 0.05) 85%
              ),
              linear-gradient(0deg, 
                rgba(248, 250, 252, 0.70) 0%, 
                transparent 30%
              ),
              radial-gradient(ellipse at 75% 50%, 
                transparent 0%, 
                rgba(0, 113, 227, 0.04) 50%, 
                transparent 100%
              )
            `,
          }}
        />

        {/* 3. TOPBAR MINIMALISTA */}
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 py-5 border-b border-black/[0.04] backdrop-blur-[6px] bg-white/30">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0071E3] animate-pulse shadow-[0_0_12px_#0071E3]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#1D1D1F]">
              Nuclia Health Perú
            </span>
            <span className="hidden sm:inline-block text-black/20">|</span>
            <span className="hidden sm:inline-block font-body text-xs text-[#86868B]">
              Navegación Molecular en Tiempo Real
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-6 text-xs font-body text-[#515154]">
            <button
              onClick={() => onExplorePartners()}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer font-medium"
            >
              Alianzas Globales (Curium / Tema / Mirion)
            </button>
            <button
              onClick={() => onOpenCalculator()}
              className="hover:text-[#0077ED] font-semibold text-[#0071E3] transition-colors cursor-pointer"
            >
              Calculadora de Decaimiento
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#contacto');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              Contacto Hospitalario
            </button>
          </nav>

          <div className="flex items-center space-x-4 text-xs font-mono text-[#515154]">
            <span className="hidden md:inline-block uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/8 px-3 py-1 rounded-full border border-[#0071E3]/15">
              {medicalScenes[activeScene].label}
            </span>
            <span className="tracking-widest hidden sm:inline-block">
              {videoLoaded ? 'SCROLL PARA AVANZAR' : 'CARGANDO FOTOGRAMAS...'}
            </span>
          </div>
        </header>

        {/* 4. SCROLLYTELLING EDITORIAL COPY LAYER (Izquierda) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center px-6 sm:px-12 lg:px-20">
          <div className="w-full max-w-2xl relative">
            {medicalScenes.map((scene, index) => {
              const isActive = activeScene === index;
              const Icon = scene.icon;

              return (
                <article
                  key={scene.id}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto relative'
                      : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Kicker numerado con línea horizontal */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="w-8 h-[2px] bg-[#0071E3] rounded-full" />
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#0071E3] uppercase">
                      {scene.kicker}
                    </span>
                  </div>

                  {/* Título de gran impacto editorial */}
                  <h2 className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl text-[#1D1D1F] tracking-tight leading-[1.02] mb-6 drop-shadow-xs">
                    {scene.title}
                  </h2>

                  {/* Párrafo descriptivo clínico */}
                  <p className="font-body text-base sm:text-xl text-[#515154] font-normal leading-relaxed mb-8 max-w-xl">
                    {scene.body}
                  </p>

                  {/* Métrica y píldora de cristal */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-black/8 shadow-sm text-xs font-mono text-[#1D1D1F]">
                      <Icon className="w-4 h-4 text-[#0071E3]" />
                      <span className="font-semibold text-[#0071E3]">{scene.metric.value}</span>
                      <span className="text-[#86868B]">·</span>
                      <span className="text-[#515154]">{scene.metric.label}</span>
                    </div>

                    <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#0071E3]/6 border border-[#0071E3]/15 text-[11px] font-mono font-medium text-[#0071E3] uppercase tracking-wider">
                      {scene.note}
                    </div>
                  </div>

                  {/* CTA en el último capítulo o botones de salto */}
                  {index === medicalScenes.length - 1 ? (
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onOpenCalculator();
                        }}
                        onMouseEnter={() => soundEngine.playHover()}
                        className="px-6 py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <span>Calcular Decaimiento de Dosis</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onExplorePartners();
                        }}
                        onMouseEnter={() => soundEngine.playHover()}
                        className="px-6 py-3.5 rounded-full bg-white/85 hover:bg-white text-[#1D1D1F] border border-black/10 font-body font-medium text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
                      >
                        Conocer Alianzas Globales
                      </button>
                    </div>
                  ) : index === 0 ? (
                    <div className="flex flex-wrap items-center gap-3.5 pt-1">
                      <button
                        onClick={() => jumpToChapter(1)}
                        onMouseEnter={() => soundEngine.playHover()}
                        className="px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-xs tracking-normal shadow-sm hover:scale-[1.02] transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <span>Comenzar Recorrido ADN</span>
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          onOpenCalculator();
                        }}
                        onMouseEnter={() => soundEngine.playHover()}
                        className="px-5 py-3 rounded-full bg-white/80 hover:bg-white text-[#515154] hover:text-[#1D1D1F] border border-black/8 font-body font-medium text-xs transition-all cursor-pointer"
                      >
                        Ir a Calculadora Clínica
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => jumpToChapter(index + 1)}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="group inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0071E3] hover:text-[#0077ED] transition-colors cursor-pointer"
                    >
                      <span>Siguiente estación</span>
                      <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* 5. VERTICAL CHAPTER RAIL (Derecha - Formato exacto de The Way of the Leaf) */}
        <nav
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center space-y-6"
          aria-label="Capítulos de la travesía molecular"
        >
          {/* Línea vertical conductora */}
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-black/15 pointer-events-none" />

          {medicalScenes.map((scene, idx) => {
            const isCurrent = activeScene === idx;

            return (
              <button
                key={scene.id}
                onClick={() => jumpToChapter(idx)}
                onMouseEnter={() => soundEngine.playHover()}
                className="group relative flex items-center justify-center w-6 h-6 cursor-pointer focus:outline-hidden"
                aria-label={`Ir a capítulo ${scene.label}`}
              >
                {/* Punto exterior e interior interactivo */}
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-4 h-4 bg-[#0071E3] ring-4 ring-[#0071E3]/20 shadow-[0_0_12px_#0071E3]'
                      : 'w-2 h-2 bg-black/30 group-hover:bg-[#0071E3] group-hover:scale-150'
                  }`}
                />

                {/* Etiqueta flotante al hacer hover o activa */}
                <span
                  className={`absolute right-9 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-black/8 shadow-md font-mono text-[11px] font-medium uppercase tracking-wider text-[#1D1D1F] whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isCurrent
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  {scene.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* 6. BOTTOM HUD FOOTER (Contador, Barra de Progreso y Mouse Indicator) */}
        <footer className="absolute bottom-6 left-6 sm:left-12 right-6 sm:right-12 z-30 flex items-center justify-between text-[#86868B] text-xs font-mono select-none">
          
          {/* Animación del ratón con rueda deslizándose */}
          <div className="flex items-center space-x-3">
            <div className="w-5 h-8 rounded-full border border-black/30 relative flex justify-center p-1">
              <span className="w-1 h-2 bg-[#0071E3] rounded-full animate-bounce" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#1D1D1F] font-semibold hidden sm:inline-block">
              El scroll controla la cámara 3D
            </span>
          </div>

          {/* Barra de progreso horizontal continua */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-48 lg:w-72 h-[2px] bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0071E3] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_#0071E3]"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#515154]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Contador de capítulos en vivo (01 / 05) */}
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/8 shadow-2xs">
            <span className="font-semibold text-sm text-[#0071E3]">
              0{activeScene + 1}
            </span>
            <span className="text-black/30">/</span>
            <span className="font-medium text-xs text-[#86868B]">
              0{medicalScenes.length}
            </span>
          </div>

        </footer>

      </div>
    </section>
  );
};
