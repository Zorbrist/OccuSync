// layouts/Business_Layout.tsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { LayoutDashboard, Briefcase, ShoppingBag, Users } from 'lucide-react';
import { getBusinessProfile } from '../../services/businessService'; 

const businessNavItems = [
  { name: 'Dashboard', path: '/business', icon: LayoutDashboard },
  { name: 'Listings', path: '/business/listings', icon: Briefcase },
  { name: 'Orders', path: '/business/orders', icon: ShoppingBag },
  { name: 'Staff', path: '/business/staff', icon: Users },
];

export default function BusinessLayout() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getBusinessProfile()
      .then(data => setProfile(data))
      .catch(err => console.error("Failed to load business profile:", err));
  }, []);

  // Format the profile exactly like AdminLayout, mapping the business name to "location" if that's what the Sidebar expects
  const formattedProfile = profile ? {
    name: profile.name || "Vendor",
    email: profile.email,
    location: profile.businessName || "Business Profile"
  } : undefined;

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#E8EDF2] text-slate-800">
      <Sidebar
        variant="business"
        navItems={businessNavItems}
        userProfile={formattedProfile}
        showNotifications={true}
      />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
      </main>
    </div>
  );
}