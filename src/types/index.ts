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
  additionalImages?: string[];
  description: string;
  available: boolean;
  order?: number;
  customPricing?: boolean;
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

export interface CarouselPhoto {
  id: string;
  url: string;
  alt: string;
  title?: string;
  location?: string;
  order: number;
  structureId?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
  active: boolean;
  order: number;
}

export type Page = 'accueil' | 'catalogue' | 'faq' | 'devis' | 'contact' | 'admin';

export type Page = 'accueil' | 'catalogue' | 'evenements' | 'faq' | 'devis' | 'contact' | 'admin' | 'mentions-legales' | 'politique-confidentialite';