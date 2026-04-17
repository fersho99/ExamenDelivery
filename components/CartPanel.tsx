"use client";
import { useCart } from '@/store/useCard'; 
import { formatMXN } from '@/lib/mockData';
import { ShoppingCart, CreditCard, ChevronDown, X } from 'lucide-react';

function Tooltip({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-zinc-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-zinc-700">
        {message}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
      </div>
    </div>
  );
}

interface CartPanelProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function CartPanel({ isMobile, onClose }: CartPanelProps) {
  const { items, addItem, removeItem, total, setModal, cartAnimation, setRestaurant } = useCart();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
        <div className={`text-orange-500 transition-transform ${cartAnimation ? 'scale-125' : ''}`}>
          <ShoppingCart size={20} className={cartAnimation ? 'animate-bounce' : ''} />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">Tu Orden</h2>
        {items.length > 0 && (
          <span className="ml-auto bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {items.reduce((acc, i) => acc + i.quantity, 0)}
          </span>
        )}
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

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex justify-between items-end mb-4">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">Total del Pedido</span>
          <p className="text-2xl font-black text-white">{formatMXN(total())}</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <label className="text-[10px] text-zinc-500 uppercase font-black mb-1.5 block px-1">Método de Pago</label>
            <div className="relative">
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 pl-10 pr-10 text-zinc-300 text-sm appearance-none focus:border-orange-500 outline-none transition-all cursor-pointer hover:border-zinc-700">
                <option value="transfer">Pago con Tarjeta</option>
                <option value="cash">Efectivo al recibir</option>
              </select>
              <CreditCard size={16} className="absolute left-3.5 top-3.5 text-zinc-500 group-focus-within:text-orange-500" />
              <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-zinc-500 pointer-events-none" />
            </div>
          </div>
          
          {items.length === 0 ? (
            <Tooltip message="Agrega productos a tu orden para continuar">
              <button 
                disabled
                className="w-full bg-zinc-800 text-zinc-600 font-black py-4 rounded-xl cursor-not-allowed"
              >
                Confirmar Pedido
              </button>
            </Tooltip>
          ) : (
            <button 
              onClick={() => { setRestaurant(null); setModal(true); }}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-600/20 active:scale-[0.98]"
            >
              Confirmar Pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}