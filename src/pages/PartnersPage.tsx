import { Link } from 'react-router-dom';
import {
  Building2,
  TrendingUp,
  Eye,
  Globe,
  Users,
  BadgeCheck,
  ArrowRight,
  Star,
  BarChart3,
  Megaphone,
  CheckCircle2,
  Mail,
  Phone,
} from 'lucide-react';

const STATS = [
  { value: '26.3M', label: 'Ghana internet users', icon: Globe },
  { value: '500K+', label: 'Annual visitors to Cape Coast', icon: Users },
  { value: '74.6%', label: 'Internet penetration', icon: TrendingUp },
  { value: '#1', label: 'Tourism destination in Central Region', icon: Star },
];

const TIERS = [
  {
    name: 'Basic Listing',
    price: 'Free',
    priceNote: 'Get discovered',
    color: 'border-slate-300',
    badge: 'bg-slate-100 text-slate-700',
    features: [
      'Business name and contact info',
      'Category listing (hotel, restaurant, tour)',
      'Location on Cape Coast map',
      'Basic description (100 words)',
    ],
    cta: 'Submit your listing',
    popular: false,
  },
  {
    name: 'Featured Partner',
    price: 'GHS 200/mo',
    priceNote: 'Most popular',
    color: 'border-amber-400 ring-2 ring-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    features: [
      'Everything in Basic, plus:',
      'Featured badge on your listing',
      'Priority placement in search results',
      'Photo gallery (up to 10 images)',
      'Direct booking link / WhatsApp button',
      'Monthly analytics report',
      'Social media shoutout (1x/month)',
    ],
    cta: 'Become a featured partner',
    popular: true,
  },
  {
    name: 'Premium Sponsor',
    price: 'GHS 500/mo',
    priceNote: 'Maximum visibility',
    color: 'border-slate-700',
    badge: 'bg-slate-900 text-white',
    features: [
      'Everything in Featured, plus:',
      'Homepage banner placement',
      'Featured in "Trending Now" section',
      'Dedicated business profile page',
      'Email newsletter feature (1x/month)',
      'Event/promotion announcements',
      'Quarterly strategy call with our team',
      'Logo in footer sponsors section',
    ],
    cta: 'Become a premium sponsor',
    popular: false,
  },
];

const PARTNER_TYPES = [
  { icon: Building2, title: 'Hotels & Guest Houses', desc: 'Get direct bookings instead of paying 20% OTA commissions.' },
  { icon: Star, title: 'Restaurants & Bars', desc: 'Attract tourists who search for dining options online.' },
  { icon: Eye, title: 'Tour Operators', desc: 'Reach international visitors planning their Cape Coast trip.' },
  { icon: Megaphone, title: 'Event Organisers', desc: 'Promote your events to our engaged tourism audience.' },
  { icon: BarChart3, title: 'Transport Services', desc: 'Connect with travelers who need rides from Accra.' },
  { icon: BadgeCheck, title: 'Craft & Retail', desc: 'Showcase your products to visitors seeking authentic souvenirs.' },
];

export default function PartnersPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">For Local Businesses</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 max-w-2xl">
            Grow your business with Visit Cape Coast
          </h1>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg leading-relaxed">
            Join the only dedicated tourism platform for Cape Coast. Get found by international visitors, 
            diaspora returnees and domestic tourists — and stop losing bookings to OTA commissions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
              <stat.icon size={24} className="mx-auto text-amber-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Why list your business with us?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hotels on Booking.com pay 15–25% commission per booking. Tour operators on GetYourGuide lose 20–30%. 
            With Visit Cape Coast, you connect directly with visitors — no middleman, no commission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNER_TYPES.map((type) => (
            <div key={type.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <type.icon size={24} className="text-amber-700" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{type.title}</h3>
              <p className="text-sm text-slate-600">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Partnership tiers</h2>
          <p className="text-slate-600">Choose the level that fits your business goals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl p-6 border shadow-sm ${tier.color} relative ${
                tier.popular ? 'shadow-lg' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most popular
                </div>
              )}
              <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${tier.badge}`}>
                {tier.name}
              </div>
              <div className="mb-4">
                <p className="text-3xl font-bold text-slate-900">{tier.price}</p>
                <p className="text-xs text-slate-500">{tier.priceNote}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
                tier.popular
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Success Story / Social Proof */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-100">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">The opportunity</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Cape Coast hotels lose an estimated GHS 400+/month to OTA commissions per property.
            </h3>
            <p className="text-slate-700 mb-4">
              A hotel paying 20% commission on GHS 200/night rooms with just 10 bookings/month loses GHS 400 — that's GHS 4,800/year going to Booking.com instead of your pocket. 
              A Featured Partner listing at GHS 200/month pays for itself with just one direct booking.
            </p>
            <p className="text-sm text-amber-800 font-semibold">
              Be one of the first 50 partners and lock in our launch pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Contact / CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to grow your business?</h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8">
            Contact us to discuss the best partnership option for your business. We'll help you get set up in 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:partners@visitcapecoast.com"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              <Mail size={18} /> Email us
            </a>
            <a
              href="tel:+233XXXXXXXX"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              <Phone size={18} /> Call us
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-6">partners@visitcapecoast.com · Mon–Fri, 8am–5pm GMT</p>
        </div>
      </div>
    </div>
  );
}
