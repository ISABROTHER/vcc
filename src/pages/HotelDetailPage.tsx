import { useParams, Link } from 'react-router-dom';
import { allAccommodations, FacilityIcon } from '../data/hotelData.tsx';
import { ArrowLeft, Mail, Phone, Globe, MapPin } from 'lucide-react';

export default function HotelDetailPage() {
  const { id } = useParams();
  const hotel = allAccommodations.find(h => h.id === id);

  if (!hotel) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accommodation Not Found</h1>
        <Link to="/accommodation" className="text-yellow-600 hover:text-yellow-700 font-semibold">
          ← Back to Accommodation
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Link
          to="/accommodation"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Accommodation</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            <img
              src={hotel.image_url}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
            <p className="text-xl text-gray-600 mb-8">{hotel.description}</p>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.about_us}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.facilities.map((facility) => (
                  <div key={facility} className="flex items-center text-gray-700 bg-gray-50 rounded-lg p-3">
                    <FacilityIcon facility={facility} />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">{hotel.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{hotel.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Website</p>
                    <a
                      href={hotel.contact.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">{hotel.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button className="w-full md:w-auto px-8 py-4 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 shadow-md transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}