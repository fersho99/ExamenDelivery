"use client";
import { useCart } from '@/store/useCard';
import { formatMXN } from '@/lib/mockData';
import { ShoppingCart } from 'lucide-react';

export default function CartPanel() {
  const { items, addItem, removeItem, total } = useCart();

  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col h-full shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
        <ShoppingCart size={20} className="text-orange-500" />
        <h2 className="text-lg font-bold text-white">Tu Orden</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {items.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-zinc-500 text-sm">Tu carrito está vacío</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg border border-zinc-700">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                <p className="text-xs text-orange-500 font-bold">{formatMXN(item.price)}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="w-6 h-6 rounded bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-orange-600 hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => addItem(item)}
                  className="w-6 h-6 rounded bg-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-orange-600 hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-900">
        <div className="flex justify-between items-end mb-6">
          <span className="text-zinc-400 text-sm uppercase tracking-wider">Total</span>
          <div className="text-right">
            <p className="text-2xl font-black text-white">{formatMXN(total())}</p>
          </div>
        </div>

        <div className="space-y-4">
          <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 text-sm outline-none">
            <option value="transfer">💳 Transferencia / Tarjeta</option>
            <option value="cash">💵 Efectivo al recibir</option>
          </select>

          <button 
            disabled={items.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-4 rounded-xl transition-all"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </aside>
  );
}