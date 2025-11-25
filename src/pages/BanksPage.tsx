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
  Landmark
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
  image: string; // Added image field
}

// I've added placeholder images from Unsplash. 
// You can replace these URLs with actual photos of the specific branches if you have them.
const bankData: BankLocation[] = [
  { 
    id: 1, 
    name: 'GCB Bank (Main Branch)', 
    location: 'Chapel Square / Opposite Cape Coast Castle', 
    type: 'bank', 
    tags: ['commercial', 'castle'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 2, 
    name: 'GCB Bank (UCC Branch)', 
    location: 'UCC Science Area, Near CALC Building', 
    type: 'bank', 
    tags: ['commercial', 'ucc'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 3, 
    name: 'Fidelity Bank', 
    location: '107 Inner Ring Road, Near Kotokuraba', 
    type: 'bank', 
    tags: ['commercial', 'market'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 4, 
    name: 'Absa Bank', 
    location: 'Commercial Street, Near Kotokuraba Market', 
    type: 'bank', 
    tags: ['commercial', 'market'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 5, 
    name: 'CalBank', 
    location: 'Pedu Junction — Opposite Shell Filling Station', 
    type: 'bank', 
    tags: ['commercial', 'pedu'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 6, 
    name: 'ADB Bank (Main)', 
    location: 'Commercial Street, Near Chapel Square', 
    type: 'bank', 
    tags: ['commercial', 'town'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 7, 
    name: 'ADB Bank (UCC Branch)', 
    location: 'UCC Campus — Near Casely Hayford Hall', 
    type: 'bank', 
    tags: ['commercial', 'ucc'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 8, 
    name: 'Republic Bank', 
    location: 'Tantri — Mancell Block A, Near Lorry Station', 
    type: 'bank', 
    tags: ['commercial', 'tantri'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e3169?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 9, 
    name: 'Prudential Bank', 
    location: 'Kotokraba Market Traffic Light', 
    type: 'bank', 
    tags: ['commercial', 'market'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1604213410393-89f141ad7cfa?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 10, 
    name: 'Prudential Bank (UCC)', 
    location: 'UCC Main Campus — Near Science Roundabout', 
    type: 'bank', 
    tags: ['commercial', 'ucc'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 11, 
    name: 'Zenith Bank', 
    location: 'UCC New Site — Casford Street, Near Casford Hall', 
    type: 'bank', 
    tags: ['commercial', 'ucc'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 12, 
    name: 'Ecobank ATM', 
    location: 'Kotokraba Road — Near Market Entrance', 
    type: 'atm', 
    tags: ['atm', 'market'], 
    status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 13, 
    name: 'Kakum Rural Bank', 
    location: 'Kotokuraba Road — Opposite Market Stalls', 
    type: 'rural', 
    tags: ['rural', 'market'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 14, 
    name: 'Assinman Rural Bank', 
    location: 'Pedu Junction / Kotokuraba Branches', 
    type: 'rural', 
    tags: ['rural', 'pedu'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 15, 
    name: 'Akatakyiman Rural Bank', 
    location: 'Cape Coast Township (General area)', 
    type: 'rural', 
    tags: ['rural', 'town'], 
    status: 'open',
    image: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?auto=format&fit=crop&w=200&q=80'
  },
  { 
    id: 16, 
    name: 'GTBank ATM', 
    location: 'F87/3 Kotokuraba Road — Near the Market', 
    type: 'atm', 
    tags: ['atm', 'market'], 
    status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=200&q=80'
  },
];

// --- Helpers ---

const getStatusColor = (status?: string) => {
  if (status === '24/7') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
  if (status === 'closed') return 'text-rose-600 bg-rose-50 border-rose-100';
  return 'text-blue-600 bg-blue-50 border-blue-100';
};

// --- Components ---

const DetailSheet = ({ 
  bank, 
  isOpen, 
  onClose 
}: { 
  bank: BankLocation | null, 
  isOpen: boolean, 
  onClose: () => void 
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
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mb-8 md:hidden" />
            
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={24} />
            </button>

            {/* Header Info */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-md mb-4 flex-shrink-0">
                <img 
                  src={bank.image} 
                  alt={bank.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 leading-tight px-4 mb-2">
                {bank.name}
              </h2>
              
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(bank.status)}`}>
                <Clock size={12} />
                {bank.status === '24/7' ? 'Open 24/7' : 'Standard Banking Hours'}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8 flex gap-3 items-start">
               <MapPin className="text-slate-400 flex-shrink-0 mt-1" size={20} />
               <div className="text-sm text-slate-700 font-medium leading-relaxed">
                 {bank.location}
               </div>
            </div>

            {/* Action Buttons */}
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
                 onClick={() => {
                   if (navigator.share) {
                     navigator.share({
                       title: bank.name,
                       text: `Check out ${bank.name} at ${bank.location}`,
                       url: googleMapsUrl
                     }).catch(() => {});
                   }
                 }}
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

  // Filter Logic
  const filteredBanks = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return bankData.filter(bank => {
      const matchesSearch = 
        bank.name.toLowerCase().includes(lowerTerm) || 
        bank.location.toLowerCase().includes(lowerTerm) ||
        bank.tags.some(tag => tag.includes(lowerTerm));

      let matchesTab = true;
      if (activeTab === 'ATM') matchesTab = bank.type === 'atm';
      if (activeTab === 'Bank') matchesTab = bank.type === 'bank' || bank.type === 'rural';

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-32">
      
      {/* TOP SECTION - Fixed Header */}
      <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        {/* Spacer to push content below the main site navigation */}
        <div className="h-20 md:h-24 w-full bg-transparent pointer-events-none"></div>

        <div className="px-5 pb-5 max-w-2xl mx-auto space-y-4">
          <div className="flex items-end justify-between">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Finance
            </h1>
            <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200 shadow-sm flex items-center gap-1">
              <Info size={12} />
              {filteredBanks.length} Locations
            </div>
          </div>
          
          {/* Search & Filter Container */}
          <div className="space-y-3">
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search banks, ATMs, areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3.5 bg-white border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10 shadow-sm font-medium text-base"
              />
            </div>

            {/* Full Width Grid Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-200/50 rounded-xl">
              {['All', 'Bank', 'ATM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm scale-[1.02]' 
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

      {/* LIST CONTENT */}
      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-6 space-y-3">
        {filteredBanks.length > 0 ? (
          filteredBanks.map((bank) => (
            <div 
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.97] active:bg-slate-50 transition-all cursor-pointer"
            >
              {/* Image Container */}
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                <img 
                  src={bank.image} 
                  alt={bank.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content - No Truncate, Full Visibility */}
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-1">
                  {bank.name}
                </h3>
                <p className="text-sm text-slate-500 leading-snug">
                  {bank.location}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                <ChevronRight size={16} className="text-slate-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-50">
            <Building2 className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 font-medium">No locations found</p>
          </div>
        )}
      </div>

      {/* Detail Overlay */}
      <DetailSheet 
        bank={selectedBank} 
        isOpen={!!selectedBank} 
        onClose={() => setSelectedBank(null)} 
      />

    </div>
  );
}