import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { company } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

const langs = ['ru', 'kz', 'en'];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t[lang].nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#home',         label: tr.home },
    { href: '#about',        label: tr.about },
    { href: '#services',     label: tr.services },
    { href: '#projects',     label: tr.projects },
    { href: '#publications', label: tr.publications },
    { href: '#training',     label: tr.training },
    { href: '#contact',      label: tr.contact },
  ];

  const LangButtons = ({ mobile }) => (
    <div className={`flex gap-1 ${mobile ? 'mt-3 pt-3 border-t border-gray-100' : ''}`}>
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-${mobile ? 3 : 2} py-1 rounded font-medium text-${mobile ? 'sm' : 'xs'} transition-colors ${
            lang === l
              ? 'bg-green-700 text-white'
              : 'text-gray-500 hover:text-green-700'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

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
            <LangButtons />
            <a
              href="#contact"
              className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              {tr.connect}
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
            <LangButtons mobile />
          </nav>
        </div>
      )}
    </header>
  );
}
