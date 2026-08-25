import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';
import dnaVideoUrl from '../../assets/dna_background.mp4';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ config }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrubMode, setIsScrubMode] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Sincronización continua de ScrollTrigger con los fotogramas del video
    let targetTime = 0;
    let animationFrameId: number;

    const updateVideoScrub = () => {
      if (video && video.duration && isScrubMode) {
        const progress = global3DState.progress;
        targetTime = progress * video.duration;

        // Interpolación LERP suave para fluidez total a 60 FPS
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          video.currentTime += diff * 0.15 * config.speed;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoScrub);
    };

    animationFrameId = requestAnimationFrame(updateVideoScrub);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScrubMode, config.speed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setIsScrubMode(false);
    } else {
      video.play();
      setIsPlaying(true);
      setIsScrubMode(true);
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Video de Fondo Cinemático */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          filter: `contrast(${100 + (config.distortion - 1) * 15}%) brightness(102%) saturate(110%)`,
          opacity: 0.85,
        }}
      />

      {/* 2. Capa de Integración Médica Blanca & Gradiente Suave */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-50/75 via-white/50 to-slate-50/80 backdrop-blur-[1px] transition-all duration-300"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, rgba(248,250,252,0.82) 80%, rgba(241,245,249,0.92) 100%)',
        }}
      />

      {/* 3. Luz Ambiental Médica Difusa */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[400px] bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      {/* 4. Mini Controles de Reproducción de Fondo (Accesibles) */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto hidden sm:flex items-center space-x-2 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-sm font-body text-xs text-slate-600">
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pausar video de fondo' : 'Reproducir video'}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-teal-600" />}
        </button>
        <button
          onClick={restartVideo}
          title="Reiniciar video"
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono pr-2 text-slate-500 border-l border-slate-200 pl-2">
          {isScrubMode ? 'SCROLL-SYNC' : 'LOOP'}
        </span>
      </div>
    </div>
  );
};
