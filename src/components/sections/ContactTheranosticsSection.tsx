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
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
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
    { id: 'neuro', name: 'Neuroimagen Amiloide & Tau (¹⁸F-PET)' },
    { id: 'cardio', name: 'Cardiología Cuantitativa (¹³N / ⁸²Rb)' },
    { id: 'custom', name: 'Radiosíntesis Personalizada GMP Nuclia' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) return;

    soundEngine.playScan();
    const hash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
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
        
        {/* Encabezado con Fade-in y TranslateY */}
        <div className="contact-fade-header text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs mb-3 tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NUCLIA DIRECT // ENLACE CLÍNICO</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-[0.14em]">
            Contacto &amp; <span className="text-neon-cyan text-glow-cyan">Solicitud</span>
          </h2>
          <p className="text-clinical-dim text-sm sm:text-base mt-3 font-body leading-relaxed">
            Coordinación directa con el equipo de radiofarmacia clínica de <strong className="text-white">Nuclia Health</strong> para comités de tumores, centros hospitalarios e investigadores.
          </p>
        </div>

        {/* Formulario con Entrada Suave */}
        <div
          ref={formCardRef}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10 corner-brackets shadow-[0_0_40px_rgba(0,245,212,0.1)] relative"
        >
          {isSubmitted ? (
            <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-neon-emerald/15 border border-neon-emerald/40 text-neon-emerald mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(0,255,157,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white tracking-wider uppercase">
                  Solicitud Teranóstica Registrada en Nuclia Health
                </h3>
                <p className="text-clinical-dim text-sm mt-2 max-w-md mx-auto font-body">
                  El equipo de radiofarmacia clínica y logística JIT se comunicará en menos de 2 horas para la calibración y ventana de entrega.
                </p>
              </div>

              <div className="p-4 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 font-mono text-xs text-clinical-dim max-w-md mx-auto space-y-1 text-left">
                <div className="flex justify-between">
                  <span>DISPATCH HASH:</span>
                  <span className="text-neon-cyan font-bold">{dispatchHash}</span>
                </div>
                <div className="flex justify-between">
                  <span>PROTOCOLO:</span>
                  <span className="text-white">{protocols.find((p) => p.id === formData.protocol)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>CENTRO SOLICITANTE:</span>
                  <span className="text-neon-emerald font-semibold">{formData.institution}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsSubmitted(false);
                }}
                className="px-6 py-2.5 rounded backdrop-blur-md bg-white/5 border border-white/15 text-xs font-mono text-clinical-text hover:border-neon-cyan hover:text-neon-cyan transition-all cursor-pointer"
              >
                NUEVA CONSULTA
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-clinical-dim flex items-center space-x-1.5 uppercase">
                    <User className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>Especialista / Investigador *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Alejandro Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-clinical-muted focus:outline-none focus:border-neon-cyan/60 focus:bg-white/8 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-clinical-dim flex items-center space-x-1.5 uppercase">
                    <Building className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>Centro Hospitalario / Instituto *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hospital Universitario Central"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-clinical-muted focus:outline-none focus:border-neon-cyan/60 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-clinical-dim flex items-center space-x-1.5 uppercase">
                    <Mail className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>Correo Electrónico Institucional *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="a.vance@hospital.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-clinical-muted focus:outline-none focus:border-neon-cyan/60 focus:bg-white/8 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-clinical-dim flex items-center space-x-1.5 uppercase">
                    <FileText className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>Protocolo de Radiofármaco *</span>
                  </label>
                  <select
                    value={formData.protocol}
                    onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-[#080B10] border border-white/10 text-white font-body text-sm focus:outline-none focus:border-neon-cyan/60 transition-all"
                  >
                    {protocols.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#080B10] text-white">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-clinical-dim uppercase">
                  Detalles Clínicos / Especificación de Dosis
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre la ventana de calibración, patología diana o fecha estimada de administración..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-clinical-muted focus:outline-none focus:border-neon-cyan/60 focus:bg-white/8 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-clinical-muted">
                  <ShieldCheck className="w-4 h-4 text-neon-emerald" />
                  <span>Transmisión encriptada bajo estándares HIPAA / GDPR</span>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-neon-cyan text-cyber-950 font-display font-bold text-xs tracking-[0.2em] uppercase overflow-hidden shadow-[0_0_25px_rgba(0,245,212,0.4)] hover:shadow-[0_0_40px_rgba(0,245,212,0.7)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMITIR SOLICITUD</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
