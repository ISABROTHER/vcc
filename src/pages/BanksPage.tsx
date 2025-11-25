import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  X,
  Share2,
  Copy,
  Clock,
  ChevronRight,
  Info,
  CreditCard,
  Building2,
  Landmark,
  LocateFixed,
  Banknote,
  Accessibility,
  Car,
  Globe
} from 'lucide-react';

// --- Types & Data ---

type BankType = 'bank' | 'rural' | 'atm';

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: BankType;
  tags: string[];
  status?: 'open' | 'closed' | '24/7';
  image: string;
  brandColor: string; // NEW: Colorful branding
  coordinates: { lat: number; lng: number }; // NEW: For distance calculation
  services: string[]; // NEW: Feature tags
}

// Mock Data with Coordinates (Approximate for Cape Coast) & Brand Colors
const bankData: BankLocation[] = [
  { 
    id: 1, name: 'GCB Bank (Main)', location: 'Chapel Square / Castle Area', type: 'bank', 
    tags: ['commercial', 'castle'], status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-red-600 to-yellow-500',
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ['Forex', 'Parking', 'ATM']
  },
  { 
    id: 2, name: 'GCB Bank (UCC)', location: 'UCC Science Area', type: 'bank', 
    tags: ['commercial', 'ucc'], status: 'open',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-red-600 to-yellow-500',
    coordinates: { lat: 5.1160, lng: -1.2920 },
    services: ['ATM', 'Student Services']
  },
  { 
    id: 3, name: 'Fidelity Bank', location: 'Inner Ring Road', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-orange-500 to-orange-400',
    coordinates: { lat: 5.1130, lng: -1.2500 },
    services: ['Forex', 'Instant Card']
  },
  { 
    id: 4, name: 'Absa Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-red-700 to-red-600',
    coordinates: { lat: 5.1110, lng: -1.2480 },
    services: ['Forex', 'Prestige Banking']
  },
  { 
    id: 5, name: 'CalBank', location: 'Pedu Junction', type: 'bank', 
    tags: ['commercial', 'pedu'], status: 'open',
    image: 'https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-yellow-500 to-amber-500',
    coordinates: { lat: 5.1250, lng: -1.2600 },
    services: ['ATM', 'Parking']
  },
  { 
    id: 6, name: 'ADB Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'town'], status: 'open',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-green-600 to-emerald-500',
    coordinates: { lat: 5.1070, lng: -1.2470 },
    services: ['Agri-Finance', 'ATM']
  },
  { 
    id: 12, name: 'Ecobank ATM', location: 'Kotokraba Road', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-blue-600 to-cyan-500',
    coordinates: { lat: 5.1140, lng: -1.2490 },
    services: ['24/7 Access', 'Cash Deposit']
  },
  { 
    id: 16, name: 'GTBank ATM', location: 'Kotokuraba Market', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=200&q=80',
    brandColor: 'from-orange-600 to-red-500',
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ['24/7 Access']
  },
];

// --- Helpers ---

// Haversine Formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

const getStatusColor = (status?: string) => {
  if (status === '24/7') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (status === 'closed') return 'text-rose-700 bg-rose-50 border-rose-200';
  return 'text-blue-700 bg-blue-50 border-blue-200';
};

// Check if bank is currently open (Simple Mock Logic)
const getLiveStatus = (bank: BankLocation) => {
  if (bank.status === '24/7') return { text: 'Open 24/7', color: 'text-emerald-600' };
  
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) return { text: 'Closed (Weekend)', color: 'text-rose-600' };
  if (hour >= 8 && hour < 16) return { text: 'Open Now', color: 'text-emerald-600' };
  if (hour >= 16 && hour < 17) return { text: 'Closing Soon', color: 'text-amber-600' };
  return { text: 'Closed', color: 'text-rose-600' };
};

// --- Detail Sheet Component ---

