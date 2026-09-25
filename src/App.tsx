import React, { useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { Navbar } from './components/hud/Navbar';
import { DnaJourneySection } from './components/sections/DnaJourneySection';
import { PartnersSection } from './components/sections/PartnersSection';
import { SynthesisSection } from './components/sections/SynthesisSection';
import { DeepWarpSection } from './components/sections/DeepWarpSection';
import { RadiocalcSection, type OrderPayload } from './components/sections/RadiocalcSection';
import { ContactTheranosticsSection } from './components/sections/ContactTheranosticsSection';
import { TerminalFooter } from './components/sections/TerminalFooter';

export const App: React.FC = () => {
  const { scrollProgress, scrollTo } = useLenisScroll();
  const [pendingOrder, setPendingOrder] = useState<OrderPayload | null>(null);

  const handleNavigate = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  const handleRequestOrder = (order: OrderPayload) => {
    setPendingOrder(order);
    handleNavigate('#contacto');
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#1D1D1F] selection:bg-[#0071E3]/15 selection:text-[#0071E3] overflow-x-hidden font-body">
      
      {/* 1. Barra de Navegación Flotante con Soporte Móvil y Audio Toggle */}
      <Navbar onScrollTo={handleNavigate} scrollProgress={scrollProgress} />

      {/* 2. Travesía Cinemática 3D por la Cadena de ADN (Formato Scrollytelling The Way of the Leaf) */}
      <main className="relative z-10 flex flex-col">
        <DnaJourneySection
          onOpenCalculator={() => handleNavigate('#calculadora')}
          onExplorePartners={() => handleNavigate('#partners')}
        />

        {/* 3. Alianzas Globales: Curium Pharma, Tema Sinergie, Mirion Technologies */}
        <PartnersSection />

        {/* 4. Logística Crítica Hub Callao / Aeropuerto Jorge Chávez */}
        <SynthesisSection />

        {/* 5. Áreas Clínicas: Oncología, Neurología, Cardiología */}
        <DeepWarpSection />

        {/* 6. Calculadora Clínica Interactiva de Decaimiento Radiofarmacéutico */}
        <RadiocalcSection onRequestOrder={handleRequestOrder} />

        {/* 7. Formulario de Pedidos / Cotización Localizado en Perú */}
        <ContactTheranosticsSection initialOrder={pendingOrder} />

        {/* 8. Footer Corporativo y Regulatorio IPEN / DIGEMID */}
        <TerminalFooter onScrollTo={handleNavigate} />
      </main>

    </div>
  );
};

export default App;
