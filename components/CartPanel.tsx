"use client";
import { useCart } from '@/store/useCard'; 
import { formatMXN } from '@/lib/mockData';
import { ShoppingCart, CreditCard } from 'lucide-react';

export default function CartPanel() {
  // Asegúrate de traer 'setModal' aquí
  const { items, addItem, removeItem, total, setModal } = useCart();

  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col h-full shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <ShoppingCart size={20} className="text-orange-500" />
        <h2 className="text-lg font-bold text-white tracking-tight">Tu Orden</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <ShoppingCart size={48} className="mb-2" />
            <p className="text-sm font-medium">Carrito vacío</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-800 flex justify-between items-center group">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-zinc-100 truncate">{item.name}</p>
                <p className="text-xs text-orange-500 font-black">{formatMXN(item.price)}</p>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900 p-1 rounded-lg border border-zinc-700">
                <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white">-</button>
                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                <button onClick={() => addItem(item)} className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex justify-between items-end mb-6">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Total del Pedido</span>
          <p className="text-2xl font-black text-white">{formatMXN(total())}</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <label className="text-[10px] text-zinc-500 uppercase font-black mb-1.5 block px-1">Método de Pago</label>
            <div className="relative">
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 pl-10 text-zinc-300 text-sm appearance-none focus:border-orange-500 outline-none transition-all cursor-pointer">
                <option value="transfer">Pago con Tarjeta</option>
                <option value="cash">Efectivo al recibir</option>
              </select>
              <CreditCard size={16} className="absolute left-3.5 top-3.5 text-zinc-500 group-focus-within:text-orange-500" />
            </div>
          </div>
          <button 
            onClick={() => setModal(true)} // AHORA SÍ FUNCIONARÁ PERFECTO
            disabled={items.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-4 rounded-xl transition-all"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </aside>
  );
}