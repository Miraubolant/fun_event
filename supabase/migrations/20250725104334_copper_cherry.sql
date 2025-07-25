/*
  # Debug et correction des politiques admin_users

  1. Vérification des données existantes
  2. Correction des politiques RLS
  3. Test des permissions
*/

-- Vérifier les données existantes dans admin_users
SELECT 'Utilisateurs admin existants:' as info;
SELECT id, email, role, created_at FROM admin_users;

-- Vérifier les utilisateurs auth
SELECT 'Utilisateurs auth existants:' as info;
SELECT id, email, created_at FROM auth.users LIMIT 5;

-- Supprimer toutes les politiques existantes pour admin_users
DROP POLICY IF EXISTS "Users can view their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can insert admin records" ON admin_users;
DROP POLICY IF EXISTS "Users can update their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Users can delete their own admin record" ON admin_users;

-- Créer des politiques plus permissives pour le debug
CREATE POLICY "Allow authenticated users to read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert into admin_users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update their own admin record"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to delete their own admin record"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Vérifier que RLS est activé
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'admin_users';

-- Test de la fonction auth.uid()
SELECT 'Test auth.uid():' as info, auth.uid() as current_user_id;