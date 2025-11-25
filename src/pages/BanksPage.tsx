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
  Sparkles,
  Globe,
  Car,
  Accessibility
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
  brandColor: string; 
  coordinates: { lat: number; lng: number };
  services: string[];
  crowdLevel?: 'Quiet' | 'Moderate' | 'Busy';
  waitTime?: string;
}

const bankData: BankLocation[] = [
  { 
    id: 1, name: 'GCB Bank (Main)', location: 'Chapel Square / Castle Area', type: 'bank', 
    tags: ['commercial', 'castle'], status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-red-600',
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ['Forex', 'Parking', 'ATM'],
    crowdLevel: 'Moderate',
    waitTime: '10 min'
  },
  { 
    id: 2, name: 'GCB Bank (UCC)', location: 'UCC Science Area', type: 'bank', 
    tags: ['commercial', 'ucc'], status: 'open',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-red-600',
    coordinates: { lat: 5.1160, lng: -1.2920 },
    services: ['ATM', 'Student Services'],
    crowdLevel: 'Busy',
    waitTime: '25 min'
  },
  { 
    id: 3, name: 'Fidelity Bank', location: 'Inner Ring Road', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-orange-500',
    coordinates: { lat: 5.1130, lng: -1.2500 },
    services: ['Forex', 'Instant Card'],
    crowdLevel: 'Quiet',
    waitTime: '5 min'
  },
  { 
    id: 4, name: 'Absa Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-red-700',
    coordinates: { lat: 5.1110, lng: -1.2480 },
    services: ['Forex', 'Prestige Banking'],
    crowdLevel: 'Moderate',
    waitTime: '15 min'
  },
  { 
    id: 5, name: 'CalBank', location: 'Pedu Junction', type: 'bank', 
    tags: ['commercial', 'pedu'], status: 'open',
    image: 'https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-yellow-500',
    coordinates: { lat: 5.1250, lng: -1.2600 },
    services: ['ATM', 'Parking'],
    crowdLevel: 'Quiet',
    waitTime: '2 min'
  },
  { 
    id: 6, name: 'ADB Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'town'], status: 'open',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-green-600',
    coordinates: { lat: 5.1070, lng: -1.2470 },
    services: ['Agri-Finance', 'ATM'],
    crowdLevel: 'Moderate',
    waitTime: '12 min'
  },
  { 
    id: 12, name: 'Ecobank ATM', location: 'Kotokraba Road', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-blue-600',
    coordinates: { lat: 5.1140, lng: -1.2490 },
    services: ['24/7 Access', 'Cash Deposit'],
    crowdLevel: 'Quiet',
    waitTime: '0 min'
  },
  { 
    id: 16, name: 'GTBank ATM', location: 'Kotokuraba Market', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=200&q=80',
    brandColor: 'bg-orange-600',
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ['24/7 Access'],
    crowdLevel: 'Moderate',
    waitTime: '2 min'
  },
];

// --- Helpers ---

