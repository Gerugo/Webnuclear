import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundSynth';

export const ContactTheranosticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    protocol: 'psma',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dispatchHash, setDispatchHash] = useState('');

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
    { id: 'psma', name: 'Oncología Teranóstica (¹⁷⁷Lu / ⁶⁸Ga-PSMA)' },
    { id: 'neuro', name: 'Neuroimagen Diagnóstica (¹⁸F-Florbetapir / DaTscan)' },
    { id: 'cardio', name: 'Cardiología Cuantitativa (¹³N-Amoníaco / ⁸²Rb)' },
    { id: 'custom', name: 'Radiosíntesis Clínica Personalizada (GMP)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) return;

    soundEngine.playScan();
    const hash = 'NUC-' + Math.floor(100000 + Math.random() * 900000);
    setDispatchHash(hash);
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-4xl w-full mx-auto">
        
        {/* Encabezado Estilo Apple */}
        <div className="contact-header text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
            Contacto Hospitalario
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Solicitud de dosis y protocolos.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Coordinación directa con nuestro equipo de radiofarmacia clínica para centros hospitalarios e investigadores.
          </p>
        </div>

        {/* Tarjeta de Formulario Minimalista */}
        <div
          ref={formCardRef}
          className="p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-sm relative"
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
                Nuestro servicio de radiofarmacia clínica contactará con el centro solicitante para confirmar la ventana horaria de entrega.
              </p>

              <div className="p-4 rounded-2xl bg-black/3 text-xs text-[#515154] max-w-sm mx-auto space-y-1 text-left font-mono">
                <div className="flex justify-between">
                  <span className="text-[#86868B]">CÓDIGO:</span>
                  <span className="text-[#0071E3] font-bold">{dispatchHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868B]">HOSPITAL:</span>
                  <span className="text-[#1D1D1F]">{formData.institution}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsSubmitted(false);
                }}
                className="px-5 py-2 rounded-full bg-black/5 hover:bg-black/10 text-xs font-medium text-[#1D1D1F] transition-all cursor-pointer"
              >
                Nueva consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Especialista o Médico Solicitante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dra. María Fernández"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Centro Hospitalario *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hospital Universitario La Paz"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Correo Electrónico Institucional *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="m.fernandez@hospital.es"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#515154] block">
                    Protocolo o Radiofármaco *
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
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#515154] block">
                  Detalles Clínicos o Estimación de Pacientes
                </label>
                <textarea
                  rows={3}
                  placeholder="Requerimientos sobre fecha estimada, patología o dosimetría..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/3 border border-black/5 text-[#1D1D1F] text-sm placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                <span className="text-xs text-[#86868B]">
                  Tratamiento confidencial de datos conforme a RGPD
                </span>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-body font-medium text-sm shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Enviar Solicitud
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
