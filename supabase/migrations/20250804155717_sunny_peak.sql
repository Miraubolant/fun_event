/*
  # Ajouter la colonne structure_id à carousel_photos

  1. Modifications
    - Ajouter la colonne `structure_id` (uuid, optionnel) à la table `carousel_photos`
    - Ajouter une contrainte de clé étrangère vers la table `structures`
    - Permettre la valeur NULL pour les photos non associées à une structure

  2. Sécurité
    - La contrainte de clé étrangère assure l'intégrité référentielle
    - Suppression en cascade si une structure est supprimée
*/

-- Ajouter la colonne structure_id à la table carousel_photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'carousel_photos' AND column_name = 'structure_id'
  ) THEN
    ALTER TABLE carousel_photos ADD COLUMN structure_id uuid;
  END IF;
END $$;

-- Ajouter la contrainte de clé étrangère si elle n'existe pas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'carousel_photos_structure_id_fkey'
  ) THEN
    ALTER TABLE carousel_photos 
    ADD CONSTRAINT carousel_photos_structure_id_fkey 
    FOREIGN KEY (structure_id) REFERENCES structures(id) ON DELETE SET NULL;
  END IF;
END $$;