// Haversine Formula for distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI/180);
  const dLon = (lon2 - lon1) * (Math.PI/180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

// Logic for "Smart Insight"
const getSmartInsight = (count: number, hasUserLoc: boolean) => {
  const hour = new Date().getHours();
  if (hour > 17 || hour < 6) return { text: "It's late. Use 24/7 ATMs for safety.", icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' };
  if (hasUserLoc) return { text: `Found ${count} locations near you.`, icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' };
  return { text: "Commercial St. has the most banks.", icon: Info, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' };
};

const getServiceIcon = (service: string) => {
  if (service === 'Forex') return <Globe size={10} />;
  if (service === 'Parking') return <Car size={10} />;
  if (service.includes('ATM')) return <CreditCard size={10} />;
  return <Building2 size={10} />;
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

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      <div 
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 cubic-bezier(0.2, 0.9, 0.3, 1) md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing 
            ? 'translate-y-0 md:-translate-y-1/2' 
            : 'translate-y-full md:translate-y-10'
        }`}
      >
        {bank && (
          <div className="p-6 pb-10 md:pb-6 relative">
            <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mb-6 md:hidden" />
            
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-start gap-5 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 text-white ${bank.brandColor}`}>
                {bank.type === 'atm' ? <CreditCard size={28} /> : <Landmark size={28} />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                  {bank.name}
                </h2>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${bank.status === 'closed' ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                   <p className="text-sm text-slate-500 font-medium">
                     {bank.status === '24/7' ? 'Open 24/7' : bank.status === 'open' ? 'Open Now' : 'Closed'}
                   </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
               <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
                 <Clock className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                 <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Wait Time</p>
                 <p className="text-sm font-bold text-slate-900">{bank.waitTime}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
                 <Users className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                 <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Crowd</p>
                 <p className="text-sm font-bold text-slate-900">{bank.crowdLevel}</p>
              </div>
               <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
                 <Zap className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                 <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Service</p>
                 <p className="text-sm font-bold text-slate-900">{bank.type === 'atm' ? 'Fast' : 'Full'}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
              <MapPin className="text-slate-400 mt-0.5" size={18} />
              <div className="text-sm text-slate-600 leading-relaxed font-medium">
                {bank.location}
              </div>
            </div>

            {/* Main Action */}
            <div className="grid grid-cols-1 gap-3">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-slate-900 text-white font-bold text-base py-4 rounded-2xl active:scale-[0.98] transition hover:bg-black shadow-lg shadow-slate-200"
              >
                <Navigation size={18} />
                Get Directions
                {distance && <span className="opacity-60 text-sm font-normal">({distance.toFixed(1)} km)</span>}
              </a>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigator.clipboard.writeText(`${bank.name}, ${bank.location}`)}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl active:scale-[0.98] transition hover:bg-slate-50 text-sm"
                >
                  <Copy size={16} />
                  Copy Address
                </button>
                <button 
                   onClick={() => {
                     if (navigator.share) {
                       navigator.share({
                         title: bank.name,
                         text: `Check out ${bank.name} at ${bank.location}`,
                         url: googleMapsUrl
                       }).catch(() => {});
                     }
                   }}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl active:scale-[0.98] transition hover:bg-slate-50 text-sm"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
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

  // Sorting & Filtering
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
        distance: calculateDistance(
          userLocation.lat, userLocation.lng, 
          bank.coordinates.lat, bank.coordinates.lng
        )
      })).sort((a, b) => (a as any).distance - (b as any).distance);
    }

    return filtered;
  }, [searchTerm, activeTab, userLocation]);

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
          alert('Location access denied. Using default sort.');
          setIsLocating(false);
        }
      );
    }
  };

  const insight = getSmartInsight(processedBanks.length, !!userLocation);

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative pb-32">
      
      {/* --- FIXED HEADER --- */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
        {/* Spacer for Site Nav */}
        <div className="h-16 md:h-20 w-full bg-transparent pointer-events-none" />

        <div className="px-5 pb-4 max-w-2xl mx-auto space-y-4 pt-4">
          
          {/* Top Row: Title + Locate */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Finance
              </h1>
            </div>
            <button 
              onClick={handleLocateMe}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                userLocation 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-900 text-white shadow-lg active:scale-95 border-transparent'
              }`}
            >
              <LocateFixed size={14} className={isLocating ? 'animate-spin' : ''} />
              {userLocation ? 'Sorted by Distance' : 'Find Nearest'}
            </button>
          </div>

          {/* Smart Insight Card */}
          <div className={`rounded-xl p-3 flex items-start gap-3 border ${insight.bg} transition-colors`}>
            <insight.icon size={18} className={`mt-0.5 ${insight.color}`} />
            <p className="text-sm text-slate-700 font-medium leading-snug">
              {insight.text}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search banks, ATMs, areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5 transition-all font-medium text-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['All', 'Bank', 'ATM'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
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

      {/* --- SCROLLABLE CONTENT --- 
          Padding Top = approx height of fixed header (approx 340px) 
      */}
      <div className="pt-[340px] max-w-2xl mx-auto px-4 sm:px-5 pb-10 space-y-3">
        {processedBanks.length > 0 ? (
          processedBanks.map((bank: any) => (
            <div 
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className="group bg-white p-3 pr-4 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:shadow-md hover:border-slate-200"
            >
              {/* Brand Logo / Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${bank.brandColor}`}>
                 {bank.type === 'atm' ? <CreditCard size={24} /> : <Landmark size={24} />}
              </div>

              <div className="flex-grow min-w-0 py-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">
                    {bank.name}
                  </h3>
                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    <div className={`w-1.5 h-1.5 rounded-full ${bank.status === 'closed' ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                    <span className="text-[10px] font-bold text-slate-600">
                      {bank.status === '24/7' ? '24/7' : bank.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
                
                <p className="text-[13px] text-slate-500 truncate mb-2">
                  {bank.location}
                </p>

                {/* Relevant Feature Tags */}
                <div className="flex items-center gap-2 overflow-hidden">
                   {bank.services.slice(0, 3).map((service: string) => (
                     <span key={service} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 whitespace-nowrap">
                       {getServiceIcon(service)}
                       {service}
                     </span>
                   ))}
                </div>
              </div>

              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
          ))
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