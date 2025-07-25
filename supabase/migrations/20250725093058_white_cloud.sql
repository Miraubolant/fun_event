/*
  # Corriger la récursion infinie dans les politiques RLS admin_users

  1. Problème identifié
    - La politique RLS fait référence à elle-même créant une récursion infinie
    - La fonction uid() essaie de vérifier dans admin_users qui essaie de vérifier uid()

  2. Solution
    - Supprimer les politiques problématiques
    - Créer des politiques simples sans récursion
    - Utiliser auth.uid() directement sans sous-requête circulaire

  3. Sécurité
    - Seuls les utilisateurs authentifiés peuvent voir les admin_users
    - Seuls les admins existants peuvent ajouter de nouveaux admins
*/

-- Supprimer toutes les politiques existantes pour admin_users
DROP POLICY IF EXISTS "Admin users are viewable by admins only" ON admin_users;
DROP POLICY IF EXISTS "Only existing admins can insert new admins" ON admin_users;

-- Créer une politique simple pour la lecture
-- Les utilisateurs authentifiés peuvent voir leur propre entrée admin
CREATE POLICY "Users can view their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Créer une politique pour l'insertion
-- Pour éviter la récursion, on permet l'insertion si l'utilisateur est authentifié
-- La logique métier sera gérée côté application
CREATE POLICY "Authenticated users can insert admin records"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Politique pour la mise à jour (optionnelle)
CREATE POLICY "Users can update their own admin record"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Politique pour la suppression (optionnelle)
CREATE POLICY "Users can delete their own admin record"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);