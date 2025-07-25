/*
  # Correction définitive de la connexion administrateur

  1. Suppression de toutes les politiques RLS problématiques
  2. Création de politiques simples et fonctionnelles
  3. Activation de l'accès pour l'administrateur existant
*/

-- Supprimer toutes les politiques existantes sur admin_users
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow authenticated users to insert into admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow users to delete their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Allow users to update their own admin record" ON admin_users;

-- Désactiver temporairement RLS pour corriger le problème
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Réactiver RLS avec des politiques simples
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Politique de lecture : tous les utilisateurs authentifiés peuvent lire
CREATE POLICY "Enable read access for authenticated users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Politique d'insertion : les utilisateurs peuvent s'insérer eux-mêmes
CREATE POLICY "Enable insert for users based on user_id" ON admin_users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Politique de mise à jour : les utilisateurs peuvent modifier leur propre enregistrement
CREATE POLICY "Enable update for users based on user_id" ON admin_users
    FOR UPDATE USING (auth.uid() = id);

-- Politique de suppression : les utilisateurs peuvent supprimer leur propre enregistrement
CREATE POLICY "Enable delete for users based on user_id" ON admin_users
    FOR DELETE USING (auth.uid() = id);

-- Vérifier que l'utilisateur admin existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = 'victor@mirault.com'
    ) THEN
        -- Si l'utilisateur n'existe pas, l'insérer
        INSERT INTO admin_users (id, email, role)
        VALUES (
            '91506ae4-1fd5-44df-9c95-6b699a0bc6d1'::uuid,
            'victor@mirault.com',
            'admin'
        );
    END IF;
END $$;