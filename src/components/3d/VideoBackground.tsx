import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';
import dnaVideoUrl from '../../assets/dna_background.mp4';

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0.001;

    // Escucha los cambios de sección en tiempo real
    let lastSection = -1;

    const checkSectionUpdate = () => {
      const section = global3DState.activeSection;

      if (section !== lastSection && video.duration && !isNaN(video.duration)) {
        lastSection = section;

        // Puntos temporales clave del video según la sección activa (5 secciones: 0 a 4)
        const sectionTimes = [
          0.001,
          video.duration * 0.25,
          video.duration * 0.50,
          video.duration * 0.75,
          video.duration * 0.99,
        ];

        const targetTime = sectionTimes[section] ?? (section / 4) * video.duration;

        // Cancela tween anterior si está en curso
        if (currentTweenRef.current) {
          currentTweenRef.current.kill();
        }

        // Si el objetivo es hacia adelante y estamos cerca, reproducir de forma natural
        if (targetTime > video.currentTime) {
          video.play().catch(() => {});
          
          currentTweenRef.current = gsap.to(video, {
            currentTime: targetTime,
            duration: 1.4,
            ease: 'power2.inOut',
            onComplete: () => {
              video.pause();
            },
          });
        } else {
          // Si retrocedemos, interpolar suavemente hacia atrás con GSAP
          video.pause();
          currentTweenRef.current = gsap.to(video, {
            currentTime: targetTime,
            duration: 1.4,
            ease: 'power2.inOut',
          });
        }
      }

      requestAnimationFrame(checkSectionUpdate);
    };

    const animId = requestAnimationFrame(checkSectionUpdate);

    return () => {
      cancelAnimationFrame(animId);
      if (currentTweenRef.current) {
        currentTweenRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Video Cinemático de Reproducción Natural por Secciones */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 0.90,
          filter: 'contrast(102%) brightness(101%) saturate(106%)',
        }}
      />

      {/* 2. Capa Translúcida de Integración Óptica Estilo Apple */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(251,251,253,0.42) 0%, rgba(251,251,253,0.76) 75%, rgba(245,245,247,0.90) 100%)',
        }}
      />

      {/* 3. Luces Difusas de Ambiente */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#0071E3]/[0.05] via-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[450px] bg-gradient-to-t from-blue-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
