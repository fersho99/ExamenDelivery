"use client";
import { useState } from 'react';
import { RESTAURANTS, CATEGORIES, formatMXN } from '@/lib/mockData';
import { Utensils, Zap, Plus, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '@/store/useCard';

export default function Home() {
  const { addItem, currentRestaurant, setRestaurant } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredRestaurants = RESTAURANTS.filter(
    (rest) => activeCategory === 'Todas' || rest.category === activeCategory
  );

  // VISTA DE MENÚ ESPECÍFICO
  if (currentRestaurant) {
    return (
      <div className="h-full overflow-y-auto p-8 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setRestaurant(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors mb-6 font-bold text-sm"
        >
          <ArrowLeft size={18} /> Volver a locales
        </button>
        
        <div className="mb-10">
          <h2 className="text-4xl font-black text-white mb-2">{currentRestaurant.name}</h2>
          <span className="px-3 py-1 bg-orange-600/10 text-orange-500 border border-orange-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
            {currentRestaurant.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-zinc-100 mb-6">Nuestra Carta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentRestaurant.menu.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center group hover:border-zinc-700 transition-all">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  {product.isCombo && <Star size={14} className="text-orange-500 fill-orange-500" />}
                  <h4 className="font-bold text-zinc-100">{product.name}</h4>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-2">{product.description}</p>
                <p className="text-sm font-black text-orange-500">{formatMXN(product.price)}</p>
              </div>
              <button 
                onClick={() => addItem(product)}
                className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-sm"
              >
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VISTA DE CATÁLOGO (INICIO)
  return (
    <div className="h-full overflow-y-auto p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight">Descubre locales</h2>
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-orange-500 shadow-inner">BM</div>
      </header>

      {/* PUBLICIDAD / PROMO */}
      <div className="w-full bg-linear-to-br from-orange-600 to-orange-700 rounded-3xl p-8 mb-10 flex items-center justify-between shadow-2xl shadow-orange-950/20 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-black/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Flash Deal</span>
          <h3 className="text-3xl font-black text-white mb-2 leading-tight">Envíos gratis<br/>este fin de semana</h3>
          <p className="text-orange-100 text-sm font-medium opacity-80">En todas tus órdenes superiores a $250 MXN.</p>
        </div>
        <Zap size={120} className="text-white absolute -right-4 -bottom-4 opacity-10 rotate-12" />
        <Zap size={64} className="text-white opacity-90 relative z-10 drop-shadow-lg" />
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest border ${
              activeCategory === cat 
                ? 'bg-white border-white text-black shadow-lg shadow-white/5' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((rest) => (
          <div 
            key={rest.id} 
            onClick={() => setRestaurant(rest)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-orange-950/10"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-orange-500 group-hover:bg-zinc-800/50 transition-all">
                 <Utensils size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-white leading-tight mb-1">{rest.name}</h4>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{rest.category}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
               <span>Ver menú completo</span>
               <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                →
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}