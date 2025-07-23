export interface Structure {
  id: string;
  name: string;
  category: string;
  size: string;
  capacity: string;
  age: string;
  price: number;
  price2Days?: number;
  maxWeight?: number;
  services?: string;
  image: string;
  description: string;
  available: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export type Page = 'accueil' | 'catalogue' | 'faq' | 'devis' | 'contact' | 'admin';

export type Page = 'accueil' | 'catalogue' | 'faq' | 'devis' | 'contact' | 'admin' | 'mentions-legales' | 'politique-confidentialite';