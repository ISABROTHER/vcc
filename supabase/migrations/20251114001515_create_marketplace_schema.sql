/*
  # Visit Cape Coast Marketplace Schema

  1. New Tables
    - `experiences`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text: tours, cultural, castle, adventure, food, creative)
      - `price` (numeric)
      - `duration` (text)
      - `image_url` (text)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text: hotel, guest_house, beach, budget)
      - `price_range` (text)
      - `image_url` (text)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `event_date` (timestamptz)
      - `location` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (tourist website)
*/

CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  duration text NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price_range text NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to experiences"
  ON experiences FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access to hotels"
  ON hotels FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access to events"
  ON events FOR SELECT
  TO anon
  USING (true);