import React, { useEffect, useRef } from 'react';
import { global3DState, type SandboxConfig } from '../../hooks/useScrollStore';
import dnaVideoUrl from '../../assets/dna_background.mp4';

interface VideoBackgroundProps {
  config: SandboxConfig;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Ajusta la resolución del canvas a la pantalla con retina display support
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const totalFramesToExtract = 120; // 120 fotogramas para ultra-alta fidelidad y suavidad
    const extractedFrames: ImageBitmap[] = [];

    // Función que dibuja el fotograma actual en el canvas con ajuste de cobertura (object-fit: cover)
    const drawCover = (imageSource: CanvasImageSource) => {
      if (!ctx || !canvas) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const imgW = (imageSource as ImageBitmap).width || (imageSource as HTMLVideoElement).videoWidth || cw;
      const imgH = (imageSource as ImageBitmap).height || (imageSource as HTMLVideoElement).videoHeight || ch;

      const scale = Math.max(cw / imgW, ch / imgH);
      const nw = imgW * scale;
      const nh = imgH * scale;
      const ox = (cw - nw) / 2;
      const oy = (ch - nh) / 2;

      ctx.drawImage(imageSource, ox, oy, nw, nh);
    };

    // Pre-decodificador de fotogramas en memoria (Apple Canvas Technique)
    const extractAllFrames = async () => {
      if (!video.duration || isNaN(video.duration)) return;

      const step = video.duration / totalFramesToExtract;
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 1280; // Resolución optimizada para GPU
      offscreenCanvas.height = 720;
      const offCtx = offscreenCanvas.getContext('2d');
      if (!offCtx) return;

      for (let i = 0; i < totalFramesToExtract; i++) {
        const time = i * step;
        await new Promise<void>((resolve) => {
          const onSeek = async () => {
            video.removeEventListener('seeked', onSeek);
            try {
              offCtx.drawImage(video, 0, 0, 1280, 720);
              const bitmap = await createImageBitmap(offscreenCanvas);
              extractedFrames[i] = bitmap;
              if (i === 0) {
                drawCover(bitmap);
              }
            } catch {
              // Fallback
            }
            resolve();
          };
          video.addEventListener('seeked', onSeek);
          video.currentTime = Math.min(video.duration - 0.01, time);
        });
      }

      framesRef.current = extractedFrames;
    };

    const onLoadedMetadata = () => {
      video.pause();
      extractAllFrames();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    let animationFrameId: number;

    // Bucle de renderizado continuo a 60/120 FPS que interpola fotogramas sin salto
    const renderLoop = () => {
      const p = Math.min(1, Math.max(0, global3DState.progress));
      const total = framesRef.current.length || totalFramesToExtract;
      targetFrameRef.current = p * (total - 1);

      // Suavizado cinemático LERP entre fotogramas para eliminar tirones al cambiar de dirección
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.25; // Respuesta inmediata
      }

      const frameIdx = Math.min(
        (framesRef.current.length || 1) - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // Si los fotogramas en memoria están listos, renderizamos desde RAM (0ms de latencia)
      if (framesRef.current[frameIdx]) {
        drawCover(framesRef.current[frameIdx]);
      } else if (video.readyState >= 2) {
        drawCover(video);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
      framesRef.current.forEach((b) => b.close && b.close());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Canvas 2D de Ultra-Alta Velocidad (120 FPS sin parones ni saltos de decodificación) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          opacity: 0.90,
          filter: 'contrast(102%) brightness(101%) saturate(106%)',
        }}
      />

      {/* 2. Video invisible para decodificación en memoria */}
      <video
        ref={videoRef}
        src={dnaVideoUrl}
        playsInline
        muted
        preload="auto"
        className="hidden"
      />

      {/* 3. Capa Translúcida de Integración Óptica Estilo Apple */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(251,251,253,0.42) 0%, rgba(251,251,253,0.76) 75%, rgba(245,245,247,0.90) 100%)',
        }}
      />

      {/* 4. Resplandores Sutiles de Luz Ambiental */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#0071E3]/[0.05] via-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[450px] bg-gradient-to-t from-blue-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
