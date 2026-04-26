
import React from 'react';
import { useTranslation } from '../App';
import { DeliveryMethod } from '../types';

const OrderHistory: React.FC = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('manasprint_history');
    if (saved) {
      setOrders(JSON.parse(saved).reverse());
    }
  }, []);

    if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-zinc-500 text-3xl border border-white/10">
          <i className="fas fa-folder-open"></i>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">No orders yet</h2>
          <p className="text-zinc-400">Your previous printing orders will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white">Recent Activity</h2>
        <button 
          onClick={() => {
            localStorage.removeItem('manasprint_history');
            setOrders([]);
          }}
          className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-400"
        >
          Clear History
        </button>
      </div>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-sm hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner ${order.delivery === DeliveryMethod.DIGITAL ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                  <i className={`fas ${order.delivery === DeliveryMethod.DIGITAL ? 'fa-cloud-arrow-down' : 'fa-truck-ramp-box'}`}></i>
                </div>
                <div>
                  <h3 className="font-black text-white">#{order.id}</h3>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{order.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-black text-white">{order.total} KGS</p>
                  <p className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span> Processing
                  </p>
                </div>
                {order.delivery === DeliveryMethod.DIGITAL && (
                   <button className="w-10 h-10 rounded-xl bg-white/5 text-zinc-400 flex items-center justify-center border border-white/10 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/30 transition-all">
                      <i className="fas fa-download"></i>
                   </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
