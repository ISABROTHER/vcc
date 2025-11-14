import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HeritagePage from './pages/HeritagePage';

// This component ensures the Header and Footer are on every page
const AppLayout = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Outlet /> {/* This is where your page content (HomePage, HeritagePage, etc.) will be rendered */}
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
        {/* You can add more pages here later, like: */}
        {/* <Route path="/hotels" element={<HotelsPage />} /> */}
        {/* <Route path="/events" element={<EventsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;