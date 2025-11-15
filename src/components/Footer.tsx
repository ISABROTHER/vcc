import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Visit Cape Coast</h3>
            <p className="text-blue-200 mb-4">
              Your gateway to heritage, culture, and coastal beauty in Ghana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-amber-500 transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-amber-500 transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#experiences" className="hover:text-white transition">Experiences</a></li>
              <li><a href="#heritage" className="hover:text-white transition">Heritage</a></li>
              <li><a href="#hotels" className="hover:text-white transition">Hotels</a></li>
              <li><a href="#events" className="hover:text-white transition">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">For Businesses</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition">Membership Portal</a></li>
              <li><a href="#" className="hover:text-white transition">List Your Business</a></li>
              <li><a href="#" className="hover:text-white transition">Partnership</a></li>
              <li><a href="#" className="hover:text-white transition">Investment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>Cape Coast Visitor Centre, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} />
                <span>+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} />
                <span>info@visitcapecoast.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Visit Cape Coast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
