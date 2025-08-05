/*
  # Création de la table FAQ

  1. Nouvelle Table
    - `faq_categories`
      - `id` (uuid, primary key)
      - `category` (text, nom de la catégorie)
      - `icon` (text, icône de la catégorie)
      - `color` (text, couleur de la catégorie)
      - `order_position` (integer, ordre d'affichage)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `faq_questions`
      - `id` (uuid, primary key)
      - `category_id` (uuid, référence vers faq_categories)
      - `question` (text, la question)
      - `answer` (text, la réponse)
      - `order_position` (integer, ordre dans la catégorie)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Enable RLS sur les deux tables
    - Lecture publique pour tous
    - Modification uniquement pour l'admin
*/

-- Table des catégories FAQ
CREATE TABLE IF NOT EXISTS faq_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  icon text NOT NULL DEFAULT '🎪',
  color text NOT NULL DEFAULT 'bg-gradient-to-r from-blue-500 to-orange-500',
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des questions FAQ
CREATE TABLE IF NOT EXISTS faq_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES faq_categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  order_position integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_faq_categories_order ON faq_categories(order_position);
CREATE INDEX IF NOT EXISTS idx_faq_questions_category ON faq_questions(category_id, order_position);

-- Enable RLS
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_questions ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité pour faq_categories
CREATE POLICY "Anyone can read faq_categories"
  ON faq_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert faq_categories"
  ON faq_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update faq_categories"
  ON faq_categories
  FOR UPDATE
  TO authenticated
  USING (email() = 'admin@funevent.fr')
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete faq_categories"
  ON faq_categories
  FOR DELETE
  TO authenticated
  USING (email() = 'admin@funevent.fr');

-- Politiques de sécurité pour faq_questions
CREATE POLICY "Anyone can read faq_questions"
  ON faq_questions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert faq_questions"
  ON faq_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can update faq_questions"
  ON faq_questions
  FOR UPDATE
  TO authenticated
  USING (email() = 'admin@funevent.fr')
  WITH CHECK (email() = 'admin@funevent.fr');

CREATE POLICY "Only admin can delete faq_questions"
  ON faq_questions
  FOR DELETE
  TO authenticated
  USING (email() = 'admin@funevent.fr');

-- Insérer les données par défaut
INSERT INTO faq_categories (category, icon, color, order_position) VALUES
('Réservation', '📅', 'bg-gradient-to-r from-blue-500 to-orange-500', 1),
('Livraison & Installation', '🚚', 'bg-gradient-to-r from-orange-500 to-blue-500', 2),
('Paiement & Caution', '💳', 'bg-gradient-to-r from-blue-500 to-orange-500', 3);

-- Insérer les questions par défaut pour la catégorie Réservation
INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Comment se déroule une réservation sur fun-event ?',
  'Vous pouvez effectuer votre demande de réservation via notre site internet, par téléphone ou par email. Une fois votre demande reçue, nous vous enverrons un devis personnalisé. La réservation sera confirmée dès réception de votre accord écrit et du paiement de l''acompte.',
  1
FROM faq_categories WHERE category = 'Réservation';

INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Y a-t-il un acompte à déposer pour bloquer ma réservation ?',
  'Vous pouvez effectuer votre demande de réservation via notre site internet, par téléphone ou par email. Une fois votre demande reçue, nous vous enverrons un devis personnalisé. La réservation sera confirmée dès réception de votre accord écrit et du paiement de l''acompte.',
  2
FROM faq_categories WHERE category = 'Réservation';

INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Quels sont les délais pour annuler une réservation ?',
  'Vous pouvez annuler votre réservation jusqu''à 7 jours avant la date prévue sans frais. Passé ce délai, l''acompte versé ne pourra pas être remboursé.',
  3
FROM faq_categories WHERE category = 'Réservation';

INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Comment savoir si ma demande de devis a bien été prise en compte ?',
  'Une fois votre demande envoyée, vous recevrez un accusé de réception par mail. Nous vous contacterons ensuite rapidement pour finaliser les détails et vous transmettre le devis.',
  4
FROM faq_categories WHERE category = 'Réservation';

-- Question pour Livraison & Installation
INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Assurez-vous la livraison et l''installation ?',
  'Oui, Fun Event propose un service de livraison, d''installation et de démontage des structures gonflables et du matériel loué. Ce service est assuré par notre équipe et est facturé en supplément. Le tarif dépend de la distance et du type de matériel à installer. Tous les détails sont indiqués dans le devis personnalisé.',
  1
FROM faq_categories WHERE category = 'Livraison & Installation';

-- Questions pour Paiement & Caution
INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Y a-t-il une caution à verser ?',
  'Oui, une caution est demandée le jour de la prestation ou à la livraison du matériel. Elle est restituée à la fin de la prestation après vérification du bon état du matériel.',
  1
FROM faq_categories WHERE category = 'Paiement & Caution';

INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'Quels sont les moyens de paiement acceptés par Fun Event ?',
  'Nous acceptons les paiements par virement bancaire, carte bancaire, ou espèces. Tous les détails sont indiqués sur le devis et la facture.',
  2
FROM faq_categories WHERE category = 'Paiement & Caution';

INSERT INTO faq_questions (category_id, question, answer, order_position) 
SELECT 
  id,
  'À quel moment le paiement doit-il être effectué ?',
  'L''acompte est à verser au moment de la réservation. Le solde peut être réglé soit avant la prestation, soit le jour même, avant l''installation.',
  3
FROM faq_categories WHERE category = 'Paiement & Caution';