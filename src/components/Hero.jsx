import { ArrowDown, ChevronRight } from 'lucide-react';
import { company } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;

  const stats = [
    { value: company.founded,   label: tr.stat1 },
    { value: company.employees, label: tr.stat2 },
    { value: company.projects,  label: tr.stat3 },
    { value: company.regions,   label: tr.stat4 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-800 to-teal-700" />
      <img src="/images/hero.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end justify-center pb-4">
        <span className="text-white/20 text-xs italic">{tr.photoCaption}</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 text-sm font-medium">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {tr.badge}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
          {company.fullName}
        </h1>

        <p className="text-xl sm:text-2xl text-green-100 mb-4 font-light max-w-3xl mx-auto">
          {company.tagline}
        </p>

        <p className="text-base sm:text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          {company.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#services" className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
            {tr.cta1} <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 bg-transparent border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-colors">
            {tr.cta2}
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce" aria-label="scroll">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
}
