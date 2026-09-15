// layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Layers, 
  ClipboardList, 
  CreditCard 
} from 'lucide-react';

const NavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Businesses', path: '/admin/businesses', icon: Briefcase },
  { name: 'Services', path: '/admin/services', icon: Layers },
  { name: 'Jobs', path: '/admin/jobs', icon: ClipboardList },
  { name: 'Transactions', path: '/admin/transactions', icon: CreditCard },
];

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#E8EDF2] text-slate-800">
      <Sidebar
        variant="admin"
        navItems={NavItems}
      />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}