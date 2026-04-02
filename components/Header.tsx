
import React from 'react';
import { useTranslation } from '../App';
import { Language } from '../types';

interface HeaderProps {
  onLogoClick: () => void;
  onHistoryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onHistoryClick }) => {
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    { code: Language.KY, label: 'KY' },
    { code: Language.TR, label: 'TR' },
    { code: Language.RU, label: 'RU' },
    { code: Language.EN, label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          onClick={onLogoClick} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-black transition-all">
            <i className="fas fa-print text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Manas<span className="text-amber-500">Print</span></span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#services" className="hover:text-amber-500 transition-colors">{t('nav.services')}</a>
          <a href="#locations" className="hover:text-amber-500 transition-colors">{t('nav.locations')}</a>
          <a href="#contact" className="hover:text-amber-500 transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                  language === lang.code 
                    ? 'bg-amber-500 text-black shadow-sm' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button 
            onClick={onHistoryClick}
            className="hidden sm:flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-5 py-2.5 rounded-full text-xs font-black hover:bg-amber-500 hover:text-black transition-all uppercase tracking-widest"
          >
            <i className="fas fa-clock-rotate-left"></i>
            {t('nav.myOrders')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
