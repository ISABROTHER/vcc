import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  X,
  Share2,
  Copy,
  Clock,
  CreditCard,
  Landmark,
  LocateFixed,
  ArrowUpRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
// If using a map library (Google Maps, MapTiler, Leaflet etc)
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

type BankType = 'bank' | 'rural' | 'atm';

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: BankType;
  tags: string[];
  status?: 'open' | 'closed' | '24/7';
  image: string;
  coordinates: { lat: number; lng: number };
  services: string[];
  crowdLevel?: 'Quiet' | 'Moderate' | 'Busy';
  waitTime?: string;
  openingHours?: string;   // new
}

const bankData: BankLocation[] = [
  {
    id: 1, name: 'GCB Bank', location: 'Chapel Square, Castle Area', type: 'bank',
    tags: ['commercial', 'castle'], status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ['Forex', 'Parking', 'ATM'],
    crowdLevel: 'Moderate', waitTime: '10 min',
    openingHours: 'Mon–Fri 08:00–16:00'
  },
  {
    id: 2, name: 'GCB Bank', location: 'UCC Science Area', type: 'bank',
    tags: ['commercial', 'ucc'], status: 'open',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1160, lng: -1.2920 },
    services: ['ATM', 'Student Services'],
    crowdLevel: 'Busy', waitTime: '25 min',
    openingHours: 'Mon–Fri 09:00–15:00'
  },
  {
    id: 3, name: 'Fidelity Bank', location: 'Inner Ring Road', type: 'bank',
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1130, lng: -1.2500 },
    services: ['Forex', 'Instant Card'],
    crowdLevel: 'Quiet', waitTime: '5 min',
    openingHours: 'Mon–Fri 08:00–16:00'
  },
  {
    id: 4, name: 'Absa Bank', location: 'Commercial Street', type: 'bank',
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1110, lng: -1.2480 },
    services: ['Forex', 'Prestige Banking'],
    crowdLevel: 'Moderate', waitTime: '15 min',
    openingHours: 'Mon–Fri 08:00–16:00'
  },
  {
    id: 5, name: 'CalBank', location: 'Pedu Junction', type: 'bank',
    tags: ['commercial', 'pedu'], status: 'open',
    image: 'https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1250, lng: -1.2600 },
    services: ['ATM', 'Parking'],
    crowdLevel: 'Quiet', waitTime: '2 min',
    openingHours: 'Mon–Fri 08:00–16:00'
  },
  {
    id: 6, name: 'ADB Bank', location: 'Commercial Street', type: 'bank',
    tags: ['commercial', 'town'], status: 'open',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1070, lng: -1.2470 },
    services: ['Agri-Finance', 'ATM'],
    crowdLevel: 'Moderate', waitTime: '12 min',
    openingHours: 'Mon–Fri 08:00–16:00'
  },
  {
    id: 12, name: 'Ecobank ATM', location: 'Kotokraba Road', type: 'atm',
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1140, lng: -1.2490 },
    services: ['24/7 Access', 'Cash Deposit'],
    crowdLevel: 'Quiet', waitTime: '0 min',
    openingHours: '24/7'
  },
  {
    id: 16, name: 'GTBank ATM', location: 'Kotokuraba Market', type: 'atm',
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ['24/7 Access'],
    crowdLevel: 'Moderate', waitTime: '2 min',
    openingHours: '24/7'
  },
];

// Helper for distance (unchanged)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI/180);
  const dLon = (lon2 - lon1) * (Math.PI/180);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Main Component
export default function BanksPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'ATM' | 'Bank'>('All');
  const [selectedBank, setSelectedBank] = useState<BankLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [favourites, setFavourites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('favBanks') || '[]'); }
    catch { return []; }
  });

  // persist favourites
  useEffect(() => {
    localStorage.setItem('favBanks', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: number) => {
    setFavourites(prev => prev.includes(id) ? prev.filter(x => x!==id) : [...prev, id]);
  };

  // filter + search + sort
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
    if (userLocation) {
      filtered = filtered.map(bank => ({
        ...bank,
        distance: calculateDistance(userLocation.lat, userLocation.lng, bank.coordinates.lat, bank.coordinates.lng)
      })).sort((a, b) => (a as any).distance - (b as any).distance);
    }
    return filtered;
  }, [searchTerm, activeTab, userLocation]);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert('Location access denied.')
      );
    }
  };

  return (
    <div className="min-h-screen relative pb-32 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="h-16 w-full"></div>
        <div className="px-4 pb-3 pt-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Finance <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{processedBanks.length}</span>
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                className="px-3 py-1 rounded-md text-sm font-bold bg-slate-100 hover:bg-slate-200"
              >
                {viewMode === 'list' ? 'Show Map' : 'Show List'}
              </button>
            </div>
          </div>
          <div className="flex bg-slate-100/80 p-1 rounded-lg mb-3">
            {['All','Bank','ATM'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <div className="relative group flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all text-sm font-medium"
              />
            </div>
            <button
              onClick={handleLocateMe}
              className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border transition-all ${userLocation ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-inner' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              <LocateFixed size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 px-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${userLocation ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
            <p className="text-[11px] font-medium text-slate-500">
              {userLocation ? 'Sorted by distance from you' : 'Most banks are currently open'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
          {processedBanks.map((bank: any, index: number) => {
            const isClosest = userLocation && index === 0;
            const isFav = favourites.includes(bank.id);
            return (
              <div
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className={`group bg-white p-3 rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer ${isClosest ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-md' : 'border-slate-100'}`}
              >
                {/* Image */}
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 border border-slate-100 relative">
                  <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
                  {bank.status === 'open' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-tl-md"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">{bank.name}</h3>
                    <button
                      onClick={e => { e.stopPropagation(); toggleFavourite(bank.id); }}
                      className={`text-sm ${isFav ? 'text-emerald-600' : 'text-slate-300'}`}
                    >
                      ★
                    </button>
                  </div>
                  <p className="text-[13px] text-slate-500 truncate mb-1.5">{bank.location}</p>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 uppercase tracking-wide rounded">{bank.type === 'atm' ? 'ATM' : 'Branch'}</span>
                    {bank.distance !== undefined && (
                      <span className="px-1.5 py-0.5 bg-slate-900 text-white rounded">{bank.distance.toFixed(1)} km</span>
                    )}
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded">{bank.status === '24/7' ? '24/7' : bank.status === 'open' ? 'Open' : 'Closed'}</span>
                  </div>
                  {/* Crowd info */}
                  <p className="text-[11px] text-slate-400 mt-1">Crowd: {bank.crowdLevel}, Wait: {bank.waitTime}</p>
                </div>

                <div className="flex-shrink-0 text-slate-300"><ArrowUpRight size={20} /></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-80px)] relative">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ''}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={userLocation || { lat: 5.1130, lng: -1.2500 }}
              zoom={13}
            >
              {processedBanks.map(bank => (
                <Marker
                  key={bank.id}
                  position={{ lat: bank.coordinates.lat, lng: bank.coordinates.lng }}
                  onClick={() => setSelectedBank(bank)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      <DetailSheet
        bank={selectedBank}
        isOpen={!!selectedBank}
        onClose={() => setSelectedBank(null)}
        distance={(selectedBank as any)?.distance}
      />
    </div>
  );
}
