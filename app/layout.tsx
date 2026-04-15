// app/layout.tsx
import './globals.css'
import { Home, Search, User } from 'lucide-react'
import CartPanel from '@/components/CartPanel';

export const metadata = { title: 'FoodieExpress' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-zinc-200 h-screen overflow-hidden flex">
        
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">FE</div>
            <h1 className="text-xl font-bold text-white">Foodie<span className="text-orange-500">Express</span></h1>
          </div>
          <nav className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-3 p-3 bg-zinc-800 text-orange-500 rounded-lg font-semibold">
              <Home size={20} /> Inicio
            </a>
            <a href="#" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-zinc-100 transition-colors">
              <Search size={20} /> Buscar
            </a>
            <a href="#" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-zinc-100 transition-colors">
              <User size={20} /> Mi Perfil
            </a>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col h-full relative">
          {children}
        </main>

        <CartPanel />
      </body>
    </html>
  )
}