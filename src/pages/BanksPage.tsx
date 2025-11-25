import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Landmark, 
  CreditCard, 
  Building2, 
  X,
  Share2,
  Copy,
  Clock,
  ChevronRight
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
}

const bankData: BankLocation[] = [
  { id: 1, name: 'GCB Bank (Main Branch)', location: 'Chapel Square / Opposite Cape Coast Castle', type: 'bank', tags: ['commercial', 'castle'], status: 'open' },
  { id: 2, name: 'GCB Bank (UCC Branch)', location: 'UCC Science Area, Near CALC Building', type: 'bank', tags: ['commercial', 'ucc'], status: 'open' },
  { id: 3, name: 'Fidelity Bank', location: '107 Inner Ring Road, Near Kotokuraba', type: 'bank', tags: ['commercial', 'market'], status: 'open' },
  { id: 4, name: 'Absa Bank', location: 'Commercial Street, Near Kotokuraba Market', type: 'bank', tags: ['commercial', 'market'], status: 'open' },
  { id: 5, name: 'CalBank', location: 'Pedu Junction — Opposite Shell Filling Station', type: 'bank', tags: ['commercial', 'pedu'], status: 'open' },
  { id: 6, name: 'ADB Bank (Main)', location: 'Commercial Street, Near Chapel Square', type: 'bank', tags: ['commercial', 'town'], status: 'open' },
  { id: 7, name: 'ADB Bank (UCC Branch)', location: 'UCC Campus — Near Casely Hayford Hall', type: 'bank', tags: ['commercial', 'ucc'], status: 'open' },
  { id: 8, name: 'Republic Bank', location: 'Tantri — Mancell Block A, Near Lorry Station', type: 'bank', tags: ['commercial', 'tantri'], status: 'open' },
  { id: 9, name: 'Prudential Bank', location: 'Kotokraba Market Traffic Light', type: 'bank', tags: ['commercial', 'market'], status: 'open' },
  { id: 10, name: 'Prudential Bank (UCC)', location: 'UCC Main Campus — Near Science Roundabout', type: 'bank', tags: ['commercial', 'ucc'], status: 'open' },
  { id: 11, name: 'Zenith Bank', location: 'UCC New Site — Casford Street, Near Casford Hall', type: 'bank', tags: ['commercial', 'ucc'], status: 'open' },
  { id: 12, name: 'Ecobank ATM', location: 'Kotokraba Road — Near Market Entrance', type: 'atm', tags: ['atm', 'market'], status: '24/7' },
  { id: 13, name: 'Kakum Rural Bank', location: 'Kotokuraba Road — Opposite Market Stalls', type: 'rural', tags: ['rural', 'market'], status: 'open' },
  { id: 14, name: 'Assinman Rural Bank', location: 'Pedu Junction / Kotokuraba Branches', type: 'rural', tags: ['rural', 'pedu'], status: 'open' },
  { id: 15, name: 'Akatakyiman Rural Bank', location: 'Cape Coast Township (General area)', type: 'rural', tags: ['rural', 'town'], status: 'open' },
  { id: 16, name: 'GTBank ATM', location: 'F87/3 Kotokuraba Road — Near the Market', type: 'atm', tags: ['atm', 'market'], status: '24/7' },
];

// --- Helpers ---

const getStatusColor = (status?: string) => {
  if (status === '24/7') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
  if (status === 'closed') return 'text-rose-600 bg-rose-50 border-rose-100';
  return 'text-blue-600 bg-blue-50 border-blue-100';
};

const getIcon = (type: BankType) => {
  switch (type) {
    case 'atm': return <CreditCard size={20} className="text-emerald-600" />;
    case 'rural': return <Building2 size={20} className="text-amber-600" />;
    default: return <Landmark size={20} className="text-blue-600" />;
  }
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
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div 
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1)] md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing 
            ? 'translate-y-0 md:-translate-y-1/2' 
            : 'translate-y-full md:translate-y-10 md:opacity-0'
        }`}
      >
        {bank && (
          <div className="p-6 pb-10 md:pb-6">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                  bank.type === 'atm' ? 'bg-emerald-50' : 
                  bank.type === 'rural' ? 'bg-amber-50' : 'bg-blue-50'
                }`}>
                  {getIcon(bank.type)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight">{bank.name}</h2>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-full text-xs font-semibold border ${getStatusColor(bank.status)}`}>
                    <Clock size={12} />
                    {bank.status === '24/7' ? 'Open 24/7' : 'Standard Hours'}
                  </div>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 flex gap-3">
               <MapPin className="text-slate-400 flex-shrink-0 mt-0.5" size={20} />
               <div className="text-sm text-slate-700 font-medium leading-relaxed">
                 {bank.location}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition hover:bg-blue-700 shadow-lg shadow-blue-200"
              >
                <Navigation size={18} />
                Navigate Now
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

  const filteredBanks = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return bankData.filter(bank => {
      const matchSearch =
        bank.name.toLowerCase().includes(lower) ||
        bank.location.toLowerCase().includes(lower) ||
        bank.tags.some(tag => tag.includes(lower));

      let matchTab = true;
      if (activeTab === 'ATM') matchTab = bank.type === 'atm';
      if (activeTab === 'Bank') matchTab = bank.type === 'bank' || bank.type === 'rural';

      return matchSearch && matchTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      
      <div className="bg-white pb-6 pt-24 px-4 sm:px-6 shadow-[0_1px_15px_rgba(0,0,0,0.03)] rounded-b-[2rem] z-10 relative">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Finance
              </h1>
              <p className="text-slate-500 font-medium">Find ATMs & branches nearby</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
               <MapPin size={20} />
            </div>
          </div>

          <div className="relative mb-6 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search 'UCC', 'Kotokuraba'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-sm font-medium text-[16px]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Bank', 'ATM'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tab === 'Bank' ? 'Banks & Rural' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {filteredBanks.length > 0 ? (
          <div className="grid gap-3">
            {filteredBanks.map((bank) => (
              <div 
                key={bank.id}
                onClick={() => setSelectedBank(bank)}
                className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all active:scale-[0.98] hover:shadow-md hover:border-blue-100 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  bank.type === 'atm' ? 'bg-emerald-50 text-emerald-600' : 
                  bank.type === 'rural' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {bank.type === 'atm' ? <CreditCard size={20} /> : <Landmark size={20} />}
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">
                    {bank.name}
                  </h3>
                  <p className="text-sm text-slate-500 truncate mt-0.5">
                    {bank.location}
                  </p>
                </div>

                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <Building2 className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 font-medium">No results found.</p>
          </div>
        )}
      </div>

      <DetailSheet 
        bank={selectedBank} 
        isOpen={!!selectedBank} 
        onClose={() => setSelectedBank(null)} 
      />

    </div>
  );
}
