/*
  # Schéma initial pour Fun Event

  1. Nouvelles Tables
    - `categories`
      - `id` (uuid, primary key)
      - `label` (text)
      - `icon` (text)
      - `created_at` (timestamp)
    - `structures`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category_id` (uuid, foreign key)
      - `size` (text)
      - `capacity` (text)
      - `age` (text)
      - `price` (integer)
      - `price_2_days` (integer, nullable)
      - `max_weight` (integer, nullable)
      - `services` (text, nullable)
      - `image` (text)
      - `description` (text)
      - `available` (boolean)
      - `created_at` (timestamp)
    - `carousel_photos`
      - `id` (uuid, primary key)
      - `url` (text)
      - `alt` (text)
      - `title` (text, nullable)
      - `location` (text, nullable)
      - `order_position` (integer)
      - `created_at` (timestamp)
    - `admin_users`
      - `id` (uuid, primary key, foreign key to auth.users)
      - `email` (text)
      - `role` (text)
      - `created_at` (timestamp)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques de lecture publique pour categories, structures, carousel_photos
    - Politiques de modification admin-only pour toutes les tables
*/

-- Créer la table categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Créer la table structures
CREATE TABLE IF NOT EXISTS structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  size text NOT NULL DEFAULT '',
  capacity text NOT NULL DEFAULT '',
  age text NOT NULL DEFAULT '',
  price integer NOT NULL,
  price_2_days integer,
  max_weight integer,
  services text,
  image text NOT NULL,
  description text NOT NULL DEFAULT '',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Créer la table carousel_photos
CREATE TABLE IF NOT EXISTS carousel_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  title text,
  location text,
  order_position integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Créer la table admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Politiques pour categories
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can modify categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'));

-- Politiques pour structures
CREATE POLICY "Anyone can read structures"
  ON structures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can modify structures"
  ON structures
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'));

-- Politiques pour carousel_photos
CREATE POLICY "Anyone can read carousel photos"
  ON carousel_photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can modify carousel photos"
  ON carousel_photos
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'admin'));

-- Politiques pour admin_users
CREATE POLICY "Users can read own admin data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own admin data"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own admin data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own admin data"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);