/*
  # Création de la table social_links

  1. Nouvelle table
    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text) - Nom de la plateforme (Instagram, Facebook, etc.)
      - `url` (text) - URL du lien
      - `icon` (text) - Emoji ou icône à afficher
      - `label` (text) - Libellé à afficher
      - `active` (boolean) - Si le lien est actif ou non
      - `order_position` (integer) - Position d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `social_links`
    - Politique de lecture publique
    - Politiques admin pour modification

  3. Données par défaut
    - Instagram et Snapchat pré-configurés
*/

-- Créer la table social_links
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  icon text NOT NULL DEFAULT '🔗',
  label text NOT NULL,
  active boolean DEFAULT true,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Anyone can read social_links"
  ON social_links
  FOR SELECT
  TO public
  USING (true);

-- Politiques admin pour modification
CREATE POLICY "Only admin can insert social_links"
  ON social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update social_links"
  ON social_links
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr')
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete social_links"
  ON social_links
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr');

-- Insérer les données par défaut
INSERT INTO social_links (platform, url, icon, label, active, order_position) VALUES
  ('Instagram', 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi', '📷', 'Instagram', true, 1),
  ('Snapchat', 'https://snapchat.com/add/FUN_EVENTT', '👻', 'Snapchat', true, 2)
ON CONFLICT DO NOTHING;

-- Créer un index sur order_position pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_social_links_order_position ON social_links (order_position);

-- Créer un index sur active pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links (active);