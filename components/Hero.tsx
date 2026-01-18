
import React from 'react';
import { useTranslation } from '../App';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-slate-50 pt-20 pb-24 lg:pt-36 lg:pb-48">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100/30 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-700 font-bold text-xs uppercase tracking-[0.2em] mb-10 animate__animated animate__fadeInDown">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
              </span>
              Academic Year 2024 active
            </div>
            
            <h1 className="text-6xl font-black tracking-tight text-slate-900 sm:text-7xl md:text-8xl leading-[0.95] animate__animated animate__fadeInUp">
              {t('hero.title').split(' ').map((word: string, i: number) => {
                const isHighlight = i >= (t('hero.title').split(' ').length - 2);
                return (
                  <span key={i} className={isHighlight ? "text-indigo-600" : ""}>
                    {word}{' '}
                  </span>
                );
              })}
            </h1>
            
            <p className="mt-10 text-xl text-slate-500 leading-relaxed max-w-xl animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            <div className="mt-14 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-5 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onStart}
                className="group inline-flex items-center justify-center px-12 py-6 border border-transparent text-xl font-black rounded-[2rem] text-white bg-indigo-600 hover:bg-indigo-700 shadow-3xl shadow-indigo-200 transition-all transform hover:-translate-y-1.5 active:scale-95"
              >
                {t('hero.cta')}
                <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
              </button>
              <a 
                href="#services"
                className="inline-flex items-center justify-center px-12 py-6 text-xl font-bold rounded-[2rem] text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
              >
                Learn More
              </a>
            </div>

            <div className="mt-16 flex items-center justify-center lg:justify-start gap-12 opacity-80 animate__animated animate__fadeIn" style={{ animationDelay: '0.6s' }}>
               <div className="flex flex-col items-center lg:items-start group cursor-default">
                  <span className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">20k+</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pages Printed</span>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="flex flex-col items-center lg:items-start group cursor-default">
                  <span className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">1.2k+</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Students Helped</span>
               </div>
            </div>
          </div>

          <div className="mt-24 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center animate__animated animate__fadeInRight">
             <div className="relative mx-auto w-full group">
                <div className="absolute -inset-8 bg-indigo-600/5 rounded-[4rem] blur-3xl group-hover:bg-indigo-600/10 transition-all duration-700"></div>
                <div className="relative rounded-[3.5rem] shadow-3xl shadow-slate-200 overflow-hidden aspect-[4/5] border-[12px] border-white ring-1 ring-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop" 
                    alt="Manas University Life" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] transform group-hover:-translate-y-2 transition-transform duration-700">
                     <div className="flex items-center gap-5 text-white">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl">
                           <i className="fas fa-bolt"></i>
                        </div>
                        <div>
                           <p className="font-black text-lg">Fastest in Jal</p>
                           <p className="text-sm opacity-80 font-medium">Processing docs in real-time.</p>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
