/*
  # Initial Schema Setup for Law Library App

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to auth.users
      - `email` (text) - User's email
      - `name` (text) - User's full name
      - `avatar_url` (text) - URL to user's avatar
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `books`
      - `id` (uuid, primary key)
      - `title` (text) - Book title
      - `sections_count` (integer) - Number of sections
      - `is_pinned` (boolean) - Whether book is pinned
      - `is_new` (boolean) - Whether book is new
      - `last_accessed` (timestamp)
      - `last_updated` (timestamp)
      - `created_at` (timestamp)
    
    - `sections`
      - `id` (uuid, primary key)
      - `book_id` (uuid) - Reference to books
      - `title` (text) - Section title
      - `description` (text) - Section description
      - `content` (text) - Section content
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Reference to users
      - `section_id` (uuid) - Reference to sections
      - `created_at` (timestamp)
    
    - `tags`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Reference to users
      - `name` (text) - Tag name
      - `color` (text) - Tag color
      - `created_at` (timestamp)
    
    - `section_tags`
      - `id` (uuid, primary key)
      - `tag_id` (uuid) - Reference to tags
      - `section_id` (uuid) - Reference to sections
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sections_count integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  is_new boolean DEFAULT true,
  last_accessed timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE NOT NULL,
  section_id uuid REFERENCES sections ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, section_id)
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#4294ff',
  created_at timestamptz DEFAULT now()
);

-- Create section_tags table
CREATE TABLE IF NOT EXISTS section_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_id uuid REFERENCES tags ON DELETE CASCADE NOT NULL,
  section_id uuid REFERENCES sections ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tag_id, section_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Books policies (public read, admin write)
CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  TO authenticated
  USING (true);

-- Sections policies (public read, admin write)
CREATE POLICY "Anyone can view sections"
  ON sections FOR SELECT
  TO authenticated
  USING (true);

-- Favorites policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Tags policies
CREATE POLICY "Users can view own tags"
  ON tags FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own tags"
  ON tags FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Section tags policies
CREATE POLICY "Users can view own section tags"
  ON section_tags FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tags
      WHERE tags.id = section_tags.tag_id
      AND tags.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own section tags"
  ON section_tags FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tags
      WHERE tags.id = section_tags.tag_id
      AND tags.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own section tags"
  ON section_tags FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tags
      WHERE tags.id = section_tags.tag_id
      AND tags.user_id = auth.uid()
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();