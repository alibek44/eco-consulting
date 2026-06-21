import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { company } from '../data/content';

const footerLinks = {
  Услуги: [
    'Экологическое проектирование',
    'Научно-исследовательские работы',
    'Проектирование ООПТ',
    'Лесоустройство',
    'Дендрология и озеленение',
    'Рекультивация земель',
  ],
  Компания: [
    { label: 'О нас', href: '#about' },
    { label: 'Проекты', href: '#projects' },
    { label: 'Публикации', href: '#publications' },
    { label: 'Обучение', href: '#training' },
    { label: 'Контакты', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">{company.name}</div>
                <div className="text-xs text-gray-500">ТОО</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              {company.description}
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Phone className="w-3.5 h-3.5" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Mail className="w-3.5 h-3.5" /> {company.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">{company.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Услуги</h4>
            <ul className="space-y-2">
              {footerLinks.Услуги.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm hover:text-green-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.Компания.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-green-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Рассылка новостей</h4>
            <p className="text-sm mb-4">
              Получайте новости о наших проектах и мероприятиях.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ваш@email.kz"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:border-green-600 outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                OK
              </button>
            </form>

            <div className="mt-6">
              <p className="text-xs mb-3">Языки / Тілдер</p>
              <div className="flex gap-2">
                {['RU', 'KZ', 'EN'].map((lang) => (
                  <button
                    key={lang}
                    className="px-2.5 py-1 text-xs border border-gray-700 hover:border-green-600 hover:text-green-400 rounded transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} {company.fullName}. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-green-400 transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
