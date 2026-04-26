
import React from 'react';
import { useTranslation } from '../App';
import { WORKING_HOURS_DAYS, CONTACTS } from '../constants';

const WorkingHours: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)] border border-white/5">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 md:p-16 space-y-10 lg:col-span-2">
              <div className="space-y-4 text-center max-w-2xl mx-auto">
                <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Stay Connected</span>
                <h2 className="text-4xl font-black text-white leading-tight">{t('contact.visit')}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mx-auto">
                  {t('contact.desc')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-3">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-clock text-amber-500"></i> {t('locations.hours')}
                  </h3>
                  {WORKING_HOURS_DAYS.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 group hover:border-amber-500/50 transition-colors">
                      <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{item.dayKey}</span>
                      <span className="text-amber-500/70 font-mono text-xs">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-paper-plane text-amber-500"></i> Тез байланыш
                  </h3>
                  <div className="grid gap-4">
                    <a href={`https://wa.me/${CONTACTS.whatsapp}`} target="_blank" className="p-6 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group flex items-center gap-6">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <div>
                        <p className="text-xs font-black text-zinc-500 uppercase mb-1 tracking-widest">WhatsApp</p>
                        <p className="text-white font-bold">{CONTACTS.phone}</p>
                      </div>
                    </a>
                    <a href={`https://t.me/${CONTACTS.telegram}`} target="_blank" className="p-6 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group flex items-center gap-6">
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform flex-shrink-0">
                        <i className="fab fa-telegram-plane"></i>
                      </div>
                      <div>
                        <p className="text-xs font-black text-zinc-500 uppercase mb-1 tracking-widest">Telegram</p>
                        <p className="text-white font-bold">@{CONTACTS.telegram}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;
