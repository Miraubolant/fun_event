/*
  # Créer un compte administrateur par défaut

  1. Sécurité
    - Désactive la confirmation email pour les admins
    - Crée un utilisateur admin par défaut
    - Configure les politiques RLS appropriées

  2. Compte par défaut
    - Username: admin
    - Password: Aqsze188665
    - Email: admin@funevent.fr
*/

-- Insérer un utilisateur admin par défaut dans auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@funevent.fr',
  crypt('Aqsze188665', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"username": "admin"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Ajouter l'utilisateur à la table admin_users
INSERT INTO admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'admin@funevent.fr'
ON CONFLICT (id) DO NOTHING;

-- Mettre à jour les politiques RLS pour permettre l'accès public en lecture
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
DROP POLICY IF EXISTS "Anyone can read structures" ON structures;
DROP POLICY IF EXISTS "Anyone can read carousel photos" ON carousel_photos;

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

-- Politiques pour les admins authentifiés
CREATE POLICY "Authenticated users can modify categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can modify structures"
  ON structures
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can modify carousel photos"
  ON carousel_photos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);