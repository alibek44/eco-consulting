import { CheckCircle2, Award, Users, BookOpen } from 'lucide-react';
import { partners } from '../data/content';

const values = [
  'Научная обоснованность и достоверность результатов',
  'Соответствие законодательству РК и международным стандартам',
  'Комплексный подход к задачам охраны окружающей среды',
  'Партнёрство с ведущими научными и государственными организациями',
  'Внедрение современных технологий ГИС и дистанционного зондирования',
  'Подготовка высококвалифицированных специалистов-экологов',
];

const highlights = [
  {
    icon: Award,
    title: 'Аккредитованная организация',
    text: 'Государственная аккредитация для проведения экологических экспертиз и НИР',
  },
  {
    icon: Users,
    title: 'Мультидисциплинарная команда',
    text: 'Более 80 специалистов: экологи, лесоустроители, ГИС-специалисты, ботаники, зоологи',
  },
  {
    icon: BookOpen,
    title: 'Научная деятельность',
    text: 'Издание рецензируемого журнала, монографий, тематических карт и атласов',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            О компании
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Миссия и ценности
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            С 2018 года мы осуществляем научно-проектную деятельность в сфере экологии и
            природопользования, содействуя устойчивому развитию Казахстана.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/team.jpg" alt="Команда Терра-Природа" className="w-full h-full object-cover" />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -right-6 bg-green-700 text-white rounded-xl p-5 shadow-xl">
              <div className="text-3xl font-bold">350+</div>
              <div className="text-sm text-green-200">реализованных проектов</div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Комплексные экологические решения для государства и бизнеса
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              ТОО "ТЕРРА-ПРИРОДА" — ведущая научно-проектная организация Казахстана, специализирующаяся
              на экологическом проектировании, охране природы и устойчивом управлении природными
              ресурсами. Мы работаем с государственными органами, международными организациями и
              частным сектором, обеспечивая комплексный подход от научного исследования до
              практической реализации.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Наши специалисты участвуют в разработке стратегических документов в области охраны
              окружающей среды, реализации международных конвенций и программ устойчивого развития
              на территории Центральной Азии.
            </p>
            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            Партнёры и заказчики
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
