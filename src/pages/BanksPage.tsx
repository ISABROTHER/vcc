import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Landmark, 
  CreditCard, 
  Building2, 
  Banknote,
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
  if (type === 'atm') return <CreditCard className="text-emerald-600" size={24} />;
  if (type === 'rural') return <Building2 className="text-amber-600" size={24} />;
  return <Landmark className="text-blue-700" size={24} />;
};

const BankCard = ({ bank }: { bank: BankLocation }) => {
  // Construct Google Maps Query
  const mapQuery = encodeURIComponent(`${bank.name} ${bank.location} Cape Coast Ghana`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            bank.type === 'atm' ? 'bg-emerald-100' : 
            bank.type === 'rural' ? 'bg-amber-100' : 'bg-blue-100'
          }`}>
            <BankIcon type={bank.type} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{bank.name}</h3>
            <div className="flex items-start gap-1.5 mt-1.5 text-slate-600 text-sm leading-snug">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-slate-400" />
              <span>{bank.location}</span>
            </div>
          </div>
        </div>
      </div>

      <a 
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
      >
        <Navigation size={16} />
        Get Directions
      </a>
    </div>
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Banks & ATMs
          </h1>
          <p className="text-slate-600 text-base">
            Find cash and services near you. Most major banks accept international Visa & Mastercard.
          </p>
        </div>

        {/* Sticky Search */}
        <div className="sticky top-20 z-30 mb-6">
          <div className="relative shadow-lg rounded-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search 'UCC', 'Market', 'ATM'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 text-base font-medium"
            />
          </div>
        </div>

        {/* Tips Banner */}
        <div className="bg-blue-600 rounded-2xl p-4 text-white mb-8 flex items-start gap-3 shadow-md">
          <Info className="flex-shrink-0 mt-0.5 text-blue-200" size={20} />
          <div className="text-sm leading-relaxed">
            <span className="font-bold block mb-0.5">Traveler Tip</span>
            Markets and taxis usually require cash (Ghana Cedis). ATMs are reliable, but it's good to carry small bills.
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank) => (
              <BankCard key={bank.id} bank={bank} />
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <Banknote className="mx-auto mb-3 opacity-30" size={48} />
              <p>No banks found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}