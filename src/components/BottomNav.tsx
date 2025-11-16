import { NavLink } from 'react-router-dom';
import { Home, Camera, ChefHat, Bed, Info } from 'lucide-react';

const mobileNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/see-do', label: 'See & Do', icon: Camera },
  { href: '/eat-drink', label: 'Eat', icon: ChefHat },
  { href: '/accommodation', label: 'Stay', icon: Bed },
  { href: '/tourist-info', label: 'Info', icon: Info },
];

export default function BottomNav() {
  return (
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
}