
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { LayoutDashboard, ShoppingBag, Search, Receipt, Bell, FileText, HelpCircle} from 'lucide-react';

  const navItems = [
    { name: 'Dashboard', path: '/customer', icon: LayoutDashboard },
    { name: 'Find Services', path: '/customer/services', icon: Search },
    { name: 'My Orders', path: '/customer/orders', icon: ShoppingBag },
    { name: 'Invoices', path: '/customer/invoices', icon: Receipt },
    { name: 'Notifications', path: '/customer/notifications', icon: Bell, hasBadge: true },
  ];

export default function CustomerLayout() {
  return (
    <div className="flex h-screen w-full font-sans bg-zinc-950 text-zinc-100">
      <Sidebar
        variant="customer"
        navItems={navItems}
        bottomLink={{ name: 'Support', path: '/customer/support', icon: HelpCircle }}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}