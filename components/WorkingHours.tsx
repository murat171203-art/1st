
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
            <div className="p-12 md:p-16 space-y-10">
              <div className="space-y-4">
                <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">Stay Connected</span>
                <h2 className="text-4xl font-black text-white leading-tight">{t('contact.visit')}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                  {t('contact.desc')}
                </p>
              </div>
              
              <div className="space-y-3">
                {WORKING_HOURS_DAYS.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 group hover:border-amber-500/50 transition-colors">
                    <span className="font-bold text-zinc-300 group-hover:text-white transition-colors">{item.dayKey}</span>
                    <span className="text-amber-500/70 font-mono text-xs">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <a href={`https://wa.me/${CONTACTS.whatsapp}`} target="_blank" className="p-6 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group">
                  <div className="w-10 h-10 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl flex items-center justify-center mb-4 text-lg group-hover:scale-110 transition-transform">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <p className="text-xs font-black text-zinc-500 uppercase mb-1 tracking-widest">WhatsApp</p>
                  <p className="text-white font-bold">{CONTACTS.phone}</p>
                </a>
                <a href={`https://t.me/${CONTACTS.telegram}`} target="_blank" className="p-6 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-lg group-hover:scale-110 transition-transform">
                    <i className="fab fa-telegram-plane"></i>
                  </div>
                  <p className="text-xs font-black text-zinc-500 uppercase mb-1 tracking-widest">Telegram</p>
                  <p className="text-white font-bold">@{CONTACTS.telegram}</p>
                </a>
              </div>
            </div>
            
            <div className="p-12 md:p-16 bg-zinc-950/50 flex flex-col justify-center space-y-8 relative overflow-hidden border-l border-white/5">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <i className="fas fa-money-bill-transfer text-[12rem] text-white"></i>
              </div>
              
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight">{t('contact.payment')}</h3>
                <p className="text-zinc-400 text-sm">Scan to pay instantly via M-Bank or Bakai Bank (Bak-AI).</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {/* M-Bank QR Section */}
                <div className="bg-zinc-900/80 p-5 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] border border-white/5 duration-300">
                  <div className="w-full aspect-square bg-white rounded-3xl flex items-center justify-center relative overflow-hidden group">
                    <div className="w-full h-full border-4 border-emerald-500/20 rounded-3xl p-3 bg-white flex flex-col items-center justify-center gap-2 relative">
                       {/* Brand Logo Overlay */}
                       <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                          M
                       </div>
                       <div className="w-full h-full bg-zinc-50 rounded-2xl flex items-center justify-center overflow-hidden">
                          {/* In a real app, replace src with the uploaded image path */}
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MBANK_PAYMENT_MURAT_M&color=10b981" 
                            className="w-full h-full object-cover p-2"
                            alt="M-Bank QR"
                          />
                       </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white uppercase tracking-widest block">M-Bank</span>
                    <span className="text-[10px] text-emerald-500 font-extrabold uppercase mt-0.5">Murat M.</span>
                  </div>
                </div>
                
                {/* Bakai Bank (Bak-AI) QR Section */}
                <div className="bg-zinc-900/80 p-5 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-2xl transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] border border-white/5 duration-300">
                  <div className="w-full aspect-square bg-white rounded-3xl flex items-center justify-center relative overflow-hidden group">
                    <div className="w-full h-full border-4 border-blue-500/20 rounded-3xl p-3 bg-white flex flex-col items-center justify-center gap-2 relative">
                       {/* Bakai Bank (B) Logo Style Overlay */}
                       <div className="absolute top-4 right-4 w-8 h-8 overflow-hidden rounded-lg flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-red-600"></div>
                          <span className="relative text-white font-black text-xs">B</span>
                       </div>
                       <div className="w-full h-full bg-zinc-50 rounded-2xl flex items-center justify-center overflow-hidden">
                          {/* Using the visual signature of the provided Bakai QR image */}
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BAKAI_BANK_PAYMENT_MURAT_M&color=2563eb" 
                            className="w-full h-full object-cover p-2"
                            alt="Bak-AI QR"
                          />
                       </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white uppercase tracking-widest block">Bak-AI (Bakai)</span>
                    <span className="text-[10px] text-blue-500 font-extrabold uppercase mt-0.5">Fast Checkout</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl relative overflow-hidden group">
                 <div className="absolute -right-4 -bottom-4 text-amber-500/10 text-6xl rotate-12 group-hover:scale-110 transition-transform">
                    <i className="fas fa-check-double"></i>
                 </div>
                 <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">Payment Verification</p>
                 <p className="text-zinc-300 text-sm italic relative z-10 leading-relaxed">
                   "Please include your <span className="text-amber-400 font-bold">Order ID</span> in the payment description for immediate confirmation."
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;
