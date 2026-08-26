import React from 'react';
import { soundEngine } from '../../audio/soundSynth';

interface TerminalFooterProps {
  onScrollTo: (target: string) => void;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="relative z-10 px-4 md:px-8 pt-16 pb-12 border-t border-black/5 bg-[#F5F5F7] text-xs text-[#86868B] font-body select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Enlaces de Navegación del Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 border-b border-black/5">
          <div className="space-y-2.5">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Nuclia Health
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Medicina nuclear de precisión y teranóstica molecular.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Tecnología
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Trazadores PET/SPECT
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Pureza &gt; 99.98%
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Síntesis Automatizada
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Áreas Clínicas
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Oncología Teranóstica
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Neurología Molecular
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Cardiología Cuantitativa
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Atención Hospitalaria
            </div>
            <div className="space-y-1 text-[11px]">
              <div>Guardia: +34 900 102 304</div>
              <div>contacto@nucliahealth.com</div>
              <div>Servicio Activo 24/7</div>
            </div>
          </div>
        </div>

        {/* Copyright y Legal Apple Style */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868B] gap-3">
          <div>
            Copyright © 2026 Nuclia Health S.L. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-[#1D1D1F] cursor-pointer">Privacidad</span>
            <span>|</span>
            <span className="hover:text-[#1D1D1F] cursor-pointer">Aviso Legal</span>
            <span>|</span>
            <span className="hover:text-[#1D1D1F] cursor-pointer">Certificaciones GMP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
