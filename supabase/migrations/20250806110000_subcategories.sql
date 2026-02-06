/*
  # Création de la table subcategories et modification de structures

  1. Nouvelle Table
    - `subcategories`
      - `id` (uuid, primary key)
      - `name` (text) - Nom de la sous-catégorie
      - `category_id` (uuid, foreign key vers categories)
      - `icon` (text) - Icône emoji
      - `active` (boolean) - Sous-catégorie active ou non
      - `order_position` (integer) - Position d'affichage
      - `created_at`, `updated_at` (timestamp)

  2. Modification de la table structures
    - Ajouter colonne `subcategory_id` (uuid, nullable, foreign key vers subcategories)

  3. Sécurité
    - Enable RLS sur la table subcategories
    - Lecture publique pour tous
    - Modification uniquement pour admin@funevent.fr

  4. Données par défaut
    - Sous-catégories pour "Structures Gonflables"
*/

-- Créer la table des sous-catégories
CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  icon text NOT NULL DEFAULT '🎯',
  active boolean DEFAULT true,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ajouter la colonne subcategory_id à la table structures
ALTER TABLE structures ADD COLUMN IF NOT EXISTS subcategory_id uuid REFERENCES subcategories(id) ON DELETE SET NULL;

-- Activer RLS
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- Politiques pour subcategories
CREATE POLICY "Anyone can read subcategories"
  ON subcategories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert subcategories"
  ON subcategories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update subcategories"
  ON subcategories
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete subcategories"
  ON subcategories
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Insérer les sous-catégories par défaut pour "Structures Gonflables"
DO $$
DECLARE
    structures_gonflables_id uuid;
BEGIN
    -- Récupérer l'ID de la catégorie "Structures Gonflables"
    SELECT id INTO structures_gonflables_id
    FROM categories
    WHERE label = 'Structures Gonflables'
    LIMIT 1;

    -- Si la catégorie existe, insérer les sous-catégories
    IF structures_gonflables_id IS NOT NULL THEN
        INSERT INTO subcategories (name, category_id, icon, active, order_position) VALUES
        ('Châteaux', structures_gonflables_id, '🏰', true, 1),
        ('Toboggans', structures_gonflables_id, '🛝', true, 2),
        ('Parcours Aventure', structures_gonflables_id, '🏃', true, 3),
        ('Jeux Aquatiques', structures_gonflables_id, '💦', true, 4),
        ('Trampolines', structures_gonflables_id, '🤸', true, 5);
    END IF;
END $$;
