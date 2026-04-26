import React from 'react';
import { useTranslation } from '../App';

const ProcessSection: React.FC = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      number: '01',
      title: t('process.step1.t'),
      description: t('process.step1.d'),
      icon: 'fa-upload',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      number: '02',
      title: t('process.step2.t'),
      description: t('process.step2.d'),
      icon: 'fa-microchip',
      color: 'from-amber-500 to-yellow-400'
    },
    {
      number: '03',
      title: t('process.step3.t'),
      description: t('process.step3.d'),
      icon: 'fa-qrcode',
      color: 'from-purple-500 to-pink-400'
    },
    {
      number: '04',
      title: t('process.step4.t'),
      description: t('process.step4.d'),
      icon: 'fa-download',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('process.title').split(' ').map((word: string, i: number) => (
              <span key={i} className={i === t('process.title').split(' ').length - 1 ? "text-amber-500" : ""}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:bg-zinc-800/80 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-black text-2xl mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-500`}>
                  <i className={`fas ${step.icon}`}></i>
                </div>
                
                <div className="absolute top-8 right-8 text-5xl font-black text-white/5 group-hover:text-amber-500/10 transition-colors duration-500">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed font-medium text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default ProcessSection;

