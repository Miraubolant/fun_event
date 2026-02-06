/*
  # Création des tables FAQ

  1. Nouvelles Tables
    - `faq_categories`
      - `id` (uuid, primary key)
      - `category` (text) - Nom de la catégorie
      - `icon` (text) - Icône emoji
      - `color` (text) - Classe CSS pour la couleur
      - `order_position` (integer) - Position d'affichage
      - `created_at`, `updated_at` (timestamp)
    
    - `faq_questions`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `question` (text) - Question
      - `answer` (text) - Réponse
      - `order_position` (integer) - Position dans la catégorie
      - `created_at`, `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur les deux tables
    - Lecture publique pour tous
    - Modification uniquement pour admin@funevent.fr

  3. Données par défaut
    - 3 catégories avec questions courantes
*/

-- Créer la table des catégories FAQ
CREATE TABLE IF NOT EXISTS faq_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  icon text NOT NULL DEFAULT '❓',
  color text NOT NULL DEFAULT 'bg-gradient-to-r from-blue-500 to-orange-500',
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Créer la table des questions FAQ
CREATE TABLE IF NOT EXISTS faq_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES faq_categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_questions ENABLE ROW LEVEL SECURITY;

-- Politiques pour faq_categories
CREATE POLICY "Anyone can read faq_categories"
  ON faq_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert faq_categories"
  ON faq_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update faq_categories"
  ON faq_categories
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete faq_categories"
  ON faq_categories
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Politiques pour faq_questions
CREATE POLICY "Anyone can read faq_questions"
  ON faq_questions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert faq_questions"
  ON faq_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can update faq_questions"
  ON faq_questions
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete faq_questions"
  ON faq_questions
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@funevent.fr');

-- Insérer les catégories par défaut
INSERT INTO faq_categories (category, icon, color, order_position) VALUES
('Réservation & Disponibilité', '📅', 'bg-gradient-to-r from-blue-500 to-blue-600', 1),
('Livraison & Installation', '🚚', 'bg-gradient-to-r from-orange-500 to-orange-600', 2),
('Paiement & Caution', '💳', 'bg-gradient-to-r from-green-500 to-green-600', 3);

-- Insérer les questions par défaut
DO $$
DECLARE
    cat_reservation_id uuid;
    cat_livraison_id uuid;
    cat_paiement_id uuid;
BEGIN
    -- Récupérer les IDs des catégories
    SELECT id INTO cat_reservation_id FROM faq_categories WHERE category = 'Réservation & Disponibilité';
    SELECT id INTO cat_livraison_id FROM faq_categories WHERE category = 'Livraison & Installation';
    SELECT id INTO cat_paiement_id FROM faq_categories WHERE category = 'Paiement & Caution';
    
    -- Questions Réservation
    INSERT INTO faq_questions (category_id, question, answer, order_position) VALUES
    (cat_reservation_id, 'Comment réserver une structure gonflable ?', 'Vous pouvez réserver en nous contactant par téléphone au 06 63 52 80 72, par WhatsApp, ou en remplissant notre formulaire de devis en ligne. Nous vous confirmerons la disponibilité sous 48h.', 1),
    (cat_reservation_id, 'Combien de temps à l''avance dois-je réserver ?', 'Nous recommandons de réserver au moins 1 semaine à l''avance, surtout pour les weekends et périodes de vacances. Pour les événements importants, n''hésitez pas à réserver plusieurs semaines à l''avance.', 2),
    (cat_reservation_id, 'Puis-je annuler ma réservation ?', 'Oui, vous pouvez annuler votre réservation jusqu''à 48h avant la date prévue sans frais. En cas d''annulation tardive, des frais peuvent s''appliquer selon nos conditions générales.', 3),
    
    -- Questions Livraison
    (cat_livraison_id, 'Dans quelles zones livrez-vous ?', 'Nous livrons gratuitement dans toute l''Île-de-France : Paris (75) et tous les départements limitrophes (77, 78, 91, 92, 93, 94, 95). Des frais supplémentaires peuvent s''appliquer pour les zones très éloignées.', 1),
    (cat_livraison_id, 'À quelle heure se fait la livraison ?', 'Nos équipes livrent généralement entre 8h et 10h le matin pour une utilisation dans la journée. Nous vous confirmons un créneau précis la veille de votre événement.', 2),
    (cat_livraison_id, 'Qui s''occupe de l''installation ?', 'Nos équipes professionnelles s''occupent de l''installation complète et de la mise en sécurité de toutes nos structures. L''installation est incluse dans le prix de location.', 3),
    (cat_livraison_id, 'Que se passe-t-il en cas de mauvais temps ?', 'Pour la sécurité de tous, nos structures ne peuvent pas être utilisées en cas de vent fort (>30 km/h) ou d''orage. Nous proposons un report gratuit ou un remboursement selon la météo.', 4),
    
    -- Questions Paiement
    (cat_paiement_id, 'Quels sont vos modes de paiement ?', 'Nous acceptons les paiements par virement bancaire, chèque, espèces ou carte bancaire sur place. Un acompte de 30% est demandé à la réservation, le solde étant dû le jour de la prestation.', 1),
    (cat_paiement_id, 'Demandez-vous une caution ?', 'Oui, une caution de 200€ est demandée pour chaque structure louée. Elle est restituée intégralement après vérification de l''état du matériel, généralement sous 48h.', 2),
    (cat_paiement_id, 'Vos prix incluent-ils la TVA ?', 'Oui, tous nos prix sont affichés TTC (TVA incluse). Ils comprennent la location, la livraison, l''installation, la récupération et l''assurance de nos structures.', 3);
END $$;