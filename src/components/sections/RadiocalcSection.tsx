import React, { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../../audio/soundSynth';

gsap.registerPlugin(ScrollTrigger);

// ─── Datos clínicos de radiofármacos (fuente: IAEA / Farmacopea Europea) ───────
const RADIOPHARMACEUTICALS = [
  { id: 'fdg',         name: '¹⁸F-FDG',            fullName: 'Fluorodesoxiglucosa',           halfLifeMin: 109.8,   use: 'Oncología PET', color: '#0071E3' },
  { id: 'ga68-psma',  name: '⁶⁸Ga-PSMA-11',        fullName: 'PSMA Diagnóstico Prostático',   halfLifeMin: 67.7,    use: 'Urología PET', color: '#30B0C7' },
  { id: 'ga68-dota',  name: '⁶⁸Ga-DOTATATE',       fullName: 'DOTATATE Neuroendocrino',       halfLifeMin: 67.7,    use: 'NETs PET', color: '#5856D6' },
  { id: 'lu177-psma', name: '¹⁷⁷Lu-PSMA-617',      fullName: 'PSMA Terapia Radioligandos',    halfLifeMin: 9576,    use: 'Terapia Próstata', color: '#34C759' },
  { id: 'lu177-dota', name: '¹⁷⁷Lu-DOTA-TATE',     fullName: 'DOTA-TATE Terapia NETs',       halfLifeMin: 9576,    use: 'Terapia NETs', color: '#059669' },
  { id: 'tc99m-maa',  name: '⁹⁹ᵐTc-MAA',           fullName: 'MAA Macro Agregados Albúmina', halfLifeMin: 360.6,   use: 'SPECT Pulmón', color: '#FF9500' },
  { id: 'tc99m-mibi', name: '⁹⁹ᵐTc-MIBI',          fullName: 'MIBI Cardíaco Isonitrilo',     halfLifeMin: 360.6,   use: 'SPECT Cardíaco', color: '#FF6B35' },
  { id: 'i123',       name: '¹²³I-DaTscan',         fullName: 'DaTscan Dopaminérgico',        halfLifeMin: 786,     use: 'Neurología SPECT', color: '#AF52DE' },
] as const;

type RadioId = typeof RADIOPHARMACEUTICALS[number]['id'];

// ─── Fórmula de decaimiento radiactivo: A(t) = A₀ × 2^(-t / T½) ─────────────
const decay = (a0: number, elapsedMin: number, halfLifeMin: number): number =>
  a0 * Math.pow(2, -(elapsedMin / halfLifeMin));

// ─── Formato de horas y minutos ─────────────────────────────────────────────
const fmtHM = (totalMin: number) => {
  if (totalMin < 0) return '—';
  const h = Math.floor(totalMin / 60);
  const m = Math.round(totalMin % 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
};

// ─── Generador de puntos SVG para la curva de decaimiento ────────────────────
const buildDecayCurve = (
  a0: number,
  halfLifeMin: number,
  totalMinutes: number,
  width: number,
  height: number,
  points = 120
): string => {
  const pts: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * totalMinutes;
    const a = decay(a0, t, halfLifeMin);
    const x = (i / points) * width;
    const y = height - (a / a0) * height;
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
};

export const RadiocalcSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // ─── Estado del formulario ─────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<RadioId>('fdg');
  const [activityMCi, setActivityMCi] = useState<string>('20');
  const [calibDate, setCalibDate] = useState<string>(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [adminDate, setAdminDate] = useState<string>(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });

  const radio = RADIOPHARMACEUTICALS.find(r => r.id === selectedId)!;
  const a0 = parseFloat(activityMCi) || 0;
  const elapsed = (new Date(adminDate).getTime() - new Date(calibDate).getTime()) / 60000;
  const isValid = a0 > 0 && elapsed > 0 && !isNaN(elapsed);

  const activityAtAdmin = isValid ? decay(a0, elapsed, radio.halfLifeMin) : 0;
  const decayPct = isValid ? ((a0 - activityAtAdmin) / a0) * 100 : 0;
  const halfLivesElapsed = isValid ? elapsed / radio.halfLifeMin : 0;

  // ─── Ventana Óptima: cuándo pedir para recibir X mCi ─────────────────────
  const targetMCi = activityAtAdmin > 0 ? activityAtAdmin : a0 * 0.8;
  // t_optimo = T½ × log2(a0 / targetMCi)
  const optimalLeadMin = (radio.halfLifeMin * Math.log2(a0 / targetMCi));
  const optimalOrderTime = isValid
    ? new Date(new Date(adminDate).getTime() - optimalLeadMin * 60000)
    : null;

  // ─── Recomendación de nivel de pérdida ────────────────────────────────────
  const getStatus = (pct: number) => {
    if (pct < 20) return { label: 'Óptimo', color: '#34C759', bg: 'bg-[#34C759]/10' };
    if (pct < 50) return { label: 'Aceptable', color: '#FF9500', bg: 'bg-[#FF9500]/10' };
    if (pct < 80) return { label: 'Deterioro elevado', color: '#FF6B35', bg: 'bg-[#FF6B35]/10' };
    return { label: 'Actividad crítica', color: '#FF3B30', bg: 'bg-[#FF3B30]/10' };
  };
  const status = getStatus(decayPct);

  // ─── SVG Chart ──────────────────────────────────────────────────────────
  const W = 600, H = 180;
  const chartTotalMin = Math.max(radio.halfLifeMin * 5, elapsed * 1.2, 60);
  const curvePath = buildDecayCurve(a0, radio.halfLifeMin, chartTotalMin, W, H);
  // Línea vertical de administración
  const adminX = isValid ? Math.min(W, (elapsed / chartTotalMin) * W) : 0;
  // Línea horizontal de actividad restante
  const adminY = isValid ? H - (activityAtAdmin / a0) * H : H;

  // ─── Animación GSAP entrada ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.calc-header', { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.calc-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = useCallback((id: RadioId) => {
    soundEngine.playClick();
    setSelectedId(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="calculadora"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">

        {/* ── Encabezado ────────────────────────────────────────────── */}
        <div className="calc-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Herramienta Exclusiva
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Calculadora de Deterioro Radiofarmacéutico.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Calcula la actividad residual de cada radiofármaco en el momento exacto de administración y encuentra la ventana óptima de pedido para minimizar pérdidas.
          </p>
        </div>

        {/* ── Selector de Radiofármaco ──────────────────────────────── */}
        <div className="calc-card grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {RADIOPHARMACEUTICALS.map(r => (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                selectedId === r.id
                  ? 'bg-white border-[#0071E3]/30 shadow-[0_4px_20px_rgb(0,113,227,0.1)] ring-1 ring-[#0071E3]/20'
                  : 'bg-white/60 border-black/5 hover:bg-white/90 hover:border-black/10'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full mb-2"
                style={{ backgroundColor: r.color }}
              />
              <div className="font-mono font-bold text-xs text-[#1D1D1F] mb-0.5">{r.name}</div>
              <div className="text-[10px] text-[#86868B]">{r.use}</div>
            </button>
          ))}
        </div>

        {/* ── Formulario de Parámetros ──────────────────────────────── */}
        <div className="calc-card p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-0">

            {/* Actividad inicial */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#515154] block">
                Actividad en Calibración (mCi)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={activityMCi}
                  onChange={e => setActivityMCi(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm font-mono font-semibold focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#86868B] font-mono">
                  mCi
                </span>
              </div>
              <div className="text-[10px] text-[#86868B]">
                ≈ {(parseFloat(activityMCi) * 37).toFixed(0)} MBq
              </div>
            </div>

            {/* Fecha/hora de calibración */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#515154] block">
                Fecha y Hora de Calibración
              </label>
              <input
                type="datetime-local"
                value={calibDate}
                onChange={e => setCalibDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
              />
            </div>

            {/* Fecha/hora de administración */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#515154] block">
                Fecha y Hora de Administración
              </label>
              <input
                type="datetime-local"
                value={adminDate}
                onChange={e => setAdminDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
              />
            </div>

          </div>
        </div>

        {/* ── Resultados ────────────────────────────────────────────── */}
        {isValid && (
          <>
            {/* Métricas principales */}
            <div className="calc-card grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {/* Actividad al administrar */}
              <div className="p-6 rounded-3xl bg-white/80 border border-black/5 backdrop-blur-xl">
                <div className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider mb-1">
                  Actividad en Administración
                </div>
                <div className="text-2xl font-bold font-mono text-[#1D1D1F]">
                  {activityAtAdmin.toFixed(2)}
                </div>
                <div className="text-xs text-[#86868B] mt-0.5">
                  mCi · {(activityAtAdmin * 37).toFixed(0)} MBq
                </div>
              </div>

              {/* Deterioro */}
              <div className={`p-6 rounded-3xl border ${status.bg} border-black/5 backdrop-blur-xl`}>
                <div className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider mb-1">
                  Deterioro Total
                </div>
                <div className="text-2xl font-bold font-mono" style={{ color: status.color }}>
                  {decayPct.toFixed(1)}%
                </div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: status.color }}>
                  {status.label}
                </div>
              </div>

              {/* Tiempo transcurrido */}
              <div className="p-6 rounded-3xl bg-white/80 border border-black/5 backdrop-blur-xl">
                <div className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider mb-1">
                  Tiempo Transcurrido
                </div>
                <div className="text-2xl font-bold font-mono text-[#1D1D1F]">
                  {fmtHM(elapsed)}
                </div>
                <div className="text-xs text-[#86868B] mt-0.5">
                  {halfLivesElapsed.toFixed(1)} T½ transcurridas
                </div>
              </div>

              {/* Vida media del producto */}
              <div className="p-6 rounded-3xl bg-white/80 border border-black/5 backdrop-blur-xl">
                <div className="text-[10px] font-medium text-[#86868B] uppercase tracking-wider mb-1">
                  Vida Media (T½)
                </div>
                <div className="text-2xl font-bold font-mono text-[#1D1D1F]">
                  {fmtHM(radio.halfLifeMin)}
                </div>
                <div className="text-xs text-[#86868B] mt-0.5">
                  {radio.fullName}
                </div>
              </div>
            </div>

            {/* Gráfica SVG de decaimiento */}
            <div className="calc-card p-8 rounded-3xl bg-white/80 border border-black/5 backdrop-blur-xl shadow-sm mb-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-0.5">
                    Curva de Decaimiento Radiactivo
                  </div>
                  <div className="text-sm font-medium text-[#1D1D1F]">
                    {radio.name} — A(t) = A₀ · 2<sup>-t/T½</sup>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#86868B] text-right">
                  <div>A₀ = {a0} mCi</div>
                  <div>T½ = {fmtHM(radio.halfLifeMin)}</div>
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-xl">
                <svg
                  viewBox={`0 0 ${W} ${H + 30}`}
                  className="w-full"
                  preserveAspectRatio="none"
                >
                  {/* Grid horizontal */}
                  {[0.25, 0.5, 0.75].map(f => (
                    <line
                      key={f}
                      x1={0} y1={H * (1 - f)} x2={W} y2={H * (1 - f)}
                      stroke="#E5E5EA" strokeWidth="1" strokeDasharray="4 4"
                    />
                  ))}

                  {/* Área bajo la curva */}
                  <path
                    d={`${curvePath} L${W},${H} L0,${H} Z`}
                    fill={radio.color}
                    fillOpacity="0.06"
                  />

                  {/* Curva principal */}
                  <path
                    d={curvePath}
                    fill="none"
                    stroke={radio.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Línea vertical de administración */}
                  <line
                    x1={adminX} y1={0} x2={adminX} y2={H}
                    stroke="#1D1D1F" strokeWidth="1.5" strokeDasharray="5 3"
                    opacity="0.5"
                  />

                  {/* Línea horizontal de actividad restante */}
                  <line
                    x1={0} y1={adminY} x2={adminX} y2={adminY}
                    stroke={status.color} strokeWidth="1.5" strokeDasharray="4 3"
                    opacity="0.8"
                  />

                  {/* Punto de intersección */}
                  <circle cx={adminX} cy={adminY} r="5" fill={status.color} />
                  <circle cx={adminX} cy={adminY} r="9" fill={status.color} fillOpacity="0.2" />

                  {/* Etiqueta del punto */}
                  <text
                    x={Math.min(adminX + 12, W - 100)} y={adminY - 8}
                    fontSize="10" fill={status.color} fontFamily="monospace" fontWeight="bold"
                  >
                    {activityAtAdmin.toFixed(2)} mCi ({(100 - decayPct).toFixed(0)}%)
                  </text>

                  {/* Etiquetas del eje Y */}
                  {[1, 0.75, 0.5, 0.25].map(f => (
                    <text
                      key={f}
                      x={4} y={H * (1 - f) + 4}
                      fontSize="9" fill="#86868B" fontFamily="monospace"
                    >
                      {(a0 * f).toFixed(1)}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Recomendación de Ventana Óptima de Pedido */}
            <div className="calc-card p-8 rounded-3xl bg-[#0071E3]/5 border border-[#0071E3]/15 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                    Recomendación de Pedido Óptimo
                  </div>
                  <h3 className="font-display font-semibold text-xl text-[#1D1D1F] tracking-tight mb-1">
                    Para recibir {activityAtAdmin.toFixed(1)} mCi en el momento de uso,
                    <br className="hidden sm:block" />
                    {' '}el pedido debe realizarse con{' '}
                    <span className="text-[#0071E3]">{fmtHM(optimalLeadMin)}</span> de antelación.
                  </h3>
                  <p className="text-sm text-[#515154]">
                    Solicita la dosis para que llegue a las{' '}
                    <strong className="text-[#1D1D1F]">
                      {optimalOrderTime?.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                    </strong>{' '}
                    del{' '}
                    <strong className="text-[#1D1D1F]">
                      {optimalOrderTime?.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                    </strong>
                    .
                  </p>
                </div>

                <button
                  onClick={() => { soundEngine.playClick(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm shrink-0 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Solicitar este Pedido
                </button>
              </div>

              {/* Barra de deterioro visual */}
              <div className="mt-6 pt-5 border-t border-[#0071E3]/10">
                <div className="flex justify-between text-[10px] text-[#86868B] mb-1.5">
                  <span>Actividad disponible al momento de uso</span>
                  <span>{(100 - decayPct).toFixed(1)}% retenida</span>
                </div>
                <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(0, 100 - decayPct)}%`,
                      backgroundColor: status.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Estado vacío / ayuda */}
        {!isValid && (
          <div className="calc-card p-10 rounded-3xl bg-white/60 border border-black/5 text-center text-[#86868B] text-sm">
            Selecciona un radiofármaco, introduce la actividad inicial y las fechas de calibración y administración para calcular el deterioro.
          </div>
        )}

      </div>
    </section>
  );
};
