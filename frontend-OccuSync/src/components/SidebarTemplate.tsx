// components/SidebarTemplate.tsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, MapPin, Phone, type LucideIcon } from 'lucide-react';
import LogoutModal from './authentication/LogoutModal';

import occusyncLogo from '../assets/occusync.png';

export interface SidebarNavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

const TOPNAV_THEMES = {
  customer: {
    container: 'bg-[#E8EDF2]',
    navActive: 'bg-[#1E293B] text-white shadow-md font-bold rounded-full',
    navInactive: 'text-slate-500 hover:text-[#1E293B] hover:bg-slate-200/50 font-medium rounded-full',
  },
  business: {
    container: 'bg-[#E8EDF2]',
    navActive: 'bg-rose-600 text-white shadow-md font-bold rounded-full',
    navInactive: 'text-slate-500 hover:text-rose-700 hover:bg-rose-100/50 font-medium rounded-full',
  },
  admin: {
    container: 'bg-[#E8EDF2]',
    navActive: 'bg-violet-600 text-white shadow-md font-bold rounded-full',
    navInactive: 'text-slate-500 hover:text-violet-700 hover:bg-violet-100/50 font-medium rounded-full',
  },
} as const;

export type SidebarVariant = keyof typeof TOPNAV_THEMES;

interface TopNavProps {
  variant: SidebarVariant;
  navItems: SidebarNavItem[];
  userProfile?: UserProfileData; 
  unreadCount?: number;
  showNotifications?: boolean; // <-- NEW PROP HERE
  onLogout?: () => void;
}

export default function Sidebar({ 
  variant, 
  navItems, 
  userProfile, 
  unreadCount = 0, 
  showNotifications = true, // <-- Default to true
  onLogout 
}: TopNavProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const theme = TOPNAV_THEMES[variant];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    onLogout?.();
    navigate('/');
  };

  const firstName = userProfile?.name?.split(" ")[0] || "User";
  const fullName = userProfile?.name || "Guest User";
  const email = userProfile?.email || "No email provided";

  return (
    <>
      <header className={`w-full ${theme.container} px-6 lg:px-10 py-5 relative z-50 flex items-center justify-between transition-colors duration-300`}>
        
        {/* Left: Logo & Branding */}
        <Link to={`/${variant}`} className="flex items-center gap-2.5 group shrink-0">
          <img 
            src={occusyncLogo} 
            alt="OccuSync Logo" 
            className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl font-bold tracking-tighter text-[#1E293B]">OccuSync</span>
        </Link>

        {/* Center: Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F1F5F9] p-1.5 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-white/60 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2 text-[13px] transition-all duration-300 ease-in-out ${
                  active ? theme.navActive : theme.navInactive
                }`}
              >
                <item.icon size={14} className="shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Profile Dropdown */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* CONDITIONAL NOTIFICATION RENDER */}
          {showNotifications && (
            <>
              <Link 
                to={`/${variant}/notifications`}
                className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-black hover:shadow-md transition-all duration-300 ease-in-out"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </Link>
              <div className="h-6 w-[1px] bg-slate-300 mx-0.5 hidden sm:block"></div>
            </>
          )}

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white pl-2 pr-4 py-1.5 rounded-full shadow-sm border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                 <User size={14} />
              </div>
              <span className="text-[13px] font-semibold text-slate-600 truncate max-w-[100px]">
                {firstName}
              </span>
            </button>

            {/* Dropdown Menu Popup */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* User Identity Box */}
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-sm font-bold text-[#1E293B] truncate">{fullName}</p>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{email}</p>
                </div>

                {/* Additional Profile Data */}
                {(userProfile?.phone || userProfile?.location) && (
                  <div className="px-5 py-3 border-b border-slate-100 space-y-3">
                    {userProfile.phone && (
                      <div className="flex items-center gap-3 text-slate-500">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-medium truncate">{userProfile.phone}</span>
                      </div>
                    )}
                    {userProfile.location && (
                      <div className="flex items-center gap-3 text-slate-500">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-medium truncate">{userProfile.location}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Actions Box */}
                <div className="p-2">
                  <button 
                    onClick={() => { setIsDropdownOpen(false); setIsLogoutModalOpen(true); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                  >
                    <LogOut size={16} className="text-red-400" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}