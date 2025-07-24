/*
  # Fix admin_users RLS policies

  1. Security Updates
    - Drop existing restrictive policies
    - Add policy allowing authenticated users to insert their own admin record
    - Add policy for reading own admin data
    - Add policy for updating own admin data

  2. Notes
    - Allows users to create their own admin record during signup
    - Maintains security by only allowing users to manage their own records
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own admin data" ON admin_users;
DROP POLICY IF EXISTS "Users can modify own admin data" ON admin_users;

-- Allow authenticated users to insert their own admin record
CREATE POLICY "Users can insert own admin data"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to read their own admin data
CREATE POLICY "Users can read own admin data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to update their own admin data
CREATE POLICY "Users can update own admin data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to delete their own admin data
CREATE POLICY "Users can delete own admin data"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);