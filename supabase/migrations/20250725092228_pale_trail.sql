/*
  # Création du schéma de base de données Fun Event

  1. Tables principales
    - `categories` - Catégories des structures (gonflable, événementiel, gourmandises)
    - `structures` - Structures gonflables et services
    - `carousel_photos` - Photos du carrousel d'événements
    - `admin_users` - Utilisateurs administrateurs autorisés

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques de lecture publique
    - Politiques de modification réservées aux administrateurs
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  label text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create structures table
CREATE TABLE IF NOT EXISTS structures (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  size text,
  capacity text,
  age text,
  price integer NOT NULL DEFAULT 0,
  price_2_days integer,
  max_weight integer,
  services text,
  image text,
  description text,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create carousel_photos table
CREATE TABLE IF NOT EXISTS carousel_photos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  url text NOT NULL,
  alt text NOT NULL,
  title text,
  location text,
  order_position integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Policies for structures
CREATE POLICY "Structures are viewable by everyone"
  ON structures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert structures"
  ON structures
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can update structures"
  ON structures
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can delete structures"
  ON structures
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Policies for carousel_photos
CREATE POLICY "Carousel photos are viewable by everyone"
  ON carousel_photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert carousel photos"
  ON carousel_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can update carousel photos"
  ON carousel_photos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only admins can delete carousel photos"
  ON carousel_photos
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Policies for admin_users
CREATE POLICY "Admin users are viewable by admins only"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only existing admins can insert new admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_structures_category_id ON structures(category_id);
CREATE INDEX IF NOT EXISTS idx_structures_available ON structures(available);
CREATE INDEX IF NOT EXISTS idx_carousel_photos_order ON carousel_photos(order_position);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_structures_updated_at
  BEFORE UPDATE ON structures
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carousel_photos_updated_at
  BEFORE UPDATE ON carousel_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();