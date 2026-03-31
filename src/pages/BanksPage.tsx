import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Navigation,
  X,
  Share2,
  Copy,
  LocateFixed,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Star,
  WifiOff,
} from "lucide-react";

// --- Types & Data ---

type BankType = "bank" | "rural" | "atm";

interface BankLocation {
  id: number;
  name: string;
  location: string;
  type: BankType;
  tags: string[];
  status?: "open" | "closed" | "24/7";
  image: string;
  coordinates: { lat: number; lng: number };
  services: string[];
  crowdLevel?: "Quiet" | "Moderate" | "Busy";
  waitTime?: string;
  openingHours?: string;
}

type BankWithDistance = BankLocation & { distance?: number };

const bankData: BankLocation[] = [
  {
    id: 1,
    name: "GCB Bank",
    location: "Chapel Square, Castle Area",
    type: "bank",
    tags: ["commercial", "castle"],
    status: "open",
    openingHours: "Mon–Fri 08:00–16:00",
    image:
      "https://images.unsplash.com/photo-1621981386829-9b788a817929?auto=format&fit=crop&w=100&q=80",
    coordinates: { lat: 5.1064, lng: -1.2466 },
    services: ["Forex", "Parking", "ATM"],
    crowdLevel: "Moderate",
    waitTime: "10 min",
  },
  {
    id: 2,
    name: "GCB Bank",
    location: "UCC Science Area",
    type: "bank",
    tags: ["commercial", "ucc"],
    status: "open",
    openingHours: "Mon–Fri 09:00–15:00",
    image:
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "Mon–Fri 08:00–16:00",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "Mon–Fri 08:00–16:00",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "Mon–Fri 08:00–16:00",
    image:
      "https://images.unsplash.com/photo-1565514020176-892eb1036e67?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "Mon–Fri 08:00–16:00",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "24/7",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=100&q=80",
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
    openingHours: "24/7",
    image:
      "https://images.unsplash.com/photo-1621360841012-3f829f271783?auto=format&fit=crop&w=100&q=80",
    coordinates: { lat: 5.1135, lng: -1.2495 },
    services: ["24/7 Access"],
    crowdLevel: "Moderate",
    waitTime: "2 min",
  },
];

// --- Helpers ---

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
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

