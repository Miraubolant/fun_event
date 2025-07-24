-- Vérification des tables et politiques RLS
-- Cette migration aide à diagnostiquer les problèmes d'insertion

-- 1. Vérifier que les tables existent
DO $$
BEGIN
    -- Vérifier la table categories
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'categories') THEN
        RAISE NOTICE 'Table categories existe ✅';
    ELSE
        RAISE NOTICE 'Table categories MANQUANTE ❌';
    END IF;
    
    -- Vérifier la table structures
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'structures') THEN
        RAISE NOTICE 'Table structures existe ✅';
    ELSE
        RAISE NOTICE 'Table structures MANQUANTE ❌';
    END IF;
    
    -- Vérifier la table carousel_photos
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'carousel_photos') THEN
        RAISE NOTICE 'Table carousel_photos existe ✅';
    ELSE
        RAISE NOTICE 'Table carousel_photos MANQUANTE ❌';
    END IF;
END $$;

-- 2. Vérifier les politiques RLS
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
WHERE tablename IN ('categories', 'structures', 'carousel_photos')
ORDER BY tablename, policyname;

-- 3. Vérifier le statut RLS
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('categories', 'structures', 'carousel_photos');

-- 4. Corriger les politiques si nécessaire
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can modify categories" ON categories;
DROP POLICY IF EXISTS "Anyone can read structures" ON structures;
DROP POLICY IF EXISTS "Authenticated users can modify structures" ON structures;
DROP POLICY IF EXISTS "Anyone can read carousel photos" ON carousel_photos;
DROP POLICY IF EXISTS "Authenticated users can modify carousel photos" ON carousel_photos;

-- Créer des politiques plus permissives pour le diagnostic
CREATE POLICY "Public read categories" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Public write categories" ON categories FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Public read structures" ON structures FOR SELECT TO public USING (true);
CREATE POLICY "Public write structures" ON structures FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Public read carousel_photos" ON carousel_photos FOR SELECT TO public USING (true);
CREATE POLICY "Public write carousel_photos" ON carousel_photos FOR ALL TO public USING (true) WITH CHECK (true);

-- 5. Tenter une insertion de test
DO $$
BEGIN
    -- Test insertion catégorie
    BEGIN
        INSERT INTO categories (id, label, icon) 
        VALUES ('test-category-id', 'Test Category', '🧪')
        ON CONFLICT (id) DO NOTHING;
        RAISE NOTICE 'Test insertion catégorie: SUCCESS ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Test insertion catégorie: FAILED ❌ - %', SQLERRM;
    END;
    
    -- Test insertion structure
    BEGIN
        INSERT INTO structures (id, name, category_id, size, capacity, age, price, image, description, available) 
        VALUES ('test-structure-id', 'Test Structure', 'test-category-id', '1x1', '1 personne', '3-99 ans', 50, 'https://example.com/test.jpg', 'Test description', true)
        ON CONFLICT (id) DO NOTHING;
        RAISE NOTICE 'Test insertion structure: SUCCESS ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Test insertion structure: FAILED ❌ - %', SQLERRM;
    END;
    
    -- Test insertion photo
    BEGIN
        INSERT INTO carousel_photos (id, url, alt, order_position) 
        VALUES ('test-photo-id', 'https://example.com/test.jpg', 'Test photo', 1)
        ON CONFLICT (id) DO NOTHING;
        RAISE NOTICE 'Test insertion photo: SUCCESS ✅';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Test insertion photo: FAILED ❌ - %', SQLERRM;
    END;
END $$;

-- 6. Nettoyer les données de test
DELETE FROM structures WHERE id = 'test-structure-id';
DELETE FROM categories WHERE id = 'test-category-id';
DELETE FROM carousel_photos WHERE id = 'test-photo-id';

RAISE NOTICE 'Diagnostic terminé - Vérifiez les logs ci-dessus';