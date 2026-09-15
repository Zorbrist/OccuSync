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
  { name: 'User Management', path: '/admin/users', icon: UserCheck },
  { name: 'Services', path: '/admin/services', icon: UserCheck },
  { name: 'Jobs', path: '/admin/jobs', icon: UserCheck },
  { name: 'Transactions', path: '/admin/transactions', icon: UserCheck },

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