function crowdBadge(level?: BankLocation["crowdLevel"]) {
  if (level === "Busy")
    return "bg-rose-50 text-rose-700 border-rose-200";
  if (level === "Moderate")
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function statusBadge(status?: BankLocation["status"]) {
  if (status === "24/7") return "bg-slate-900 text-white";
  if (status === "open") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
}

// --- Detail Sheet Component ---

const DetailSheet = ({
  bank,
  isOpen,
  onClose,
  distance,
  isFavourite,
  onToggleFavourite,
  userLocation,
}: {
  bank: BankWithDistance | null;
  isOpen: boolean;
  onClose: () => void;
  distance?: number;
  isFavourite: boolean;
  onToggleFavourite: (id: number) => void;
  userLocation: { lat: number; lng: number } | null;
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
    }, 260);
  };

  if (!bank && !isOpen) return null;

  const mapQuery = encodeURIComponent(
    `${bank?.name} ${bank?.location} Cape Coast Ghana`
  );
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const directionsUrl =
    bank && userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${bank.coordinates.lat},${bank.coordinates.lng}&travelmode=driving`
      : searchUrl;

  const embedUrl =
    bank
      ? `https://www.google.com/maps?q=${bank.coordinates.lat},${bank.coordinates.lng}&z=16&output=embed`
      : "";

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen && !isClosing
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[2rem] shadow-2xl transform transition-transform duration-300 md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-3xl ${
          isOpen && !isClosing
            ? "translate-y-0 md:-translate-y-1/2"
            : "translate-y-full md:translate-y-10"
        }`}
      >
        {bank && (
          <div className="p-6 pb-8 md:pb-6 relative">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5 md:hidden" />

            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100 border border-slate-100">
                <img
                  src={bank.image}
                  alt={bank.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight mb-1 truncate">
                    {bank.name}
                  </h2>
                  <button
                    onClick={() => onToggleFavourite(bank.id)}
                    className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border transition ${
                      isFavourite
                        ? "bg-amber-50 border-amber-200 text-amber-600"
                        : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50"
                    }`}
                    aria-label="Toggle favourite"
                  >
                    <Star size={16} fill={isFavourite ? "currentColor" : "none"} />
                  </button>
                </div>

                <p className="text-sm text-slate-500 truncate">
                  {bank.location}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {bank.services.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini map preview */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 mb-4 bg-slate-50">
              <iframe
                title={`${bank.name} map`}
                src={embedUrl}
                className="w-full h-44"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Stats */}
            <div className="flex justify-between gap-2 mb-5">
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Status
                </p>
                <p className={`text-sm font-bold ${bank.status === "open" ? "text-emerald-600" : "text-slate-900"}`}>
                  {bank.status === "24/7" ? "24/7" : bank.status === "open" ? "Open" : "Closed"}
                </p>
                {bank.openingHours && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    {bank.openingHours}
                  </p>
                )}
              </div>

              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Distance
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {distance !== undefined ? `${distance.toFixed(1)} km` : "--"}
                </p>
              </div>

              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                  Wait
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {bank.waitTime || "--"}
                </p>
                {bank.crowdLevel && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    Crowd: {bank.crowdLevel}
                  </p>
                )}
              </div>
            </div>

            {/* Navigate */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold text-base py-3.5 rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98] mb-3"
            >
              <Navigation size={18} />
              Navigate Now
            </a>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${bank.name}, ${bank.location}, Cape Coast`
                  )
                }
                className="py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <Copy size={14} /> Copy Address
              </button>

              <button
                onClick={() => {
                  const shareText = `${bank.name} — ${bank.location} (Cape Coast)`;
                  if (navigator.share) {
                    navigator.share({
                      title: bank.name,
                      text: shareText,
                      url: searchUrl,
                    });
                  } else {
                    navigator.clipboard.writeText(`${shareText}\n${searchUrl}`);
                    alert("Share link copied.");
                  }
                }}
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "ATM" | "Bank" | "Fav">("All");
  const [selectedBank, setSelectedBank] = useState<BankWithDistance | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

  // --- Favourites (persisted) ---
  const [favourites, setFavourites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("vcc_fav_banks") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("vcc_fav_banks", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: number) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // --- Offline caching of data ---
  const [cachedData, setCachedData] = useState<BankLocation[]>(() => {
    try {
      const stored = localStorage.getItem("vcc_banks_cache");
      return stored ? (JSON.parse(stored) as BankLocation[]) : bankData;
    } catch {
      return bankData;
    }
  });

  useEffect(() => {
    // store latest static data for offline use
    localStorage.setItem("vcc_banks_cache", JSON.stringify(bankData));
    setCachedData(bankData);
  }, []);

  // --- Online/offline listeners ---
  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // --- Sorting & Filtering ---
  const processedBanks: BankWithDistance[] = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();

    let filtered = cachedData.filter((bank) => {
      const matchesSearch =
        bank.name.toLowerCase().includes(lowerTerm) ||
        bank.location.toLowerCase().includes(lowerTerm) ||
        bank.tags.some((tag) => tag.includes(lowerTerm));

      let matchesTab = true;
      if (activeTab === "ATM") matchesTab = bank.type === "atm";
      if (activeTab === "Bank") matchesTab = bank.type === "bank" || bank.type === "rural";
      if (activeTab === "Fav") matchesTab = favourites.includes(bank.id);

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
  }, [searchTerm, activeTab, userLocation, cachedData, favourites]);

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          alert("Location access denied.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation not supported on this device.");
      setIsLocating(false);
    }
  };

  // Map embed center (selected or Cape Coast center)
  const mapCenter = selectedBank?.coordinates || { lat: 5.113, lng: -1.25 };
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`;

  return (
    <div className="min-h-screen bg-white relative pb-32">
      {/* OFFLINE BANNER */}
      {!isOnline && (
        <div className="sticky top-0 z-40 bg-amber-50 border-b border-amber-100 text-amber-800 text-xs font-semibold px-4 py-2 flex items-center gap-2">
          <WifiOff size={14} />
          You’re offline. Showing saved bank locations.
        </div>
      )}

      {/* COMPACT HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="h-16 w-full bg-transparent pointer-events-none"></div>

        <div className="px-4 pb-3 pt-2 max-w-2xl mx-auto">
          {/* Row 1: Title + Tabs + Map Toggle */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Banks & ATMs
              <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {processedBanks.length}
              </span>
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition ${
                  viewMode === "map"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {viewMode === "map" ? "List View" : "Map View"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100/80 p-1 rounded-lg mb-3">
            {[
              { label: "All", key: "All" },
              { label: "Bank", key: "Bank" },
              { label: "ATM", key: "ATM" },
              { label: "Saved", key: "Fav" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + Locate */}
          <div className="flex gap-2">
            <div className="relative group flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search bank, ATM, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-400 focus:ring-0 transition-all font-medium text-sm"
              />
            </div>

            <button
              onClick={handleLocateMe}
              className={`flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border transition-all ${
                userLocation
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-inner"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
              title="Locate me"
            >
              <LocateFixed size={18} className={isLocating ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Insight */}
          <div className="flex items-center gap-2 mt-2 px-1">
            <div
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                userLocation ? "bg-emerald-500" : "bg-slate-400"
              }`}
            ></div>
            <p className="text-[11px] font-medium text-slate-500">
              {userLocation
                ? "Sorted by distance from you"
                : "Tap a bank to view details & navigation"}
            </p>
          </div>
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === "map" && (
        <div className="max-w-2xl mx-auto px-4 pt-4">
          <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
            <iframe
              title="Cape Coast banks map"
              src={mapEmbedUrl}
              className="w-full h-[52vh]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick pick list under map */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {processedBanks.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBank(b)}
                className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                <MapPin size={14} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                  {b.name.split(" ")[0]} • {b.location.split(",")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LIST CONTENT */}
      {viewMode === "list" && (
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
          {processedBanks.length > 0 ? (
            processedBanks.map((bank, index) => {
              const isClosest = userLocation && index === 0;
              const isFav = favourites.includes(bank.id);

              return (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBank(bank)}
                  className={`group bg-white p-3 rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer hover:border-slate-300 ${
                    isClosest
                      ? "border-emerald-500 ring-1 ring-emerald-500 shadow-md"
                      : "border-slate-100"
                  }`}
                >
                  {/* Image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 border border-slate-100 relative">
                    <img
                      src={bank.image}
                      alt={bank.name}
                      className="w-full h-full object-cover"
                    />
                    {bank.status === "open" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-tl-md"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-bold text-slate-900 text-[15px] truncate pr-2">
                        {bank.name}
                      </h3>

                      {/* Favourite toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavourite(bank.id);
                        }}
                        className={`flex items-center justify-center w-7 h-7 rounded-full border transition ${
                          isFav
                            ? "bg-amber-50 border-amber-200 text-amber-600"
                            : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50"
                        }`}
                        aria-label="Toggle favourite"
                        title={isFav ? "Unsave" : "Save"}
                      >
                        <Star size={14} fill={isFav ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <p className="text-[13px] text-slate-500 truncate mb-1.5">
                      {bank.location}
                    </p>

                    {/* Tags row */}
                    <div className="flex items-center gap-2 flex-wrap">
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
                        {bank.type === "atm" ? "ATM" : "Branch"}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${statusBadge(
                          bank.status
                        )}`}
                      >
                        {bank.status === "24/7"
                          ? "24/7"
                          : bank.status === "open"
                          ? "Open"
                          : "Closed"}
                      </span>

                      {bank.crowdLevel && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${crowdBadge(
                            bank.crowdLevel
                          )}`}
                        >
                          {bank.crowdLevel}
                          {bank.waitTime ? ` • ${bank.waitTime}` : ""}
                        </span>
                      )}
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
            <div className="text-center py-20 opacity-50">
              <p className="text-slate-900 font-bold">No results</p>
              <p className="text-slate-500 text-sm mt-1">
                Try another search term.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Detail Sheet */}
      <DetailSheet
        bank={selectedBank}
        isOpen={!!selectedBank}
        onClose={() => setSelectedBank(null)}
        distance={selectedBank?.distance}
        isFavourite={selectedBank ? favourites.includes(selectedBank.id) : false}
        onToggleFavourite={toggleFavourite}
        userLocation={userLocation}
      />
    </div>
  );
}
