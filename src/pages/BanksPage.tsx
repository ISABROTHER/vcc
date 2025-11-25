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
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[2rem] shadow-2xl transform transition-transform duration-300 cubic-bezier(0.2, 0.9, 0.3, 1) md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing 
            ? 'translate-y-0 md:-translate-y-1/2' 
            : 'translate-y-full md:translate-y-10'
        }`}
      >
        {bank && (
          <div className="p-6 pb-10 md:pb-6 relative">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />
            
            <button 
              onClick={handleClose} 
              className="absolute top-5 right-5 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100 border border-slate-100">
                 <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                  {bank.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                   {bank.services.slice(0, 2).map(s => (
                     <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                       {s}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between gap-2 mb-6">
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Status</p>
                <p className={`text-sm font-bold ${bank.status === 'open' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {bank.status === '24/7' ? '24/7' : 'Open'}
                </p>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Distance</p>
                <p className="text-sm font-bold text-slate-900">
                  {distance ? `${distance.toFixed(1)} km` : '--'}
                </p>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Wait</p>
                <p className="text-sm font-bold text-slate-900">{bank.waitTime}</p>
              </div>
            </div>

            {/* Navigate */}
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold text-base py-3.5 rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98] mb-3"
            >
              <Navigation size={18} />
              Navigate Now
            </a>
            
            <div className="grid grid-cols-2 gap-3">
               <button 
                  onClick={() => navigator.clipboard.writeText(`${bank.name}, ${bank.location}`)}
                  className="py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <Copy size={14} /> Copy Address
               </button>
               <button 
                  className="py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <Share2 size={14} /> Share
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

  return (
    <div className="min-h-screen bg-white relative pb-32">
      
      {/* COMPACT HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="h-16 w-full bg-transparent pointer-events-none"></div>

        <div className="px-4 pb-3 pt-2 max-w-2xl mx-auto">
          {/* Row 1: Title + Tabs */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Finance 
              <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {processedBanks.length}
              </span>
            </h1>
            
            <div className="flex bg-slate-100/80 p-1 rounded-lg">
               {['All', 'Bank', 'ATM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Compact Search + Locate */}
          <div className="flex gap-2">
            <div className="relative group flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all font-medium text-sm"
              />
            </div>
            
            <button 
              onClick={handleLocateMe}
              className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border transition-all ${
                userLocation 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-inner'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LocateFixed size={18} className={isLocating ? 'animate-spin' : ''} />
            </button>
          </div>
          
          {/* Subtle Insight Line */}
          <div className="flex items-center gap-2 mt-2 px-1">
             <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${userLocation ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
             <p className="text-[11px] font-medium text-slate-500">
               {userLocation ? 'Sorted by distance from you' : 'Most banks are currently open'}
             </p>
          </div>
        </div>
      </div>

      {/* LIST CONTENT */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {processedBanks.length > 0 ? (
          processedBanks.map((bank: any, index: number) => {
            // Check if this is the closest bank (Index 0 when userLocation is active)
            const isClosest = userLocation && index === 0;

            return (
              <div 
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className={`group bg-white p-3 rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:border-slate-300 ${
                  isClosest 
                    ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-md' 
                    : 'border-slate-100'
                }`}
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
                    <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">
                      {bank.name}
                    </h3>
                  </div>
                  
                  <p className="text-[13px] text-slate-500 truncate mb-1.5">
                    {bank.location}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2">
                     {/* NEAREST BADGE */}
                     {isClosest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Nearest
                        </span>
                     )}
                     
                     {bank.distance !== undefined && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                          {bank.distance.toFixed(1)} km
                        </span>
                     )}
                     
                     <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wide">
                       {bank.type === 'atm' ? 'ATM' : 'Branch'}
                     </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-slate-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 opacity-40">
            <Building2 className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-900 font-bold">No results</p>
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