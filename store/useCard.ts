// store/useCart.ts
import { create } from 'zustand';
import { Product } from '@/lib/mockData';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (id) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      set({
        items: items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });
    } else {
      set({ items: items.filter((item) => item.id !== id) });
    }
  },
  total: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));