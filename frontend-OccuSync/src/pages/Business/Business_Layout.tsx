import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { LayoutDashboard, Briefcase, ShoppingBag, Bell, HelpCircle, PersonStanding, MessageSquare, CalendarPlus } from 'lucide-react';

const businessNavItems = [
  { name: 'Dashboard', path: '/business', icon: LayoutDashboard },
  { name: 'Listings', path: '/business/listings', icon: Briefcase },
  { name: 'Customer Orders', path: '/business/orders', icon: ShoppingBag },
  { name: 'Inquiries', path: '/business/inquiries', icon: MessageSquare },
  { name: 'Staff Management', path: '/business/staff', icon: PersonStanding },
  { name: 'Notifications', path: '/business/notifications', icon: Bell },
];

export default function BusinessLayout() {
  return (
    <div className="flex h-screen w-full font-sans bg-stone-100 overflow-hidden">
      <Sidebar
        variant="business"
        navItems={businessNavItems}
        bottomLink={{ name: 'Merchant Support', path: '/business/support', icon: HelpCircle }}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}