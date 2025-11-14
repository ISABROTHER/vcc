import { useState } from 'react';
import {
  MapPin,
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
  Waves, // for Pool/Beach
  Coffee, // for Tea/Coffee
  Users, // for Family Room
  Archive, // for Luggage Storage
  Baby, // for Baby Bed
  Sun, // for Balcony
  Wheelchair, // for Accessibility
  Droplets, // for Bathtub
  Dog, // for Pets
  Trees, // for Garden
  Sparkles, // for Cultural
} from 'lucide-react';

// NEW: Expanded Hotel Interface
interface Hotel {
  id: string;
  name: string;
  description: string; // Short description for the card
  about_us: string; // Long description for the modal
  category: string; // New category IDs
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
    about_us:
      'Ridge Royal Hotel is a centrally located, premium hotel perfect for both business and leisure travelers. We offer state-of-the-art conference facilities, a relaxing pool area, and an on-site restaurant serving local and continental dishes.',
    category: 'hotel_and_guest_house',
    image_url:
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Wi-Fi Included',
      'Swimming Pool',
      'Air Conditioning',
      'Restaurant',
      'Conference Rooms',
      'Paid Parking',
    ],
    contact: {
      phone: '+233 33 209 1818',
      email: 'info@ridgeroyal.com',
      web: 'https://ridgeroyal.com',
      address: 'Ridge, Cape Coast, Ghana',
    },
  },
  {
    id: 'brynx_haven',
    name: 'Brynx Haven Guest House',
    description: 'Clean, modern, and friendly pricing, located in a quiet area.',
    about_us:
      'Brynx Haven offers a clean, modern, and peaceful retreat from the bustle of the city. Our guest house is family-run, providing a personal touch with comfortable rooms, each equipped with good beds, a refrigerator, and Wi-Fi.',
    category: 'hotel_and_guest_house',
    image_url:
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Wi-Fi Included',
      'Air Conditioning',
      'Refrigerator',
      'Family Room',
      'Free Parking',
      'Television',
    ],
    contact: {
      phone: '+233 24 412 3456',
      email: 'info@brynxhaven.com',
      web: 'http://www.brynxhaven.com',
      address: 'Adisadel, Cape Coast, Ghana',
    },
  },
  {
    id: 'mighty_victory',
    name: 'Mighty Victory Hotel',
    description:
      'Popular with academic visitors and families. Affordable, convenient location.',
    about_us:
      'Located conveniently, Mighty Victory is a favorite for families and academic visitors to UCC. We provide affordable, clean rooms with options for private or shared bathrooms, and a communal kitchen for self-catering.',
    category: 'hotel_and_guest_house',
    image_url:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Wi-Fi Included',
      'Kitchen/Self-catering',
      'Family Room',
      'Wash & Dry Clothes',
      'Parking',
    ],
    contact: {
      phone: '+233 33 213 2255',
      email: 'info@mightyvictory.com',
      web: 'http://www.mightyvictory.com',
      address: 'Ola, Cape Coast, Ghana',
    },
  },

  // 2. Beachfront
  {
    id: 'coconut_grove',
    name: 'Coconut Grove Beach Resort',
    description:
      'Very popular coastal hotel with a large pool, lawns, and beachfront rooms.',
    about_us:
      'A renowned resort in Elmina, Coconut Grove offers a sprawling beachfront property with a golf course, pool, and multiple restaurants. It\'s the perfect getaway for relaxation, family vacations, and large events.',
    category: 'beachfront',
    image_url:
      'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Swimming Pool',
      'Sea View',
      'Restaurant',
      'Wi-Fi Included',
      'Golf Course',
      'Air Conditioning',
    ],
    contact: {
      phone: '+233 33 213 3646',
      email: 'info@coconutgrove.com',
      web: 'http://www.coconutgrove.com',
      address: 'Elmina, Ghana',
    },
  },
  {
    id: 'oasis_beach',
    name: 'Oasis Beach Resort',
    description:
      'Backpacker lodge with beachfront rooms and an amazing beach bar vibe.',
    about_us:
      'The heart of Cape Coast\'s beach vibe, Oasis is famous for its lively bar, restaurant, and mix of accommodation from budget dorms to private beachfront rooms. Perfect for backpackers and those looking to socialize.',
    category: 'beachfront',
    image_url:
      'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Sea View',
      'Restaurant',
      'Bar',
      'Luggage Storage',
      'Wi-Fi Included',
      'Pets Allowed',
    ],
    contact: {
      phone: '+233 24 489 1572',
      email: 'info@oasisbeach.com',
      web: 'http://www.oasisbeach.com',
      address: 'Victoria Park, Cape Coast, Ghana',
    },
  },
  {
    id: 'lemon_beach',
    name: 'Lemon Beach Resort',
    description: 'Boutique, beachfront resort, very popular with tourists.',
    about_us:
      'A boutique beachfront resort with excellent reviews. We offer a quiet, premium experience with beautifully decorated rooms, an on-site restaurant, and direct access to a clean, private beach.',
    category: 'beachfront',
    image_url:
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Sea View',
      'Restaurant',
      'Wi-Fi Included',
      'Air Conditioning',
      'Private Bathroom',
      'Balcony',
    ],
    contact: {
      phone: '+233 55 555 1234',
      email: 'info@lemonbeach.com',
      web: 'http://www.lemonbeach.com',
      address: 'Elmina, Ghana',
    },
  },

  // 3. Airbnb
  {
    id: 'kiskaikkaa_villa',
    name: 'Kískaikkaa Villa',
    description:
      'Modern, entire villa, very good for groups with a stylish interior.',
    about_us:
      'A fully-serviced, modern villa available for short-term rental. Featuring a stylish interior, private spaces, and a full kitchen, Kískaikkaa Villa is the perfect high-end choice for groups or families seeking privacy.',
    category: 'airbnb',
    image_url:
      'https://images.pexels.com/photos/4172877/pexels-photo-4172877.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Full Kitchen',
      'Wi-Fi Included',
      'Air Conditioning',
      'Family Room',
      'Television',
      'Private Parking',
    ],
    contact: {
      phone: 'Via Airbnb',
      email: 'Via Airbnb',
      web: 'https://www.airbnb.com',
      address: 'Cape Coast, Ghana',
    },
  },
  {
    id: 'atlantic_blue_apt',
    name: 'Atlantic Blue Beach Apartment',
    description: 'Beautiful beachfront apartment, perfect for long stays.',
    about_us:
      'Wake up to the sound of the ocean in this beautiful, modern apartment. Fully furnished with a balcony overlooking the Atlantic, it\'s an ideal spot for long-term stays, remote work, or a romantic getaway.',
    category: 'airbnb',
    image_url:
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Sea View',
      'Full Kitchen',
      'Wi-Fi Included',
      'Air Conditioning',
      'Balcony',
      'Wash & Dry Clothes',
    ],
    contact: {
      phone: 'Via Airbnb',
      email: 'Via Airbnb',
      web: 'https://www.airbnb.com',
      address: 'Cape Coast, Ghana',
    },
  },

  // 4. Cultural Stays
  {
    id: 'one_africa',
    name: 'One Africa Guest House',
    description:
      'African heritage-themed lodge, popular with diaspora travelers.',
    about_us:
      'One Africa is more than a guest house; it\'s a cultural experience. Popular with diaspora travelers, it features African heritage-themed decor, an on-site health food restaurant, and a welcoming community feel.',
    category: 'cultural',
    image_url:
      'https://images.pexels.com/photos/6782473/pexels-photo-6782473.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Restaurant',
      'Wi-Fi Included',
      'Cultural Theme',
      'Airport Bus Stop',
      'Vegan',
      'Vegetarian',
    ],
    contact: {
      phone: '+233 24 458 2513',
      email: 'info@oneafrica.com',
      web: 'http://www.oneafrica.com',
      address: 'Elmina, Ghana',
    },
  },
  {
    id: 'baobab_guesthouse',
    name: 'Baobab Guesthouse',
    description:
      'Social enterprise accommodation with great food and a cultural feel.',
    about_us:
      'Baobab Guesthouse is a social enterprise, with profits supporting local community projects. It offers a unique cultural feel, amazing home-cooked food, and a chance to connect with both travelers and the local community.',
    category: 'cultural',
    image_url:
      'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Restaurant',
      'Wi-Fi Included',
      'Environmentally Certified',
      'Garden',
      'Vegetarian',
    ],
    contact: {
      phone: '+233 55 112 2334',
      email: 'info@baobabgh.com',
      web: 'http://www.baobabgh.com',
      address: 'Cape Coast, Ghana',
    },
  },
  {
    id: 'hans_cottage',
    name: 'Hans Cottage Botel',
    description:
      'Famous nature lodge with a crocodile pond, popular with backpackers.',
    about_us:
      'Stay in a unique "botel" built over a pond filled with crocodiles! Hans Cottage is a famous landmark, offering rooms, a restaurant, and the unforgettable experience of watching and even touching crocodiles.',
    category: 'cultural',
    image_url:
      'https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=800',
    facilities: [
      'Restaurant',
      'Swimming Pool',
      'Pets Allowed',
      'Family Room',
      'Tea/Coffee Maker',
    ],
    contact: {
      phone: '+233 33 213 3646',
      email: 'info@hanscottage.com',
      web: 'http://www.hanscottage.com',
      address: 'Kakum National Park Road, Ghana',
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

// NEW: A more comprehensive helper to map facility strings to icons
const FacilityIcon = ({ facility }: { facility: string }) => {
  const lowerFacility = facility.toLowerCase();
  if (lowerFacility.includes('wi-fi'))
    return <Wifi size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('pool'))
    return <Waves size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('air conditioning'))
    return <Wind size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('restaurant'))
    return <Utensils size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('parking'))
    return <ParkingCircle size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('conference'))
    return <Briefcase size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('kitchen'))
    return <Utensils size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('television'))
    return <Tv size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('family room'))
    return <Users size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('tea/coffee'))
    return <Coffee size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('balcony'))
    return <Sun size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('luggage'))
    return <Archive size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('baby bed'))
    return <Baby size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('wheelchair'))
    return <Wheelchair size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('bathtub'))
    return <Droplets size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('pets'))
    return <Dog size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('sea view') || lowerFacility.includes('beach'))
    return <Waves size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('garden'))
    return <Trees size={16} className="mr-2 text-blue-600" />;
  if (lowerFacility.includes('cultural'))
    return <Sparkles size={16} className="mr-2 text-blue-600" />;
  return <Check size={16} className="mr-2 text-blue-600" />;
};

