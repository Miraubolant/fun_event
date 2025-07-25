/*
  # Création du schéma de base de données Fun Event

  1. Tables créées
    - `categories` - Catégories de structures (gonflable, événementiel, gourmandises)
    - `structures` - Structures gonflables et services
    - `carousel_photos` - Photos du carrousel d'événements
    - `admin_users` - Utilisateurs administrateurs

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques de lecture publique
    - Politiques de modification admin uniquement

  3. Relations
    - structures.category_id -> categories.id
    - admin_users.id -> auth.users.id
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create structures table
CREATE TABLE IF NOT EXISTS structures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  size TEXT,
  capacity TEXT,
  age TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  price_2_days INTEGER,
  max_weight INTEGER,
  services TEXT,
  image TEXT,
  description TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create carousel_photos table
CREATE TABLE IF NOT EXISTS carousel_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  location TEXT,
  order_position INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Categories are editable by admin only" ON categories
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin')
  );

-- Policies for structures
CREATE POLICY "Structures are viewable by everyone" ON structures
  FOR SELECT USING (true);

CREATE POLICY "Structures are editable by admin only" ON structures
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin')
  );

-- Policies for carousel_photos
CREATE POLICY "Carousel photos are viewable by everyone" ON carousel_photos
  FOR SELECT USING (true);

CREATE POLICY "Carousel photos are editable by admin only" ON carousel_photos
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin')
  );

-- Policies for admin_users
CREATE POLICY "Admin users are viewable by themselves" ON admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin users are editable by themselves" ON admin_users
  FOR ALL USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_structures_category_id ON structures(category_id);
CREATE INDEX IF NOT EXISTS idx_structures_available ON structures(available);
CREATE INDEX IF NOT EXISTS idx_carousel_photos_order ON carousel_photos(order_position);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_structures_updated_at BEFORE UPDATE ON structures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carousel_photos_updated_at BEFORE UPDATE ON carousel_photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();