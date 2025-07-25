/*
  # Création du premier utilisateur administrateur

  Cette migration crée le premier utilisateur administrateur.
  Vous devrez d'abord créer un compte via l'interface Supabase Auth,
  puis exécuter cette migration en remplaçant l'email par le vôtre.
*/

-- Insérer l'utilisateur admin (remplacez l'email par le vôtre)
-- Vous devez d'abord créer ce compte via l'interface Supabase Auth
INSERT INTO admin_users (id, email, role)
SELECT 
  id,
  email,
  'admin'
FROM auth.users 
WHERE email = 'admin@funevent.fr'  -- Remplacez par votre email
ON CONFLICT (id) DO NOTHING;