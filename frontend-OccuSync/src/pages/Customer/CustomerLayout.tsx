// layouts/CustomerLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { useNotificationsData } from '../../hooks/useNotificationsData';
import { getCustomerProfile } from '../../services/customerService';
import type { CustomerProfile } from '../../types/customerType';
import { 
  LayoutDashboard, 
  Search, 
  ShoppingBag, 
  Receipt, 
  Bell 
} from 'lucide-react';

  const navItems = [
    { name: 'Dashboard', path: '/customer', icon: LayoutDashboard },
    { name: 'Find Services', path: '/customer/services', icon: Search },
    { name: 'My Orders', path: '/customer/orders', icon: ShoppingBag },
    { name: 'Invoices', path: '/customer/invoices', icon: Receipt },
    { name: 'Notifications', path: '/customer/notifications', icon: Bell },
  ];

export default function CustomerLayout() {
  const { unreadCount } = useNotificationsData();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  // Fetch the real profile data when the layout loads
  useEffect(() => {
    getCustomerProfile()
      .then(data => setProfile(data))
      .catch(err => console.error("Failed to load profile:", err));
  }, []);

  // Format the real DB data for the Sidebar template
  const formattedProfile = profile ? {
    name: `${profile.first_name} ${profile.last_name}`.trim(),
    email: profile.email,
    phone: profile.phone,
    location: `${profile.state}, ${profile.country}`
  } : undefined;

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#E8EDF2] text-slate-800">
      <Sidebar
        variant="customer"
        navItems={navItems}
        userProfile={formattedProfile}
        unreadCount={unreadCount}
      />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}