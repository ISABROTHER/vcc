import {
  MapPin,
  Camera,
  Star,
  Users,
  TreePine,
  Palette,
  Ship,
  Drum,
  Sun,
  Swimmer,
  Bird,
  ShoppingBag,
  Ticket,
  Smile,
  BookOpen,
} from 'lucide-react';
import React from 'react';

// Define types for clarity
interface IListItem {
  name: string;
  icon: React.ElementType;
}

interface ICategory {
  title: string;
  icon: React.ElementType;
  items: IListItem[];
}

// Data for the page
const categories: ICategory[] = [
  {
    title: 'Top Attractions',
    icon: Star,
    items: [
      { name: 'Cape Coast Castle (UNESCO Site)', icon: MapPin },
      { name: 'Elmina Castle', icon: MapPin },
      { name: 'Kakum National Park (Canopy Walk)', icon: TreePine },
      { name: 'Fort William Lighthouse', icon: MapPin },
      { name: 'Assin Manso Ancestral Slave River', icon: MapPin },
      { name: 'Beaches & coastlines', icon: Sun },
    ],
  },
  {
    title: 'Tours & Experiences',
    icon: Users,
    items: [
      { name: 'Heritage & History Tours', icon: BookOpen },
      { name: 'Kakum Forest Hikes', icon: TreePine },
      { name: 'Coastal Boat Rides', icon: Ship },
      { name: 'Cultural Experiences (drumming, cooking)', icon: Drum },
      { name: 'Fishing Village Visits', icon: Users },
      { name: 'Storytelling & Night Tours', icon: BookOpen },
      { name: 'Diaspora Return/Naming Ceremonies', icon: Users },
    ],
  },
  {
    title: 'Outdoor & Nature',
    icon: Camera,
    items: [
      { name: 'Beach activities', icon: Swimmer },
      { name: 'Nature photography', icon: Camera },
      { name: 'Bird watching', icon: Bird },
      { name: 'Eco trails', icon: TreePine },
      { name: 'Picnics & adventure experiences', icon: Sun },
    ],
  },
  {
    title: 'Arts & Culture',
    icon: Palette,
    items: [
      { name: 'Festivals & events', icon: Ticket },
      { name: 'Art markets', icon: ShoppingBag },
      { name: 'Museums', icon: BookOpen },
      { name: 'Local craft shops', icon: ShoppingBag },
      { name: 'Live performances', icon: Drum },
    ],
  },
  {
    title: 'Family Activities',
    icon: Smile,
    items: [
      { name: 'Beach picnics', icon: Sun },
      { name: 'Botel crocodile pond', icon: Swimmer },
      { name: 'Museums', icon: BookOpen },
      { name: 'Kids’ history tours', icon: BookOpen },
    ],
  },
];

// Reusable Category Card Component
const CategoryCard: React.FC<{ category: ICategory }> = ({ category }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="p-6">
      <div className="flex items-center gap-4 mb-5">
        <category.icon className="w-8 h-8 text-yellow-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          {category.title}
        </h2>
      </div>
      <ul className="space-y-3">
        {category.items.map((item) => (
          <li key={item.name} className="flex items-center gap-3">
            <item.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-base text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function SeeDoPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            See & Do
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover the vibrant culture, thrilling adventures, and unique
            activities that await you in Cape Coast.
          </p>
        </div>

        {/* Grid Layout for Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}