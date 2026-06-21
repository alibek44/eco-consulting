import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { company } from '../data/content';

const contactInfo = [
  { icon: Phone, label: 'Телефон', value: company.phone, href: `tel:${company.phone}` },
  { icon: Mail, label: 'E-mail', value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: 'Адрес', value: company.address, href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка сервера. Попробуйте позже.');
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Контакты
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Оставьте заявку — наш специалист свяжется с вами в течение одного рабочего дня.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: info + map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium text-gray-800 hover:text-green-700 transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-800 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-green-800 to-teal-700 rounded-xl aspect-[4/3] flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-white/60 p-6">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-white/40" />
                <p className="text-sm font-medium text-white/70">Карта расположения офиса</p>
                <p className="text-xs mt-1 italic">[Интерактивная карта Яндекс/Google Maps]</p>
                <p className="text-xs mt-3 text-white/50">{company.address}</p>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Режим работы</h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Пн – Пт</span><span className="font-medium">09:00 – 18:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Сб – Вс</span><span>Выходной</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600 text-sm max-w-sm">
                  Спасибо за обращение. Наш специалист свяжется с вами в течение одного рабочего дня.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-green-700 hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Оставить заявку</h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Организация
                    </label>
                    <input
                      type="text"
                      name="org"
                      value={form.org}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="Название компании"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="email@example.kz"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Интересующая услуга
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm text-gray-700 bg-white"
                  >
                    <option value="">Выберите услугу...</option>
                    <option>Экологическое проектирование и экспертиза</option>
                    <option>Научно-исследовательские работы</option>
                    <option>Проектирование и управление ООПТ</option>
                    <option>Лесоустройство и лесовосстановление</option>
                    <option>Дендрология и озеленение</option>
                    <option>Экотуризм и рекреационная инфраструктура</option>
                    <option>Рекультивация и санация земель</option>
                    <option>Международные программы</option>
                    <option>Обучение и сертификация</option>
                    <option>Публикации / издательство</option>
                    <option>Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Описание задачи *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm resize-none"
                    placeholder="Кратко опишите ваш проект или задачу..."
                  />
                </div>

                <p className="text-xs text-gray-400">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных в соответствии
                  с законодательством РК.
                </p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
