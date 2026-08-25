import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Shield, CornerDownLeft, Globe, Activity, Atom } from 'lucide-react';
import { type SandboxConfig } from '../../hooks/useScrollStore';
import { soundEngine } from '../../audio/soundSynth';

interface TerminalFooterProps {
  config: SandboxConfig;
  onUpdateConfig: (newConfig: SandboxConfig) => void;
  onScrollTo: (target: string) => void;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ config, onUpdateConfig, onScrollTo }) => {
  const [input, setInput] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const [history, setHistory] = useState<Array<{ text: string; type: 'cmd' | 'resp' | 'err' | 'info' }>>([
    { text: 'NUCLIA HEALTH // TERANÓSTICA MOLECULAR v4.9.1 [ONLINE]', type: 'info' },
    { text: 'Escribe "help" para consultar comandos de radiofarmacia y GPU.', type: 'info' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showTerminal) {
      scrollToBottom();
    }
  }, [history, showTerminal]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    soundEngine.playClick();
    const newHistory = [...history, { text: `> ${cmd}`, type: 'cmd' as const }];
    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    switch (mainCmd) {
      case 'help':
        newHistory.push({
          text: 'COMANDOS NUCLIA HEALTH:\n• status              - Diagnóstico en tiempo real de radiofármacos y GPU\n• color [c/e/v/a]     - Cambiar espectro cuántico (cyan, emerald, violet, amber)\n• wireframe [on/off]  - Alternar visualización de malla nuclear\n• speed [0.2 - 3.0]   - Ajustar velocidad del flujo orbital\n• decay               - Simular cálculo de decaimiento isotópico\n• goto [hero/tech/log/clin/contact] - Navegación instantánea\n• scan                - Disparar barrido radiométrico de seguridad\n• clear               - Limpiar consola CLI',
          type: 'resp',
        });
        break;

      case 'status':
        newHistory.push({
          text: `[ESTADO TERANÓSTICO NUCLIA: NOMINAL]\n• Espectro Cuántico: ${config.colorScheme.toUpperCase()}\n• Confinamiento Alámbrico: ${config.wireframe ? 'ACTIVO' : 'INACTIVO'}\n• Velocidad Orbital: ${config.speed}x\n• Pureza Radionucleídica: > 99.98%\n• Ciclotrón Médico: CONECTADO 24/7`,
          type: 'resp',
        });
        break;

      case 'color':
        if (['cyan', 'emerald', 'violet', 'amber'].includes(arg)) {
          onUpdateConfig({ ...config, colorScheme: arg as SandboxConfig['colorScheme'] });
          soundEngine.playScan();
          newHistory.push({ text: `[ESPECTRO_ACTUALIZADO]: Paleta cambiada a ${arg.toUpperCase()}`, type: 'resp' });
        } else {
          newHistory.push({ text: 'Error: color no válido. Opciones: cyan, emerald, violet, amber', type: 'err' });
        }
        break;

      case 'wireframe':
        if (arg === 'on') {
          onUpdateConfig({ ...config, wireframe: true });
          newHistory.push({ text: '[CONFINAMIENTO_ALÁMBRICO]: ACTIVADO', type: 'resp' });
        } else if (arg === 'off') {
          onUpdateConfig({ ...config, wireframe: false });
          newHistory.push({ text: '[CONFINAMIENTO_ALÁMBRICO]: DESACTIVADO', type: 'resp' });
        } else {
          newHistory.push({ text: 'Uso: wireframe on | wireframe off', type: 'err' });
        }
        break;

      case 'decay':
        soundEngine.playScan();
        newHistory.push({
          text: '[CÁLCULO N(t) = N0 * e^(-λt)]:\n• ¹⁸F (T½ 109.7m): λ = 0.00632 min⁻¹ | Actividad residual: 87.4%\n• ⁶⁸Ga (T½ 67.7m): λ = 0.01024 min⁻¹ | Actividad residual: 62.1%',
          type: 'resp',
        });
        break;

      case 'goto':
        if (arg === 'hero') onScrollTo('#hero');
        else if (arg === 'tech') onScrollTo('#genesis');
        else if (arg === 'log') onScrollTo('#bio-synth');
        else if (arg === 'clin') onScrollTo('#deep-warp');
        else if (arg === 'contact') onScrollTo('#contacto');
        else {
          newHistory.push({ text: 'Uso: goto hero | tech | log | clin | contact', type: 'err' });
          break;
        }
        newHistory.push({ text: `[NAVEGACIÓN]: Desplazando hacia sección ${arg.toUpperCase()}`, type: 'resp' });
        break;

      case 'scan':
        soundEngine.playScan();
        newHistory.push({ text: '[SCAN_COMPLETO]: Campo radiométrico verificado. Dosis ambiental: 0.12 μSv/h (Seguro)', type: 'resp' });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({
          text: `Comando no reconocido: "${cmd}". Escribe "help" para ver la lista.`,
          type: 'err',
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <footer id="terminal" className="relative z-10 px-4 md:px-12 pt-16 pb-12 border-t border-white/10 backdrop-blur-md bg-[#080B10]/95">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Barra Superior de Telemetría Clínica */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 font-mono text-xs">
          
          <div className="space-y-1.5">
            <div className="text-[10px] text-clinical-muted uppercase flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-neon-emerald" />
              <span>ESTADO DE OPERACIÓN</span>
            </div>
            <div className="text-sm font-bold text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-neon-emerald animate-ping" />
              <span>24/7 CICLOTRÓN EN VIVO</span>
            </div>
            <p className="text-[11px] text-clinical-dim">Uptime certificado 99.998%</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] text-clinical-muted uppercase flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-neon-cyan" />
              <span>CERTIFICACIÓN GMP / EANM</span>
            </div>
            <div className="text-sm font-bold text-white">FARMACOPEA CLASE A</div>
            <p className="text-[11px] text-clinical-dim">Validación radiométrica continua</p>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] text-clinical-muted uppercase flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#c084fc]" />
              <span>RED DE DISTRIBUCIÓN JIT</span>
            </div>
            <div className="text-sm font-bold text-white">RED HOSPITALARIA GLOBAL</div>
            <p className="text-[11px] text-clinical-dim">Logística de decaimiento activo</p>
          </div>

          <div className="flex items-center md:justify-end">
            <button
              onClick={() => {
                soundEngine.playClick();
                setShowTerminal(!showTerminal);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/5 border border-neon-cyan/40 text-neon-cyan text-xs font-mono flex items-center space-x-2 hover:bg-neon-cyan hover:text-cyber-950 transition-all shadow-[0_0_15px_rgba(0,245,212,0.15)] cursor-pointer"
            >
              <TerminalIcon className="w-4 h-4" />
              <span>{showTerminal ? 'OCULTAR CLI' : 'ABRIR CONSOLA CLI'}</span>
            </button>
          </div>

        </div>

        {/* Consola CLI Interactiva Desplegable */}
        {showTerminal && (
          <div className="mt-8 rounded-xl backdrop-blur-md bg-black/70 border border-white/10 shadow-[0_0_30px_rgba(0,245,212,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            
            {/* Top Bar de Terminal */}
            <div className="px-4 py-2 backdrop-blur-md bg-white/5 border-b border-white/10 flex items-center justify-between font-mono text-[11px] text-clinical-dim">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-red/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-neon-amber/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-neon-emerald/80" />
                <span className="ml-2">nuclia@kernel:~/med-nuclear</span>
              </div>
              <span className="text-neon-cyan">NUCLIA CLI v5.2</span>
            </div>

            {/* Log de Comandos */}
            <div className="p-4 sm:p-6 h-56 overflow-y-auto font-mono text-xs space-y-2 select-text">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-line leading-relaxed ${
                    h.type === 'cmd'
                      ? 'text-white font-bold'
                      : h.type === 'err'
                      ? 'text-neon-red'
                      : h.type === 'info'
                      ? 'text-neon-cyan/90'
                      : 'text-clinical-text'
                  }`}
                >
                  {h.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input de Comandos */}
            <form onSubmit={handleCommand} className="flex items-center border-t border-white/10 px-4 py-3 backdrop-blur-md bg-white/5">
              <span className="font-mono text-neon-cyan text-sm font-bold mr-2 select-none">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  soundEngine.playChirp(1400, 0.015, 'sine');
                  setInput(e.target.value);
                }}
                placeholder="Escribe 'help', 'decay', 'status', 'goto tech', 'color emerald'..."
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-clinical-text placeholder:text-clinical-muted focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded backdrop-blur-md bg-white/10 hover:bg-white/20 text-neon-cyan border border-white/15 font-mono text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>EJECUTAR</span>
              </button>
            </form>
          </div>
        )}

        {/* Footer Inferior Futurista */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10 text-xs font-mono text-clinical-dim gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-1 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
              <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <span>NUCLIA HEALTH CORP // PROTOCOLO CLÍNICO DE MEDICINA NUCLEAR</span>
          </div>
          <div className="text-clinical-muted text-center sm:text-right">
            <span>© 2026 NUCLIA HEALTH • MOTOR TERANÓSTICO CUÁNTICO 3D</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
