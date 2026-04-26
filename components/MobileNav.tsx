
import React from 'react';
import { useTranslation } from '../App';

interface MobileNavProps {
  activeTab: 'home' | 'order' | 'history';
  onNavigate: (tab: 'home' | 'order' | 'history') => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[100]">
      <div className="bg-[#09090b]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-around shadow-2xl shadow-black/50">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-[2rem] transition-all ${activeTab === 'home' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'text-zinc-500 hover:text-white'}`}
        >
          <i className="fas fa-house text-lg"></i>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        
        <button 
          onClick={() => onNavigate('order')}
          className={`relative -top-6 flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border-2 border-amber-500/50 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-transform active:scale-90`}
        >
          <i className="fas fa-plus text-2xl"></i>
        </button>

        <button 
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center justify-center w-16 h-16 rounded-[2rem] transition-all ${activeTab === 'history' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'text-zinc-500 hover:text-white'}`}
        >
          <i className="fas fa-clock-rotate-left text-lg"></i>
          <span className="text-[10px] font-bold mt-1">History</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
