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

export type Page =
  | 'accueil' | 'catalogue' | 'galerie' | 'faq' | 'devis' | 'contact' | 'admin' | 'mentions-legales' | 'politique-confidentialite'
  // Pages départements
  | 'location-75' | 'location-77' | 'location-78' | 'location-91' | 'location-92' | 'location-93' | 'location-94' | 'location-95'
  // Blog
  | 'blog' | 'blog-organiser-anniversaire' | 'blog-animation-mariage' | 'blog-guide-location' | 'blog-securite-gonflables' | 'blog-idees-fete-entreprise'
  // Pages événements
  | 'evenement-anniversaire' | 'evenement-mariage' | 'evenement-entreprise' | 'evenement-kermesse' | 'evenement-bapteme' | 'evenement-fete-quartier'
  // Pages villes (100+ villes dynamiques via pattern)
  | `ville-${string}`
  // Pages structures (pages dédiées par structure)
  | `structure-${string}`;

export interface LocalDepartment {
  code: string;
  name: string;
  fullName: string;
  cities: string[];
  description: string;
  benefits: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  readTime: string;
  date: string;
  keywords: string[];
}

export interface EventType {
  id: string;
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  idealStructures: string[];
  tips: string[];
}

export interface NearestCity {
  name: string;
  slug: string;
  distance: number;
  postalCode: string;
}

export interface CityData {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  departmentCode: string;
  departmentSlug: string;
  population: string;
  latitude: string;
  longitude: string;
  region: string;
  description: string;
  neighborhoods: string[];
  nearestCities: NearestCity[];
}

export interface DepartmentData {
  code: string;
  name: string;
  slug: string;
  fullName: string;
  region: string;
  citiesCount: number;
  neighboringDepartments: string[];
  description: string;
  benefits: string[];
}