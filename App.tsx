
import React, { useState, createContext, useContext, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OrderForm from './components/OrderForm';
import WorkingHours from './components/WorkingHours';
import OrderHistory from './components/OrderHistory';
import MobileNav from './components/MobileNav';
import ChatBot from './components/ChatBot';
import StatsSection from './components/StatsSection';
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
          <div className="py-16 px-4 bg-slate-50 min-h-[calc(100vh-64px)] pb-32 lg:pb-16">
            <div className="max-w-6xl mx-auto mb-12 flex items-center gap-6">
              <button 
                onClick={() => setView('home')}
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-indigo-600 hover:text-white rounded-2xl shadow-sm transition-all text-slate-400 group"
              >
                <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
              </button>
              <div className="space-y-1">
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">{getTranslation('order.newOrder')}</h1>
                 <p className="text-slate-500 font-medium">Complete the form below to process your document.</p>
              </div>
            </div>
            <OrderForm onComplete={() => setView('history')} />
          </div>
        );
      case 'history':
        return (
          <div className="py-16 px-4 bg-slate-50 min-h-[calc(100vh-64px)] pb-32 lg:pb-16">
             <OrderHistory />
          </div>
        );
      default:
        return (
          <>
            <Hero onStart={() => setView('order')} />

            <StatsSection />
            
            {/* How It Works Section */}
            <section className="py-24 bg-white relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
              <div className="max-w-7xl mx-auto px-4 relative">
                <div className="text-center mb-20 space-y-4">
                  <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">Simple Process</span>
                  <h2 className="text-4xl font-black text-slate-900">{getTranslation('process.title')}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="relative group">
                      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:border-indigo-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50">
                        <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                          0{num}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">{getTranslation(`process.step${num}.t`)}</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">{getTranslation(`process.step${num}.d`)}</p>
                      </div>
                      {num < 3 && (
                        <div className="hidden lg:block absolute top-1/2 -right-6 translate-x-full text-slate-200 text-4xl">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="services" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">Features</span>
                  <h2 className="text-4xl font-black text-slate-900">{getTranslation('features.title')}</h2>
                  <p className="text-xl text-slate-500 max-w-2xl mx-auto">{getTranslation('features.subtitle')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: 'fa-print', title: 'features.print.title', desc: 'features.print.desc', color: 'indigo' },
                    { icon: 'fa-spell-check', title: 'features.check.title', desc: 'features.check.desc', color: 'blue' },
                    { icon: 'fa-highlighter', title: 'features.sync.title', desc: 'features.sync.desc', color: 'purple' }
                  ].map((f, i) => (
                    <div key={i} className="group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-100">
                      <div className={`w-16 h-16 bg-${f.color}-50 text-${f.color}-600 rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${f.icon}`}></i>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-slate-900">{getTranslation(f.title)}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg">{getTranslation(f.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="locations" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                  <div className="space-y-4">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">Accessibility</span>
                    <h2 className="text-4xl font-black text-slate-900">{getTranslation('nav.locations')}</h2>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {OFFICE_LOCATIONS.map(loc => (
                    <div key={loc.id} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <i className="fas fa-map-pin"></i>
                         </div>
                         <h3 className="font-bold text-xl text-slate-800">{getTranslation(loc.nameKey)}</h3>
                      </div>
                      <p className="text-slate-500 mb-6 leading-relaxed">{getTranslation(loc.addressKey)}</p>
                      <div className="flex items-center justify-between text-sm font-bold text-slate-400 border-t border-slate-200 pt-6">
                        <span className="flex items-center gap-2">
                           <i className="fas fa-clock text-indigo-300"></i> {getTranslation('locations.hours')}
                        </span>
                        <span className="text-slate-900">{loc.workingHoursKey}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl font-black text-center text-slate-900 mb-16">{getTranslation('faq.title')}</h2>
                <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                        <i className="fas fa-circle-question text-indigo-500"></i>
                        {getTranslation(`faq.q${i}`)}
                      </h4>
                      <p className="text-slate-500 text-lg leading-relaxed">{getTranslation(`faq.a${i}`)}</p>
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
      <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
        <Header onLogoClick={() => setView('home')} onHistoryClick={() => setView('history')} />

        <main className="flex-grow">
          {renderContent()}
        </main>

        <MobileNav activeTab={view} onNavigate={setView} />
        
        {/* Floating AI Chat Bot */}
        <ChatBot />

        <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800 pb-32 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-indigo-600 p-2 rounded-xl"><i className="fas fa-print"></i></div>
                <span className="text-2xl font-black tracking-tight">Manas<span className="text-indigo-500">Print</span></span>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-slate-500">{getTranslation('footer.desc')}</p>
              <div className="flex gap-4">
                 {['twitter', 'instagram', 'facebook', 'linkedin'].map(s => (
                   <a key={s} href="#" className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                      <i className={`fab fa-${s} text-xl`}></i>
                   </a>
                 ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{getTranslation('footer.quick')}</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#services" className="hover:text-indigo-400 transition-colors">{getTranslation('nav.services')}</a></li>
                <li><a href="#locations" className="hover:text-indigo-400 transition-colors">{getTranslation('nav.locations')}</a></li>
                <li><a href="#contact" className="hover:text-indigo-400 transition-colors">{getTranslation('nav.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{getTranslation('footer.support')}</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Safety Rules</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
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
