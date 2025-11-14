import { useState } from 'react';
import {
  MapPin,
  Star,
  X,
  Wifi,
  Wind,
  Tv,
  Utensils,
  ParkingCircle,
  Briefcase,
  Check,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

// NEW: Expanded Hotel Interface
interface Hotel {
  id: string;
  name: string;
  description: string; // Short description for the card
  general_info: string; // Long description for the modal
  category: string; // New category IDs
  price_range: string;
  rating: number;
  image_url: string;
  facilities: string[];
  contact: {
    phone: string;
    email: string;
    web: string;
    address: string;
  };
}

// NEW: Updated data with all details for the modal
const allAccommodations: Hotel[] = [
  // 1. Hotel & Guest House
  {
    id: 'ridge_royal',
    name: 'Ridge Royal Hotel',
    description: 'Premium business & leisure hotel with pool and conference rooms.',
    general_info: 'Ridge Royal Hotel is a centrally located, premium hotel perfect for both business and leisure travelers. We offer state-of-the-art conference facilities, a relaxing pool area, and an on-site restaurant serving local and continental dishes.',
    category: 'hotel_and_guest_house',
    price_range: 'GHS 1200-2000',
    rating: 4.8,
    image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Wi-Fi Included', 'Swimming Pool', 'Air Conditioning', 'Restaurant', 'Conference Rooms', 'Parking'],
    contact: {
      phone: '+233 33 209 1818',
      email: 'info@ridgeroyal.com',
      web: 'ridgeroyal.com',
      address: 'Ridge, Cape Coast, Ghana',
    },
  },
  {
    id: 'brynx_haven',
    name: 'Brynx Haven Guest House',
    description: 'Clean, modern, and friendly pricing, located in a quiet area.',
    general_info: 'Brynx Haven offers a clean, modern, and peaceful retreat from the bustle of the city. Our guest house is family-run, providing a personal touch with comfortable rooms, each equipped with good beds, a refrigerator, and Wi-Fi.',
    category: 'hotel_and_guest_house',
    price_range: 'GHS 400-600',
    rating: 4.5,
    image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Wi-Fi Included', 'Air Conditioning', 'Refrigerator', 'Family Rooms', 'Free Parking'],
    contact: {
      phone: '+233 24 412 3456',
      email: 'info@brynxhaven.com',
      web: 'brynxhaven.com',
      address: 'Adisadel, Cape Coast, Ghana',
    },
  },
  {
    id: 'mighty_victory',
    name: 'Mighty Victory Hotel',
    description: 'Popular with academic visitors and families. Affordable, convenient location.',
    general_info: 'Located conveniently, Mighty Victory is a favorite for families and academic visitors to UCC. We provide affordable, clean rooms with options for private or shared bathrooms, and a communal kitchen for self-catering.',
    category: 'hotel_and_guest_house',
    price_range: 'GHS 350-550',
    rating: 4.0,
    image_url: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Wi-Fi Included', 'Kitchen/Self-catering', 'Family Rooms', 'Laundry Service', 'Parking'],
    contact: {
      phone: '+233 33 213 2255',
      email: 'info@mightyvictory.com',
      web: 'mightyvictory.com',
      address: 'Ola, Cape Coast, Ghana',
    },
  },

  // 2. Beachfront
  {
    id: 'coconut_grove',
    name: 'Coconut Grove Beach Resort',
    description: 'Very popular coastal hotel with a large pool, lawns, and beachfront rooms.',
    general_info: 'A renowned resort in Elmina, Coconut Grove offers a sprawling beachfront property with a golf course, pool, and multiple restaurants. It\'s the perfect getaway for relaxation, family vacations, and large events.',
    category: 'beachfront',
    price_range: 'GHS 900-1600',
    rating: 4.4,
    image_url: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Swimming Pool', 'Beach Access', 'Restaurant', 'Wi-Fi Included', 'Golf Course', 'Air Conditioning'],
    contact: {
      phone: '+233 33 213 3646',
      email: 'info@coconutgrove.com',
      web: 'coconutgrove.com',
      address: 'Elmina, Ghana',
    },
  },
  {
    id: 'oasis_beach',
    name: 'Oasis Beach Resort',
    description: 'Backpacker lodge with beachfront rooms and an amazing beach bar vibe.',
    general_info: 'The heart of Cape Coast\'s beach vibe, Oasis is famous for its lively bar, restaurant, and mix of accommodation from budget dorms to private beachfront rooms. Perfect for backpackers and those looking to socialize.',
    category: 'beachfront',
    price_range: 'GHS 200-500',
    rating: 4.1,
    image_url: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Beach Access', 'Restaurant', 'Bar/Nightlife', 'Wi-Fi Included', 'Luggage Storage', 'Budget-friendly'],
    contact: {
      phone: '+233 24 489 1572',
      email: 'info@oasisbeach.com',
      web: 'oasisbeach.com',
      address: 'Victoria Park, Cape Coast, Ghana',
    },
  },

  // 3. Airbnb
  {
    id: 'kiskaikkaa_villa',
    name: 'Kískaikkaa Villa',
    description: 'Modern, entire villa, very good for groups with a stylish interior.',
    general_info: 'A fully-serviced, modern villa available for short-term rental. Featuring a stylish interior, private spaces, and a full kitchen, Kískaikkaa Villa is the perfect high-end choice for groups or families seeking privacy.',
    category: 'airbnb',
    price_range: 'GHS 2500-4000',
    rating: 4.9,
    image_url: 'https://images.pexels.com/photos/4172877/pexels-photo-4172877.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Entire Villa', 'Full Kitchen', 'Wi-Fi Included', 'Air Conditioning', 'Private Parking', 'Suitable for Groups'],
    contact: {
      phone: 'Via Airbnb',
      email: 'Via Airbnb',
      web: 'airbnb.com',
      address: 'Cape Coast, Ghana',
    },
  },
  {
    id: 'atlantic_blue_apt',
    name: 'Atlantic Blue Beach Apartment',
    description: 'Beautiful beachfront apartment, perfect for long stays.',
    general_info: 'Wake up to the sound of the ocean in this beautiful, modern apartment. Fully furnished with a balcony overlooking the Atlantic, it\'s an ideal spot for long-term stays, remote work, or a romantic getaway.',
    category: 'airbnb',
    price_range: 'GHS 1000-1800',
    rating: 4.8,
    image_url: 'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Beachfront', 'Full Kitchen', 'Wi-Fi Included', 'Air Conditioning', 'Balcony', 'Long-term Stays'],
    contact: {
      phone: 'Via Airbnb',
      email: 'Via Airbnb',
      web: 'airbnb.com',
      address: 'Cape Coast, Ghana',
    },
  },
  
  // 4. Cultural Stays
  {
    id: 'one_africa',
    name: 'One Africa Guest House',
    description: 'African heritage-themed lodge, popular with diaspora travelers.',
    general_info: 'One Africa is more than a guest house; it\'s a cultural experience. Popular with diaspora travelers, it features African heritage-themed decor, an on-site health food restaurant, and a welcoming community feel.',
    category: 'cultural',
    price_range: 'GHS 500-900',
    rating: 4.5,
    image_url: 'https://images.pexels.com/photos/6782473/pexels-photo-6782473.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Restaurant', 'Wi-Fi Included', 'Cultural Theme', 'Airport Pickup', 'Tour Bookings'],
    contact: {
      phone: '+233 24 458 2513',
      email: 'info@oneafrica.com',
      web: 'oneafrica.com',
      address: 'Elmina, Ghana',
    },
  },
  {
    id: 'baobab_guesthouse',
    name: 'Baobab Guesthouse',
    description: 'Social enterprise accommodation with great food and a cultural feel.',
    general_info: 'Baobab Guesthouse is a social enterprise, with profits supporting local community projects. It offers a unique cultural feel, amazing home-cooked food, and a chance to connect with both travelers and the local community.',
    category: 'cultural',
    price_range: 'GHS 400-700',
    rating: 4.6,
    image_url: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: ['Restaurant', 'Wi-Fi Included', 'Social Enterprise', 'Fan Rooms', 'Garden'],
    contact: {
      phone: '+233 55 112 2334',
      email: 'info@baobabgh.com',
      web: 'baobabgh.com',
      address: 'Cape Coast, Ghana',
    },
  },
];

