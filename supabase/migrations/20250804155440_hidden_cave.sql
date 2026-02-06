/*
  # Ajouter la colonne custom_pricing à la table structures

  1. Modifications
    - Ajouter la colonne `custom_pricing` (boolean) à la table `structures`
    - Valeur par défaut : false
    - Permet de définir si une structure a un prix sur mesure

  2. Sécurité
    - Aucune modification des politiques RLS nécessaire
    - La colonne hérite des politiques existantes de la table
*/

-- Ajouter la colonne custom_pricing à la table structures
ALTER TABLE structures 
ADD COLUMN IF NOT EXISTS custom_pricing BOOLEAN DEFAULT FALSE;