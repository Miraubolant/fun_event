import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fonction pour valider une URL
const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  if (!supabaseUrl) {
    console.warn('⚠️ VITE_SUPABASE_URL manquante dans le fichier .env');
  } else if (!isValidUrl(supabaseUrl)) {
    console.warn('⚠️ VITE_SUPABASE_URL invalide:', supabaseUrl);
  }
  if (!supabaseAnonKey) {
    console.warn('⚠️ VITE_SUPABASE_ANON_KEY manquante dans le fichier .env');
  }
  console.warn('Veuillez cliquer sur "Connect to Supabase" en haut à droite pour configurer Supabase');
}

export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          label: string;
          icon: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          icon: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          icon?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      structures: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          size: string;
          capacity: string;
          age: string;
          price: number;
          price_2_days: number | null;
          max_weight: number | null;
          services: string | null;
          image: string;
          description: string;
          available: boolean;
          custom_pricing: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id: string;
          size: string;
          capacity: string;
          age: string;
          price: number;
          price_2_days?: number | null;
          max_weight?: number | null;
          services?: string | null;
          image: string;
          description: string;
          available?: boolean;
          custom_pricing?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string;
          size?: string;
          capacity?: string;
          age?: string;
          price?: number;
          price_2_days?: number | null;
          max_weight?: number | null;
          services?: string | null;
          image?: string;
          description?: string;
          available?: boolean;
          custom_pricing?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      carousel_photos: {
        Row: {
          id: string;
          url: string;
          alt: string;
          title: string | null;
          location: string | null;
          order_position: number;
          structure_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          alt: string;
          title?: string | null;
          location?: string | null;
          order_position?: number;
          structure_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          alt?: string;
          title?: string | null;
          location?: string | null;
          order_position?: number;
          structure_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}