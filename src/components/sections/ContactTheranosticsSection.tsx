import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { soundEngine } from '../../audio/soundSynth';
import { type OrderPayload } from './RadiocalcSection';

interface ContactTheranosticsSectionProps {
  initialOrder?: OrderPayload | null;
}

export const ContactTheranosticsSection: React.FC<ContactTheranosticsSectionProps> = ({ initialOrder }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    protocol: 'curium-pet',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dispatchHash, setDispatchHash] = useState('');

  // Actualiza el formulario si llega una solicitud desde la calculadora
  useEffect(() => {
    if (initialOrder) {
      setFormData(prev => ({
        ...prev,
        protocol: initialOrder.radioId.startsWith('lu177') 
          ? 'curium-therapy' 
          : initialOrder.radioId.startsWith('tc99m') 
          ? 'curium-spect' 
          : 'curium-pet',
        message: `[COTIZACIÓN CALCULADORA] ${initialOrder.radioName} | Actividad inicial: ${initialOrder.mCi} mCi | Remanente estimado: ${initialOrder.remainingMCi} mCi | Calibración: ${initialOrder.calibDate} | Inyección: ${initialOrder.adminDate}. ${initialOrder.note}`,
      }));
    }
  }, [initialOrder]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const protocols = [
    { id: 'curium-pet', name: 'Radiofármacos PET (¹⁸F-FDG / ⁶⁸Ga-PSMA / DOTATATE • Curium)' },
    { id: 'curium-therapy', name: 'Teranóstica & Terapia Radioligandos (¹⁷⁷Lu-PSMA / ¹⁷⁷Lu-DOTA • Curium)' },
    { id: 'curium-spect', name: 'Generadores Mo-99/Tc-99m & SPECT (MIBI / MAA / DaTscan • Curium)' },
    { id: 'tema-cells', name: 'Celdas Blindadas Clase A & Inyectores Automáticos (Tema Sinergie)' },
    { id: 'mirion-dosimetry', name: 'Activímetros de Dosis & Control de Calidad NIST (Mirion)' },
    { id: 'custom-peru', name: 'Plan de Entrega Hospitalaria Descentralizada (Lima y Regiones)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) return;

    soundEngine.playScan();
    const hash = 'PE-NUC-' + Math.floor(100000 + Math.random() * 900000);
    setDispatchHash(hash);
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado Estilo Apple */}
        <div className="contact-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Atención Hospitalaria & Especialistas • Perú
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Solicitud de radiofármacos y equipamiento.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Coordinación directa con nuestro equipo de radiofarmacia y física médica para hospitales, clínicas oncológicas e institutos de investigación en el Perú.
          </p>
        </div>

        {/* Grid: Formulario + Tarjeta de Contacto Directo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Tarjeta de Información Hospitalaria Perú */}
          <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/5 space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                Central de Radiofarmacia
              </div>
              <h3 className="font-display font-semibold text-xl text-[#1D1D1F]">
                Nuclia Health Perú S.A.C.
              </h3>
              <p className="text-xs text-[#86868B] mt-1">
                Operaciones logísticas 24/7 vinculadas al Hub Callao / Jorge Chávez.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-black/5 text-xs text-[#515154]">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1D1D1F]">Mesa de Pedidos Hospitalarios</div>
                  <div>Central Lima: +51 (1) 708-9200</div>
                  <div className="text-[#0071E3] font-medium">Guardia 24h: +51 987 654 321</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1D1D1F]">Consultas Clínicas y Pedidos</div>
                  <div>despacho@nucliahealth.pe</div>
                  <div>pedidos@nucliahealth.pe</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#1D1D1F]">Base Logística y Distribución</div>
                  <div>Centro Empresarial El Trigal, Santiago de Surco</div>
                  <div>Hub de Enlace: Callao (Aeropuerto Jorge Chávez)</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/2 border border-black/5 text-[11px] text-[#515154] space-y-1.5">
              <div className="flex items-center space-x-1.5 font-semibold text-[#1D1D1F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34C759]" />
                <span>Autorizaciones Sanitarias:</span>
              </div>
              <div>• Licencia de Operación IPEN N° 2024-OP-0891</div>
              <div>• Registro DIGEMID y Certificación BPA / BPD</div>
            </div>
          </div>

          {/* Formulario Principal */}
          <div
            ref={formCardRef}
            className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-2xl border border-black/5 shadow-sm relative"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#34C759]/10 text-[#34C759] mx-auto flex items-center justify-center font-bold text-lg">
                  ✓
                </div>

                <h3 className="font-display font-semibold text-2xl text-[#1D1D1F] tracking-tight">
                  Solicitud registrada con éxito
                </h3>
                <p className="text-[#515154] text-sm max-w-md mx-auto leading-relaxed">
                  El equipo de radiofarmacia y física médica de Nuclia Health Perú contactará de inmediato con el especialista solicitante para coordinar calibración y ventana de despacho.
                </p>

                <div className="p-4 rounded-2xl bg-black/3 text-xs text-[#515154] max-w-sm mx-auto space-y-1 text-left font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">CÓDIGO GESTIÓN:</span>
                    <span className="text-[#0071E3] font-bold">{dispatchHash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">CENTRO MÉDICO:</span>
                    <span className="text-[#1D1D1F]">{formData.institution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">SOLICITANTE:</span>
                    <span className="text-[#1D1D1F]">{formData.name}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsSubmitted(false);
                  }}
                  className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-medium text-[#1D1D1F] transition-all cursor-pointer"
                >
                  Registrar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {initialOrder && (
                  <div className="p-3.5 rounded-2xl bg-[#0071E3]/8 border border-[#0071E3]/20 flex items-center justify-between text-xs">
                    <span className="text-[#0071E3] font-medium">
                      Parámetros de la calculadora vinculados: {initialOrder.radioName} ({initialOrder.mCi} mCi)
                    </span>
                    <span className="text-[10px] text-[#86868B] font-mono">Autocompletado</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#515154] block">
                      Médico o Físico Médico Solicitante *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#515154] block">
                      Hospital, Clínica o Instituto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. INEN, Hospital Rebagliati, Clínica Delgado"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#515154] block">
                      Correo Electrónico Institucional *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="c.mendoza@inen.sld.pe"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#515154] block">
                      Teléfono de Contacto Directo / Celular
                    </label>
                    <input
                      type="tel"
                      placeholder="+51 999 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Línea de Solución Requerida *
                  </label>
                  <select
                    value={formData.protocol}
                    onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all cursor-pointer"
                  >
                    {protocols.map((p) => (
                      <option key={p.id} value={p.id} className="bg-white text-[#1D1D1F]">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Detalles del Requerimiento, Pacientes o Ventana de Calibración
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Especificar número de pacientes programados, actividad requerida en jeringa o especificaciones de equipamiento..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                  <span className="text-[11px] text-[#86868B]">
                    Confidencialidad médica conforme a la Ley N° 29733 (Perú)
                  </span>

                  <button
                    type="submit"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-sm shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Enviar Requerimiento
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
