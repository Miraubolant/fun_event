/*
  # Debug des politiques RLS

  1. Vérification des politiques existantes
  2. Test des permissions d'insertion
  3. Création de politiques temporaires plus permissives si nécessaire
*/

-- Vérifier les politiques existantes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('categories', 'structures', 'carousel_photos', 'admin_users');

-- Vérifier si RLS est activé
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('categories', 'structures', 'carousel_photos', 'admin_users');

-- Vérifier les utilisateurs admin
SELECT * FROM admin_users;

-- Test d'insertion simple (pour debug)
-- Cette requête devrait échouer si les politiques sont trop restrictives
DO $$
BEGIN
  -- Test insertion catégorie
  INSERT INTO categories (label, icon) VALUES ('Test Category', 'test');
  RAISE NOTICE 'Insertion catégorie réussie';
  
  -- Nettoyer le test
  DELETE FROM categories WHERE label = 'Test Category';
  
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Erreur insertion catégorie: %', SQLERRM;
END $$;

-- Créer des politiques temporaires plus permissives pour debug
-- (À supprimer une fois le problème résolu)

-- Politique temporaire pour categories
DROP POLICY IF EXISTS "temp_categories_insert" ON categories;
CREATE POLICY "temp_categories_insert"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique temporaire pour structures  
DROP POLICY IF EXISTS "temp_structures_insert" ON structures;
CREATE POLICY "temp_structures_insert"
  ON structures
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politique temporaire pour carousel_photos
DROP POLICY IF EXISTS "temp_carousel_photos_insert" ON carousel_photos;
CREATE POLICY "temp_carousel_photos_insert"
  ON carousel_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Message de confirmation
SELECT 'Politiques temporaires créées pour debug' as status;