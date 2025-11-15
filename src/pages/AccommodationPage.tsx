import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  allAccommodations,
  FacilityIcon,
  Accommodation,
} from '../data/hotelData.tsx';
import {
  Search,
  Map,
  List,
  Heart,
  X,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  MapPin,
  Users,
  Briefcase,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

// --- Reusable Badge Component ---
const Badge: React.FC<{
  text: string;
  className?: string;
  'data-testid'?: string;
}> = ({ text, className = '' }) => (
  <span
    data-testid={className}
    className={`inline-block whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ${className}`}
  >
    {text}
  </span>
);

// --- FAQ Section Component ---
const FAQSection = () => {
  const faqs = [
    {
      q: 'What types of stays are available in Cape Coast?',
      a: 'Cape Coast offers a wide range, including beachfront hotels, cultural guesthouses, modern vacation rentals (Airbnb), and budget-friendly options.',
    },
    {
      q: 'How far are most stays from Cape Coast Castle?',
      a: 'Many accommodations, especially cultural stays and guesthouses, are located within a short drive or even walking distance of the historic castles.',
    },
    {
      q: 'Do beachfront stays usually offer Wi-Fi?',
      a: 'Most hotels and established guesthouses, including those on the beachfront, offer Wi-Fi, though it\'s always good to confirm facility details.',
    },
  ];

  return (
    <div className="mx-auto max-w-3xl mt-24">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 open:shadow-lg open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
              {faq.q}
              <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-slate-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

// --- Accommodation Card Component ---
interface AccommodationCardProps {
  hotel: Accommodation;
  isWishlisted: boolean;
  isComparing: boolean;
  isInTripPlan: boolean;
  onWishlistToggle: () => void;
  onCompareToggle: () => void;
  onTripPlanToggle: () => void;
  onImageClick: () => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  hotel,
  isWishlisted,
  isComparing,
  isInTripPlan,
  onWishlistToggle,
  onCompareToggle,
  onTripPlanToggle,
  onImageClick,
}) => {
  // 6. Highlight Badges
  const getBadges = () => {
    const badges = [];
    if (hotel.category === 'beachfront') {
      badges.push('Beachfront');
    }
    if (hotel.category === 'cultural') {
      badges.push('Cultural Stay');
    }
    if (hotel.facilities.includes('Pool')) {
      badges.push('Pool');
    }
    return badges;
  };

  // 11. Local Info Highlights
  const getLocalInfo = () => {
    switch (hotel.category) {
      case 'beachfront':
        return 'Ideal for beach lovers';
      case 'cultural':
        return 'Close to Cape Coast Castle';
      case 'hotel_and_guest_house':
        return 'Great for families & groups';
      default:
        return 'Easy access to local attractions';
    }
  };

  const badges = getBadges();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        {/* 7. Full-Screen Photo Gallery Modal (trigger) */}
        <button
          onClick={onImageClick}
          className="block w-full h-64 overflow-hidden"
          aria-label={`View photos for ${hotel.name}`}
        >
          <img
            src={hotel.image_url}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </button>

        {/* 5. Wishlist / Save Button */}
        <button
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-slate-700'
            }`}
          />
        </button>

        {/* 6. Highlight Badges */}
        {badges.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} text={badge} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {hotel.name}
        </h3>

        {/* 11. Local Info Highlights */}
        <p className="text-sm text-slate-500 mb-4">{getLocalInfo()}</p>

        <p className="text-slate-600 mb-5 line-clamp-2 text-sm leading-relaxed flex-1">
          {hotel.description}
        </p>

        <div className="space-y-2 mb-6">
          {hotel.facilities.slice(0, 3).map((facility) => (
            <div
              key={facility}
              className="flex items-center text-sm text-slate-600"
            >
              <FacilityIcon facility={facility} />
              <span>{facility}</span>
            </div>
          ))}
          {hotel.facilities.length > 3 && (
            <div className="text-sm text-amber-600 font-medium pt-1">
              +{hotel.facilities.length - 3} more facilities
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between gap-4">
            {/* 8. Compare Hotels UI (trigger) */}
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={isComparing}
                onChange={onCompareToggle}
                className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500"
              />
              Compare
            </label>

            {/* 10. Trip Planner / “Add to Trip” (trigger) */}
            <button
              onClick={onTripPlanToggle}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isInTripPlan
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isInTripPlan ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Trip
            </button>
          </div>
          <Link
            to={`/accommodation/${hotel.id}`}
            className="mt-4 block w-full rounded-full bg-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-amber-600 hover:shadow-md active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Image Modal Component ---
const ImageModal: React.FC<{
  imageUrl: string;
  onClose: () => void;
}> = ({ imageUrl, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 animate-in fade-in"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <img
      src={imageUrl}
      alt="Accommodation full size"
      className="max-h-full max-w-full rounded-lg shadow-2xl transition-transform duration-300 animate-in zoom-in-90"
      onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking image
    />
    <button
      onClick={onClose}
      className="absolute top-6 right-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 transition hover:bg-white"
      aria-label="Close image gallery"
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

// --- Compare Modal Component ---
const CompareModal: React.FC<{
  compareIds: Set<string>;
  onClose: () => void;
}> = ({ compareIds, onClose }) => {
  const hotelsToCompare = allAccommodations.filter((h) =>
    compareIds.has(h.id),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 animate-in zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Compare Stays ({hotelsToCompare.length})
        </h2>
        <div
          className={`grid gap-6 ${
            hotelsToCompare.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {hotelsToCompare.map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-lg border border-slate-200 p-5"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                {hotel.name}
              </h3>
              <img
                src={hotel.image_url}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-amber-600 font-medium mb-3">
                {
                  [
                    ...categories,
                    { id: 'all', label: 'All Accommodation' },
                  ].find((c) => c.id === hotel.category)?.label
                }
              </p>
              <ul className="space-y-2">
                {hotel.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <FacilityIcon facility={facility} />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          aria-label="Close comparison"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

// --- Trip Planner Panel Component ---
const TripPlannerPanel: React.FC<{
  tripPlanIds: Set<string>;
  onClose: () => void;
  onRemove: (id: string) => void;
}> = ({ tripPlanIds, onClose, onRemove }) => {
  const hotelsInPlan = allAccommodations.filter((h) =>
    tripPlanIds.has(h.id),
  );

  return (
    <div
      className="fixed inset-0 z-40 bg-black/60 transition-opacity duration-500 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-500 animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              My Trip Plan ({hotelsInPlan.length})
            </h2>
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              aria-label="Close trip planner"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {hotelsInPlan.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <Bookmark className="h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-semibold text-slate-700">
                Your trip plan is empty
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Click the "Add to Trip" button on any stay to add it here.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {hotelsInPlan.map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 p-3"
                >
                  <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {hotel.name}
                    </h3>
                    <Link
                      to={`/accommodation/${hotel.id}`}
                      className="text-sm text-amber-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                  <button
                    onClick={() => onRemove(hotel.id)}
                    className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                    aria-label={`Remove ${hotel.name} from trip`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-t border-slate-200 p-6">
            <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-center text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-95">
              Share My Trip Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Categories Data ---
const categories = [
  { id: 'all', label: 'All Stays' },
  { id: 'hotel_and_guest_house', label: 'Hotels & Guest Houses' },
  { id: 'beachfront', label: 'Beachfront' },
  { id: 'airbnb', label: 'Vacation Rentals' },
  { id: 'cultural', label: 'Cultural Stays' },
];

// 2. Smart Multi-Filters (Facility Filters)
const facilityFilterOptions = [
  { id: 'Wi-Fi', label: 'Wi-Fi', icon: Users },
  { id: 'Pool', label: 'Pool', icon: Users },
  { id: 'Parking', label: 'Parking', icon: Users },
  { id: 'Air Conditioning', label: 'AC', icon: Users },
  { id: 'Kitchen', label: 'Kitchen', icon: Users },
  { id: 'Gym', label: 'Gym', icon: Briefcase },
];

// --- Main Page Component ---
export default function AccommodationPage() {
  // --- STATE MANAGEMENT ---
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // 1. Search Bar
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // 4. Map View
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set()); // 5. Wishlist
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null); // 7. Image Modal
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set()); // 8. Compare
  const [showCompareModal, setShowCompareModal] = useState(false); // 8. Compare
  const [tripPlanIds, setTripPlanIds] = useState<Set<string>>(new Set()); // 10. Trip Plan
  const [showTripPlanner, setShowTripPlanner] = useState(false); // 10. Trip Plan
  const [facilityFilters, setFacilityFilters] = useState<Set<string>>(
    new Set(),
  ); // 2. Smart Filters
  const [showMobileFilters, setShowMobileFilters] = useState(false); // 12. Mobile

  // --- DERIVED STATE & FILTERING ---
  const filteredAccommodations = useMemo(() => {
    let accommodations =
      selectedCategory === 'all'
        ? allAccommodations
        : allAccommodations.filter(
            (hotel) => hotel.category === selectedCategory,
          );

    // 1. Search Bar Filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      accommodations = accommodations.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(lowerSearchTerm) ||
          hotel.description.toLowerCase().includes(lowerSearchTerm) ||
          hotel.facilities.some((f) =>
            f.toLowerCase().includes(lowerSearchTerm),
          ),
      );
    }

    // 2. Smart Multi-Filters
    if (facilityFilters.size > 0) {
      accommodations = accommodations.filter((hotel) =>
        [...facilityFilters].every((facility) =>
          hotel.facilities.includes(facility),
        ),
      );
    }

    return accommodations;
  }, [selectedCategory, searchTerm, facilityFilters]);

  // --- EVENT HANDLERS ---
  const toggleWishlist = (id: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        // Limit comparison to 3 items for UI sanity
        if (next.size < 3) {
          next.add(id);
        }
      }
      return next;
    });
  };

  const toggleTripPlan = (id: string) => {
    setTripPlanIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const removeFroTripPlan = (id: string) => {
    setTripPlanIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleFacilityFilter = (id: string) => {
    setFacilityFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // --- RENDER ---
  const renderFilterBars = (isMobileModal = false) => (
    <>
      {/* 3. Quick Filters Bar (Main Categories) */}
      <div className="mb-8">
        <div className="overflow-x-auto pb-2 -mx-6 px-6">
          <div className="flex space-x-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  if (isMobileModal) setShowMobileFilters(false);
                }}
                className={`
                  flex-shrink-0 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap
                  ${
                    selectedCategory === category.id
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-300/50'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Smart Multi-Filters */}
      <div className={isMobileModal ? 'mt-6' : ''}>
        <h3 className="text-sm font-semibold text-slate-600 mb-3">
          Filter by facilities
        </h3>
        <div className="flex flex-wrap gap-2">
          {facilityFilterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFacilityFilter(filter.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200
                ${
                  facilityFilters.has(filter.id)
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }
              `}
            >
              {facilityFilters.has(filter.id) ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 7. Image Modal (Portal) */}
      {modalImageUrl && (
        <ImageModal
          imageUrl={modalImageUrl}
          onClose={() => setModalImageUrl(null)}
        />
      )}

      {/* 8. Compare Modal (Portal) */}
      {showCompareModal && (
        <CompareModal
          compareIds={compareIds}
          onClose={() => setShowCompareModal(false)}
        />
      )}

      {/* 10. Trip Planner Panel (Portal) */}
      {showTripPlanner && (
        <TripPlannerPanel
          tripPlanIds={tripPlanIds}
          onClose={() => setShowTripPlanner(false)}
          onRemove={removeFroTripPlan}
        />
      )}

      {/* 12. Mobile Filter Modal */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 z-40 bg-black/60 transition-opacity duration-500 animate-in fade-in"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="fixed bottom-0 left-0 z-50 h-[75vh] w-full transform rounded-t-2xl bg-white shadow-2xl transition-transform duration-500 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="text-xl font-bold text-slate-900">
                Filters
              </h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                aria-label="Close filters"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(75vh-150px)] p-6">
              {renderFilterBars(true)}
            </div>
            <div className="border-t border-slate-200 p-5">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full rounded-full bg-slate-900 px-5 py-3 text-center text-base font-semibold text-white"
              >
                Show {filteredAccommodations.length} Stays
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 mb-3">
            Explore Cape Coast
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Find Your Stay
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            From luxury beachfront resorts to cozy cultural guesthouses,
            discover the perfect place for your Cape Coast adventure.
          </p>
        </div>

        {/* --- CONTROLS --- */}
        <div className="mb-12 space-y-8">
          {/* 1. Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, description, or facility..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-4 pl-14 pr-6 text-base text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* 4. Map/List View Toggle */}
          <div className="flex items-center justify-between">
            <div className="hidden sm:block">
              {renderFilterBars(false)}
            </div>
            
            <div className="flex sm:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  viewMode === 'list'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={viewMode === 'list'}
              >
                <List className="h-4 w-4" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  viewMode === 'map'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-pressed={viewMode === 'map'}
              >
                <Map className="h-4 w-4" />
                Map
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        {viewMode === 'list' && (
          <>
            {filteredAccommodations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAccommodations.map((hotel) => (
                  <AccommodationCard
                    key={hotel.id}
                    hotel={hotel}
                    isWishlisted={wishlistedIds.has(hotel.id)}
                    isComparing={compareIds.has(hotel.id)}
                    isInTripPlan={tripPlanIds.has(hotel.id)}
                    onWishlistToggle={() => toggleWishlist(hotel.id)}
                    onCompareToggle={() => toggleCompare(hotel.id)}
                    onTripPlanToggle={() => toggleTripPlan(hotel.id)}
                    onImageClick={() => setModalImageUrl(hotel.image_url)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <SearchX className="mx-auto h-16 w-16 text-slate-400" />
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                  No Stays Found
                </h3>
                <p className="mt-2 text-base text-slate-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </>
        )}

        {/* 4. Map View (UI-Only) */}
        {viewMode === 'map' && (
          <div className="flex h-[800px] flex-col md:flex-row gap-6">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <h2 className="text-xl font-bold text-slate-900">
                Stays on Map ({filteredAccommodations.length})
              </h2>
              {filteredAccommodations.map(hotel => (
                <div key={hotel.id} className="flex items-center gap-4 p-3 border border-slate-200 bg-white rounded-lg shadow-sm">
                  <img src={hotel.image_url} alt={hotel.name} className="h-20 w-20 rounded-md object-cover flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{hotel.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{hotel.description}</p>
                    <Link to={`/accommodation/${hotel.id}`} className="text-sm text-amber-600 hover:underline">
                      View Details <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-2/3 h-full bg-slate-200 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden border-4 border-white">
              <p className="text-slate-500 font-semibold z-10">
                Map View Placeholder
              </p>
              {/* Placeholder pins */}
              {filteredAccommodations.slice(0, 5).map((hotel, i) => (
                <div
                  key={hotel.id}
                  className="absolute z-20 grid h-8 w-8 place-items-center rounded-full bg-amber-500 text-white shadow-md"
                  style={{
                    top: `${15 + i * 15}%`,
                    left: `${20 + (i % 2) * 40}%`,
                  }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
              ))}
              <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
            </div>
          </div>
        )}

        {/* 13. SEO / FAQ Section */}
        <FAQSection />
      </div>

      {/* 8. Compare Sticky Bar */}
      {compareIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-30 w-full max-w-lg -translate-x-1/2 transform px-4">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-900 p-4 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-10">
            <p className="text-base font-semibold text-white">
              Compare {compareIds.size} {compareIds.size === 1 ? 'Stay' : 'Stays'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareIds(new Set())}
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                disabled={compareIds.size < 2}
                className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-slate-600"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Mobile-First Sticky Bar */}
      <div className="sticky bottom-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white/90 p-3 backdrop-blur-sm sm:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex flex-col items-center gap-1 text-xs font-medium text-slate-700"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </button>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="flex flex-col items-center gap-1 text-xs font-medium text-slate-700"
        >
          {viewMode === 'list' ? (
            <Map className="h-5 w-5" />
          ) : (
            <List className="h-5 w-5" />
          )}
          {viewMode === 'list' ? 'Map View' : 'List View'}
        </button>
        <button
          onClick={() => setShowTripPlanner(true)}
          className="relative flex flex-col items-center gap-1 text-xs font-medium text-slate-700"
        >
          <Bookmark className="h-5 w-5" />
          Trip Plan
          {tripPlanIds.size > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
              {tripPlanIds.size}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}