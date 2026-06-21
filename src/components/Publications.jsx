import { BookOpen, BookMarked, FileText, Map } from 'lucide-react';
import { publications } from '../data/content';

const typeConfig = {
  'Монография':       { icon: BookOpen,   color: 'bg-indigo-100 text-indigo-700' },
  'Тематический атлас': { icon: Map,       color: 'bg-green-100 text-green-700' },
  'Научный журнал':   { icon: BookMarked, color: 'bg-blue-100 text-blue-700' },
  'Методическое пособие': { icon: FileText, color: 'bg-amber-100 text-amber-700' },
};

export default function Publications() {
  return (
    <section id="publications" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Публикации
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Научные и научно-популярные издания
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Монографии, тематические карты, атласы и периодические издания по вопросам
            экологии и природопользования Казахстана.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {publications.map((pub) => {
            const cfg = typeConfig[pub.type] || { icon: FileText, color: 'bg-gray-100 text-gray-600' };
            const Icon = cfg.icon;
            return (
              <div
                key={pub.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all flex flex-col"
              >
                <div className={`w-11 h-11 ${cfg.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full self-start mb-3 ${cfg.color}`}>
                  {pub.type}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 flex-1">
                  {pub.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{pub.authors}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{pub.publisher}</span>
                  <span className="text-xs font-bold text-green-700">{pub.year}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Journal highlight */}
        <div className="bg-gradient-to-r from-green-800 to-teal-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-20 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <BookMarked className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold mb-2">
              Журнал «Экология и природопользование Казахстана»
            </h3>
            <p className="text-green-100 text-sm leading-relaxed">
              Ежеквартальный рецензируемый научный журнал. Принимаем статьи от учёных,
              аспирантов и практикующих специалистов по вопросам охраны природы, биоразнообразия,
              ГИС и дистанционного зондирования.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-white text-green-800 font-semibold px-5 py-3 rounded-xl hover:bg-green-50 transition-colors text-sm whitespace-nowrap"
          >
            Подать статью
          </a>
        </div>
      </div>
    </section>
  );
}
