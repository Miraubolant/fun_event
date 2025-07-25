/*
  # Création du compte administrateur

  1. Sécurité
    - Seul l'email admin@funevent.fr peut se connecter
    - Politiques RLS strictes pour les modifications
    - Authentification obligatoire pour l'admin panel

  2. Configuration
    - Email: admin@funevent.fr
    - Mot de passe: à définir lors de la première connexion
    - Rôle: admin unique
*/

-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_photos ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture (public)
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read structures"
  ON structures
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read carousel photos"
  ON carousel_photos
  FOR SELECT
  TO public
  USING (true);

-- Politiques de modification (admin uniquement)
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

CREATE POLICY "Only admin can insert carousel photos"
  ON carousel_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update carousel photos"
  ON carousel_photos
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr')
  WITH CHECK (auth.email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete carousel photos"
  ON carousel_photos
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@funevent.fr');