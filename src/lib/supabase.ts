import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          label: string
          icon: string
          created_at: string | null
        }
        Insert: {
          id?: string
          label: string
          icon: string
          created_at?: string | null
        }
        Update: {
          id?: string
          label?: string
          icon?: string
          created_at?: string | null
        }
      }
      structures: {
        Row: {
          id: string
          name: string
          category_id: string | null
          size: string
          capacity: string
          age: string
          price: number
          price_2_days: number | null
          max_weight: number | null
          services: string | null
          image: string
          description: string
          available: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          category_id?: string | null
          size?: string
          capacity?: string
          age?: string
          price: number
          price_2_days?: number | null
          max_weight?: number | null
          services?: string | null
          image: string
          description?: string
          available?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category_id?: string | null
          size?: string
          capacity?: string
          age?: string
          price?: number
          price_2_days?: number | null
          max_weight?: number | null
          services?: string | null
          image?: string
          description?: string
          available?: boolean | null
          created_at?: string | null
        }
      }
      carousel_photos: {
        Row: {
          id: string
          url: string
          alt: string
          title: string | null
          location: string | null
          order_position: number
          created_at: string | null
        }
        Insert: {
          id?: string
          url: string
          alt: string
          title?: string | null
          location?: string | null
          order_position?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          url?: string
          alt?: string
          title?: string | null
          location?: string | null
          order_position?: number
          created_at?: string | null
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          role: string
          created_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: string
          created_at?: string | null
        }
      }
    }
  }
}