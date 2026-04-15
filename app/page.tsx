"use client";

import { useState } from 'react';
import { RESTAURANTS, CATEGORIES, formatMXN } from '@/lib/mockData';
import { Utensils, Zap, Plus } from 'lucide-react';
import { useCart } from '@/store/useCard';

export default function Home() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredRestaurants = RESTAURANTS.filter(
    (rest) => activeCategory === 'Todas' || rest.category === activeCategory
  );

  return (
    <div className="h-full overflow-y-auto p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Descubre locales</h2>
        <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center font-bold">BM</div>
      </header>

      <div className="w-full bg-linear-to-r from-orange-600 to-orange-500 rounded-2xl p-6 mb-10 flex items-center justify-between shadow-lg">
        <div>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Promoción Especial</span>
          <h3 className="text-2xl font-bold text-white mb-1">Envíos gratis este fin de semana</h3>
          <p className="text-orange-100 text-sm">Aplica en compras mayores a $250 MXN.</p>
        </div>
        <Zap size={48} className="text-white opacity-80" />
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-orange-600 text-white' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((rest) => {
          const combo = rest.menu.find(m => m.isCombo);

          return (
            <div key={rest.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 group-hover:text-orange-500 transition-colors">
                     <Utensils size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{rest.name}</h4>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">{rest.category}</span>
                  </div>
                </div>
                
                {combo && (
                   <div className="mt-4 pt-4 border-t border-zinc-800/50">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-bold text-white mb-1">⭐ {combo.name}</p>
                          <p className="text-xs text-zinc-400 line-clamp-2">{combo.description}</p>
                        </div>
                        <span className="text-sm font-black text-orange-500 ml-3">{formatMXN(combo.price)}</span>
                     </div>
                   </div>
                )}
              </div>

              {combo && (
                <button 
                  onClick={() => addItem(combo)}
                  className="w-full mt-4 bg-zinc-800 border border-zinc-700 hover:bg-orange-600 hover:border-orange-600 text-zinc-200 hover:text-white py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Añadir Promo
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}