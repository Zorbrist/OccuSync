import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/SidebarTemplate';
import { Briefcase, LayoutDashboard, History } from 'lucide-react';
import { getBusinessProfile } from '../../services/businessService';

const staffNavItems = [
  { name: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
  { name: 'My Tasks', path: '/staff', icon: Briefcase },
  { name: 'Job History', path: '/staff/history', icon: History },
];

export default function StaffLayout() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Fetch the staff/business profile on load
    getBusinessProfile()
      .then(data => setProfile(data))
      .catch(err => console.error("Failed to load staff profile:", err));
  }, []);

  // Format the profile exactly like BusinessLayout to populate the Sidebar
  const formattedProfile = profile ? {
    name: profile.name || "Staff Member",
    email: profile.email,
    location: profile.businessName || "Staff Profile"
  } : undefined;

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#E8EDF2] text-slate-800 overflow-hidden">
      <Sidebar
        variant="business"
        navItems={staffNavItems}
        userProfile={formattedProfile}
        showNotifications={true}
      />
      <main className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        <Outlet />
      </main>
    </div>
  );
}