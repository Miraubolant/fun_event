/*
  # Fix search_path security warning
  
  1. Security Fix
    - Set explicit search_path for trigger function
    - Prevents potential security vulnerabilities
    - Ensures function uses correct schema
*/

-- Drop existing function and recreate with proper search_path
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create the function with explicit search_path for security
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Recreate triggers for all tables that use this function
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_structures_updated_at ON structures;
DROP TRIGGER IF EXISTS update_carousel_photos_updated_at ON carousel_photos;

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_structures_updated_at
    BEFORE UPDATE ON structures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carousel_photos_updated_at
    BEFORE UPDATE ON carousel_photos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();