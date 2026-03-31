import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Check,
  ArrowRight,
  Compass,
  Sun,
  Moon,
  Sunrise,
  Star,
  ChevronDown,
} from 'lucide-react';

interface Itinerary {
  id: string;
  title: string;
  days: number;
  bestFor: string;
  description: string;
  schedule: { time: string; icon: React.ElementType; activity: string; tip?: string }[];
}

const ITINERARIES: Itinerary[] = [
  {
    id: 'weekend',
    title: 'The Essential Weekend',
    days: 2,
    bestFor: 'First-timers, short trips',
    description: 'Hit the must-see highlights of Cape Coast in two packed days.',
    schedule: [
      { time: 'Day 1 Morning', icon: Sunrise, activity: 'Cape Coast Castle guided tour (allow 2 hours)', tip: 'Go early before tour groups arrive. The 9am slot is quietest.' },
      { time: 'Day 1 Midday', icon: Sun, activity: 'Lunch at Castle Beach Restaurant — seafood with ocean views' },
      { time: 'Day 1 Afternoon', icon: Sun, activity: 'Drive to Elmina Castle (20 min) — tour the oldest European building in sub-Saharan Africa' },
      { time: 'Day 1 Evening', icon: Moon, activity: 'Dinner and drinks at Oasis Beach Resort — watch the sunset from the beach bar' },
      { time: 'Day 2 Morning', icon: Sunrise, activity: 'Kakum National Park — canopy walkway at 6:30am for the best forest atmosphere', tip: 'The earliest slot has the coolest air, best birdsong, and fewest crowds.' },
      { time: 'Day 2 Midday', icon: Sun, activity: 'Lunch at a local chop bar — try banku with grilled tilapia and pepper sauce' },
      { time: 'Day 2 Afternoon', icon: Sun, activity: 'Explore Cape Coast old town on foot — posubans, fishing harbour, craft market' },
      { time: 'Day 2 Evening', icon: Moon, activity: 'Farewell dinner at Coconut Grove Beach Resort in Elmina' },
    ],
  },
  {
    id: 'heritage',
    title: 'The Heritage Deep Dive',
    days: 4,
    bestFor: 'Diaspora returnees, history lovers',
    description: 'A deeply meaningful journey through the history of the slave trade and African resilience.',
    schedule: [
      { time: 'Day 1', icon: MapPin, activity: 'Cape Coast Castle — full guided tour including dungeons, Door of No Return, and West African Historical Museum', tip: 'Ask for a local guide — their personal connection to the history adds depth no book can match.' },
      { time: 'Day 2', icon: MapPin, activity: 'Elmina Castle + Elmina fishing harbour + Fort St. Jago hilltop for panoramic views' },
      { time: 'Day 3', icon: MapPin, activity: 'Assin Manso Ancestral Slave River — the last bathing place of enslaved Africans. Then visit the "Reversal of the Middle Passage" memorial.' },
      { time: 'Day 4 Morning', icon: Compass, activity: 'Naming ceremony experience or "Through the Door of Return" ceremony (arrange through local guides)' },
      { time: 'Day 4 Afternoon', icon: Sun, activity: 'Reflection time at the beach or journaling at Hans Cottage Botel garden' },
    ],
  },
  {
    id: 'adventure',
    title: 'The Nature & Adventure Trip',
    days: 3,
    bestFor: 'Outdoor lovers, families',
    description: 'Rainforest canopy walks, beaches, crocodile ponds and birdwatching.',
    schedule: [
      { time: 'Day 1', icon: Compass, activity: 'Kakum National Park — canopy walk + forest hiking trail + birdwatching', tip: 'Hire a park guide for the full 3-hour trail — you\'ll see monkeys, butterflies and rare birds.' },
      { time: 'Day 2 Morning', icon: Sun, activity: 'Beach day at Brenu Akyinim or Anomabo — quiet, clean and less touristy than Oasis' },
      { time: 'Day 2 Afternoon', icon: Star, activity: 'Hans Cottage Botel — see the crocodile pond and walk the nature trails' },
      { time: 'Day 3 Morning', icon: Sunrise, activity: 'Fishing village visit at Elmina harbour — watch the morning catch come in at dawn' },
      { time: 'Day 3 Afternoon', icon: Sun, activity: 'Kayaking or boat trip along the coast (arrange through hotels or local operators)' },
    ],
  },
];

const BUDGET_ITEMS = [
  { label: 'Budget accommodation (guest house)', perDay: 80, category: 'stay' },
  { label: 'Mid-range hotel', perDay: 200, category: 'stay' },
  { label: 'Premium resort/beachfront', perDay: 500, category: 'stay' },
  { label: 'Local food (chop bars)', perDay: 30, category: 'food' },
  { label: 'Mixed local + restaurant', perDay: 80, category: 'food' },
  { label: 'Restaurant dining', perDay: 150, category: 'food' },
  { label: 'Castle entry fees (2 castles)', perDay: 15, category: 'activity' },
  { label: 'Kakum canopy walk', perDay: 10, category: 'activity' },
  { label: 'Guided tours per day', perDay: 50, category: 'activity' },
  { label: 'Local taxis per day', perDay: 30, category: 'transport' },
  { label: 'Charter taxi (full day)', perDay: 100, category: 'transport' },
];

