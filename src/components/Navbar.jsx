import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { company } from '../data/content';

const navLinks = [
  { href: '#home', label: 'Главная' },
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#projects', label: 'Проекты' },
  { href: '#publications', label: 'Публикации' },
  { href: '#training', label: 'Обучение' },
  { href: '#contact', label: 'Контакты' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-green-800 leading-tight block">
                {company.name}
              </span>
              <span className="text-xs text-gray-500 leading-tight block">ТОО</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex gap-1 text-xs">
              <button className="px-2 py-1 bg-green-700 text-white rounded font-medium">RU</button>
              <button className="px-2 py-1 text-gray-500 hover:text-green-700 rounded transition-colors">KZ</button>
              <button className="px-2 py-1 text-gray-500 hover:text-green-700 rounded transition-colors">EN</button>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              Связаться
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-green-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button className="px-3 py-1 bg-green-700 text-white text-sm rounded font-medium">RU</button>
              <button className="px-3 py-1 text-gray-500 text-sm hover:text-green-700 rounded">KZ</button>
              <button className="px-3 py-1 text-gray-500 text-sm hover:text-green-700 rounded">EN</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
