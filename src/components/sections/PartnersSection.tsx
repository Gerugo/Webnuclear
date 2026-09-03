import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Activity, Award, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../../audio/soundSynth';

gsap.registerPlugin(ScrollTrigger);

export const PartnersSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.partners-header',
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
        '.partner-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        '.synergy-banner',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    {
      id: 'curium',
      name: 'Curium Pharma',
      origin: 'Francia / Estados Unidos',
      role: 'Radiofarmacia & Trazadores Moleculares',
      icon: Activity,
      badge: 'Líder Mundial',
      tagline: '15 millones de pacientes atendidos al año en más de 70 países.',
      description:
        'El mayor productor y distribuidor integrado de radiofármacos del planeta. Proveedor oficial de radioisótopos PET (¹⁸F, ⁶⁸Ga), SPECT (⁹⁹ᵐTc) y radioligandos terapéuticos (¹⁷⁷Lu) con los estándares más exigentes de la Farmacopea Europea y la FDA.',
      highlights: [
        'Producción global en 80 plantas y 45+ radiofarmacias',
        'Pureza radionucleídica >99.98% certificada por lote',
        'Portafolio oncológico, cardiológico y neurológico de referencia',
      ],
      url: 'https://www.curiumpharma.com/es/',
      accentColor: '#0071E3',
    },
    {
      id: 'tema',
      name: 'Tema Sinergie',
      origin: 'Faenza, Italia',
      role: 'Celdas Blindadas & Automatización',
      icon: Cpu,
      badge: 'Ingeniería de Aislamiento',
      tagline: 'El estándar de oro en contención y fraccionamiento aséptico.',
      description:
        'Pionero europeo en diseño y fabricación de celdas calientes blindadas (Hot Cells), aisladores Clase A y sistemas de dispensación automática para medicina nuclear. Protección radiológica integral que garantiza dosis exactas y cero exposición al operador.',
      highlights: [
        'Celdas de síntesis y fraccionamiento estéril Clase A',
        'Dispensadores robotizados multimodales de alta precisión',
        'Cumplimiento estricto cGMP / GAMP5 y validación técnica',
      ],
      url: 'https://www.temasinergie.com/',
      accentColor: '#30B0C7',
    },
    {
      id: 'mirion',
      name: 'Mirion Technologies',
      origin: 'Atlanta, EE.UU. / Francia',
      role: 'Dosimetría & Detección Radiológica',
      icon: ShieldCheck,
      badge: 'Metrología NIST',
      tagline: 'Líder global en medición, control de calidad y radioprotección.',
      description:
        'Instrumentación científica de máxima precisión para medicina nuclear: activímetros de dosis (calibradores de dosis), cámaras de ionización con trazabilidad metrológica, detectores de contaminación y sistemas de monitoreo ambiental hospitalario.',
      highlights: [
        'Activímetros clínicos con calibración NIST / IAEA',
        'Sistemas de dosimetría en tiempo real y radioprotección',
        'Sensores de alta sensibilidad y software de aseguramiento de calidad',
      ],
      url: 'https://www.mirion.com/',
      accentColor: '#34C759',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="min-h-screen relative flex items-center justify-center px-4 md:px-8 py-28 z-10 select-none"
    >
      <div className="max-w-5xl w-full mx-auto">
        
        {/* Encabezado */}
        <div className="partners-header text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2 flex items-center justify-center space-x-2">
            <Award className="w-3.5 h-3.5" />
            <span>Alianzas Globales de Excelencia</span>
          </div>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#1D1D1F] tracking-tight">
            Respaldados por los gigantes de la medicina nuclear mundial.
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg mt-3 font-normal leading-relaxed">
            Nuclia Health conecta los centros médicos y oncológicos del Perú con la tecnología de los tres líderes globales indiscutibles en radiofármacos, celdas de aislamiento y dosimetría de precisión.
          </p>
        </div>

        {/* 3 Tarjetas de Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {partners.map((partner) => {
            const PartnerIcon = partner.icon;

            return (
              <div
                key={partner.id}
                onMouseEnter={() => soundEngine.playHover()}
                className="partner-card p-8 rounded-3xl bg-white/75 backdrop-blur-2xl border border-black/5 hover:bg-white/90 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cabecera de la tarjeta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                      {partner.origin}
                    </span>
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white"
                      style={{ backgroundColor: partner.accentColor }}
                    >
                      {partner.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-2">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${partner.accentColor}15` }}
                    >
                      <PartnerIcon className="w-5 h-5" style={{ color: partner.accentColor }} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xl text-[#1D1D1F] tracking-tight">
                        {partner.name}
                      </h3>
                      <div className="text-xs text-[#86868B]">
                        {partner.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-[#1D1D1F] mt-4 mb-3 italic">
                    "{partner.tagline}"
                  </div>

                  <p className="text-xs text-[#515154] leading-relaxed mb-6">
                    {partner.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 border-t border-black/5 pt-4 mb-6 text-xs text-[#1D1D1F]">
                    {partner.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#0071E3] font-bold">✓</span>
                        <span className="text-[#515154] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  className="w-full py-2.5 rounded-2xl bg-black/3 hover:bg-black/6 text-xs font-medium text-[#1D1D1F] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer group"
                >
                  <span>Visitar {partner.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Banner de Sinergia 360° en Perú (Ventaja vs Comersec) */}
        <div className="synergy-banner p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-2xl border border-black/5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">
                La Ventaja 360° en el Perú
              </div>
              <h3 className="font-display font-semibold text-2xl text-[#1D1D1F] tracking-tight">
                Una solución clínica integral, no solo un catálogo de importación.
              </h3>
              <p className="text-sm text-[#515154] leading-relaxed">
                A diferencia de intermediarios tradicionales, Nuclia Health integra en un solo interlocutor la molécula activa de <strong>Curium</strong>, el equipamiento aséptico de <strong>Tema Sinergie</strong> y la calibración dosimétrica de <strong>Mirion</strong>, con certificación técnica y soporte continuo en Lima y regiones.
              </p>
            </div>

            <div className="space-y-2.5 bg-black/2 p-5 rounded-2xl border border-black/5 text-xs text-[#515154]">
              <div className="flex items-center space-x-2 text-[#1D1D1F] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#34C759]" />
                <span>Garantía Regulatoria en Perú:</span>
              </div>
              <div className="flex justify-between border-b border-black/5 py-1">
                <span>Licencia de Transporte:</span>
                <strong className="text-[#1D1D1F]">IPEN Categoría A</strong>
              </div>
              <div className="flex justify-between border-b border-black/5 py-1">
                <span>Certificación Sanitaria:</span>
                <strong className="text-[#1D1D1F]">DIGEMID (BPA / BPD)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Soporte Técnico Especializado:</span>
                <strong className="text-[#0071E3]">Físicos Médicos 24/7</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
