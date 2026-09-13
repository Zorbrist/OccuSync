
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { Briefcase, ShoppingBag, Bell, HelpCircle, } from 'lucide-react';

const businessNavItems = [
  { name: 'Listings', path: '/staff/listings', icon: Briefcase },
  { name: 'Customer Orders', path: '/staff/orders', icon: ShoppingBag },
];

export default function StaffLayout() {
  return (
    <div className="flex h-screen w-full font-sans bg-stone-100 overflow-hidden">
      <Sidebar
        variant="business"
        navItems={businessNavItems}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