// NEW: Updated filter categories to match your list
const categories = [
  'all',
  'hotel_and_guest_house',
  'beachfront',
  'airbnb',
  'cultural',
];

// A helper to map facility strings to icons
const FacilityIcon = ({ facility }: { facility: string }) => {
  if (facility.toLowerCase().includes('wi-fi')) return <Wifi size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('pool')) return <Check size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('air conditioning')) return <Wind size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('restaurant')) return <Utensils size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('parking')) return <ParkingCircle size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('conference')) return <Briefcase size={16} className="mr-2" />;
  if (facility.toLowerCase().includes('kitchen')) return <Tv size={16} className="mr-2" />;
  return <Check size={16} className="mr-2 text-blue-600" />;
};

export default function Hotels() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const filteredHotels = selectedCategory === 'all'
    ? allAccommodations
    : allAccommodations.filter(hotel => hotel.category === selectedCategory);

  return (
    <section id="hotels" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Hotels & Accommodation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect place to stay during your visit
          </p>
        </div>

        {/* UPDATED: Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* UPDATED: Grid maps static data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map(hotel => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer"
              onClick={() => setSelectedHotel(hotel)} // NEW: Click to open modal
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold">{hotel.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {hotel.category.replace(/_/g, ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>{hotel.contact.address}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-900 font-bold text-lg">{hotel.price_range}</span>
                  <span className="text-gray-500 text-sm">per night</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents modal from opening when button is clicked
                    // Add booking logic here
                  }}
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                >
                  Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found in this category yet.</p>
          </div>
        )}
      </div>

      {/* NEW: Hotel Details Modal */}
      {selectedHotel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedHotel(null)} // Click backdrop to close
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()} // Prevent content click from closing modal
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img 
                src={selectedHotel.image_url} 
                alt={selectedHotel.name} 
                className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" 
              />
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <button 
                onClick={() => setSelectedHotel(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-bold text-blue-900 mb-4">{selectedHotel.name}</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">General Information</h3>
                <p className="text-gray-600">{selectedHotel.general_info}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Facilities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedHotel.facilities.map(facility => (
                    <div key={facility} className="flex items-center text-gray-600">
                      <FacilityIcon facility={facility} />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Phone size={16} /> <span>{selectedHotel.contact.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} /> <span>{selectedHotel.contact.email}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe size={16} /> <span>{selectedHotel.contact.web}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-1" /> <span>{selectedHotel.contact.address}</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}