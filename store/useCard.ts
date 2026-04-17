// store/useCart.ts
import { create } from 'zustand';
import { Product, Restaurant } from '@/lib/mockData';

interface CartItem extends Product { quantity: number; }

interface CartStore {
  items: CartItem[];
  currentRestaurant: Restaurant | null;
  isModalOpen: boolean;
  isOrderPlaced: boolean;
  cartAnimation: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setRestaurant: (rest: Restaurant | null) => void;
  setModal: (open: boolean) => void;
  placeOrder: () => void;
  total: () => number;
  triggerCartAnimation: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  currentRestaurant: null,
  isModalOpen: false,
  isOrderPlaced: false,
  cartAnimation: false,

  addItem: (product) => {
    const items = get().items;
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      set({ items: items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }], cartAnimation: true });
    }
    setTimeout(() => set({ cartAnimation: false }), 300);
  },
  removeItem: (id) => {
    const items = get().items;
    const existing = items.find(i => i.id === id);
    if (existing && existing.quantity > 1) {
      set({ items: items.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) });
    } else {
      set({ items: items.filter(i => i.id !== id) });
    }
  },
  setRestaurant: (rest) => set({ currentRestaurant: rest }),
  setModal: (open) => set({ isModalOpen: open }),
  placeOrder: () => {
    set({ isOrderPlaced: true });
    setTimeout(() => {
      set({ items: [], isOrderPlaced: false, isModalOpen: false, currentRestaurant: null });
    }, 3000);
  },
  total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  triggerCartAnimation: () => {
    set({ cartAnimation: true });
    setTimeout(() => set({ cartAnimation: false }), 300);
  },
}));