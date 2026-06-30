import { Calendar, Building2, Tag } from 'lucide-react';
import { projects } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

const categoryColors = {
  'ООПТ':               'bg-emerald-100 text-emerald-700',
  'Экспертиза':         'bg-blue-100 text-blue-700',
  'Лесовосстановление': 'bg-lime-100 text-lime-700',
  'Картография':        'bg-indigo-100 text-indigo-700',
  'Дендрология':        'bg-teal-100 text-teal-700',
  'Рекультивация':      'bg-amber-100 text-amber-700',
};

export default function Projects() {
  const { lang } = useLang();
  const tr = t[lang].projects;

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">{tr.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{tr.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{tr.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <article key={proj.id} className="bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-green-800 to-teal-600 relative overflow-hidden">

                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[proj.category] || 'bg-gray-100 text-gray-600'}`}>
                    {proj.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3 leading-snug text-sm group-hover:text-green-700 transition-colors">{proj.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{proj.description}</p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 shrink-0" /><span>{proj.year}</span></div>
                  <div className="flex items-start gap-2"><Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span className="leading-tight">{proj.client}</span></div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="inline-block border-2 border-green-700 text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-700 hover:text-white transition-colors">
            {tr.portfolio}
          </a>
        </div>
      </div>
    </section>
  );
}
