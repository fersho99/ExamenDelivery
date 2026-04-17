"use client";
import { useState } from 'react';
import { RESTAURANTS, CATEGORIES, formatMXN } from '@/lib/mockData';
import { Utensils, Zap, Plus, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { useCart } from '@/store/useCard';

function QuickAddCarousel({ menu, addItem }: { menu: typeof RESTAURANTS[0]['menu'], addItem: (item: any) => void }) {
  const featured = menu.slice(0, 3);
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x px-1 -mx-1">
      {featured.map((item) => (
        <button
          key={item.id}
          onClick={(e) => { e.stopPropagation(); addItem(item); }}
          className="shrink-0 flex flex-col items-center p-3 bg-zinc-800/50 rounded-xl hover:bg-orange-600/20 hover:border-orange-500/30 border border-transparent transition-all group min-w-25"
        >
          <span className="text-xs text-zinc-400 group-hover:text-orange-400 font-medium truncate w-full text-center">{item.name}</span>
          <div className="flex items-center gap-1 mt-2">
            <Plus size={12} className="text-orange-500" />
            <span className="text-xs text-orange-500 font-bold">{formatMXN(item.price)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function Banner() {
  return (
    <button
      className="w-full h-16 md:h-20 bg-linear-to-br from-orange-600 to-orange-700 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-between shadow-xl shadow-orange-950/20 relative overflow-hidden group cursor-pointer hover:scale-[1.01] transition-transform"
    >
      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        <span className="bg-black/20 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest inline-block">Flash Deal</span>
        <h3 className="text-sm md:text-xl font-black text-white leading-tight">Envíos gratis este fin de semana</h3>
        <p className="text-orange-100 text-[10px] md:text-sm font-medium opacity-80 hidden sm:block">En órdenes superiores a $250 MXN.</p>
      </div>
      <Zap size={32} className="text-white absolute -right-2 -bottom-3 md:right-4 md:bottom-2 opacity-10 rotate-12" />
      <Zap size={18} className="text-white opacity-90 relative z-10 drop-shadow-lg sm:hidden" />
      <Zap size={24} className="text-white opacity-90 relative z-10 drop-shadow-lg hidden sm:block group-hover:animate-pulse" />
    </button>
  );
}

export default function Home() {
  const { addItem, currentRestaurant, setRestaurant } = useCart();
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredRestaurants = RESTAURANTS.filter(
    (rest) => activeCategory === 'Todas' || rest.category === activeCategory
  );

  if (currentRestaurant) {
    return (
      <div className="p-4 md:p-8 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setRestaurant(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors mb-4 md:mb-6 font-bold text-sm"
        >
          <ArrowLeft size={18} /> Volver a locales
        </button>
        
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{currentRestaurant.name}</h2>
          <span className="px-3 py-1 bg-orange-600/10 text-orange-500 border border-orange-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
            {currentRestaurant.category}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-zinc-100 mb-4 md:mb-6">Nuestra Carta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentRestaurant.menu.map((product) => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-4 md:p-5 rounded-2xl flex justify-between items-center group hover:border-zinc-700 transition-all">
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

  return (
    <div className="p-4 md:p-8">
      <div className="flex gap-2 md:gap-3 mb-4 overflow-x-auto pb-3 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest border shrink-0 ${
              activeCategory === cat 
                ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-orange-500 hover:border-orange-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Banner />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
        {filteredRestaurants.map((rest) => (
          <div 
            key={rest.id} 
            onClick={() => setRestaurant(rest)}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 hover:border-orange-500/50 transition-all cursor-pointer group shadow-sm hover:shadow-orange-950/10"
          >
            <div className="flex items-center gap-4 md:gap-5">
              {rest.image ? (
                <img src={rest.image} alt={rest.name} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover" />
              ) : (
                <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-orange-500 group-hover:bg-zinc-800/50 transition-all">
                  <Utensils size={24} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-black text-white leading-tight mb-1 truncate">{rest.name}</h4>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{rest.category}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2">agregar rapido</p>
              <QuickAddCarousel menu={rest.menu} addItem={addItem} />
            </div>
            
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400 mt-4">
               <span>Ver menú completo</span>
               <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                 <ChevronRight size={16} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}