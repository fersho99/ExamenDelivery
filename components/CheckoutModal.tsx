"use client";
import { useCart } from '@/store/useCard';
import { formatMXN } from '@/lib/mockData';
import { X, CreditCard, MapPin, Package, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutModal() {
  const { isModalOpen, setModal, items, total, placeOrder, isOrderPlaced } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo borroso */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => !isOrderPlaced && setModal(false)}
      />

      {/* Ventana del Modal */}
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {isOrderPlaced ? (
          <div className="p-12 text-center flex flex-col items-center">
            <CheckCircle2 size={80} className="text-orange-500 mb-6 animate-bounce" />
            <h2 className="text-3xl font-black text-white mb-4">¡Pago Exitoso!</h2>
            <p className="text-zinc-400">Tu pedido ha sido procesado y el carrito se ha vaciado.</p>
            <div className="mt-8 flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
              <Loader2 size={16} className="animate-spin" /> Redirigiendo...
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Package size={22} className="text-orange-500" /> Finalizar Compra
              </h2>
              <button onClick={() => setModal(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">
              {/* Sección Envío */}
              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
                  <MapPin size={14} /> Datos de Entrega
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nombre completo" className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="Bryan Medina" />
                  <input type="text" placeholder="Dirección" className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="Av. Libertad 450, San Luis Río Colorado" />
                  <input type="text" placeholder="Teléfono" className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="653 123 4567" />
                  <input type="text" placeholder="C.P." className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="83400" />
                </div>
              </section>

              {/* Sección Pago */}
              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
                  <CreditCard size={14} /> Método de Pago
                </h3>
                <div className="flex gap-4 mb-4">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${paymentMethod === 'card' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}
                  >
                    Tarjeta
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cash')}
                    className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${paymentMethod === 'cash' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}
                  >
                    Efectivo
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in slide-in-from-top duration-300">
                    <input type="text" placeholder="Número de Tarjeta" className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 tracking-[0.2em]" defaultValue="4556 1234 8876 9901" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/AA" className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="12/28" />
                      <input type="text" placeholder="CVV" className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-sm outline-none focus:border-orange-500 transition-all" defaultValue="991" />
                    </div>
                  </div>
                )}
              </section>

              {/* Resumen Final */}
              <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Resumen de Compra</h3>
                <div className="space-y-2 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-zinc-400">{item.quantity}x {item.name}</span>
                      <span className="text-white font-bold">{formatMXN(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-4">
                  <span className="text-sm font-bold text-white uppercase">Total a Pagar</span>
                  <span className="text-xl font-black text-orange-500">{formatMXN(total())}</span>
                </div>
              </section>
            </div>

            <div className="p-6 bg-zinc-900 border-t border-zinc-800">
              <button 
                onClick={placeOrder}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-orange-950/20 active:scale-[0.98]"
              >
                Pagar y Finalizar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}