export default function Hotels() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // UPDATED: Filtering now happens on the static 'allAccommodations' array
  const filteredHotels =
    selectedCategory === 'all'
      ? allAccommodations
      : allAccommodations.filter(
          (hotel) => hotel.category === selectedCategory
        );

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
          {categories.map((category) => (
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

        {/* UPDATED: This now maps over your static data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                  {hotel.category.replace(/_/g, ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>{hotel.contact.address}</span>
                </div>
                {/* Price and Rating REMOVED as requested */}
                <button
                  onClick={() => setSelectedHotel(hotel)} // NEW: Click to open modal
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No accommodations found in this category yet.
            </WELCOME>
          </div>
        )}
      </div>

      {/* NEW: Hotel Details Modal (Radisson Blu Style) */}
      {selectedHotel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedHotel(null)} // Click backdrop to close
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent content click from closing modal
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 text-gray-600 bg-white/50 rounded-full p-1 hover:bg-white hover:text-gray-900 z-20"
            >
              <X size={24} />
            </button>

            {/* Image Header */}
            <div className="w-full h-64 flex-shrink-0">
              <img
                src={selectedHotel.image_url}
                alt={selectedHotel.name}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                {selectedHotel.name}
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  About us
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {selectedHotel.about_us}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Facilities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                  {selectedHotel.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center text-gray-700"
                    >
                      <FacilityIcon facility={facility} />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Contact
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Phone
                      size={16}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <span>{selectedHotel.contact.phone}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-blue-600 flex-shrink-0" />
                    <span>{selectedHotel.contact.email}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe
                      size={16}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <a
                      href={selectedHotel.contact.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {selectedHotel.contact.web}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={16}
                      className="text-blue-600 flex-shrink-0 mt-1"
                    />
                    <span>{selectedHotel.contact.address}</span>
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