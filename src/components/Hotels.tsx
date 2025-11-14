import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

// All your static data, categorized
const allAccommodations = [
  // 1. Hotels
  {
    name: 'Ridge Royal Hotel',
    description: 'Premium business & leisure hotel with pool and conference rooms.',
    category: 'hotels',
    price_range: 'GHS 1200-2000',
    rating: 4.8,
    image_url:
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Lemon Beach Resort',
    description: 'Boutique, beachfront resort, very popular with tourists.',
    category: 'hotels',
    price_range: 'GHS 900-1500',
    rating: 4.7,
    image_url:
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Elmina Beach Resort',
    description:
      'Large hotel with stunning oceanfront views, pool, and event spaces.',
    category: 'hotels',
    price_range: 'GHS 800-1300',
    rating: 4.2,
    image_url:
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 2. Guest Houses
  {
    name: 'Brynx Haven Guest House',
    description: 'Clean, modern, and friendly pricing, located in a quiet area.',
    category: 'guest_houses',
    price_range: 'GHS 400-600',
    rating: 4.5,
    image_url:
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Mighty Victory Hotel',
    description:
      'Popular with academic visitors and families. Affordable, convenient location.',
    category: 'guest_houses',
    price_range: 'GHS 350-550',
    rating: 4.0,
    image_url:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Prospect Lodge',
    description:
      'Comfortable rooms in a peaceful environment. Good for couples.',
    category: 'guest_houses',
    price_range: 'GHS 450-700',
    rating: 4.3,
    image_url:
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 3. Beachfront Lodges
  {
    name: 'Brenu Beach Lodge',
    description:
      'One of the best beach lodges near Cape Coast. Calm, quiet, ocean view cabins.',
    category: 'beachfront',
    price_range: 'GHS 500-800',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Coconut Grove Beach Resort',
    description:
      'Very popular coastal hotel with a large pool, lawns, and beachfront rooms.',
    category: 'beachfront',
    price_range: 'GHS 900-1600',
    rating: 4.4,
    image_url:
      'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Oasis Beach Resort',
    description:
      'Backpacker lodge with beachfront rooms and an amazing beach bar vibe.',
    category: 'beachfront',
    price_range: 'GHS 200-500',
    rating: 4.1,
    image_url:
      'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 4. Airbnb & Vacation Rentals
  {
    name: 'Kískaikkaa Villa',
    description:
      'Modern, entire villa, very good for groups with a stylish interior.',
    category: 'airbnb',
    price_range: 'GHS 2500-4000',
    rating: 4.9,
    image_url:
      'https://images.pexels.com/photos/4172877/pexels-photo-4172877.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Atlantic Blue Beach Apartment',
    description:
      'Beautiful beachfront apartment, perfect for long stays.',
    category: 'airbnb',
    price_range: 'GHS 1000-1800',
    rating: 4.8,
    image_url:
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Cape Coast Family Stay Airbnb',
    description:
      'Entire home, fully serviced. Great for families or small teams.',
    category: 'airbnb',
    price_range: 'GHS 800-1400',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  // 5. Boutique & Heritage Stays
  {
    name: 'One Africa Guest House',
    description:
      'African heritage-themed lodge, popular with diaspora travelers.',
    category: 'boutique',
    price_range: 'GHS 500-900',
    rating: 4.5,
    image_url:
      'https://images.pexels.com/photos/6782473/pexels-photo-6782473.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Baobab Guesthouse',
    description:
      'Social enterprise accommodation with great food and a cultural feel.',
    category: 'boutique',
    price_range: 'GHS 400-700',
    rating: 4.6,
    image_url:
      'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?au
