import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { company } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

export default function Contact() {
  const { lang } = useLang();
  const tr = t[lang].contact;

  const contactInfo = [
    { icon: Phone,  label: tr.phone,   value: company.phone, href: `tel:${company.phone}` },
    { icon: Mail,   label: tr.email,   value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: tr.address, value: company.address, href: null },
  ];

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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.detail || 'Server error');
      }
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
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">{tr.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{tr.title}</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">{tr.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                  {href
                    ? <a href={href} className="font-medium text-gray-800 hover:text-green-700 transition-colors text-sm">{value}</a>
                    : <p className="font-medium text-gray-800 text-sm">{value}</p>}
                </div>
              </div>
            ))}

            <div className="rounded-xl aspect-[4/3] overflow-hidden border border-gray-100">
              <iframe
                title="Терра-Природа на карте"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7!2d76.9285!3d43.2220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f2b2b2b2b2b%3A0x0!2z0LzQutGALiDQodCw0LzQsNC7LTEsINC0LiAxLCDQkNC70LzQsNGC0YssINCa0LDQt9Cw0YXRgdGC0LDQvQ!5e0!3m2!1sru!2skz!4v1!5m2!1sru!2skz&q=мкр+Самал-1,+Алматы,+Казахстан"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">{tr.hours}</h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600"><span>{tr.weekdays}</span><span className="font-medium">09:00 – 18:00</span></div>
                <div className="flex justify-between text-gray-400"><span>{tr.weekend}</span><span>{tr.closed}</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tr.successTitle}</h3>
                <p className="text-gray-600 text-sm max-w-sm">{tr.successDesc}</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm text-green-700 hover:underline">
                  {tr.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{tr.formTitle}</h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.name}</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.org}</label>
                    <input type="text" name="org" value={form.org} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="ТОО / АО / ..." />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.emailField}</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="email@example.kz" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.phoneField}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm"
                      placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.service}</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm text-gray-700 bg-white">
                    <option value="">{tr.serviceDefault}</option>
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
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{tr.message}</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-sm resize-none"
                    placeholder={tr.messagePlaceholder} />
                </div>

                <p className="text-xs text-gray-400">{tr.consent}</p>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-4 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" />
                  {loading ? tr.sending : tr.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
