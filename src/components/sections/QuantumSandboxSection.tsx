import React, { useEffect, useRef } from 'react';
import { Cpu, Zap, Check } from 'lucide-react';
import gsap from 'gsap';
import { type SandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface QuantumSandboxSectionProps {
  config: SandboxConfig;
  onUpdateConfig: (newConfig: SandboxConfig) => void;
}

export const QuantumSandboxSection: React.FC<QuantumSandboxSectionProps> = ({ config, onUpdateConfig }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sandbox-preset-card',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        '.spec-matrix-table',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const presets: Array<{
    name: string;
    tag: string;
    desc: string;
    config: Partial<SandboxConfig>;
    color: string;
  }> = [
    {
      name: 'CYBER OVERDRIVE',
      tag: 'ULTRA HIGH ENERGY',
      desc: 'Maximum angular speed, dense particle field, glowing cyan plasma core.',
      color: 'border-neon-cyan text-neon-cyan',
      config: {
        speed: 2.2,
        distortion: 1.6,
        particleDensity: 1.6,
        wireframe: false,
        colorScheme: 'cyan',
        bloomIntensity: 2.2,
      },
    },
    {
      name: 'CRYSTALLINE MATRIX',
      tag: 'CLINICAL WIREFRAME',
      desc: 'Exposed wireframe mesh, low velocity, emerald telemetry grid.',
      color: 'border-neon-emerald text-neon-emerald',
      config: {
        speed: 0.6,
        distortion: 0.8,
        particleDensity: 0.8,
        wireframe: true,
        colorScheme: 'emerald',
        bloomIntensity: 1.2,
      },
    },
    {
      name: 'PLASMA SINGULARITY',
      tag: 'DEEP DIMENSION',
      desc: 'High distortion noise waves with deep violet chromatic scattering.',
      color: 'border-neon-violet text-[#c084fc]',
      config: {
        speed: 1.4,
        distortion: 2.4,
        particleDensity: 1.4,
        wireframe: false,
        colorScheme: 'violet',
        bloomIntensity: 2.5,
      },
    },
    {
      name: 'SOLAR FLARE',
      tag: 'HIGH IRRADIANCE',
      desc: 'Warm amber photon radiation, dense golden orbital particle shell.',
      color: 'border-neon-amber text-neon-amber',
      config: {
        speed: 1.8,
        distortion: 1.9,
        particleDensity: 1.5,
        wireframe: false,
        colorScheme: 'amber',
        bloomIntensity: 2.4,
      },
    },
  ];

  const applyPreset = (presetConfig: Partial<SandboxConfig>) => {
    soundEngine.playScan();
    onUpdateConfig({
      ...config,
      ...presetConfig,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="sandbox"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 text-neon-cyan font-mono text-xs mb-3">
            <span className="px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30 tracking-[0.2em]">
              PHASE 04 // SINGULARITY
            </span>
            <span className="text-clinical-dim tracking-[0.15em]">// PROCEDURAL SANDBOX &amp; PRESETS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.16em]">
            Quantum <span className="text-neon-cyan text-glow-cyan">Sandbox</span>
          </h2>
          <p className="text-clinical-dim max-w-2xl text-base mt-3 font-body leading-relaxed">
            Interact directly with the procedural physics uniforms. Trigger preset states below or adjust fine-grained parameters in the bottom-right diagnostic HUD.
          </p>
        </div>

        {/* Live Preset Cards - Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {presets.map((p, idx) => (
            <div
              key={idx}
              onClick={() => applyPreset(p.config)}
              onMouseEnter={() => soundEngine.playHover()}
              className="sandbox-preset-card backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-lg hover:border-neon-cyan hover:bg-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,245,212,0.2)] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-clinical-dim tracking-wider">
                    {p.tag}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-neon-cyan group-hover:animate-bounce" />
                </div>
                
                <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-1.5 tracking-[0.1em] group-hover:text-neon-cyan transition-colors">
                  {p.name}
                </h3>
                
                <p className="text-xs text-clinical-dim leading-relaxed font-body mb-4">
                  {p.desc}
                </p>
              </div>

              <button className="w-full py-2 rounded backdrop-blur-md bg-white/5 border border-white/10 text-xs font-display font-semibold tracking-[0.18em] text-clinical-text group-hover:border-neon-cyan group-hover:bg-neon-cyan group-hover:text-cyber-950 transition-all flex items-center justify-center space-x-2">
                <span>INJECT PRESET</span>
              </button>
            </div>
          ))}
        </div>

        {/* Specification Matrix Table - Glassmorphism */}
        <div className="spec-matrix-table backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <Cpu className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-[0.16em]">
                System Specification Matrix
              </h3>
            </div>
            <span className="text-xs font-mono text-neon-emerald flex items-center space-x-1.5 tracking-wider">
              <Check className="w-4 h-4" />
              <span>PASSED ALL HARDWARE TESTS</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-2">
              <div className="text-clinical-muted uppercase text-[10px] tracking-wider">// RENDERING ENGINE</div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Target Renderer:</span>
                <span className="text-clinical-text">WebGL 2.0 / ACES Film</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Buffer Type:</span>
                <span className="text-clinical-text">Float32Array Instanced</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Dynamic Shaders:</span>
                <span className="text-neon-cyan">Custom GLSL Perlin</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-clinical-muted uppercase text-[10px] tracking-wider">// SCROLL KINEMATICS</div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Smooth Engine:</span>
                <span className="text-clinical-text">Lenis Virtual Scroll</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Motion Driver:</span>
                <span className="text-neon-emerald">GSAP + ScrollTrigger</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Gesture Sync:</span>
                <span className="text-neon-emerald">100% Touch + Wheel</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-clinical-muted uppercase text-[10px] tracking-wider">// AUDIO &amp; FEEDBACK</div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Audio Engine:</span>
                <span className="text-clinical-text">Web Audio API Synth</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-1">
                <span className="text-clinical-dim">Asset Overhead:</span>
                <span className="text-neon-emerald">0 KB (Procedural)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-clinical-dim">Drone Frequency:</span>
                <span className="text-neon-cyan">55 Hz Sub-Bass</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
