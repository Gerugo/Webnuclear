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
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 pb-12 border-b border-black/5">
          <div className="space-y-2.5 sm:col-span-1">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Nuclia Health Perú S.A.C.
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Distribuidor especializado en radiofármacos, celdas blindadas y dosimetría de precisión en el Perú.
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
                  Pureza Radionucleídica
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Logística Callao Hub
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Alianzas Globales
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#partners'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Curium Pharma
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#partners'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Tema Sinergie
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#partners'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Mirion Technologies
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Herramientas
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#calculadora'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer font-medium text-[#0071E3]"
                >
                  Calculadora de Decaimiento
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Áreas Clínicas PET/SPECT
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#contacto'); }}
                  className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  Cotización Hospitalaria
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-[#1D1D1F] text-xs">
              Atención Hospitalaria Perú
            </div>
            <div className="space-y-1 text-[11px]">
              <div>Central: +51 (1) 708-9200</div>
              <div className="text-[#0071E3] font-medium">Guardia 24h: +51 987 654 321</div>
              <div>despacho@nucliahealth.pe</div>
              <div>Santiago de Surco / Callao, Lima</div>
            </div>
          </div>
        </div>

        {/* Copyright y Legal Apple Style */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868B] gap-3">
          <div>
            Copyright © 2026 Nuclia Health Perú S.A.C. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hover:text-[#1D1D1F] cursor-pointer">Ley N° 29733 (Protección de Datos)</span>
            <span>•</span>
            <span className="hover:text-[#1D1D1F] cursor-pointer">Licencia IPEN N° 2024-OP-0891</span>
            <span>•</span>
            <span className="hover:text-[#1D1D1F] cursor-pointer">Certificaciones DIGEMID BPA/BPD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
