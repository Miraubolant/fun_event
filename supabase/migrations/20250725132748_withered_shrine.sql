/*
  # Ajouter la gestion de l'ordre des structures

  1. Modifications
    - Ajouter une colonne `order_position` à la table `structures`
    - Définir des valeurs par défaut pour les structures existantes
    - Ajouter un index pour optimiser les requêtes de tri

  2. Fonctionnalités
    - Permet de réorganiser l'ordre d'affichage des structures
    - Ordre par défaut basé sur l'ID de création
*/

-- Ajouter la colonne order_position à la table structures
ALTER TABLE structures 
ADD COLUMN IF NOT EXISTS order_position integer DEFAULT 1;

-- Mettre à jour les structures existantes avec un ordre basé sur leur ID
UPDATE structures 
SET order_position = (
  SELECT ROW_NUMBER() OVER (ORDER BY created_at, id)
  FROM structures s2 
  WHERE s2.id = structures.id
)
WHERE order_position IS NULL OR order_position = 1;

-- Ajouter un index pour optimiser les requêtes de tri
CREATE INDEX IF NOT EXISTS idx_structures_order_position 
ON structures(order_position);

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN structures.order_position IS 'Position d''affichage de la structure dans le carrousel (1 = premier)';