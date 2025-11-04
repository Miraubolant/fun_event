export interface Structure {
  id: string;
  name: string;
  category: string;
  subcategory_id?: string;
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

export interface FAQCategory {
  id: string;
  category: string;
  icon: string;
  color: string;
  order: number;
  questions: FAQQuestion[];
}

export interface FAQQuestion {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  order: number;
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

export interface DeliveryZone {
  id: string;
  name: string;
  code: string;
  active: boolean;
  order_position: number;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  icon: string;
  active: boolean;
  order_position: number;
}

export type Page = 'accueil' | 'catalogue' | 'galerie' | 'faq' | 'devis' | 'contact' | 'admin' | 'mentions-legales' | 'politique-confidentialite';