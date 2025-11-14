import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import ExperiencesPage from './pages/ExperiencesPage.tsx';
import HeritagePage from './pages/HeritagePage.tsx';
import HotelsPage from './pages/HotelsPage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import PlanTripPage from './pages/PlanTripPage.tsx';
import HotelDetailPage from './pages/HotelDetailPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="heritage" element={<HeritagePage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="hotels/:id" element={<HotelDetailPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="plan-trip" element={<PlanTripPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);