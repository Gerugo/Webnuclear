import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Dna, Heart } from 'lucide-react';
import { type SandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface TerminalFooterProps {
  config: SandboxConfig;
  onUpdateConfig: (newConfig: SandboxConfig) => void;
  onScrollTo: (target: string) => void;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollTo }) => {
  return (
    <footer id="terminal" className="relative z-10 px-4 md:px-12 pt-16 pb-12 border-t border-slate-200 bg-white">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Bloque Superior: Información Hospitalaria y Certificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100 text-sm font-body">
          
          {/* Columna 1: Marca & Misión */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-200">
                <Dna className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-lg text-slate-900">NUCLIA HEALTH</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Medicina nuclear de precisión y teranóstica molecular. Innovación radiofarmacéutica al servicio de la salud y la vida humana.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Instalaciones Certificadas GMP / ISO 13485</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Áreas y Soluciones
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Trazadores PET y SPECT
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Logística JIT y Vida Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Oncología Teranóstica (¹⁷⁷Lu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#sandbox'); }}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Simulador de Dosimetría
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención Hospitalaria */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
              Atención Hospitalaria
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Guardia Radiológica: +34 900 102 304</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>contacto@nucliahealth.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Parque Científico y Biomédico, Madrid</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Estado del Servicio */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-500">DISPONIBILIDAD</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-sm font-bold text-slate-900">Servicio Activo 24/7</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ciclotrón y laboratorios de radiosíntesis en operación continua para envíos hospitalarios programados.
            </p>
          </div>

        </div>

        {/* Footer Inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500 gap-4 font-body">
          <div className="flex items-center space-x-2">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Comprometidos con el avance de la medicina de precisión y el cuidado del paciente</span>
          </div>
          <div className="text-center sm:text-right">
            <span>© 2026 Nuclia Health S.L. • Todos los derechos reservados</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
