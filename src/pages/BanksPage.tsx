import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Navigation,
  X,
  Share2,
  Copy,
  Info,
  CreditCard,
  Building2,
  Landmark,
  LocateFixed,
  Sparkles,
} from "lucide-react";

// --- Types & Data ---

type BankType = "bank" | "rural" | "atm";
type CrowdLevel = "Quiet" | "Moderate" | "Busy";

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: BankType;
  tags: string[];
  status?: "open" | "closed" | "24/7";
  image: string;
  brandColor: string;
  coordinates: { lat: number; lng: number };
  services: string[];
  crowdLevel?: CrowdLevel;
  waitTime?: string;
}

// When we add distance after locate-me:
type BankWithDistance = BankLocation & { distance?: number };

const bankData: BankLocation[] = [
  {
    id: 1,
    name: "GCB Bank (Main)",
    location: "Chapel Square / Castle Area",
    type: "bank",
    tags: ["commercial", "castle"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-red-600",
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ["Forex", "Parking", "ATM"],
    crowdLevel: "Moderate",
    waitTime: "10 min",
  },
  {
    id: 2,
    name: "GCB Bank (UCC)",
    location: "UCC Science Area",
    type: "bank",
    tags: ["commercial", "ucc"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-red-600",
    coordinates: { lat: 5.116, lng: -1.292 },
    services: ["ATM", "Student Services"],
    crowdLevel: "Busy",
    waitTime: "25 min",
  },
  {
    id: 3,
    name: "Fidelity Bank",
    location: "Inner Ring Road",
    type: "bank",
    tags: ["commercial", "market"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-orange-500",
    coordinates: { lat: 5.113, lng: -1.25 },
    services: ["Forex", "Instant Card"],
    crowdLevel: "Quiet",
    waitTime: "5 min",
  },
  {
    id: 4,
    name: "Absa Bank",
    location: "Commercial Street",
    type: "bank",
    tags: ["commercial", "market"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-red-700",
    coordinates: { lat: 5.111, lng: -1.248 },
    services: ["Forex", "Prestige Banking"],
    crowdLevel: "Moderate",
    waitTime: "15 min",
  },
  {
    id: 5,
    name: "CalBank",
    location: "Pedu Junction",
    type: "bank",
    tags: ["commercial", "pedu"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-yellow-500",
    coordinates: { lat: 5.125, lng: -1.26 },
    services: ["ATM", "Parking"],
    crowdLevel: "Quiet",
    waitTime: "2 min",
  },
  {
    id: 6,
    name: "ADB Bank",
    location: "Commercial Street",
    type: "bank",
    tags: ["commercial", "town"],
    status: "open",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-green-600",
    coordinates: { lat: 5.107, lng: -1.247 },
    services: ["Agri-Finance", "ATM"],
    crowdLevel: "Moderate",
    waitTime: "12 min",
  },
  {
    id: 12,
    name: "Ecobank ATM",
    location: "Kotokraba Road",
    type: "atm",
    tags: ["atm", "market"],
    status: "24/7",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-blue-600",
    coordinates: { lat: 5.114, lng: -1.249 },
    services: ["24/7 Access", "Cash Deposit"],
    crowdLevel: "Quiet",
    waitTime: "0 min",
  },
  {
    id: 16,
    name: "GTBank ATM",
    location: "Kotokuraba Market",
    type: "atm",
    tags: ["atm", "market"],
    status: "24/7",
    image:
      "https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=200&q=80",
    brandColor: "bg-orange-600",
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ["24/7 Access"],
    crowdLevel: "Moderate",
    waitTime: "2 min",
  },
];

// --- Helpers ---

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const getSmartInsight = (count: number, hasUserLoc: boolean) => {
  const hour = new Date().getHours();
  if (hour > 17 || hour < 6)
    return {
      text: "It's late. Showing 24/7 ATMs near you.",
      icon: Sparkles,
      color: "text-indigo-600",
    };
  if (hasUserLoc)
    return {
      text: `Found ${count} locations near your current position.`,
      icon: MapPin,
      color: "text-emerald-600",
    };
  return {
    text: "Tip: Commercial St. has the most banks.",
    icon: Info,
    color: "text-blue-600",
  };
};

// --- Detail Sheet Component ---

const DetailSheet = ({
  bank,
  isOpen,
  onClose,
  distance,
}: {
  bank: BankWithDistance | null;
  isOpen: boolean;
  onClose: () => void;
  distance?: number;
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

  const mapQuery = encodeURIComponent(
    `${bank?.name ?? ""} ${bank?.location ?? ""} Cape Coast Ghana`
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const copyAddress = () => {
    if (typeof window === "undefined" || !navigator?.clipboard) return;
    navigator.clipboard.writeText(`${bank?.name}, ${bank?.location}`);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen && !isClosing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1)] md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing
            ? "translate-y-0 md:-translate-y-1/2"
            : "translate-y-full md:translate-y-10"
        }`}
      >
        {bank && (
          <div className="p-6 pb-10 md:pb-6 relative">
            <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mb-6 md:hidden" />

            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-5 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 text-white ${bank.brandColor}`}
              >
                {bank.type === "atm" ? (
                  <CreditCard size={28} />
                ) : (
                  <Landmark size={28} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                  {bank.name}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {bank.type === "atm"
                    ? "Automated Teller Machine"
                    : "Commercial Branch"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Status
                </p>
                <p
                  className={`text-sm font-bold ${
                    bank.status === "open"
                      ? "text-emerald-600"
                      : "text-slate-900"
                  }`}
                >
                  {bank.status === "24/7"
                    ? "24/7"
                    : bank.status === "open"
                    ? "Open"
                    : "Closed"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Traffic
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {bank.crowdLevel ?? "—"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Est. Wait
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {bank.waitTime ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
              <MapPin className="text-slate-400 mt-0.5" size={18} />
              <div className="text-sm text-slate-600 leading-relaxed font-medium">
                {bank.location}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-slate-900 text-white font-bold text-base py-4 rounded-2xl active:scale-[0.98] transition hover:bg-black shadow-lg shadow-slate-200"
              >
                <Navigation size={18} />
                Get Directions
                {!!distance && (
                  <span className="opacity-60 text-sm font-normal">
                    ({distance.toFixed(1)} km)
                  </span>
                )}
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyAddress}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl active:scale-[0.98] transition hover:bg-slate-50 text-sm"
                >
                  <Copy size={16} />
                  Copy Address
                </button>
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl active:scale-[0.98] transition hover:bg-slate-50 text-sm">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default function BanksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "ATM" | "Bank">("All");
  const [selectedBank, setSelectedBank] = useState<BankWithDistance | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const processedBanks: BankWithDistance[] = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();

    let filtered: BankWithDistance[] = bankData.filter((bank) => {
      const matchesSearch =
        bank.name.toLowerCase().includes(lowerTerm) ||
        bank.location.toLowerCase().includes(lowerTerm) ||
        bank.tags.some((tag) => tag.toLowerCase().includes(lowerTerm));

      let matchesTab = true;
      if (activeTab === "ATM") matchesTab = bank.type === "atm";
      if (activeTab === "Bank") matchesTab = bank.type === "bank" || bank.type === "rural";

      return matchesSearch && matchesTab;
    });

    if (userLocation) {
      filtered = filtered
        .map((bank) => ({
          ...bank,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            bank.coordinates.lat,
            bank.coordinates.lng
          ),
        }))
        .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));
    }

    return filtered;
  }, [searchTerm, activeTab, userLocation]);

  const handleLocateMe = () => {
    setIsLocating(true);

    if (typeof window === "undefined" || !navigator?.geolocation) {
      setIsLocating(false);
      alert("Geolocation not available on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        alert("Location access denied. Using default sort.");
        setIsLocating(false);
      }
    );
  };

  const insight = getSmartInsight(processedBanks.length, !!userLocation);

  return (
    <div className="min-h-screen bg-[#FDFDFD] relative pb-32">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div className="h-20 md:h-24 w-full bg-transparent pointer-events-none"></div>

        <div className="px-5 pb-4 max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance</h1>
            <button
              onClick={handleLocateMe}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                userLocation
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              <LocateFixed size={14} className={isLocating ? "animate-spin" : ""} />
              {userLocation ? "Nearby" : "Locate Me"}
            </button>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3 flex items-start gap-3 border border-slate-100">
            <insight.icon size={18} className={`mt-0.5 ${insight.color}`} />
            <p className="text-sm text-slate-600 font-medium leading-snug">{insight.text}</p>
          </div>

          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search banks, areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5 transition-all font-medium text-sm"
            />
          </div>

          <div className="flex gap-4 border-b border-slate-100 pb-1">
            {["All", "Bank", "ATM"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 text-sm font-semibold transition-all relative ${
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "Bank" ? "Banks" : tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-5 py-6 space-y-3">
        {processedBanks.length > 0 ? (
          processedBanks.map((bank) => (
            <div
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className="group bg-white p-3 pr-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:shadow-md hover:border-slate-200"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm ${bank.brandColor}`}
              >
                {bank.type === "atm" ? <CreditCard size={20} /> : <Landmark size={20} />}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">
                    {bank.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        bank.status === "closed" ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                    />
                    <span className="text-[11px] font-medium text-slate-400">
                      {bank.status === "24/7" ? "24/7" : bank.waitTime ?? ""}
                    </span>
                  </div>
                </div>

                <p className="text-[13px] text-slate-500 truncate">{bank.location}</p>
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

      <DetailSheet
        bank={selectedBank}
        isOpen={!!selectedBank}
        onClose={() => setSelectedBank(null)}
        distance={selectedBank?.distance}
      />
    </div>
  );
}
