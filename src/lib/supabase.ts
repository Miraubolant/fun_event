import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables d\'environnement Supabase manquantes. Veuillez configurer VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans le fichier .env');
}

export const supabase = supabaseUrl && supabaseAnonKey 
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
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}