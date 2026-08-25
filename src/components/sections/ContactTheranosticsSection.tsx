import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Building, User, FileText, Sparkles } from 'lucide-react';
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
        '.contact-fade-header',
        { opacity: 0, y: 30 },
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
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
    { id: 'custom', name: 'Radiosíntesis Clínica a Medida (GMP)' },
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
      className="min-h-screen relative flex items-center justify-center px-4 md:px-12 py-24 z-10"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado Hospitalario */}
        <div className="contact-fade-header text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-mono text-xs mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATENCIÓN HOSPITALARIA DIRECTA</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Contacto y <span className="text-teal-600">Solicitud de Dosis</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 font-body leading-relaxed">
            Coordinación ágil con nuestro equipo de radiofarmacia clínica para comités de tumores, servicios hospitalarios de medicina nuclear e investigadores.
          </p>
        </div>

        {/* Formulario en Cristal Blanco */}
        <div
          ref={formCardRef}
          className="backdrop-blur-xl bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative"
        >
          {isSubmitted ? (
            <div className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                  Solicitud Registrada Correctamente
                </h3>
                <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto font-body">
                  El equipo de radiofarmacia clínica de Nuclia Health se pondrá en contacto con el centro hospitalario para confirmar la ventana de entrega y calibración de actividad.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-body text-xs text-slate-700 max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">CÓDIGO DE SEGUIMIENTO:</span>
                  <span className="text-teal-700 font-bold font-mono">{dispatchHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Protocolo:</span>
                  <span className="text-slate-900 font-semibold">{protocols.find((p) => p.id === formData.protocol)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hospital / Centro:</span>
                  <span className="text-emerald-700 font-bold">{formData.institution}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-body font-semibold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Enviar Otra Consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-body font-semibold text-slate-700 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>Especialista / Médico Solicitante *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dra. María Fernández"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-body font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-600" />
                    <span>Centro Hospitalario o Instituto *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hospital Universitario La Paz"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-body font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                    <span>Correo Electrónico Institucional *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="m.fernandez@hospital.es"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-body font-semibold text-slate-700 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    <span>Protocolo o Radiofármaco de Interés *</span>
                  </label>
                  <select
                    value={formData.protocol}
                    onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all cursor-pointer"
                  >
                    {protocols.map((p) => (
                      <option key={p.id} value={p.id} className="bg-white text-slate-900">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-body font-semibold text-slate-700">
                  Detalles de la Solicitud / Estimación de Pacientes o Dosis
                </label>
                <textarea
                  rows={3}
                  placeholder="Indica cualquier requerimiento sobre fecha estimada de inyección, patología diana o calibración especial..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                <div className="flex items-center space-x-2 text-xs font-body text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tratamiento confidencial conforme a RGPD y normativas sanitarias</span>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-body font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud Hospitalaria</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
