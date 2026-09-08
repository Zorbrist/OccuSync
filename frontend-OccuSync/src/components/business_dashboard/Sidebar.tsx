import {
  LayoutDashboard,
  Briefcase,
  FileText,
  ShoppingBag,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    {
      name: 'Dashboard',
      path: '/business',
      icon: LayoutDashboard,
    },
    {
      name: 'Listings',
      path: '/business/listings',
      icon: Briefcase,
    },
    {
      name: 'Quotations',
      path: '/business/quotations',
      icon: FileText,
    },
    {
      name: 'Customer Orders',
      path: '/business/orders',
      icon: ShoppingBag,
    },
    {
      name: 'Notifications',
      path: '/business/notifications',
      icon: Bell,
    },
    {
      name: 'Merchant Support',
      path: '/business/support',
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-rose-950 via-red-950 to-stone-950 flex flex-col justify-between p-4 shrink-0">

      {/* LOGO */}
      <div>

        <div className="flex items-center space-x-3 px-3 py-4 mb-6">

          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg">
              ∞
            </span>
          </div>

          <span className="font-bold tracking-tight text-white text-lg">
            CoreBiz
          </span>

        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1.5">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/business'}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-rose-100 text-rose-950 shadow-md'
                      : 'text-rose-200 hover:bg-rose-900/40'
                  }`
                }
              >
                <Icon size={18} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* LOGOUT */}
      <div className="pt-4 border-t border-white/10">

        <button
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-rose-200 hover:bg-rose-900/40 transition"
        >
          <LogOut size={18} />

          <span>
            Log Out
          </span>
        </button>

      </div>

    </aside>
  );
}