import { useParams, Link } from 'react-router-dom';
import { allAccommodations, FacilityIcon } from '../data/hotelData';
import { MapPin, Phone, Mail, Globe, ArrowLeft } from 'lucide-react';
import CallToAction from '../components/CallToAction';

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const hotel = allAccommodations.find((h) => h.id === id);

  if (!hotel) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Hotel not found</h1>
        <Link to="/hotels" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to all hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header section with image */}
      <div className="relative h-[40vh] md:h-[50vh] bg-black">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center p-4">
            {hotel.name}
          </h1>
        </div>
        <Link
          to="/hotels"
          className="absolute top-20 left-4 md:left-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
        >
          <ArrowLeft size={20} className="text-blue-900" />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: About & Facilities */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                About us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {hotel.about_us}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {hotel.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center text-gray-700 text-lg"
                  >
                    <FacilityIcon facility={facility} />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Contact & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
                Contact & Info
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-600 flex-shrink-0" />
                  <span>{hotel.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600 flex-shrink-0" />
                  <span>{hotel.contact.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={18} className="text-blue-600 flex-shrink-0" />
                  <a
                    href={hotel.contact.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                  >
                    {hotel.contact.web}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                  <span>{hotel.contact.address}</span>
                </li>
              </ul>
              <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition font-semibold mt-8">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <CallToAction />
    </div>
  );
}