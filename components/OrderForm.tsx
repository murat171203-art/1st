
import React, { useState, useEffect } from 'react';
import { DeliveryMethod, OrderState } from '../types';
import { PRICING, OFFICE_LOCATIONS } from '../constants';
import { useTranslation } from '../App';

const OrderForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderId] = useState(() => `MP-${Math.floor(10000 + Math.random() * 90000)}`);
  const [form, setForm] = useState<OrderState>({
    file: null,
    options: {
      printOnly: false,
      printType: 'BW',
      titlePage: 'NONE',
      checkErrors: true,
      formatting: 'THESIS'
    },
    delivery: DeliveryMethod.DIGITAL,
    locationId: OFFICE_LOCATIONS[0].id,
    comment: '',
    pageCount: 1,
  });

  const totalCost = PRICING.formatThesis + (form.pageCount * PRICING.checkPricePerPage);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLoading(true);
      // Simulate loading state for file upload
      setTimeout(() => {
        setForm(prev => ({ ...prev, file, pageCount: Math.floor(Math.random() * 40) + 30 }));
        setLoading(false);
        setStep(2);
      }, 2000);
    }
  };

  const handlePayment = () => {
    setPaymentLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentLoading(false);
      setStep(4);
      saveToHistory();
    }, 3000);
  };

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('manasprint_history') || '[]');
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      total: totalCost,
      delivery: form.delivery,
      status: 'Completed',
      fileName: form.file?.name
    };
    localStorage.setItem('manasprint_history', JSON.stringify([...history, newOrder]));
  };

  const simulateDownload = () => {
    if (!form.file) return;
    const blob = new Blob(["Simulated Processed Document Content"], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FORMATTED_${orderId}_${form.file.name}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        {/* Progress Bar */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`flex-1 text-center py-4 text-[10px] font-extrabold uppercase tracking-widest transition-all
                ${step === s ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-400'}`}
            >
              {t(`process.step${s}.t`)}
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12">
          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('order.upload')}</h2>
                <p className="text-slate-500 font-medium">Жүктөө үчүн ворд файлын тандаңыз</p>
              </div>

              <div className="relative group">
                <div className={`border-4 border-dashed rounded-[3rem] p-20 text-center transition-all cursor-pointer relative overflow-hidden
                  ${loading ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50/20'}`}>
                  
                  <input 
                    type="file" 
                    accept=".doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    onChange={handleFileUpload}
                    disabled={loading}
                  />

                  {loading ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-200">
                        <i className="fas fa-spinner fa-spin text-3xl"></i>
                      </div>
                      <p className="text-xl font-black text-indigo-600">Файл жүктөлүүдө...</p>
                      <p className="text-slate-400 mt-2 font-medium">Сураныч, күтө туруңуз</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-white shadow-2xl text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-slate-100">
                        <i className="fas fa-file-word text-4xl"></i>
                      </div>
                      <p className="text-2xl font-black text-slate-900">
                        {form.file ? form.file.name : t('order.drag')}
                      </p>
                      <p className="text-slate-400 mt-3 font-medium">DOCX же DOC форматтары гана (50MB чейин)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Превью текшерүү</h2>
                <p className="text-slate-500 font-medium">Сиздин ишиңиз автоматтык түрдө форматталды</p>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 min-h-[400px] relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                   <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 text-center max-w-md space-y-6">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                        <i className="fas fa-magnifying-glass-chart"></i>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-slate-900">Документ анализи</h3>
                        <p className="text-slate-500 leading-relaxed">Биз {form.pageCount} баракты таптык. Бардык ГОСТ стандарттары сакталды.</p>
                      </div>
                      <div className="pt-4 flex flex-col gap-3">
                         <div className="flex justify-between text-sm font-bold border-b border-slate-100 pb-3">
                            <span className="text-slate-400">Дипломдук иш:</span>
                            <span className="text-slate-900">500 сом</span>
                         </div>
                         <div className="flex justify-between text-sm font-bold border-b border-slate-100 pb-3">
                            <span className="text-slate-400">Грамматика ({form.pageCount} бет):</span>
                            <span className="text-slate-900">{form.pageCount * 2} сом</span>
                         </div>
                         <div className="flex justify-between text-xl font-black pt-2">
                            <span className="text-slate-900">Жалпы:</span>
                            <span className="text-indigo-600">{totalCost} сом</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-5 rounded-2xl font-black border-2 border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">Артка</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-5 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all transform active:scale-95">Төлөмгө өтүү <i className="fas fa-arrow-right ml-2"></i></button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Төлөм жүргүзүү</h2>
                <p className="text-slate-500 font-medium">МБанк QR-кодун сканерлеңиз</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-indigo-100 shadow-xl flex flex-col items-center space-y-6">
                  <div className="w-full aspect-square bg-slate-100 rounded-3xl flex items-center justify-center relative group overflow-hidden">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MBANK_PAYMENT_SIMULATION" 
                      alt="MBank QR"
                      className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl">
                          <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Scan with MBank</p>
                       </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-slate-900">{totalCost} сом</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Төлөм суммасы</p>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                      <h4 className="font-black text-indigo-900 mb-2 flex items-center gap-2">
                        <i className="fas fa-info-circle"></i> Кантип төлөйм?
                      </h4>
                      <ol className="text-sm text-indigo-700 space-y-2 list-decimal ml-4 font-medium">
                        <li>МБанк тиркемесин ачыңыз</li>
                        <li>QR-сканерди тандаңыз</li>
                        <li>Экрандагы кодду сканерлеңиз</li>
                        <li>Төлөмдү ырастаңыз</li>
                      </ol>
                   </div>
                   
                   <button 
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="w-full py-6 rounded-3xl font-black bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-4 transition-all transform active:scale-95 text-lg"
                   >
                    {paymentLoading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Төлөм текшерилүүдө...</>
                    ) : (
                      <><i className="fas fa-qrcode"></i> Төлөдүм (Текшерүү)</>
                    )}
                   </button>
                   
                   <button onClick={() => setStep(2)} className="w-full py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors">Артка кайтуу</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success & Download */}
          {step === 4 && (
            <div className="text-center space-y-10 animate-in fade-in zoom-in-95 duration-700 py-10">
              <div className="checkmark-wrapper">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>

              <div className="space-y-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Төлөм ийгиликтүү кабыл алынды!</h2>
                <p className="text-slate-500 text-lg font-medium">Сиздин файлыңыз даяр жана жүктөөгө болот.</p>
              </div>

              <div className="max-w-md mx-auto">
                <button 
                  onClick={simulateDownload}
                  className="w-full py-6 px-8 rounded-3xl font-black bg-green-600 text-white hover:bg-green-700 shadow-2xl shadow-green-200 transition-all flex items-center justify-center gap-4 text-xl pulse-button"
                >
                  <i className="fas fa-download"></i> Форматталган файлды жүктөп алуу
                </button>
              </div>

              <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onComplete}
                  className="py-4 px-8 rounded-2xl font-bold text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-history"></i> Буйрутмалар тарыхы
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="py-4 px-8 rounded-2xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all"
                >
                  Дагы буйрутма берүү
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
             <i className="fas fa-shield-halved text-indigo-500"></i> Коопсуз төлөм системасы
           </span>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
