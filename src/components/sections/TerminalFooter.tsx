import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Atom, Heart } from 'lucide-react';
import { type SandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface TerminalFooterProps {
  config: SandboxConfig;
  onUpdateConfig: (newConfig: SandboxConfig) => void;
  onScrollTo: (target: string) => void;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollTo }) => {
  return (
    <footer id="terminal" className="relative z-10 px-4 md:px-12 pt-16 pb-12 border-t border-white/[0.08] backdrop-blur-xl bg-[#0A0F1E]/95">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Bloque Superior: Información Hospitalaria y Certificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08] text-sm font-body">
          
          {/* Columna 1: Marca & Misión */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-neon-cyan border border-cyan-400/20">
                <Atom className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-white">NUCLIA HEALTH</span>
            </div>
            <p className="text-xs text-clinical-dim leading-relaxed">
              Medicina nuclear de precisión y teranóstica molecular. Innovación radiofarmacéutica al servicio de la salud y la vida humana.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Instalaciones Certificadas GMP / ISO 13485</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Áreas y Soluciones
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#genesis'); }}
                  className="hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Trazadores PET y SPECT
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#bio-synth'); }}
                  className="hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Logística JIT y Vida Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#deep-warp'); }}
                  className="hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Oncología Teranóstica (¹⁷⁷Lu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { soundEngine.playClick(); onScrollTo('#sandbox'); }}
                  className="hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Simulador de Dosimetría
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención Hospitalaria */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Atención Hospitalaria
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span>Guardia Radiológica: +34 900 102 304</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span>contacto@nucliahealth.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span>Parque Científico y Biomédico, Madrid</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Estado del Servicio */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">DISPONIBILIDAD</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-sm font-bold text-white">Servicio Activo 24/7</div>
            <p className="text-[11px] text-clinical-dim leading-relaxed">
              Ciclotrón y laboratorios de radiosíntesis en operación continua para envíos hospitalarios programados.
            </p>
          </div>

        </div>

        {/* Footer Inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-400 gap-4 font-body">
          <div className="flex items-center space-x-2">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
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
