/*
  # Création des tables de base pour Fun Event

  1. Nouvelles Tables
    - `categories`
      - `id` (uuid, primary key)
      - `label` (text)
      - `icon` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
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
      - `available` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `carousel_photos`
      - `id` (uuid, primary key)
      - `url` (text)
      - `alt` (text)
      - `title` (text, nullable)
      - `location` (text, nullable)
      - `order_position` (integer, default 1)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin-only write access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create structures table
CREATE TABLE IF NOT EXISTS structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  size text NOT NULL DEFAULT '',
  capacity text NOT NULL DEFAULT '',
  age text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  price_2_days integer,
  max_weight integer,
  services text,
  image text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create carousel_photos table
CREATE TABLE IF NOT EXISTS carousel_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  title text,
  location text,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr')
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr');

-- Policies for structures
CREATE POLICY "Anyone can read structures"
  ON structures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert structures"
  ON structures
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update structures"
  ON structures
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr')
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete structures"
  ON structures
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr');

-- Policies for carousel_photos
CREATE POLICY "Anyone can read carousel_photos"
  ON carousel_photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert carousel_photos"
  ON carousel_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update carousel_photos"
  ON carousel_photos
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr')
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete carousel_photos"
  ON carousel_photos
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr');

-- Insert default empty categories to avoid foreign key errors
INSERT INTO categories (label, icon) VALUES
  ('Structures Gonflables', 'castle'),
  ('Jeux et Animations', 'game'),
  ('Événementiel', 'event')
ON CONFLICT DO NOTHING;