export default function PlanTripPage() {
  const [selectedItinerary, setSelectedItinerary] = useState<string>('weekend');
  const [tripDays, setTripDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budgetLevel, setBudgetLevel] = useState<'budget' | 'mid' | 'premium'>('mid');

  const currentItinerary = ITINERARIES.find((i) => i.id === selectedItinerary)!;

  const budgetEstimate = (() => {
    const stayPerDay = budgetLevel === 'budget' ? 80 : budgetLevel === 'mid' ? 200 : 500;
    const foodPerDay = budgetLevel === 'budget' ? 30 : budgetLevel === 'mid' ? 80 : 150;
    const activityPerDay = 25;
    const transportPerDay = budgetLevel === 'budget' ? 30 : 60;
    const dailyTotal = stayPerDay + (foodPerDay * travelers) + activityPerDay + transportPerDay;
    return { daily: dailyTotal, total: dailyTotal * tripDays, perPerson: Math.round((dailyTotal * tripDays) / travelers) };
  })();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">Plan Your Trip</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Design your Cape Coast experience</h1>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg">
            Whether you have a weekend or a week, we'll help you make the most of every moment. Choose an itinerary, estimate your budget, and start planning.
          </p>
        </div>
      </div>

      {/* Itinerary Selector */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ITINERARIES.map((it) => (
            <button
              key={it.id}
              onClick={() => setSelectedItinerary(it.id)}
              className={`text-left rounded-2xl p-5 transition-all border ${
                selectedItinerary === it.id
                  ? 'bg-white border-amber-400 shadow-lg ring-2 ring-amber-200'
                  : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedItinerary === it.id ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {it.days} days
                </span>
                {selectedItinerary === it.id && <Check size={18} className="text-amber-500" />}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{it.title}</h3>
              <p className="text-xs text-slate-500">{it.bestFor}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Itinerary Detail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentItinerary.title}</h2>
            <p className="text-slate-600">{currentItinerary.description}</p>
          </div>

          <div className="space-y-4">
            {currentItinerary.schedule.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <item.icon size={18} className="text-amber-700" />
                </div>
                <div className="flex-1 pb-4 border-b border-slate-100 last:border-0">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">{item.time}</p>
                  <p className="text-sm text-slate-800 font-medium">{item.activity}</p>
                  {item.tip && (
                    <p className="text-xs text-slate-500 mt-1 bg-slate-50 rounded-lg p-2 border border-slate-100">
                      💡 {item.tip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Calculator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Budget Estimator</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Days */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                <Calendar size={14} className="inline mr-1" /> Trip length
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={14}
                  value={tripDays}
                  onChange={(e) => setTripDays(Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="text-lg font-bold text-slate-900 w-16 text-right">{tripDays} days</span>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                <Users size={14} className="inline mr-1" /> Travelers
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="text-lg font-bold text-slate-900 w-16 text-right">{travelers}</span>
              </div>
            </div>

            {/* Budget Level */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                <DollarSign size={14} className="inline mr-1" /> Budget level
              </label>
              <div className="flex gap-2">
                {(['budget', 'mid', 'premium'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setBudgetLevel(level)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                      budgetLevel === level
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {level === 'budget' ? '💰 Budget' : level === 'mid' ? '⭐ Mid-range' : '✨ Premium'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-6">
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Estimated daily cost</p>
              <p className="text-2xl font-bold text-slate-900">GHS {budgetEstimate.daily.toLocaleString()}</p>
              <p className="text-xs text-slate-400">~${Math.round(budgetEstimate.daily / 11)} USD</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total trip estimate</p>
              <p className="text-3xl font-bold text-amber-600">GHS {budgetEstimate.total.toLocaleString()}</p>
              <p className="text-xs text-slate-400">~${Math.round(budgetEstimate.total / 11)} USD</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Per person</p>
              <p className="text-2xl font-bold text-slate-900">GHS {budgetEstimate.perPerson.toLocaleString()}</p>
              <p className="text-xs text-slate-400">~${Math.round(budgetEstimate.perPerson / 11)} USD</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">Estimates based on typical 2026 Cape Coast prices. Actual costs may vary by season and availability.</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to go?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/accommodation" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-300 transition">
            <h3 className="font-bold text-slate-900 mb-2">Book your stay</h3>
            <p className="text-sm text-slate-600 mb-3">Browse 12+ hotels, guest houses and beach resorts in Cape Coast.</p>
            <span className="text-sm font-semibold text-amber-600 group-hover:underline flex items-center gap-1">View accommodation <ArrowRight size={16} /></span>
          </Link>
          <Link to="/events" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-300 transition">
            <h3 className="font-bold text-slate-900 mb-2">Check the calendar</h3>
            <p className="text-sm text-slate-600 mb-3">See what festivals, events and cultural celebrations are happening.</p>
            <span className="text-sm font-semibold text-amber-600 group-hover:underline flex items-center gap-1">View events <ArrowRight size={16} /></span>
          </Link>
          <Link to="/tourist-info" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-300 transition">
            <h3 className="font-bold text-slate-900 mb-2">Essential info</h3>
            <p className="text-sm text-slate-600 mb-3">Safety, health, money, visas and local customs — everything you need.</p>
            <span className="text-sm font-semibold text-amber-600 group-hover:underline flex items-center gap-1">Read more <ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
