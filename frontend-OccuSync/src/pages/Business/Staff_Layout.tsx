
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { Briefcase, ShoppingBag, Bell, HelpCircle, } from 'lucide-react';

const businessNavItems = [
  { name: 'Tasks', path: '/staff', icon: Briefcase },
  { name: 'Tasks', path: '/staff/history', icon: Briefcase },
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
