import { Map, FlaskConical, Trees, Sprout, Flower2, Compass, Recycle, Globe } from 'lucide-react';
import { services } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

const iconMap = { Map, FlaskConical, Trees, Sprout, Flower2, Compass, Recycle, Globe };

const colorMap = {
  green:   { bg: 'bg-green-100',   icon: 'text-green-700',   border: 'border-green-200',   hover: 'hover:border-green-400'   },
  blue:    { bg: 'bg-blue-100',    icon: 'text-blue-700',    border: 'border-blue-200',    hover: 'hover:border-blue-400'    },
  emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-700', border: 'border-emerald-200', hover: 'hover:border-emerald-400' },
  lime:    { bg: 'bg-lime-100',    icon: 'text-lime-700',    border: 'border-lime-200',    hover: 'hover:border-lime-400'    },
  teal:    { bg: 'bg-teal-100',    icon: 'text-teal-700',    border: 'border-teal-200',    hover: 'hover:border-teal-400'    },
  cyan:    { bg: 'bg-cyan-100',    icon: 'text-cyan-700',    border: 'border-cyan-200',    hover: 'hover:border-cyan-400'    },
  amber:   { bg: 'bg-amber-100',   icon: 'text-amber-700',   border: 'border-amber-200',   hover: 'hover:border-amber-400'   },
  indigo:  { bg: 'bg-indigo-100',  icon: 'text-indigo-700',  border: 'border-indigo-200',  hover: 'hover:border-indigo-400'  },
};

export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;

  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">{tr.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{tr.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{tr.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            const c = colorMap[service.color];
            return (
              <div key={service.id} className={`bg-white rounded-2xl p-6 border ${c.border} ${c.hover} hover:shadow-lg transition-all group cursor-default`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${c.icon}`} />
                  </div>
                  <span className="text-3xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors select-none">
                    {String(service.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 leading-snug text-sm">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a href="#contact" className={`text-xs font-medium ${c.icon} hover:underline`}>{tr.request}</a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-green-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{tr.cta}</h3>
          <p className="text-green-200 mb-6 text-sm">{tr.ctaSub}</p>
          <a href="#contact" className="inline-block bg-white text-green-800 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
            {tr.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
