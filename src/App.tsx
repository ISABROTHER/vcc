import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HeritagePage from './pages/HeritagePage';
import ExperiencesPage from './pages/ExperiencesPage'; // Added
import HotelsPage from './pages/HotelsPage'; // Added
import EventsPage from './pages/EventsPage'; // Added
import HotelDetailPage from './pages/HotelDetailPage'; // IMPORT THIS NEW PAGE

// This component ensures the Header and Footer are on every page
const AppLayout = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Outlet /> {/* This is where your page content will be rendered */}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/heritage" element={<HeritagePage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} /> {/* ADD THIS NEW ROUTE */}
        <Route path="/events" element={<EventsPage />} />
      </Route>
    </Routes>
  );
}

export default App;