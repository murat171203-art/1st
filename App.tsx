
import React, { useState, createContext, useContext, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import OrderForm from './components/OrderForm';
import WorkingHours from './components/WorkingHours';
import OrderHistory from './components/OrderHistory';
import MobileNav from './components/MobileNav';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import TopInfoBar from './components/TopInfoBar';
import { PhoneContact } from './components/PhoneContact';
import { OFFICE_LOCATIONS } from './constants';
import { Language } from './types';
import { translations } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('manasprint_lang');
    return (saved as Language) || Language.KY;
  });
  const [view, setView] = useState<'home' | 'order' | 'history'>('home');

  useEffect(() => {
    localStorage.setItem('manasprint_lang', language);
  }, [language]);

  const t_data = translations[language];

  const getTranslation = (path: string) => {
    const value = path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), t_data);
    return value !== undefined ? value : path;
  };

  const renderContent = () => {
    switch (view) {
      case 'order':
        return (
          <div className="py-16 px-4 bg-[#09090b] min-h-[calc(100vh-64px)] pb-32 lg:pb-16">
            <div className="max-w-6xl mx-auto mb-12 flex items-center gap-6">
              <button 
                onClick={() => setView('home')}
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/30 rounded-2xl shadow-sm transition-all text-zinc-400 group"
              >
                <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
              </button>
              <div className="space-y-1">
                 <h1 className="text-3xl font-black text-white tracking-tight">{getTranslation('order.newOrder')}</h1>
                 <p className="text-zinc-400 font-medium">Complete the form below to process your document.</p>
              </div>
            </div>
            <OrderForm onComplete={() => setView('history')} />
          </div>
        );
      case 'history':
        return (
          <div className="py-16 px-4 bg-[#09090b] min-h-[calc(100vh-64px)] pb-32 lg:pb-16">
             <OrderHistory />
          </div>
        );
      default:
        return (
          <>
            <Hero onStart={() => setView('order')} />

            <ProcessSection />

            <section id="locations" className="py-24 bg-[#09090b] relative border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                  <div className="space-y-4">
                    <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Accessibility</span>
                    <h2 className="text-4xl font-black text-white">{getTranslation('nav.locations')}</h2>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {OFFICE_LOCATIONS.map(loc => (
                    <div 
                      key={loc.id} 
                      className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all group block"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all">
                              <i className="fas fa-map-pin"></i>
                           </div>
                           <h3 className="font-bold text-xl text-white">{getTranslation(loc.nameKey)}</h3>
                        </div>
                        <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-zinc-950 bg-amber-500/10 hover:bg-amber-500 p-2 rounded-lg transition-colors border border-amber-500/20" title="Картадан көрүү">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      </div>
                      <p className="text-zinc-400 mb-6 leading-relaxed">{getTranslation(loc.addressKey)}</p>
                      <div className="space-y-3 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between text-sm font-bold text-zinc-500">
                          <span className="flex items-center gap-2">
                             <i className="fas fa-clock text-amber-500/70"></i> {getTranslation('locations.hours')}
                          </span>
                          <span className="text-zinc-300">{loc.workingHoursKey}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold text-zinc-500">
                          <span className="flex items-center gap-2">
                             <i className="fas fa-phone text-amber-500/70"></i> {getTranslation('contact.phone')}
                          </span>
                          <PhoneContact phone={loc.phone} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#09090b] relative border-t border-white/5">
              <div className="max-w-3xl mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-black text-center text-white mb-16">{getTranslation('faq.title')}</h2>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all">
                      <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                        <i className="fas fa-circle-question text-amber-500"></i>
                        {getTranslation(`faq.q${i}`)}
                      </h4>
                      <p className="text-zinc-400 text-lg leading-relaxed">{getTranslation(`faq.a${i}`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <WorkingHours />
          </>
        );
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: getTranslation }}>
      <div className="min-h-screen flex flex-col bg-[#09090b] text-white selection:bg-amber-500/30">
        <Header onLogoClick={() => setView('home')} onHistoryClick={() => setView('history')} />
        <TopInfoBar />

        <main className="flex-grow">
          {renderContent()}
        </main>

        <MobileNav activeTab={view} onNavigate={setView} />
        
        {/* Floating AI Chat Bot */}
        <ChatBot />
        
        {/* WhatsApp Floating Button */}
        <WhatsAppButton />

        <footer className="bg-[#09090b] text-zinc-400 py-20 border-t border-white/5 pb-32 lg:pb-20 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16 relative z-10">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl text-amber-500"><i className="fas fa-print"></i></div>
                <span className="text-2xl font-black tracking-tight">Manas<span className="text-amber-500">Print</span></span>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-zinc-500">{getTranslation('footer.desc')}</p>
              <div className="flex gap-4">
                 {['twitter', 'instagram', 'facebook', 'linkedin'].map(s => (
                   <a key={s} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-all text-zinc-400">
                      <i className={`fab fa-${s} text-xl`}></i>
                   </a>
                 ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{getTranslation('footer.quick')}</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#services" className="hover:text-amber-500 transition-colors">{getTranslation('nav.services')}</a></li>
                <li><a href="#locations" className="hover:text-amber-500 transition-colors">{getTranslation('nav.locations')}</a></li>
                <li><a href="#contact" className="hover:text-amber-500 transition-colors">{getTranslation('nav.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{getTranslation('footer.support')}</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Safety Rules</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium relative z-10">
            <p>© 2024 ManasPrint. Empowering Academic Excellence.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Cookies</a>
               <a href="#" className="hover:text-white transition-colors">Legals</a>
            </div>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
