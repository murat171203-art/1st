import React, { useState, useEffect } from 'react';

const TopInfoBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null);
  const [rates, setRates] = useState<{ USD: number; EUR: number; RUB: number } | null>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch Weather (Open-Meteo API - no key required)
    const fetchWeather = (lat: number, lon: number, cityName: string) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
          if (data.current_weather) {
            setWeather({ temp: Math.round(data.current_weather.temperature), city: cityName });
          }
        })
        .catch(console.error);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If user allows location, fetch weather for their coords
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Сиздин аймак');
        },
        () => {
          // Fallback to Bishkek if location access is denied
          fetchWeather(42.87, 74.59, 'Бишкек');
        }
      );
    } else {
      fetchWeather(42.87, 74.59, 'Бишкек');
    }

    // Fetch Currency Rates (ExchangeRate-API - free, no key required for basic usage)
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          const kgs = data.rates.KGS;
          const eur = data.rates.EUR;
          const rub = data.rates.RUB;
          setRates({
            USD: Number(kgs.toFixed(2)),
            EUR: Number((kgs / eur).toFixed(2)),
            RUB: Number((kgs / rub).toFixed(2))
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-400 text-xs py-2 border-b border-white/5 relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2" title="Учурдагы убакыт">
            <i className="fas fa-clock text-amber-500"></i>
            <span className="font-mono font-medium text-zinc-300">
              {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {rates ? (
            <div className="flex items-center gap-4 font-mono font-medium text-zinc-300 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
              <span className="flex items-center gap-1" title="АКШ доллары">
                <span className="text-amber-500">$</span> {rates.USD}
              </span>
              <span className="flex items-center gap-1" title="Евро">
                <span className="text-amber-500">€</span> {rates.EUR}
              </span>
              <span className="flex items-center gap-1" title="Орус рубли">
                <span className="text-amber-500">₽</span> {rates.RUB}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4 font-mono text-zinc-600 animate-pulse">
              <span>Курстар жүктөлүүдө...</span>
            </div>
          )}

          {weather ? (
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5" title="Аба ырайы">
              <i className="fas fa-cloud-sun text-amber-500"></i>
              <span className="font-medium text-zinc-300">
                {weather.city}: {weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 animate-pulse">
              <i className="fas fa-cloud-sun text-zinc-600"></i>
              <span className="text-zinc-600">Жүктөлүүдө...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
