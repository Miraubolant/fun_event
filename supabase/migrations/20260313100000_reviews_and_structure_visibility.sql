-- Add visibility toggle columns to structures
ALTER TABLE structures ADD COLUMN IF NOT EXISTS show_dimensions boolean DEFAULT true;
ALTER TABLE structures ADD COLUMN IF NOT EXISTS show_capacity boolean DEFAULT true;
ALTER TABLE structures ADD COLUMN IF NOT EXISTS show_age boolean DEFAULT true;

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  date text NOT NULL,
  visible boolean DEFAULT true,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access for visible reviews
CREATE POLICY "Public can read visible reviews" ON reviews
  FOR SELECT USING (visible = true);

-- Allow authenticated users full access
CREATE POLICY "Authenticated users can manage reviews" ON reviews
  FOR ALL USING (auth.role() = 'authenticated');
