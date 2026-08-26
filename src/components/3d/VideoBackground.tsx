import React, { useEffect, useRef } from 'react';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';
import dnaVideoUrl from '../../assets/dna_background.mp4';

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ config }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Asegura que el video esté listo para scrubbing de fotogramas
    const handleLoadedMetadata = () => {
      video.currentTime = 0.001;
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    let animationFrameId: number;

    // Bucle continuo de sincronización bidireccional (Scrub Forward / Backward)
    const updateScrub = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const progress = Math.min(1, Math.max(0, global3DState.progress));
        const targetTime = progress * video.duration;

        // Diferencia entre el fotograma actual y el objetivo
        const delta = targetTime - video.currentTime;

        // Si la diferencia es apreciable, actualiza suavemente la posición del video
        if (Math.abs(delta) > 0.015) {
          // LERP de alta respuesta (0.22) para que el video responda al instante tanto al subir como al bajar
          video.currentTime = Math.min(video.duration - 0.01, Math.max(0, video.currentTime + delta * 0.22));
        }
      }

      animationFrameId = requestAnimationFrame(updateScrub);
    };

    animationFrameId = requestAnimationFrame(updateScrub);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.speed]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Video de Fondo Cinemático con Control de Fotogramas Bidireccional */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: 0.88,
          filter: 'contrast(102%) brightness(101%) saturate(106%)',
        }}
      />

      {/* 2. Capa Translúcida de Integración Óptica Estilo Apple */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(251,251,253,0.45) 0%, rgba(251,251,253,0.78) 75%, rgba(245,245,247,0.92) 100%)',
        }}
      />

      {/* 3. Resplandores Sutiles de Luz Bio-Sanitaria */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#0071E3]/[0.05] via-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[450px] bg-gradient-to-t from-blue-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
