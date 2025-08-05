/*
  # Ajouter table pour les liens réseaux sociaux

  1. Nouvelle table
    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text) - nom de la plateforme (instagram, snapchat, etc.)
      - `url` (text) - URL du lien
      - `icon` (text) - nom de l'icône ou emoji
      - `label` (text) - libellé affiché
      - `active` (boolean) - si le lien est actif
      - `order_position` (integer) - ordre d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `social_links`
    - Politique de lecture publique
    - Politiques admin pour modification

  3. Données initiales
    - Instagram et Snapchat par défaut
*/

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
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update social_links"
  ON social_links
  FOR UPDATE
  TO authenticated
  USING (email() = 'admin@funevent.fr')
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete social_links"
  ON social_links
  FOR DELETE
  TO authenticated
  USING (email() = 'admin@funevent.fr');

-- Insérer les liens par défaut
INSERT INTO social_links (platform, url, icon, label, active, order_position) VALUES
  ('instagram', 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi', '📷', 'Instagram', true, 1),
  ('snapchat', 'https://snapchat.com/add/FUN_EVENTT', '👻', 'Snapchat', true, 2)
ON CONFLICT DO NOTHING;