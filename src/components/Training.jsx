import { Clock, Monitor, Award, Users } from 'lucide-react';
import { trainings } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

export default function Training() {
  const { lang } = useLang();
  const tr = t[lang].training;

  return (
    <section id="training" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">{tr.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{tr.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{tr.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {trainings.map((course) => (
            <div key={course.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-lg">
                  {course.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{course.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{course.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-500"><Clock className="w-3.5 h-3.5 text-green-600" /><span>{course.duration}</span></div>
                    <div className="flex items-center gap-2 text-gray-500"><Monitor className="w-3.5 h-3.5 text-green-600" /><span>{course.format}</span></div>
                    <div className="flex items-center gap-2 text-gray-500 col-span-2"><Award className="w-3.5 h-3.5 text-green-600 shrink-0" /><span>{course.certificate}</span></div>
                    <div className="flex items-start gap-2 text-gray-500 col-span-2"><Users className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" /><span>{course.audience}</span></div>
                  </div>
                  <a href="#contact" className="mt-4 inline-block text-sm font-medium text-green-700 hover:text-green-900 hover:underline">
                    {tr.enroll}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-700 to-green-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-3">{tr.corpTitle}</h3>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto text-sm leading-relaxed">{tr.corpDesc}</p>
          <a href="#contact" className="inline-block bg-white text-green-800 font-semibold px-7 py-3 rounded-xl hover:bg-green-50 transition-colors">
            {tr.corpBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
