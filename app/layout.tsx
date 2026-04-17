// app/layout.tsx
"use client";
import './globals.css';
import { Home, Search, Menu, X, ChevronLeft, LogOut, User, Settings, ShoppingCart } from 'lucide-react';
import CartPanel from '@/components/CartPanel';
import CheckoutModal from '@/components/CheckoutModal';
import Script from 'next/script';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/store/useCard';

export const dynamic = 'force-dynamic';

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-4 z-50 md:hidden animate-in slide-in-from-left duration-300">
        <button onClick={onClose} className="self-end p-2 text-zinc-400 hover:text-white">
          <X size={24} />
        </button>
        <SidebarContent onClose={onClose} isMobile />
      </aside>
    </>
  );
}

function SidebarContent({ onClose, isMobile = false, collapsed = false }: { onClose?: () => void; isMobile?: boolean; collapsed?: boolean }) {
  const handleLogout = () => {
    console.log('Cerrar sesión');
    onClose?.();
  };

  return (
    <>
      <div className={`flex items-center gap-3 mb-8 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white shrink-0">FE</div>
        {!collapsed && <h1 className="text-xl font-bold text-white">Foodie<span className="text-orange-500">Express</span></h1>}
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <a href="#" className={`flex items-center gap-3 bg-zinc-800 text-orange-500 rounded-lg font-semibold ${collapsed ? 'justify-center p-3' : 'p-3'}`}>
          <Home size={20} className="shrink-0" /> {!collapsed && <span>Inicio</span>}
        </a>
        <button className={`flex items-center gap-3 text-zinc-400 hover:text-zinc-100 transition-colors ${collapsed ? 'justify-center p-3' : 'p-3'}`}>
          <Search size={20} className="shrink-0" /> {!collapsed && <span>Buscar</span>}
        </button>
      </nav>

      <div className="mt-auto pt-4 border-t border-zinc-800">
        <div className={`flex items-center gap-3 p-3 mb-4 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white shrink-0">
            BM
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Bryan Medina</p>
              <p className="text-xs text-zinc-500 truncate">bryan@email.com</p>
            </div>
          )}
        </div>
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors ${collapsed ? 'justify-center p-3 w-full' : 'p-3 w-full'}`}
        >
          <LogOut size={20} className="shrink-0" /> {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </>
  );
}

function Header({ onMenuClick, onCartClick, itemCount }: { onMenuClick: () => void; onCartClick: () => void; itemCount: number }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="flex items-center gap-3 p-4 border-b border-zinc-800 bg-zinc-950">
      <button onClick={onMenuClick} className="p-2 text-zinc-400 hover:text-white md:hidden">
        <Menu size={24} />
      </button>
      
      <div className="flex-1 relative max-w-xl mx-auto w-full">
        <input
          type="text"
          placeholder="Buscar restaurantes, comida..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all"
        />
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
      </div>

      <button onClick={onCartClick} className="relative p-2 text-zinc-400 hover:text-orange-500 transition-colors ml-auto md:ml-0">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </header>
  );
}

function MobileCartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, cartAnimation } = useCart();
  
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 flex flex-col z-50 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white">Tu Orden</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <CartPanel />
      </aside>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <html lang="es">
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wc8skq980p");
          `}
        </Script>
      </head>
      
      <body className="bg-zinc-950 text-zinc-200 h-screen overflow-hidden flex">
        {/* Mobile Nav Drawer */}
        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        
        {/* Mobile Cart Drawer */}
        <MobileCartDrawer isOpen={mobileCartOpen} onClose={() => setMobileCartOpen(false)} />

        {/* Desktop Sidebar - hidden on mobile, visible on md+ */}
        <aside className={`
          hidden md:flex bg-zinc-900 border-r border-zinc-800 flex-col p-4 transition-all duration-300 z-20
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="self-end p-2 text-zinc-500 hover:text-white mb-4"
          >
            <ChevronLeft size={20} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
          <SidebarContent collapsed={sidebarCollapsed} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Header 
            onMenuClick={() => setMobileMenuOpen(true)} 
            onCartClick={() => setMobileCartOpen(true)}
            itemCount={totalItems}
          />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>


        <CheckoutModal />
      </body>
    </html>
  );
}