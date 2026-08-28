import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useGSAP3DScrollytelling } from './hooks/useGSAP3DScrollytelling';
import { type SandboxConfig, defaultSandboxConfig } from './hooks/useScrollStore';
import { VideoBackground } from './components/3d/VideoBackground';
import { Navbar } from './components/hud/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { GenesisSection } from './components/sections/GenesisSection';
import { SynthesisSection } from './components/sections/SynthesisSection';
import { DeepWarpSection } from './components/sections/DeepWarpSection';
import { RadiocalcSection } from './components/sections/RadiocalcSection';
import { ContactTheranosticsSection } from './components/sections/ContactTheranosticsSection';
import { TerminalFooter } from './components/sections/TerminalFooter';

export const App: React.FC = () => {
  const { scrollProgress, scrollTo } = useLenisScroll();
  useGSAP3DScrollytelling();
  const [sandboxConfig] = useState<SandboxConfig>(defaultSandboxConfig);

  const handleNavigate = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBFBFD] text-[#1D1D1F] selection:bg-[#0071E3]/15 selection:text-[#0071E3] overflow-x-hidden font-body">
      
      {/* 1. Fondo de Video Cinemático */}
      <VideoBackground config={sandboxConfig} />

      {/* 2. Barra de Navegación Flotante */}
      <Navbar onScrollTo={handleNavigate} scrollProgress={scrollProgress} />

      {/* 3. Secciones */}
      <main className="relative z-10 flex flex-col">
        <HeroSection 
          onExplore={() => handleNavigate('#genesis')} 
          onOpenTerminal={() => handleNavigate('#calculadora')} 
        />
        <GenesisSection />
        <SynthesisSection />
        <DeepWarpSection />
        <RadiocalcSection />
        <ContactTheranosticsSection />
        <TerminalFooter onScrollTo={handleNavigate} />
      </main>

    </div>
  );
};

export default App;
