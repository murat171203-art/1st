
import React, { useState } from 'react';
import { DeliveryMethod, OrderOptions, OrderState, FormattingType, PrintType, TitlePageType } from '../types';
import { PRICING, OFFICE_LOCATIONS } from '../constants';
import { analyzeDocument } from '../services/geminiService';
import { useTranslation } from '../App';

const OrderForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { language, t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [orderId] = useState(() => `MP-${Math.floor(10000 + Math.random() * 90000)}`);
  const [form, setForm] = useState<OrderState>({
    file: null,
    options: {
      printOnly: true,
      printType: 'BW',
      titlePage: 'NONE',
      checkErrors: false,
      formatting: 'NONE'
    },
    delivery: DeliveryMethod.DIGITAL,
    locationId: OFFICE_LOCATIONS[0].id,
    comment: '',
    pageCount: 1,
  });

  const getFormattingPrice = (type: FormattingType) => {
    if (type === 'COURSEWORK') return PRICING.formatCoursework;
    if (type === 'THESIS') return PRICING.formatThesis;
    return 0;
  };

  const getPrintingPrice = () => {
    if (!form.options.printOnly) return 0;
    const perPage = form.options.printType === 'BW' ? PRICING.perPageBW : PRICING.perPageColor;
    return form.pageCount * perPage;
  };

  const getTitlePagePrice = () => {
    if (form.options.titlePage === 'NONE') return 0;
    if (form.options.titlePage === 'STANDARD') {
      return form.options.printType === 'BW' ? PRICING.titlePageBW : PRICING.titlePageColor;
    }
    return form.options.printType === 'BW' ? PRICING.titlePageCustomBW : PRICING.titlePageCustomColor;
  };

  const totalCost = (
    PRICING.basePrice + 
    getPrintingPrice() +
    getTitlePagePrice() +
    (form.options.checkErrors ? (form.pageCount * PRICING.checkPricePerPage) : 0) +
    getFormattingPrice(form.options.formatting)
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm(prev => ({ ...prev, file, pageCount: Math.floor(Math.random() * 25) + 5 }));
    }
  };

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('manasprint_history') || '[]');
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      total: totalCost,
      delivery: form.delivery,
      status: 'Processing',
      fileName: form.file?.name
    };
    localStorage.setItem('manasprint_history', JSON.stringify([...history, newOrder]));
  };

  const handleProcess = async () => {
    if (!form.file) return;
    setLoading(true);
    const selectedOptions = [];
    if (form.options.printOnly) selectedOptions.push(`Printing (${form.options.printType})`);
    if (form.options.titlePage !== 'NONE') selectedOptions.push(`Title Page (${form.options.titlePage})`);
    if (form.options.checkErrors) selectedOptions.push("Proofreading");
    if (form.options.formatting !== 'NONE') selectedOptions.push(`Formatting (${form.options.formatting})`);
    
    const result = await analyzeDocument(form.file.name, selectedOptions, form.comment, language);
    setAnalysis(result);
    saveToHistory();
    setLoading(false);
    setStep(4);
  };

  const simulateDownload = () => {
    if (!form.file) return;
    const blob = new Blob(["Simulated Processed Document Content"], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PROCESSED_${orderId}_${form.file.name.split('.')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const PriceCard = () => (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{t('order.summary')}</h3>
      <div className="space-y-2 text-sm border-b border-slate-700 pb-4">
        <div className="flex justify-between">
          <span className="text-slate-400">{t('order.baseFee')}</span>
          <span>{PRICING.basePrice} KGS</span>
        </div>
        {form.options.printOnly && (
          <div className="flex justify-between">
            <span className="text-slate-400">{t(`order.print${form.options.printType}`)} ({form.pageCount} pgs)</span>
            <span>{getPrintingPrice()} KGS</span>
          </div>
        )}
        {form.options.titlePage !== 'NONE' && (
          <div className="flex justify-between">
            <span className="text-slate-400">{t(`order.titlePage${form.options.titlePage === 'STANDARD' ? 'Standard' : 'Custom'}`)}</span>
            <span>{getTitlePagePrice()} KGS</span>
          </div>
        )}
        {form.options.checkErrors && (
          <div className="flex justify-between">
            <span className="text-slate-400">{t('order.proofreading')} ({form.pageCount} pgs)</span>
            <span>{form.pageCount * PRICING.checkPricePerPage} KGS</span>
          </div>
        )}
        {form.options.formatting !== 'NONE' && (
          <div className="flex justify-between">
            <span className="text-slate-400">{t(`order.format${form.options.formatting === 'COURSEWORK' ? 'Coursework' : 'Thesis'}`)}</span>
            <span>{getFormattingPrice(form.options.formatting)} KGS</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end">
        <span className="text-lg font-medium text-slate-400">Total</span>
        <span className="text-3xl font-bold text-indigo-400">{totalCost} <span className="text-sm">KGS</span></span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`flex-1 text-center py-4 text-[10px] font-extrabold uppercase tracking-widest transition-all
                ${step === s ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-400'}`}
            >
              Step {s}
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{t('order.upload')}</h2>
                <p className="text-slate-500">Start by uploading your academic document.</p>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center hover:border-indigo-400 hover:bg-indigo-50/20 transition-all cursor-pointer group relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center">
                  <div className="bg-white shadow-lg text-indigo-600 p-6 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-file-pdf text-4xl"></i>
                  </div>
                  <p className="text-xl font-bold text-slate-800">
                    {form.file ? form.file.name : t('order.drag')}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">DOCX, PDF, or Images (Up to 50MB)</p>
                </div>
              </div>
              {form.file && (
                <div className="flex items-center justify-between p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl"><i className="fas fa-magic"></i></div>
                    <span className="font-bold text-lg">{form.pageCount} {t('order.detected')}</span>
                  </div>
                  <button onClick={() => setStep(2)} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
                    {t('order.next')} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800">{t('order.selectServices')}</h2>
              <div className="grid gap-5">
                <div className={`p-6 rounded-2xl border-2 transition-all ${form.options.printOnly ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' : 'border-slate-100'}`}>
                  <label className="flex items-center cursor-pointer group mb-4">
                    <input 
                      type="checkbox" 
                      checked={form.options.printOnly} 
                      onChange={e => setForm(prev => ({ ...prev, options: { ...prev.options, printOnly: e.target.checked }}))}
                      className="hidden"
                    />
                    <div className={`p-4 rounded-xl mr-6 transition-colors ${form.options.printOnly ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                      <i className="fas fa-print text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-slate-800">{t('order.printing')}</p>
                      <p className="text-sm text-slate-500">{t('order.printingDesc')}</p>
                    </div>
                  </label>
                  
                  {form.options.printOnly && (
                    <div className="flex gap-3 mt-4 ml-16 animate-in fade-in slide-in-from-left-4">
                      <button
                        onClick={() => setForm(prev => ({ ...prev, options: { ...prev.options, printType: 'BW' }}))}
                        className={`px-4 py-2 rounded-lg border-2 font-bold text-xs transition-all ${form.options.printType === 'BW' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-100'}`}
                      >
                        {t('order.printBW')}
                      </button>
                      <button
                        onClick={() => setForm(prev => ({ ...prev, options: { ...prev.options, printType: 'COLOR' }}))}
                        className={`px-4 py-2 rounded-lg border-2 font-bold text-xs transition-all ${form.options.printType === 'COLOR' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-100'}`}
                      >
                        {t('order.printColor')}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('order.titlePage')}</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: 'NONE', label: 'order.titlePageNone' },
                      { id: 'STANDARD', label: 'order.titlePageStandard' },
                      { id: 'CUSTOM', label: 'order.titlePageCustom' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setForm(prev => ({ ...prev, options: { ...prev.options, titlePage: opt.id as TitlePageType }}))}
                        className={`p-4 rounded-xl border-2 font-bold text-xs transition-all ${form.options.titlePage === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {t(opt.label)}
                      </button>
                    ))}
                  </div>
                </div>

                <label className={`flex items-center p-6 rounded-2xl border-2 transition-all cursor-pointer group ${form.options.checkErrors ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input 
                    type="checkbox" 
                    checked={form.options.checkErrors} 
                    onChange={e => setForm(prev => ({ ...prev, options: { ...prev.options, checkErrors: e.target.checked }}))}
                    className="hidden"
                  />
                  <div className={`p-4 rounded-xl mr-6 transition-colors ${form.options.checkErrors ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    <i className="fas fa-spell-check text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-slate-800">{t('order.proofreading')}</p>
                    <p className="text-sm text-slate-500">{t('order.proofreadingDesc')}</p>
                  </div>
                  <span className="text-indigo-600 font-extrabold text-lg">+{PRICING.checkPricePerPage} KGS/pg</span>
                </label>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('order.formatting')}</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: 'NONE', label: 'order.formatNone', price: 0 },
                      { id: 'COURSEWORK', label: 'order.formatCoursework', price: PRICING.formatCoursework },
                      { id: 'THESIS', label: 'order.formatThesis', price: PRICING.formatThesis }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setForm(prev => ({ ...prev, options: { ...prev.options, formatting: opt.id as FormattingType }}))}
                        className={`p-4 rounded-xl border-2 font-bold text-xs transition-all ${form.options.formatting === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {t(opt.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('order.comments')}</label>
                <textarea 
                  value={form.comment}
                  onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder={t('order.commentPlace')}
                  className="w-full rounded-2xl border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 min-h-[120px] p-5 bg-slate-50 text-slate-700"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button onClick={() => setStep(1)} className="flex-1 py-4 px-6 rounded-2xl font-bold border-2 border-slate-100 text-slate-500 hover:bg-slate-50 transition-colors">{t('order.back')}</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-4 px-6 rounded-2xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">{t('order.next')}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800">{t('order.how')}</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { id: DeliveryMethod.DIGITAL, icon: 'fa-cloud-arrow-down', title: t('order.digital'), desc: t('order.digitalDesc') },
                  { id: DeliveryMethod.PHYSICAL, icon: 'fa-box-open', title: t('order.physical'), desc: t('order.physicalDesc') }
                ].map((dm) => (
                  <button 
                    key={dm.id}
                    onClick={() => setForm(prev => ({ ...prev, delivery: dm.id }))}
                    className={`p-8 rounded-3xl border-2 text-center transition-all group ${form.delivery === dm.id ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-colors ${form.delivery === dm.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                      <i className={`fas ${dm.icon} text-2xl`}></i>
                    </div>
                    <p className="text-lg font-bold text-slate-800">{dm.title}</p>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{dm.desc}</p>
                  </button>
                ))}
              </div>

              {form.delivery === DeliveryMethod.PHYSICAL && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('order.selectLoc')}</label>
                  <div className="grid gap-3">
                    {OFFICE_LOCATIONS.map(loc => (
                      <div 
                        key={loc.id}
                        onClick={() => !loc.isDeveloping && setForm(prev => ({ ...prev, locationId: loc.id }))}
                        className={`p-5 rounded-2xl border-2 flex items-center gap-5 transition-all ${loc.isDeveloping ? 'opacity-50 grayscale cursor-not-allowed border-dashed' : (form.locationId === loc.id ? 'border-indigo-600 bg-indigo-50/50 cursor-pointer' : 'border-slate-50 hover:border-slate-100 hover:bg-slate-50 cursor-pointer')}`}
                      >
                        <div className={`p-4 rounded-xl ${form.locationId === loc.id && !loc.isDeveloping ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300 shadow-sm border border-slate-100'}`}>
                          <i className={`fas ${loc.isDeveloping ? 'fa-hourglass' : 'fa-location-dot'}`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800">{t(loc.nameKey)}</p>
                          <p className="text-sm text-slate-500">{t(loc.addressKey)}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{loc.workingHoursKey}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button onClick={() => setStep(2)} className="flex-1 py-4 px-6 rounded-2xl font-bold border-2 border-slate-100 text-slate-500 hover:bg-slate-50 transition-colors">{t('order.back')}</button>
                <button 
                  onClick={handleProcess} 
                  disabled={loading}
                  className="flex-[2] py-4 px-6 rounded-2xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3 transition-all transform active:scale-95"
                >
                  {loading ? <><i className="fas fa-spinner fa-spin"></i> {t('order.analyzing')}</> : <>{t('order.complete')} <i className="fas fa-check-double"></i></>}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative inline-block">
                <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl shadow-inner">
                  <i className="fas fa-check"></i>
                </div>
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white animate-bounce">
                  <i className="fas fa-star text-xs"></i>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t('order.success')}</h2>
                <p className="text-slate-500 text-lg">{t('order.orderId')} <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">#{orderId}</span></p>
              </div>

              <div className="grid gap-6">
                {form.delivery === DeliveryMethod.DIGITAL && (
                  <div className="bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem] p-8 text-left space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-indigo-600/10">
                      <i className="fas fa-cloud-arrow-down text-9xl"></i>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{t('order.digitalReady')}</h4>
                      <p className="text-slate-500 mb-6">Your document has been processed and is ready for download. You can also access it via our secure exchange link below.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={simulateDownload}
                          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                        >
                          <i className="fas fa-download"></i> {t('order.downloadResult')}
                        </button>
                        <a 
                          href={`https://manasprint.ai/share/${orderId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                        >
                          <i className="fas fa-share-nodes"></i> Copy Sharing Link
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {form.delivery === DeliveryMethod.PHYSICAL && (
                  <div className="bg-green-50 border-2 border-green-100 rounded-[2.5rem] p-8 text-left space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-green-600/10">
                      <i className="fas fa-store text-9xl"></i>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Ready for Pickup Soon!</h4>
                      <p className="text-slate-500 mb-6">Head over to our office once your order status updates to "Ready". Don't forget to show your Order ID at the counter.</p>
                      
                      <div className="flex items-center gap-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-green-200">
                         <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center">
                            <i className="fas fa-location-dot"></i>
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{OFFICE_LOCATIONS.find(l => l.id === form.locationId)?.nameKey ? t(OFFICE_LOCATIONS.find(l => l.id === form.locationId)!.nameKey) : 'Selected Location'}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Show ID: #{orderId}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {analysis && (
                  <div className="bg-slate-50 p-8 rounded-3xl text-left border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                      <i className="fas fa-quote-right text-6xl"></i>
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-black text-indigo-600 uppercase mb-4 tracking-[0.2em]">{t('order.expertMsg')}</p>
                      <p className="text-slate-700 leading-relaxed text-lg font-medium italic">"{analysis}"</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onComplete}
                  className="flex-1 py-5 px-8 rounded-2xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fas fa-layer-group"></i> {t('nav.myOrders')}
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="flex-1 py-5 px-8 rounded-2xl font-bold bg-white text-slate-600 border-2 border-slate-100 hover:bg-slate-50 transition-all"
                >
                  {t('order.another')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 sticky top-24 space-y-6">
        <PriceCard />
        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-shield-halved text-green-500"></i> Quality Assurance
          </h4>
          <p className="text-sm text-slate-600">All printed works undergo manual quality control before pickup. AI Analysis helps us prioritize your requirements.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
