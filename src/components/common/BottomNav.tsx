import { Home, Armchair, MapPin, PartyPopper, Bell } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: '首页', icon: Home },
  { to: '/seats', label: '选座', icon: Armchair },
  { to: '/guide', label: '引导', icon: MapPin },
  { to: '/interaction', label: '互动', icon: PartyPopper },
  { to: '/reminders', label: '提醒', icon: Bell },
];

export default function BottomNav() {
  const location = useLocation();
  if (location.pathname === '/screen') return null;

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 safe-padding-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-brand-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-brand-50 scale-110' : ''
                    }`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                  </div>
                  <span
                    className={`text-[11px] font-medium leading-none ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
