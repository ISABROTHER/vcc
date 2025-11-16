import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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
import BottomNav from './components/BottomNav';

// Wrapper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
      <BottomNav />
    </BrowserRouter>
  );
}