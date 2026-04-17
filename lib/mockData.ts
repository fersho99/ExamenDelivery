// lib/mockData.ts
export type Product = { id: string; name: string; description: string; price: number; isCombo?: boolean; image?: string };
export type Restaurant = { id: string; name: string; category: string; menu: Product[]; image?: string };

export const CATEGORIES = ['Todas', 'Pizza', 'Asiática', 'Burgers', 'Mexicana'];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Pizzería Napoli',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
    menu: [
      { id: 'p1', name: 'Combo Familiar Nápoles', description: '2 Pizzas Pepperoni + Refresco 2L', price: 350.00, isCombo: true },
      { id: 'p2', name: 'Pizza Margarita', description: 'Queso mozzarella y albahaca fresca', price: 180.00 },
      { id: 'p3', name: 'Pizza Carnívora', description: 'Pepperoni, salchicha, tocino y jamón', price: 220.00 }
    ]
  },
  {
    id: 'r2',
    name: 'Burger Norte',
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop',
    menu: [
      { id: 'b1', name: 'Combo Smash', description: 'Doble carne, papas sazonadas y bebida', price: 195.00, isCombo: true },
      { id: 'b2', name: 'Crispy Chicken', description: 'Pollo frito crujiente con aderezo spicy', price: 140.00 },
    ]
  },
  {
    id: 'r3',
    name: 'Tacos El Patrón',
    category: 'Mexicana',
    image: '/tacos.jpg',
    menu: [
      { id: 't1', name: 'Orden de Asada', description: '5 tacos de carne asada con guacamole', price: 160.00 },
      { id: 't2', name: 'Combo Taquero', description: '10 tacos surtidos + 2 aguas frescas', price: 280.00, isCombo: true },
    ]
  }
];

export const formatMXN = (amount: number) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};