const DetailSheet = ({ 
  bank, 
  isOpen, 
  onClose,
  distance 
}: { 
  bank: BankLocation | null, 
  isOpen: boolean, 
  onClose: () => void,
  distance?: number
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!bank && !isOpen) return null;

  const mapQuery = encodeURIComponent(`${bank?.name} ${bank?.location} Cape Coast Ghana`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const status = bank ? getLiveStatus(bank) : { text: '', color: '' };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[90] transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      <div 
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[2.5rem] shadow-2xl transform transition-transform duration-300 cubic-bezier(0.2, 0.9, 0.3, 1) md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing 
            ? 'translate-y-0 md:-translate-y-1/2' 
            : 'translate-y-full md:translate-y-10'
        }`}
      >
        {bank && (
          <div className="p-6 pb-10 md:pb-6 relative">
            <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mb-8 md:hidden" />
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className={`w-24 h-24 rounded-3xl overflow-hidden shadow-lg mb-4 flex-shrink-0 bg-gradient-to-br ${bank.brandColor} p-1`}>
                <div className="w-full h-full bg-white rounded-[1.3rem] overflow-hidden">
                   <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 leading-tight px-4 mb-2">
                {bank.name}
              </h2>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${status.color}`}>
                  • {status.text}
                </span>
                {distance !== undefined && (
                  <span className="text-sm text-slate-400">
                    • {distance.toFixed(1)} km away
                  </span>
                )}
              </div>
            </div>

            {/* Services Grid */}
            {bank.services.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {bank.services.map(service => (
                  <span key={service} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                    {service === 'Forex' && <Globe size={12} />}
                    {service === 'Parking' && <Car size={12} />}
                    {service === 'ATM' && <CreditCard size={12} />}
                    {service}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold text-lg py-4 rounded-2xl active:scale-[0.98] transition hover:bg-black shadow-xl shadow-slate-200"
              >
                <Navigation size={20} />
                Navigate
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(`${bank.name}, ${bank.location}`)}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-slate-50"
              >
                <Copy size={18} />
                Copy
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-slate-50"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default function BanksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'ATM' | 'Bank'>('All');
  const [selectedBank, setSelectedBank] = useState<BankLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Get User Location
  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        () => {
          alert('Could not get your location. Please check permissions.');
          setIsLocating(false);
        }
      );
    }
  };

  // Filter & Sort Logic
  const processedBanks = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    
    let filtered = bankData.filter(bank => {
      const matchesSearch = 
        bank.name.toLowerCase().includes(lowerTerm) || 
        bank.location.toLowerCase().includes(lowerTerm) ||
        bank.tags.some(tag => tag.includes(lowerTerm));

      let matchesTab = true;
      if (activeTab === 'ATM') matchesTab = bank.type === 'atm';
      if (activeTab === 'Bank') matchesTab = bank.type === 'bank' || bank.type === 'rural';

      return matchesSearch && matchesTab;
    });

    // If user has location, calculate distance and sort
    if (userLocation) {
      filtered = filtered.map(bank => ({
        ...bank,
        distance: calculateDistance(
          userLocation.lat, userLocation.lng, 
          bank.coordinates.lat, bank.coordinates.lng
        )
      })).sort((a, b) => (a as any).distance - (b as any).distance);
    }

    return filtered;
  }, [searchTerm, activeTab, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-32">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="h-20 md:h-24 w-full bg-transparent pointer-events-none"></div>

        <div className="px-5 pb-5 max-w-2xl mx-auto space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Finance
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {userLocation ? 'Sorted by distance' : 'Find nearest branch'}
              </p>
            </div>
            
            {/* Locate Me Button */}
            <button 
              onClick={handleLocateMe}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                userLocation 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-900 text-white shadow-lg active:scale-95'
              }`}
            >
              <LocateFixed size={16} className={isLocating ? 'animate-spin' : ''} />
              {userLocation ? 'Near Me' : 'Find Nearest'}
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search banks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-100 border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/10 transition-all font-medium text-base"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              {['All', 'Bank', 'ATM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab === 'Bank' ? 'Banks' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-6 space-y-3">
        {processedBanks.length > 0 ? (
          processedBanks.map((bank: any) => {
            const status = getLiveStatus(bank);
            return (
              <div 
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className="group bg-white p-4 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Colorful Brand Bar on Left */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${bank.brandColor}`} />

                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                  <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow min-w-0 py-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-slate-900 text-[16px] leading-tight truncate pr-2">
                      {bank.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 truncate mb-1.5">
                    {bank.location}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-50 ${status.color}`}>
                      {status.text}
                    </span>
                    {bank.distance !== undefined && (
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Navigation size={10} />
                        {bank.distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100 transition-colors">
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 opacity-50">
            <Building2 className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 font-medium">No locations found</p>
          </div>
        )}
      </div>

      <DetailSheet 
        bank={selectedBank} 
        isOpen={!!selectedBank} 
        onClose={() => setSelectedBank(null)}
        distance={(selectedBank as any)?.distance}
      />
    </div>
  );
}