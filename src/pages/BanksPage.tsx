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
  CreditCard,
  Landmark,
  LocateFixed,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
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
  coordinates: { lat: number; lng: number };
  services: string[];
  crowdLevel?: 'Quiet' | 'Moderate' | 'Busy';
  waitTime?: string;
}

const bankData: BankLocation[] = [
  { 
    id: 1, name: 'GCB Bank', location: 'Chapel Square, Castle Area', type: 'bank', 
    tags: ['commercial', 'castle'], status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ['Forex', 'Parking', 'ATM'],
    crowdLevel: 'Moderate', waitTime: '10 min'
  },
  { 
    id: 2, name: 'GCB Bank', location: 'UCC Science Area', type: 'bank', 
    tags: ['commercial', 'ucc'], status: 'open',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1160, lng: -1.2920 },
    services: ['ATM', 'Student Services'],
    crowdLevel: 'Busy', waitTime: '25 min'
  },
  { 
    id: 3, name: 'Fidelity Bank', location: 'Inner Ring Road', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1130, lng: -1.2500 },
    services: ['Forex', 'Instant Card'],
    crowdLevel: 'Quiet', waitTime: '5 min'
  },
  { 
    id: 4, name: 'Absa Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1110, lng: -1.2480 },
    services: ['Forex', 'Prestige Banking'],
    crowdLevel: 'Moderate', waitTime: '15 min'
  },
  { 
    id: 5, name: 'CalBank', location: 'Pedu Junction', type: 'bank', 
    tags: ['commercial', 'pedu'], status: 'open',
    image: 'https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1250, lng: -1.2600 },
    services: ['ATM', 'Parking'],
    crowdLevel: 'Quiet', waitTime: '2 min'
  },
  { 
    id: 6, name: 'ADB Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'town'], status: 'open',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1070, lng: -1.2470 },
    services: ['Agri-Finance', 'ATM'],
    crowdLevel: 'Moderate', waitTime: '12 min'
  },
  { 
    id: 12, name: 'Ecobank ATM', location: 'Kotokraba Road', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1140, lng: -1.2490 },
    services: ['24/7 Access', 'Cash Deposit'],
    crowdLevel: 'Quiet', waitTime: '0 min'
  },
  { 
    id: 16, name: 'GTBank ATM', location: 'Kotokuraba Market', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ['24/7 Access'],
    crowdLevel: 'Moderate', waitTime: '2 min'
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

// "Wealth Concierge" Insight Logic
const getSmartInsight = (count: number, hasUserLoc: boolean) => {
  const hour = new Date().getHours();
  if (hour > 17 || hour < 6) return { text: "It's after hours. Showing safe, 24/7 ATM locations.", icon: ShieldCheck };
  if (hasUserLoc) return { text: `${count} locations sorted by proximity to you.`, icon: MapPin };
  return { text: "Commercial Street has the highest concentration of banks.", icon: Sparkles };
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
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
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
          <div className="p-8 pb-10 md:pb-8 relative">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-8 md:hidden" />
            
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100 border border-slate-100">
                 <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                  {bank.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                   {bank.services.slice(0, 2).map(s => (
                     <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                       {s}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">Status</p>
                <p className={`text-sm font-semibold ${bank.status === 'open' ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {bank.status === '24/7' ? '24/7' : bank.status === 'open' ? 'Open' : 'Closed'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Navigation className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">Distance</p>
                <p className="text-sm font-semibold text-slate-900">
                  {distance ? `${distance.toFixed(1)} km` : '--'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">Wait</p>
                <p className="text-sm font-semibold text-slate-900">{bank.waitTime}</p>
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Location</p>
              <p className="text-lg font-medium text-slate-900 leading-relaxed">
                {bank.location}
              </p>
            </div>

            {/* Primary Action */}
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              <Navigation size={20} />
              Navigate Now
            </a>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
               <button 
                  onClick={() => navigator.clipboard.writeText(`${bank.name}, ${bank.location}`)}
                  className="py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-2"
                >
                  <Copy size={16} /> Copy Address
               </button>
               <button 
                  className="py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-2"
                >
                  <Share2 size={16} /> Share Location
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
          alert('Location access denied.');
          setIsLocating(false);
        }
      );
    }
  };

  const insight = getSmartInsight(processedBanks.length, !!userLocation);

  return (
    <div className="min-h-screen bg-white relative pb-32">
      
      {/* HEADER SECTION 
        Generous top padding to 'distance the header' from content
      */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-100 transition-all">
        {/* Spacer for Site Navigation */}
        <div className="h-20 w-full bg-transparent pointer-events-none"></div>

        <div className="px-6 pb-6 max-w-2xl mx-auto space-y-6">
          {/* Top Row: Title + Locate Action */}
          <div className="flex items-end justify-between pt-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Finance
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                Cape Coast Directory
              </p>
            </div>
            
            <button 
              onClick={handleLocateMe}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                userLocation 
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <LocateFixed size={14} className={isLocating ? 'animate-spin' : ''} />
              {userLocation ? 'Sorted by Distance' : 'Nearest to Me'}
            </button>
          </div>

          {/* Concierge Insight */}
          <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-100">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-900 shadow-sm">
               <insight.icon size={14} />
             </div>
             <p className="text-sm text-slate-600 font-medium leading-tight">
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
              className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all font-medium text-base shadow-sm"
            />
          </div>

          {/* Minimalist Tabs */}
          <div className="flex gap-6 border-b border-slate-100">
            {['All', 'Bank', 'ATM'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-bold transition-all relative ${
                  activeTab === tab 
                    ? 'text-slate-900' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'Bank' ? 'Banks' : tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIST CONTENT 
        Clean, spacious list items
      */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        {processedBanks.length > 0 ? (
          processedBanks.map((bank: any) => (
            <div 
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className="group bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 active:scale-[0.99] transition-all cursor-pointer hover:shadow-md hover:border-slate-200"
            >
              {/* Bank Image/Logo */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 border border-slate-100 relative">
                 <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
                 {bank.status === 'open' && (
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                 )}
              </div>

              <div className="flex-grow min-w-0 py-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 text-lg leading-none truncate pr-2">
                    {bank.name}
                  </h3>
                </div>
                
                <p className="text-sm text-slate-500 font-medium truncate mb-2">
                  {bank.location}
                </p>

                {/* Relevance Tags */}
                <div className="flex items-center gap-2">
                   {bank.distance !== undefined && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white">
                        {bank.distance.toFixed(1)} km
                      </span>
                   )}
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wide">
                     {bank.type === 'atm' ? 'ATM' : 'Branch'}
                   </span>
                   {bank.status === '24/7' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 uppercase tracking-wide">
                        24/7
                      </span>
                   )}
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100 transition-colors">
                <ArrowUpRight size={20} className="text-slate-400 group-hover:text-slate-900" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 opacity-40">
            <Building2 className="mx-auto mb-6 text-slate-400" size={64} />
            <p className="text-slate-900 font-bold text-lg">No banks found</p>
            <p className="text-slate-500">Try adjusting your search</p>
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