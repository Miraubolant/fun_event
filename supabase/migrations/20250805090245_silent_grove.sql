/*
  # Ajouter le support des images additionnelles aux structures

  1. Modifications
    - Ajouter la colonne `additional_images` à la table `structures`
    - Type JSONB pour stocker un tableau d'URLs d'images
    - Valeur par défaut: tableau vide

  2. Sécurité
    - Aucun changement aux politiques RLS existantes
*/

-- Ajouter la colonne pour les images additionnelles
ALTER TABLE structures 
ADD COLUMN IF NOT EXISTS additional_images JSONB DEFAULT '[]'::jsonb;

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN structures.additional_images IS 'Tableau JSON des URLs des images additionnelles de la structure';