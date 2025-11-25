import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  X,
  Copy,
  Clock,
  CreditCard,
  Landmark,
  LocateFixed,
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Zap,
  AlertTriangle,
  Banknote,
  Wifi
} from 'lucide-react';

// --- Types & Data ---

type BankType = 'bank' | 'rural' | 'atm' | 'momo';

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: BankType;
  tags: string[];
  status?: 'open' | 'closed' | '24/7';
  image: string;
  coordinates: { lat: number; lng: number };
  features: string[]; // sensible features
  securityLevel: 'High' | 'Medium' | 'Low'; // sensible feature
  powerBackup: boolean; // sensible feature
  acceptsForeignCards: boolean; // sensible feature
}

const bankData: BankLocation[] = [
  { 
    id: 1, name: 'GCB Bank (Main)', location: 'Chapel Square, Castle Area', type: 'bank', 
    tags: ['commercial', 'castle'], status: 'open',
    image: 'https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1064, lng: -1.2466 },
    features: ['Forex Bureau', 'Small Change Available'],
    securityLevel: 'High', powerBackup: true, acceptsForeignCards: true
  },
  { 
    id: 2, name: 'Ecobank ATM', location: 'Kotokuraba Road', type: 'atm', 
    tags: ['atm', 'market'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1140, lng: -1.2490 },
    features: ['Cash Deposit', 'Well Lit'],
    securityLevel: 'Medium', powerBackup: false, acceptsForeignCards: true
  },
  { 
    id: 3, name: 'MTN MoMo Agent', location: 'Commercial St. (Kofi Ent.)', type: 'momo', 
    tags: ['momo', 'transfer'], status: 'open',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1120, lng: -1.2480 },
    features: ['High Cash Float', 'SIM Registration'],
    securityLevel: 'Medium', powerBackup: false, acceptsForeignCards: false
  },
  { 
    id: 4, name: 'Absa Bank', location: 'Commercial Street', type: 'bank', 
    tags: ['commercial', 'market'], status: 'open',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1110, lng: -1.2480 },
    features: ['Forex', 'Wheelchair Access'],
    securityLevel: 'High', powerBackup: true, acceptsForeignCards: true
  },
  { 
    id: 5, name: 'Stand-alone ATM', location: 'Pedu Junction (Gas Station)', type: 'atm', 
    tags: ['atm', 'pedu'], status: '24/7',
    image: 'https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=100&q=80',
    coordinates: { lat: 5.1250, lng: -1.2600 },
    features: ['Quick Cash'],
    securityLevel: 'Low', powerBackup: false, acceptsForeignCards: true
  }
];

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
            <button onClick={handleClose} className="absolute top-5 right-5 p-2 bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                 <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">{bank.name}</h2>
                <div className="flex flex-wrap gap-2">
                   <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${bank.securityLevel === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                     {bank.securityLevel === 'High' ? 'Inside Bank (Safe)' : 'Street Access'}
                   </span>
                   {bank.powerBackup && (
                     <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-amber-200 flex items-center gap-1">
                       <Zap size={10} fill="currentColor" /> Generator
                     </span>
                   )}
                </div>
              </div>
            </div>

            {/* Sensible Features Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <CreditCard className={`w-5 h-5 ${bank.acceptsForeignCards ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cards</p>
                    <p className="text-sm font-bold text-slate-900">{bank.acceptsForeignCards ? 'Visa/Mastercard' : 'Local Only'}</p>
                  </div>
               </div>
               <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Network</p>
                    <p className="text-sm font-bold text-slate-900">Strong Signal</p>
                  </div>
               </div>
            </div>

            {/* Emergency Action */}
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 mb-6 flex items-center gap-3">
               <AlertTriangle className="text-rose-500 w-5 h-5" />
               <div>
                 <p className="text-xs font-bold text-rose-700">Card Swallowed?</p>
                 <p className="text-[11px] text-rose-600">Tap here for branch manager contact.</p>
               </div>
            </div>

            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold text-base py-3.5 rounded-xl hover:bg-black transition-all shadow-lg">
              <Navigation size={18} /> Navigate Now
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default function BanksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'ATM' | 'MoMo'>('All');
  const [selectedBank, setSelectedBank] = useState<BankLocation | null>(null);

  const filteredBanks = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return bankData.filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(lowerTerm) || bank.location.toLowerCase().includes(lowerTerm);
      let matchesTab = true;
      if (activeTab === 'ATM') matchesTab = bank.type === 'atm';
      if (activeTab === 'MoMo') matchesTab = bank.type === 'momo';
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-white relative pb-32">
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="h-16 w-full bg-transparent pointer-events-none"></div>
        <div className="px-4 pb-3 pt-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Finance</h1>
            <div className="flex bg-slate-100/80 p-1 rounded-lg">
               {['All', 'MoMo', 'ATM'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{tab}</button>
              ))}
            </div>
          </div>
          <div className="relative group flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-slate-400" /></div>
            <input type="text" placeholder="Search banks, MoMo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm" />
          </div>
          {/* Sensible Tip Line */}
          <div className="flex items-center gap-2 mt-2 px-1 text-[11px] font-medium text-slate-500">
             <ShieldCheck size={12} className="text-emerald-600" />
             <span>Tip: Use ATMs inside banks to avoid skimming.</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {filteredBanks.map((bank) => (
          <div key={bank.id} onClick={() => setSelectedBank(bank)} className="group bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer">
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 relative">
                <img src={bank.image} alt={bank.name} className="w-full h-full object-cover" />
                {bank.type === 'momo' && <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center"><Smartphone size={20} className="text-yellow-700" /></div>}
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-slate-900 text-[15px] truncate">{bank.name}</h3>
              <p className="text-[13px] text-slate-500 truncate mb-1.5">{bank.location}</p>
              <div className="flex items-center gap-2">
                  {bank.securityLevel === 'High' && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center gap-1"><ShieldCheck size={10} /> Safe</span>}
                  {bank.type === 'momo' && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-700">MoMo Agent</span>}
                  {bank.powerBackup && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1"><Zap size={8} fill="currentColor" /> Gen</span>}
              </div>
            </div>
            <ArrowUpRight size={20} className="text-slate-300" />
          </div>
        ))}
      </div>
      <DetailSheet bank={selectedBank} isOpen={!!selectedBank} onClose={() => setSelectedBank(null)} />
    </div>
  );
}