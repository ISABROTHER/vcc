import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import SeeDoPage from './pages/SeeDoPage.tsx';
import EatDrinkPage from './pages/EatDrinkPage.tsx';
import AccommodationPage from './pages/AccommodationPage.tsx';
import PartnersPage from './pages/PartnersPage.tsx';
import PlanTripPage from './pages/PlanTripPage.tsx';
import HotelDetailPage from './pages/HotelDetailPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="see-do" element={<SeeDoPage />} />
          <Route path="accommodation" element={<AccommodationPage />} />
          <Route path="accommodation/:id" element={<HotelDetailPage />} />
          <Route path="eat-drink" element={<EatDrinkPage />} />
          <Route path="plan-trip" element={<PlanTripPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);