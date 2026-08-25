import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useGSAP3DScrollytelling } from './hooks/useGSAP3DScrollytelling';
import { type SandboxConfig, defaultSandboxConfig } from './hooks/useScrollStore';
import { Background3D } from './components/3d/Background3D';
import { Navbar } from './components/hud/Navbar';
import { ScrollyProgressHUD } from './components/hud/ScrollyProgressHUD';
import { DiagnosticsWidget } from './components/hud/DiagnosticsWidget';
import { HeroSection } from './components/sections/HeroSection';
import { GenesisSection } from './components/sections/GenesisSection';
import { SynthesisSection } from './components/sections/SynthesisSection';
import { DeepWarpSection } from './components/sections/DeepWarpSection';
import { QuantumSandboxSection } from './components/sections/QuantumSandboxSection';
import { ContactTheranosticsSection } from './components/sections/ContactTheranosticsSection';
import { TerminalFooter } from './components/sections/TerminalFooter';

export const App: React.FC = () => {
  const { scrollProgress, scrollTo } = useLenisScroll();
  useGSAP3DScrollytelling();
  const [sandboxConfig, setSandboxConfig] = useState<SandboxConfig>(defaultSandboxConfig);

  const handleNavigate = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-950 text-clinical-text selection:bg-neon-cyan/20 selection:text-neon-cyan overflow-x-hidden font-body">
      
      {/* 1. Capas Atmosféricas Cinemáticas (Scanlines CRT, Viñeta) */}
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />

      {/* 2. Fondo 3D Procedural (Canvas Fixed, inset-0, z-index: 0) */}
      <Background3D config={sandboxConfig} />

      {/* 3. HUD Clínico Futurista & Barra de Navegación */}
      <Navbar onScrollTo={handleNavigate} scrollProgress={scrollProgress} />
      
      {/* 4. Rastreador Vertical de Hitos Scrollytelling */}
      <ScrollyProgressHUD progress={scrollProgress} onSelectPhase={handleNavigate} />

      {/* 5. Widget de Diagnósticos 3D Flotante & Ajuste de Shaders */}
      <DiagnosticsWidget config={sandboxConfig} onChange={setSandboxConfig} />

      {/* 6. Secciones Narrativas con GSAP ScrollTrigger */}
      <main className="relative z-10 flex flex-col">
        <HeroSection 
          onExplore={() => handleNavigate('#genesis')} 
          onOpenTerminal={() => handleNavigate('#terminal')} 
        />
        <GenesisSection />
        <SynthesisSection />
        <DeepWarpSection />
        <QuantumSandboxSection config={sandboxConfig} onUpdateConfig={setSandboxConfig} />
        <ContactTheranosticsSection />
        <TerminalFooter 
          config={sandboxConfig} 
          onUpdateConfig={setSandboxConfig} 
          onScrollTo={handleNavigate} 
        />
      </main>

    </div>
  );
};

export default App;
