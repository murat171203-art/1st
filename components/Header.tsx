
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          onClick={onLogoClick} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <i className="fas fa-print text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Manas<span className="text-indigo-600">Print</span></span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-indigo-600 transition-colors">{t('nav.services')}</a>
          <a href="#locations" className="hover:text-indigo-600 transition-colors">{t('nav.locations')}</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                  language === lang.code 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button 
            onClick={onHistoryClick}
            className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-full text-xs font-black hover:bg-indigo-100 transition-all uppercase tracking-widest"
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
