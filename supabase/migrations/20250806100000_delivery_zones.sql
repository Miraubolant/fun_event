/*
  # Création de la table delivery_zones

  1. Nouvelle Table
    - `delivery_zones`
      - `id` (uuid, primary key)
      - `name` (text) - Nom de la zone (ex: "Paris (75)")
      - `code` (text) - Code département (ex: "75")
      - `active` (boolean) - Zone active ou non
      - `order_position` (integer) - Position d'affichage
      - `created_at`, `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur la table
    - Lecture publique pour tous
    - Modification uniquement pour admin@funevent.fr

  3. Données par défaut
    - 8 départements d'Île-de-France
*/

-- Créer la table des zones de livraison
CREATE TABLE IF NOT EXISTS delivery_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  active boolean DEFAULT true,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;

-- Politiques pour delivery_zones
CREATE POLICY "Anyone can read delivery_zones"
  ON delivery_zones
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert delivery_zones"
  ON delivery_zones
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update delivery_zones"
  ON delivery_zones
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete delivery_zones"
  ON delivery_zones
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Insérer les zones par défaut (Île-de-France)
INSERT INTO delivery_zones (name, code, active, order_position) VALUES
('Paris (75)', '75', true, 1),
('Seine-et-Marne (77)', '77', true, 2),
('Yvelines (78)', '78', true, 3),
('Essonne (91)', '91', true, 4),
('Hauts-de-Seine (92)', '92', true, 5),
('Seine-Saint-Denis (93)', '93', true, 6),
('Val-de-Marne (94)', '94', true, 7),
('Val-d''Oise (95)', '95', true, 8);
