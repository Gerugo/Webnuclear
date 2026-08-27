import React, { useEffect, useRef } from 'react';
import dnaVideoUrl from '../../assets/dna_background.mp4';
import { type SandboxConfig } from '../../hooks/useScrollStore';

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let currentTime = 0;
    let videoDuration = 0;
    let animationFrameId: number;
    let isReady = false;

    const onReady = () => {
      if (video.duration && !isNaN(video.duration)) {
        videoDuration = video.duration;
        isReady = true;
        video.pause();
      }
    };

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);

    if (video.readyState >= 1) {
      onReady();
    }

    // Motor de Sincronización Directa de Alta Precisión (All-Intra I-Frames)
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (isReady && videoDuration > 0) {
        // Progreso de scroll normalizado de 0 a 1
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        targetTime = progress * videoDuration;

        // LERP suave y reactivo a 60/120 FPS
        const delta = targetTime - currentTime;
        currentTime += delta * 0.22;

        const clampedTime = Math.min(videoDuration - 0.005, Math.max(0.001, currentTime));

        if (Math.abs(video.currentTime - clampedTime) > 0.005) {
          video.currentTime = clampedTime;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Video All-Intra (I-Frame en cada fotograma) para scrubbing instantáneo */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.90,
          filter: 'contrast(102%) brightness(101%) saturate(106%)',
          willChange: 'contents',
        }}
      />

      {/* Capa de integración visual estilo Apple */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(251,251,253,0.40) 0%, rgba(251,251,253,0.74) 72%, rgba(245,245,247,0.90) 100%)',
        }}
      />

      {/* Luces difusas de ambiente */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#0071E3]/[0.05] via-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[450px] bg-gradient-to-t from-blue-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
