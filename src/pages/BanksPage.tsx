import React from 'react';
import { Landmark, CreditCard, DollarSign, MapPin, Clock } from 'lucide-react';

const BankCard = ({
  name,
  location,
  features,
}: {
  name: string;
  location: string;
  features: string[];
}) => (
  <div className="flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
          <Landmark size={20} />
        </div>
        <h3 className="font-bold text-lg text-slate-900">{name}</h3>
      </div>
    </div>
    
    <div className="flex items-start gap-2 mb-4 text-sm text-slate-600">
      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-slate-400" />
      <span>{location}</span>
    </div>

    <div className="mt-auto">
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <span
            key={feature}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function BanksPage() {
  const banks = [
    {
      name: 'GCB Bank',
      location: 'Commercial Street, Near Cape Coast Castle',
      features: ['24/7 ATM', 'Currency Exchange', 'International Cards'],
    },
    {
      name: 'Ecobank',
      location: 'Chapel Square / UCC Campus',
      features: ['24/7 ATM', 'Visa/Mastercard', 'Pan-African Bank'],
    },
    {
      name: 'Stanbic Bank',
      location: 'Kotokuraba Road',
      features: ['24/7 ATM', 'Forex Services', 'Parking Available'],
    },
    {
      name: 'Absa Bank',
      location: 'UCC Campus / Central Town',
      features: ['ATM', 'International Transfers', 'Accessible'],
    },
    {
      name: 'Prudential Bank',
      location: 'Tantri Lorry Park Area',
      features: ['ATM', 'Local Banking'],
    },
    {
      name: 'Fidelity Bank',
      location: 'Commercial Street',
      features: ['ATM', 'Digital Banking Support'],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Banks & ATMs
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find reliable banking services, ATMs, and foreign exchange locations throughout Cape Coast.
          </p>
        </div>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <CreditCard className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">ATMs are available</h3>
            <p className="text-blue-100 text-sm">
              Most banks in Cape Coast have 24/7 ATMs that accept Visa and Mastercard.
            </p>
          </div>
          <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg">
            <DollarSign className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Currency Exchange</h3>
            <p className="text-emerald-100 text-sm">
              Banks offer the safest rates for exchanging USD, EUR, and GBP into Ghana Cedis (GHS).
            </p>
          </div>
          <div className="bg-amber-500 text-white p-6 rounded-2xl shadow-lg">
            <Clock className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Opening Hours</h3>
            <p className="text-amber-100 text-sm">
              Most banks open Mon-Fri (8:30 AM - 4:00 PM). Some branches open on Saturdays (9:00 AM - 1:00 PM).
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Bank Locations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {banks.map((bank) => (
            <BankCard key={bank.name} {...bank} />
          ))}
        </div>
      </div>
    </div>
  );
}