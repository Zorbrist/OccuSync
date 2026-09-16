// layouts/AdminLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  ClipboardList, 
  CreditCard
} from 'lucide-react';
import { getAdminProfile } from '../../services/adminService'; 

const NavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Services', path: '/admin/services', icon: Layers },
  { name: 'Jobs', path: '/admin/jobs', icon: ClipboardList },
  { name: 'Transactions', path: '/admin/transactions', icon: CreditCard },
];

export default function AdminLayout() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getAdminProfile()
      .then(data => setProfile(data))
      .catch(err => console.error("Failed to load admin profile:", err));
  }, []);

  const formattedProfile = profile ? {
    name: profile.name || "System Admin",
    email: profile.email,
    location: profile.location
  } : undefined;

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#E8EDF2] text-slate-800">
      <Sidebar
        variant="admin"
        navItems={NavItems}
        userProfile={formattedProfile}
        showNotifications={false} // <-- Hide the bell for Admin
      />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}