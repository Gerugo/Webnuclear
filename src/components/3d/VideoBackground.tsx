import React, { useEffect, useRef } from 'react';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';
import dnaVideoUrl from '../../assets/dna_background.mp4';

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Función de búsqueda segura que no satura el decodificador de video
    const performSeek = (time: number) => {
      if (!video || !video.duration || isNaN(video.duration)) return;

      const clamped = Math.min(video.duration - 0.02, Math.max(0.001, time));

      if (isSeekingRef.current) {
        // Si el decodificador está ocupado procesando el fotograma anterior, guardamos el último objetivo
        pendingTimeRef.current = clamped;
        return;
      }

      // Marcamos como ocupado hasta que el navegador termine de decodificar el fotograma
      isSeekingRef.current = true;

      if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
        try {
          (video as unknown as { fastSeek: (t: number) => void }).fastSeek(clamped);
        } catch {
          video.currentTime = clamped;
        }
      } else {
        video.currentTime = clamped;
      }
    };

    // Callback disparado inmediatamente cuando el fotograma termina de renderizarse
    const onSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const next = pendingTimeRef.current;
        pendingTimeRef.current = null;
        performSeek(next);
      }
    };

    const onLoadedMetadata = () => {
      video.pause();
      performSeek(0.001);
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    let animationFrameId: number;

    // Bucle continuo a 60/120 FPS que consulta el progreso de scroll en tiempo real
    const checkScrollProgress = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const p = Math.min(1, Math.max(0, global3DState.progress));
        const target = p * video.duration;

        // Si el usuario se ha desplazado (hacia arriba o hacia abajo), solicitamos el nuevo fotograma
        if (Math.abs(target - targetTimeRef.current) > 0.01) {
          targetTimeRef.current = target;
          performSeek(target);
        }
      }
      animationFrameId = requestAnimationFrame(checkScrollProgress);
    };

    animationFrameId = requestAnimationFrame(checkScrollProgress);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Video con decodificación continua por hardware */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          opacity: 0.90,
          filter: 'contrast(102%) brightness(101%) saturate(106%)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 2. Capa de Integración Translúcida Estilo Apple */}
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
