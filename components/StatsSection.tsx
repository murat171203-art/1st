
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../App';
import { STATS_DATA } from '../constants';

const CountUp: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const StatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { label: 'stats.visitors', value: STATS_DATA.visitors, icon: 'fa-users', color: 'indigo' },
    { label: 'stats.payments', value: STATS_DATA.payments, icon: 'fa-receipt', color: 'emerald' },
    { label: 'stats.completed', value: STATS_DATA.completedWorks, icon: 'fa-check-double', color: 'blue' },
    { label: 'stats.pages', value: STATS_DATA.pagesPrinted, icon: 'fa-file-lines', color: 'purple' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/40 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center text-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900 tracking-tight">
                  <CountUp end={stat.value} duration={2000} />+
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {t(stat.label)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
