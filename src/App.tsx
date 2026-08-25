import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useGSAP3DScrollytelling } from './hooks/useGSAP3DScrollytelling';
import { type SandboxConfig, defaultSandboxConfig } from './hooks/useScrollStore';
import { VideoBackground } from './components/3d/VideoBackground';
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
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500/20 selection:text-teal-900 overflow-x-hidden font-body">
      
      {/* 1. Fondo de Video Cinemático Sincronizado al Scroll */}
      <VideoBackground config={sandboxConfig} />

      {/* 2. Navegación Clínica Superior */}
      <Navbar onScrollTo={handleNavigate} scrollProgress={scrollProgress} />
      
      {/* 3. Rastreador Vertical de Fases */}
      <ScrollyProgressHUD progress={scrollProgress} onSelectPhase={handleNavigate} />

      {/* 4. Widget de Ajuste de Parámetros de Video & Emisión */}
      <DiagnosticsWidget config={sandboxConfig} onChange={setSandboxConfig} />

      {/* 5. Secciones Narrativas de Medicina Nuclear */}
      <main className="relative z-10 flex flex-col">
        <HeroSection 
          onExplore={() => handleNavigate('#genesis')} 
          onOpenTerminal={() => handleNavigate('#sandbox')} 
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
