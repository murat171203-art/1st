import React, { useState } from 'react';
import { useTranslation } from '../App';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const pricingData: Record<string, any> = {
    print: {
      title: 'Жогорку сапаттагы басып чыгаруу',
      icon: 'fa-print',
      items: [
        { name: 'A4', price: 'ак-кара 5 сом/бет; түстүү 10–30 сом/бет (2 тарап 30% арзандатуу)' },
        { name: 'Калың A4', price: '30–40 сом' },
        { name: 'Китеп', price: 'ак-кара 2 сом/бет; түстүү 3 сом/бет' },
        { name: 'A3', price: 'ак-кара 20 сом; түстүү 50 сом' },
        { name: 'A3 калың-спец', price: 'ак-кара 70 сом; түстүү 100 сом' }
      ]
    },
    scan: {
      title: 'Скандоо жана Ламинация',
      icon: 'fa-file-pdf',
      items: [
        { name: 'Скан', price: '10 сом/бет' },
        { name: 'Ламинация', price: '20-40-60 сом/даана (A5-A4-А3)' }
      ]
    },
    photo: {
      title: 'Сүрөт чыгаруу',
      icon: 'fa-camera',
      items: [
        { name: 'Фото 3×4', price: '3 даана = 150 сом, 6 даана = 200 сом, 10 даана = 250 сом' },
        { name: 'Виза', price: '2 даана = 200 сом, 4 даана = 270 сом, 8 даана = 350 сом' }
      ]
    },
    format: {
      title: 'Шаблонго келтирүү',
      icon: 'fa-magic',
      action: 'order'
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#09090b] pt-20 pb-24 lg:pt-36 lg:pb-32 text-white selection:bg-amber-500/30">
      {/* Premium Background Glows */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-[#09090b] to-[#09090b] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-10 text-amber-500/20 text-4xl animate-bounce pointer-events-none hidden lg:block" style={{ animationDuration: '3s' }}>
        <i className="fas fa-print"></i>
      </div>
      <div className="absolute top-1/3 right-10 text-amber-500/10 text-6xl animate-pulse pointer-events-none hidden lg:block" style={{ animationDuration: '4s' }}>
        <i className="fas fa-file-word"></i>
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-amber-500/15 text-3xl animate-bounce pointer-events-none hidden lg:block" style={{ animationDuration: '5s' }}>
        <i className="fas fa-spell-check"></i>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <div className="flex flex-wrap items-center gap-3 mb-10 animate__animated animate__fadeInDown">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)] text-amber-400 font-bold text-xs uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                КТМУ Студенттеринин тандоосу
              </div>
              
              <a href="https://o-key.ai/invite/167d4c94" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-bold uppercase tracking-wider backdrop-blur-md animate-pulse">
                <i className="fas fa-robot"></i> O-Key AI
              </a>
              <a href="https://www.getforce.dev/order?ct=eeb8eb2b-63f6-4041-b07e-2b1aa2aa5acb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/20 transition-all text-xs font-bold uppercase tracking-wider backdrop-blur-md animate-pulse">
                <i className="fas fa-bolt"></i> GetForce
              </a>
            </div>
            
            <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl md:text-8xl leading-[0.95] animate__animated animate__fadeInUp">
              {t('hero.title').split(' ').map((word: string, i: number) => {
                const isHighlight = i >= (t('hero.title').split(' ').length - 2);
                return (
                  <span key={i} className={isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600 drop-shadow-sm" : ""}>
                    {word}{' '}
                  </span>
                );
              })}
            </h1>
            
            <p className="mt-10 text-xl text-zinc-400 leading-relaxed max-w-xl animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            <div className="mt-12 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-5 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onStart}
                className="group inline-flex items-center justify-center px-12 py-6 border border-green-500/30 text-xl font-black rounded-[2rem] text-green-400 bg-zinc-900 hover:bg-green-500/10 shadow-[0_0_40px_rgba(34,197,94,0.2)] transition-all transform hover:-translate-y-1.5 active:scale-95"
              >
                {t('hero.cta')}
                <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
              </button>
            </div>
          </div>

          <div className="mt-24 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center animate__animated animate__fadeInRight">
             <div className="relative mx-auto w-full group">
                <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/5] border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop" 
                    alt="Manas University Life" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-70 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] transform group-hover:-translate-y-2 transition-transform duration-700">
                     <div className="flex items-center gap-5 text-white">
                        <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 text-2xl shadow-lg shadow-amber-500/10">
                           <i className="fas fa-crown"></i>
                        </div>
                        <div>
                           <p className="font-black text-lg text-amber-400">Premium Quality</p>
                           <p className="text-sm text-zinc-400 font-medium">Кынтыксыз басып чыгаруу.</p>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Glowing Service Blocks */}
        <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
          {Object.entries(pricingData).map(([key, data], index) => (
            <div 
              key={key}
              onClick={() => data.action === 'order' ? onStart() : setActiveModal(key)}
              className="group cursor-pointer bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:bg-zinc-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-amber-500/30"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl text-amber-500 mb-6 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-all duration-500 shadow-lg group-hover:shadow-amber-500/10">
                <i className={`fas ${data.icon}`}></i>
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors">{data.title}</h3>
              <p className="text-zinc-500 font-medium flex items-center gap-2 group-hover:text-amber-200 transition-colors">
                {data.action === 'order' ? 'Баштоо' : 'Прайсты көрүү'} <i className="fas fa-arrow-right text-sm"></i>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
          <div className="relative bg-zinc-900 border border-amber-500/20 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl shadow-amber-900/20 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-amber-500/20">
              <i className={`fas ${pricingData[activeModal].icon}`}></i>
            </div>
            
            <h3 className="text-3xl font-black text-white mb-8">{pricingData[activeModal].title}</h3>
            
            <div className="space-y-4">
              {pricingData[activeModal].items.map((item: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/5 hover:border-amber-500/30 transition-colors">
                  <span className="font-bold text-zinc-300">{item.name}</span>
                  <span className="text-amber-400 font-black text-right bg-amber-500/10 px-3 py-1.5 rounded-xl">{item.price}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setActiveModal(null)}
              className="mt-8 w-full py-4 rounded-2xl font-bold bg-white/5 text-white hover:bg-amber-500/10 hover:text-amber-500 transition-all"
            >
              Жабуу
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
