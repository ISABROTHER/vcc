import React from 'react';
import { Car, Bus, MapPin, Train, Bike } from 'lucide-react';

const TransportOption = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) => (
  <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
        <Icon size={24} />
      </div>
    </div>
    <div>
      <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function TransportationPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Getting Around Cape Coast
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're arriving from Accra or navigating the local streets,
            here is everything you need to know about transportation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <TransportOption
            title="Taxis & Private Cars"
            description="Taxis are the most common way to get around town. You can flag one down (dropping) or hire a 'charter' taxi for a private trip. Ride-hailing apps like Uber or Bolt may have limited availability compared to Accra, so local taxis are often best."
            icon={Car}
          />
          <TransportOption
            title="Tro-tros (Mini Buses)"
            description="For an authentic and affordable experience, hop on a Tro-tro. These shared minibuses run specific routes. Listen for the 'mate' (conductor) calling out the destination."
            icon={Bus}
          />
          <TransportOption
            title="STC & VIP Buses"
            description="Comfortable, air-conditioned buses connect Cape Coast to Accra, Kumasi, and Takoradi. The main STC station is located near the Pedu junction."
            icon={Train}
          />
          <TransportOption
            title="Walking & Biking"
            description="Many parts of central Cape Coast, especially around the Castle and old town, are best explored on foot to soak in the colonial architecture and ocean views."
            icon={Bike}
          />
        </div>

        {/* Distances Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="text-teal-600" />
            Estimated Travel Times
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="font-medium text-slate-700">Accra to Cape Coast</span>
              <span className="text-slate-500">~2.5 - 3.5 Hours (Bus/Car)</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="font-medium text-slate-700">Cape Coast to Kakum Park</span>
              <span className="text-slate-500">~45 Minutes (Taxi/Tro-tro)</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-100">
              <span className="font-medium text-slate-700">Cape Coast to Elmina</span>
              <span className="text-slate-500">~20 Minutes (Taxi/Tro-tro)</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="font-medium text-slate-700">Takoradi to Cape Coast</span>
              <span className="text-slate-500">~1.5 Hours (Bus/Car)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}