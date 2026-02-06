/*
  # Création des tables pour Fun Event

  1. Tables principales
    - `categories` - Catégories des structures
    - `structures` - Structures gonflables
    - `carousel_photos` - Photos du carrousel

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques pour lecture publique
    - Politiques pour modification admin uniquement
*/

-- Créer la table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Créer la table des structures
CREATE TABLE IF NOT EXISTS structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  size text NOT NULL,
  capacity text NOT NULL,
  age text NOT NULL,
  price integer NOT NULL,
  price_2_days integer,
  max_weight integer,
  services text,
  image text NOT NULL,
  description text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Créer la table des photos du carrousel
CREATE TABLE IF NOT EXISTS carousel_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  title text,
  location text,
  order_position integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (tout le monde peut voir)
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Structures are viewable by everyone"
  ON structures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Carousel photos are viewable by everyone"
  ON carousel_photos
  FOR SELECT
  TO public
  USING (true);

-- Politiques de modification (seul l'admin peut modifier)
-- L'email admin sera: admin@funevent.fr
CREATE POLICY "Only admin can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can insert structures"
  ON structures
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update structures"
  ON structures
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete structures"
  ON structures
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can insert carousel photos"
  ON carousel_photos
  FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update carousel photos"
  ON carousel_photos
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete carousel photos"
  ON carousel_photos
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Créer des index pour les performances
CREATE INDEX IF NOT EXISTS idx_structures_category_id ON structures(category_id);
CREATE INDEX IF NOT EXISTS idx_structures_available ON structures(available);
CREATE INDEX IF NOT EXISTS idx_carousel_photos_order ON carousel_photos(order_position);