import React, { useState, useRef, useEffect } from 'react';

export const PhoneContact: React.FC<{ phone: string }> = ({ phone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        className="text-zinc-900 hover:text-violet-600 font-bold transition-colors flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm"
      >
        {phone} <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-zinc-400`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <a 
            href={`tel:+${cleanPhone}`}
            className="flex items-center gap-3 w-full p-3 hover:bg-zinc-50 rounded-xl text-zinc-700 font-medium transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className="fas fa-phone-alt"></i>
            </div>
            Чалуу
          </a>
          <a 
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full p-3 hover:bg-zinc-50 rounded-xl text-zinc-700 font-medium transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <i className="fab fa-whatsapp text-lg"></i>
            </div>
            WhatsApp
          </a>
        </div>
      )}
    </div>
  );
};
