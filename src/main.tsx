import { StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import SeeDoPage from './pages/SeeDoPage.tsx';
import EatDrinkPage from './pages/EatDrinkPage.tsx';
import AccommodationPage from './pages/AccommodationPage.tsx';
import PartnersPage from './pages/PartnersPage.tsx';
import PlanTripPage from './pages/PlanTripPage.tsx';
import HotelDetailPage from './pages/HotelDetailPage.tsx';
import TouristInfoPage from './pages/TouristInfoPage.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="see-do" element={<SeeDoPage />} />
          <Route path="accommodation" element={<AccommodationPage />} />
          <Route path="accommodation/:id" element={<HotelDetailPage />} />
          <Route path="eat-drink" element={<EatDrinkPage />} />
          <Route path="plan-trip" element={<PlanTripPage />} />
          <Route path="tourist-info" element={<TouristInfoPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);