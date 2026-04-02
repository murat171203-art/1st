
import React, { useState, useEffect } from 'react';
import { DeliveryMethod, OrderState } from '../types';
import { PRICING, OFFICE_LOCATIONS } from '../constants';
import { useTranslation } from '../App';

const OrderForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'mbank' | 'bakai'>('mbank');
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
        setAnalysisStep(0);
      }, 2000);
    }
  };

  const startAnalysis = () => {
    setAnalysisStep(1);
    setTimeout(() => setAnalysisStep(2), 2000);
    setTimeout(() => setAnalysisStep(3), 4000);
    setTimeout(() => setAnalysisStep(4), 6000);
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
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.05)] overflow-hidden border border-white/5">
        {/* Progress Bar */}
        <div className="flex border-b border-white/5 bg-zinc-950/50">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`flex-1 text-center py-4 text-[10px] font-extrabold uppercase tracking-widest transition-all
                ${step === s ? 'text-amber-500 border-b-2 border-amber-500 bg-white/5' : 'text-zinc-500'}`}
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
                <h2 className="text-3xl font-black text-white tracking-tight">Жүктөө</h2>
                <p className="text-zinc-400 font-medium">Жүктөө үчүн ворд файлын тандаңыз</p>
              </div>

              <div className="relative group">
                <div className={`border-4 border-dashed rounded-[3rem] p-20 text-center transition-all cursor-pointer relative overflow-hidden
                  ${loading ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5'}`}>
                  
                  <input 
                    type="file" 
                    accept=".doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    onChange={handleFileUpload}
                    disabled={loading}
                  />

                  {loading ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-black mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <i className="fas fa-spinner fa-spin text-3xl"></i>
                      </div>
                      <p className="text-xl font-black text-amber-500">Файл жүктөлүүдө...</p>
                      <p className="text-zinc-400 mt-2 font-medium">Сураныч, күтө туруңуз</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-white/5 shadow-2xl text-amber-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-white/10">
                        <i className="fas fa-file-word text-4xl"></i>
                      </div>
                      <p className="text-2xl font-black text-white">
                        {form.file ? form.file.name : t('order.drag')}
                      </p>
                      <p className="text-zinc-500 mt-3 font-medium">DOCX же DOC форматтары гана (50MB чейин)</p>
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
                <h2 className="text-3xl font-black text-white tracking-tight">Иш аткаруу жана текшерүү</h2>
                <p className="text-zinc-400 font-medium">Документти КТМУнун стандартына автоматтык түрдө келтирүү</p>
              </div>

              <div className="bg-zinc-950/50 rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden shadow-inner">
                {analysisStep === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-white/5 shadow-xl text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                      <i className="fas fa-magic text-4xl"></i>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">Форматтоого даяр</h3>
                    <p className="text-zinc-400 max-w-md mx-auto mb-8">
                      Биздин алгоритм документиңизди автоматтык түрдө КТМУнун талаптарына ылайыктайт: Сол жактан 3.5 см, оң жактан 2.5 см, жогору 3 см, төмөн 2.5 см. Шрифт: Times New Roman, 12 pt. Интервал: 1.5.
                    </p>
                    <button onClick={startAnalysis} className="py-4 px-10 rounded-2xl font-black bg-zinc-900 border border-green-500/30 text-green-400 hover:bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all transform active:scale-95">
                      Ишти баштоо <i className="fas fa-play ml-2"></i>
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Document Visualization */}
                    <div className="relative w-full aspect-[1/1.4] bg-white shadow-2xl rounded-lg border border-zinc-200 p-6 overflow-hidden">
                       {/* Margins visualization */}
                       <div className={`absolute inset-y-0 left-0 bg-amber-500/10 border-r border-amber-500/30 transition-all duration-1000 ${analysisStep >= 1 ? 'w-[3.5rem]' : 'w-2'}`}></div>
                       <div className={`absolute inset-y-0 right-0 bg-amber-500/10 border-l border-amber-500/30 transition-all duration-1000 ${analysisStep >= 1 ? 'w-[2.5rem]' : 'w-2'}`}></div>
                       <div className={`absolute inset-x-0 top-0 bg-amber-500/10 border-b border-amber-500/30 transition-all duration-1000 ${analysisStep >= 1 ? 'h-[3rem]' : 'h-2'}`}></div>
                       <div className={`absolute inset-x-0 bottom-0 bg-amber-500/10 border-t border-amber-500/30 transition-all duration-1000 ${analysisStep >= 1 ? 'h-[2.5rem]' : 'h-2'}`}></div>
                       
                       {/* Text lines */}
                       <div className={`absolute inset-0 p-12 transition-all duration-1000 flex flex-col gap-2 ${analysisStep >= 2 ? 'font-serif' : 'font-sans'} ${analysisStep >= 3 ? 'justify-between text-justify' : ''}`}>
                          <div className="w-3/4 h-3 bg-zinc-200 rounded"></div>
                          <div className="w-full h-3 bg-zinc-200 rounded"></div>
                          <div className="w-5/6 h-3 bg-zinc-200 rounded"></div>
                          <div className="w-full h-3 bg-zinc-200 rounded"></div>
                          <div className="w-4/5 h-3 bg-zinc-200 rounded"></div>
                          <div className="w-full h-3 bg-zinc-200 rounded"></div>
                          <div className="w-2/3 h-3 bg-zinc-200 rounded"></div>
                       </div>
                       
                       {/* Scanning line */}
                       {analysisStep < 4 && (
                         <div className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                       )}
                    </div>

                    {/* Checklist */}
                    <div className="space-y-4">
                      <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${analysisStep >= 1 ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/5'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${analysisStep >= 2 ? 'bg-green-500 text-white' : analysisStep === 1 ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-white/5 text-zinc-500'}`}>
                          {analysisStep >= 2 ? <i className="fas fa-check"></i> : analysisStep === 1 ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-hourglass-start"></i>}
                        </div>
                        <span className={`font-bold ${analysisStep >= 1 ? 'text-green-400' : 'text-zinc-500'}`}>Барактын четтерин түздөө (3.5см, 2.5см, 3см, 2.5см)...</span>
                      </div>
                      
                      <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${analysisStep >= 2 ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/5'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${analysisStep >= 3 ? 'bg-green-500 text-white' : analysisStep === 2 ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-white/5 text-zinc-500'}`}>
                          {analysisStep >= 3 ? <i className="fas fa-check"></i> : analysisStep === 2 ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-hourglass-start"></i>}
                        </div>
                        <span className={`font-bold ${analysisStep >= 2 ? 'text-green-400' : 'text-zinc-500'}`}>Шрифтти алмаштыруу (Times New Roman, 12pt)...</span>
                      </div>

                      <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${analysisStep >= 3 ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/5'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${analysisStep >= 4 ? 'bg-green-500 text-white' : analysisStep === 3 ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-white/5 text-zinc-500'}`}>
                          {analysisStep >= 4 ? <i className="fas fa-check"></i> : analysisStep === 3 ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-hourglass-start"></i>}
                        </div>
                        <span className={`font-bold ${analysisStep >= 3 ? 'text-green-400' : 'text-zinc-500'}`}>Абзацтарды жана интервалды (1.5) тууралоо...</span>
                      </div>
                    </div>

                    {analysisStep === 4 && (
                      <div className="md:col-span-2 bg-white/5 p-8 rounded-[2rem] shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 mt-4">
                        <h3 className="text-xl font-black text-white mb-6 border-b border-white/10 pb-4">Финальный отчет</h3>
                        <div className="space-y-4">
                           <div className="flex justify-between text-sm font-bold border-b border-white/5 pb-3">
                              <span className="text-zinc-400">Шрифт:</span>
                              <span className="text-white">Times New Roman, 12 pt</span>
                           </div>
                           <div className="flex justify-between text-sm font-bold border-b border-white/5 pb-3">
                              <span className="text-zinc-400">Поля:</span>
                              <span className="text-white">3.5, 2.5, 3.0, 2.5 см</span>
                           </div>
                           <div className="flex justify-between text-sm font-bold border-b border-white/5 pb-3">
                              <span className="text-zinc-400">Интервал:</span>
                              <span className="text-white">1.5 (основной текст)</span>
                           </div>
                           <div className="flex justify-between text-sm font-bold border-b border-white/5 pb-3">
                              <span className="text-zinc-400">Выравнивание:</span>
                              <span className="text-white">По ширине, без абзаца</span>
                           </div>
                           <div className="flex justify-between text-xl font-black pt-2">
                              <span className="text-white">Стоимость:</span>
                              <span className="text-amber-500">{totalCost} сом</span>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={() => { setStep(1); setAnalysisStep(0); }} className="flex-1 py-5 rounded-2xl font-black border-2 border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white transition-all">Артка</button>
                <button 
                  onClick={() => setStep(3)} 
                  disabled={analysisStep !== 4}
                  className="flex-[2] py-5 rounded-2xl font-black bg-zinc-900 border border-green-500/30 text-green-400 hover:bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Төлөмгө өтүү <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight">Төлөө</h2>
                <p className="text-zinc-400 font-medium">Төлөм ыкмасын тандаңыз</p>
              </div>

              <div className="flex gap-4 p-2 bg-zinc-950/50 rounded-2xl max-w-md mx-auto border border-white/5">
                <button 
                  onClick={() => setPaymentMethod('mbank')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${paymentMethod === 'mbank' ? 'bg-zinc-800 border border-green-500/50 text-green-400 shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  MBank
                </button>
                <button 
                  onClick={() => setPaymentMethod('bakai')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${paymentMethod === 'bakai' ? 'bg-zinc-800 border border-green-500/50 text-green-400 shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  Bakai Bank
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-xl flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <i className="fas fa-wallet"></i>
                  </div>
                  <div className="w-full aspect-square bg-white rounded-3xl flex items-center justify-center relative group overflow-hidden border border-white/10 p-4">
                    <img 
                      src={paymentMethod === 'mbank' ? "/mbank-qr.png" : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=SUPPORT_PROJECT_${paymentMethod.toUpperCase()}`} 
                      alt={`${paymentMethod} QR`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-zinc-400 font-medium">Инструкция по активации: отсканируйте код в мобильном приложении и подтвердите действие</p>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-amber-500/5 p-6 rounded-3xl border border-amber-500/20">
                      <h4 className="font-black text-amber-500 mb-2 flex items-center gap-2">
                        <i className="fas fa-info-circle"></i> Как это работает?
                      </h4>
                      <p className="text-sm text-amber-500/80 leading-relaxed mb-4">
                        {paymentMethod === 'mbank' 
                          ? 'Откройте приложение MBank, выберите сканер QR-кода и наведите камеру на экран. После сканирования подтвердите действие в приложении.'
                          : 'Откройте приложение Bakai Bank, перейдите в раздел платежей по QR и отсканируйте код. Следуйте инструкциям на экране вашего смартфона.'}
                      </p>
                   </div>
                   
                   <button 
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="w-full py-6 rounded-3xl font-black bg-zinc-900 border border-green-500/30 text-green-400 hover:bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)] disabled:opacity-50 flex items-center justify-center gap-4 transition-all transform active:scale-95 text-lg"
                   >
                    {paymentLoading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Проверка...</>
                    ) : (
                      <><i className="fas fa-check-circle"></i> Төлөдүм</>
                    )}
                   </button>
                   
                   <button onClick={() => setStep(2)} className="w-full py-4 rounded-2xl font-bold text-zinc-500 hover:text-white transition-colors">Артка кайтуу</button>
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
                <h2 className="text-4xl font-black text-white tracking-tight">Төлөм ийгиликтүү кабыл алынды!</h2>
                <p className="text-zinc-400 text-lg font-medium">Сиздин файлыңыз даяр жана жүктөөгө болот.</p>
              </div>

              <div className="max-w-md mx-auto">
                <button 
                  onClick={simulateDownload}
                  className="w-full py-6 px-8 rounded-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-4 text-xl pulse-button"
                >
                  <i className="fas fa-download"></i> Форматталган файлды жүктөп алуу
                </button>
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onComplete}
                  className="py-4 px-8 rounded-2xl font-bold text-zinc-400 hover:text-amber-500 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-history"></i> Буйрутмалар тарыхы
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="py-4 px-8 rounded-2xl font-bold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all"
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
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full shadow-sm border border-white/10 backdrop-blur-md">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
             <i className="fas fa-shield-halved text-amber-500"></i> Коопсуз төлөм системасы
           </span>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
