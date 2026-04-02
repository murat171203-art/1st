import React, { useState, useRef, useEffect } from 'react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "996555566667"; // Replace with actual number

  const options = [
    "Саламатсызбы! Дипломдук иш чыгарайын дедим эле...",
    "Саламатсызбы! Баалар боюнча маалымат алсам болобу?",
    "Саламатсызбы! Документ форматтоо кызматы керек эле."
  ];

  const handleOptionClick = (text: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-24 left-4 lg:bottom-8 lg:left-8 z-[110]" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-20 left-0 mb-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
            <div className="w-10 h-10 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center text-xl">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Кандай сурооңуз бар?</h4>
              <p className="text-xs text-zinc-400">Төмөнкү варианттардын бирин тандаңыз</p>
            </div>
          </div>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left text-sm text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all hover:translate-x-1 border border-transparent hover:border-white/10"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-300 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <i className={isOpen ? "fas fa-times" : "fab fa-whatsapp"}></i>
      </button>
    </div>
  );
};

export default WhatsAppButton;
