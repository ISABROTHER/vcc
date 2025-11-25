import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Landmark, 
  CreditCard, 
  Building2, 
  ChevronRight,
  Info
} from 'lucide-react';

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: 'bank' | 'rural' | 'atm';
  tags: string[];
}

const bankData: BankLocation[] = [
  {
    id: 1,
    name: 'GCB Bank (Main Branch)',
    location: 'Chapel Square / Opposite Cape Coast Castle',
    type: 'bank',
    tags: ['commercial', 'international', 'castle', 'chapel square']
  },
  {
    id: 2,
    name: 'GCB Bank (UCC Branch)',
    location: 'UCC Science Area, Near CALC Building',
    type: 'bank',
    tags: ['commercial', 'university', 'campus', 'ucc']
  },
  {
    id: 3,
    name: 'Fidelity Bank',
    location: '107 Inner Ring Road, Near Kotokuraba',
    type: 'bank',
    tags: ['commercial', 'market', 'kotokuraba']
  },
  {
    id: 4,
    name: 'Absa Bank (Former Barclays)',
    location: 'Commercial Street, Near Kotokuraba Market',
    type: 'bank',
    tags: ['commercial', 'international', 'market', 'kotokuraba']
  },
  {
    id: 5,
    name: 'CalBank',
    location: 'Pedu Junction — Opposite Shell Filling Station',
    type: 'bank',
    tags: ['commercial', 'pedu']
  },
  {
    id: 6,
    name: 'ADB Bank (Main)',
    location: 'Commercial Street, Near Chapel Square',
    type: 'bank',
    tags: ['commercial', 'chapel square', 'town']
  },
  {
    id: 7,
    name: 'ADB Bank (UCC Branch)',
    location: 'UCC Campus — Near Casely Hayford Hall',
    type: 'bank',
    tags: ['commercial', 'university', 'campus', 'ucc']
  },
  {
    id: 8,
    name: 'Republic Bank',
    location: 'Tantri — Mancell Block A, Near Lorry Station',
    type: 'bank',
    tags: ['commercial', 'tantri', 'transport']
  },
  {
    id: 9,
    name: 'Prudential Bank',
    location: 'Kotokraba Market Traffic Light',
    type: 'bank',
    tags: ['commercial', 'market', 'kotokuraba']
  },
  {
    id: 10,
    name: 'Prudential Bank (UCC)',
    location: 'UCC Main Campus — Near Science Roundabout',
    type: 'bank',
    tags: ['commercial', 'university', 'campus', 'ucc']
  },
  {
    id: 11,
    name: 'Zenith Bank',
    location: 'UCC New Site — Casford Street, Near Casford Hall',
    type: 'bank',
    tags: ['commercial', 'university', 'campus', 'ucc']
  },
  {
    id: 12,
    name: 'Ecobank ATM',
    location: 'Kotokraba Road — Near Market Entrance',
    type: 'atm',
    tags: ['atm', 'market', 'kotokuraba']
  },
  {
    id: 13,
    name: 'Kakum Rural Bank',
    location: 'Kotokuraba Road — Opposite Market Stalls',
    type: 'rural',
    tags: ['rural', 'local', 'market']
  },
  {
    id: 14,
    name: 'Assinman Rural Bank',
    location: 'Pedu Junction / Kotokuraba Branches',
    type: 'rural',
    tags: ['rural', 'local', 'pedu']
  },
  {
    id: 15,
    name: 'Akatakyiman Rural Bank',
    location: 'Cape Coast Township (General area)',
    type: 'rural',
    tags: ['rural', 'local', 'town']
  },
  {
    id: 16,
    name: 'GTBank ATM',
    location: 'F87/3 Kotokuraba Road — Near the Market',
    type: 'atm',
    tags: ['atm', 'market', 'kotokuraba']
  }
];

const BankIcon = ({ type }: { type: string }) => {
  if (type === 'atm') return <CreditCard className="text-emerald-600" size={20} />;
  if (type === 'rural') return <Building2 className="text-amber-600" size={20} />;
  return <Landmark className="text-blue-700" size={20} />;
};

// Compact List Item Component
const CompactBankItem = ({ bank }: { bank: BankLocation }) => {
  const mapQuery = encodeURIComponent(`${bank.name} ${bank.location} Cape Coast Ghana`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <a 
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-100 last:border-0"
    >
      {/* Icon Box */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
        bank.type === 'atm' ? 'bg-emerald-50' : 
        bank.type === 'rural' ? 'bg-amber-50' : 'bg-blue-50'
      }`}>
        <BankIcon type={bank.type} />
      </div>

      {/* Text Content */}
      <div className="flex-grow min-w-0">
        <h3 className="text-[15px] font-semibold text-slate-900 truncate">
          {bank.name}
        </h3>
        <p className="text-[13px] text-slate-500 truncate flex items-center gap-1">
          <MapPin size={12} />
          {bank.location}
        </p>
      </div>

      {/* Direction Arrow */}
      <div className="flex-shrink-0 text-slate-300 group-hover:text-amber-500 transition-colors">
        <Navigation size={20} />
      </div>
    </a>
  );
};

export default function BanksPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBanks = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return bankData.filter(bank => 
      bank.name.toLowerCase().includes(lowerTerm) || 
      bank.location.toLowerCase().includes(lowerTerm) ||
      bank.tags.some(tag => tag.includes(lowerTerm))
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      <div className="max-w-xl mx-auto">
        
        {/* Header & Search Container */}
        <div className="px-4 sm:px-6 pb-4 pt-4 bg-slate-50 sticky top-16 z-30 backdrop-blur-xl bg-opacity-90">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Banks & ATMs</h1>
          <p className="text-sm text-slate-500 mb-4">Find cash & services nearby</p>

          {/* Compact Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search 'UCC', 'Market'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Main List Container */}
        <div className="mx-4 sm:mx-6 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {filteredBanks.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredBanks.map((bank) => (
                <CompactBankItem key={bank.id} bank={bank} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <p className="text-slate-500 text-sm">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Footer Tip */}
        <div className="mt-6 px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <Info size={14} />
            Most banks open Mon-Fri 8:30am - 4pm
          </div>
        </div>

      </div>
    </div>
  );
}