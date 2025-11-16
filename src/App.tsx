import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  NavLink,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AccommodationPage from './pages/AccommodationPage';
import HotelDetailPage from './pages/HotelDetailPage';
import SeeDoPage from './pages/SeeDoPage';
import EatDrinkPage from './pages/EatDrinkPage';
import TouristInfoPage from './pages/TouristInfoPage';
import PartnersPage from './pages/PartnersPage';
import PlanTripPage from './pages/PlanTripPage';
import { useLayoutEffect } from 'react';
import { Home, Camera, ChefHat, Bed, Info } from 'lucide-react';

// Wrapper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const mobileNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/see-do', label: 'See & Do', icon: Camera },
  { href: '/eat-drink', label: 'Eat', icon: ChefHat },
  { href: '/accommodation', label: 'Stay', icon: Bed },
  { href: '/tourist-info', label: 'Info', icon: Info },
];

// Mobile Sticky Bottom Navigation Bar
const MobileNavBar = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sm:hidden">
    {mobileNavItems.map((item) => (
      <NavLink
        key={item.label}
        to={item.href}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-1 p-2 text-xs font-medium transition-colors ${
            isActive
              ? 'text-amber-600'
              : 'text-gray-600 hover:text-gray-900'
          }`
        }
      >
        <item.icon className="h-5 w-5" strokeWidth={2} />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {/* Add padding-bottom on mobile to avoid overlap with sticky nav */}
      <main className="pb-16 sm:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/accommodation/:id" element={<HotelDetailPage />} />
          <Route path="/see-do" element={<SeeDoPage />} />
          <Route path="/eat-drink" element={<EatDrinkPage />} />
          <Route path="/tourist-info" element={<TouristInfoPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/plan-trip" element={<PlanTripPage />} />
        </Routes>
      </main>
      <Footer />
      {/* Mobile sticky nav */}
      <MobileNavBar />
    </BrowserRouter>
  );
}