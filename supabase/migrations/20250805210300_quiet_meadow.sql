/*
  # Création de la table social_links pour "Ils nous ont fait confiance"

  1. Nouvelle table
    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text) - nom de la plateforme/client
      - `url` (text) - URL du lien
      - `icon` (text) - emoji ou icône
      - `label` (text) - texte affiché
      - `active` (boolean) - visible ou non
      - `order_position` (integer) - ordre d'affichage
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur `social_links`
    - Lecture publique pour tous
    - Modification uniquement pour admin@funevent.fr

  3. Données par défaut
    - Quelques exemples de liens sociaux/clients
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

-- Politique d'insertion pour admin uniquement
CREATE POLICY "Only admin can insert social_links"
  ON social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Politique de mise à jour pour admin uniquement
CREATE POLICY "Only admin can update social_links"
  ON social_links
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Politique de suppression pour admin uniquement
CREATE POLICY "Only admin can delete social_links"
  ON social_links
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Créer des index pour les performances
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links(active);
CREATE INDEX IF NOT EXISTS idx_social_links_order_position ON social_links(order_position);

-- Insérer des données par défaut
DO $$
BEGIN
  -- Vérifier si des données existent déjà
  IF NOT EXISTS (SELECT 1 FROM social_links LIMIT 1) THEN
    INSERT INTO social_links (platform, url, icon, label, active, order_position) VALUES
    ('Instagram', 'https://instagram.com/FUN_EVENT', '📸', 'Suivez nos événements', true, 1),
    ('Snapchat', 'https://snapchat.com/add/FUN_EVENTT', '👻', 'Stories exclusives', true, 2),
    ('Google Reviews', '#', '⭐', 'Avis clients 5 étoiles', true, 3),
    ('Mairie Paris 12', '#', '🏛️', 'Partenaire officiel', true, 4),
    ('École Sainte-Marie', '#', '🏫', 'Événements scolaires', true, 5),
    ('Comité d''entreprise Total', '#', '🏢', 'Événements CE', true, 6);
  END IF;
END $$;