
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { LayoutDashboard, UserCheck } from 'lucide-react';

const NavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'User Management', path: '/admin/users', icon: UserCheck },
  { name: 'Business Approval', path: '/admin/approval', icon: UserCheck },

];

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full font-sans bg-zinc-950 text-zinc-100">
      <Sidebar
        variant="admin"
        navItems={NavItems}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}