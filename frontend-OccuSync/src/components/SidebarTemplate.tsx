// Sidebar.tsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, BusIcon, LucideArrowDownFromLine, type LucideIcon } from 'lucide-react';
import LogoutModal from './authentication/LogoutModal';

export interface SidebarNavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const SIDEBAR_THEMES = {
  business: {
    logoLabel: 'Business Portal',
    container: 'bg-gradient-to-b from-rose-950 via-red-950 to-stone-950 text-white',
    toggleButton: 'bg-white text-rose-950 hover:bg-rose-50',
    logoDot: 'bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 shadow-lg',
    dotIcon: BusIcon,
    navActive: 'bg-rose-100 text-rose-950 font-semibold shadow-sm',
    navInactive: 'text-rose-200 hover:text-white hover:bg-rose-900/40',
    logout: 'text-rose-300 hover:text-rose-100 hover:bg-rose-900/40',
    logoutbg:''
  },
  customer: {
    logoLabel: 'Customer Portal',
    container: 'bg-gradient-to-b from-[#1E293B] to-[#233876]',
    toggleButton: 'bg-white text-[#233876] hover:bg-gray-100',
    logoDot: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    dotIcon: Sparkles,
    navActive: 'bg-white text-[#233876] font-semibold shadow-sm',
    navInactive: 'text-gray-300 hover:text-white hover:bg-white/10',
    logout: 'text-red-300 hover:text-red-100 hover:bg-red-900/30',
    logoutbg:'bg-gradient-to-t from-[#161d2b] to-transparent'
  },
  admin: {
    logoLabel: 'Admin Portal',
    container: 'bg-stone-950 border-r border-zinc-800 shadow-[0_0_25px_rgba(255,255,255,0.05)] text-zinc-100',
    toggleButton: 'bg-white text-emerald-950 hover:bg-emerald-50',
    logoDot: 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_0_15px_rgba(52,211,153,0.4)]',
    dotIcon: LucideArrowDownFromLine,
    navActive: 'bg-zinc-800 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] border border-emerald-500/30',
    navInactive: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    logout: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    logoutbg:''
  },
} as const;

export type SidebarVariant = keyof typeof SIDEBAR_THEMES;

interface SidebarProps {
  variant: SidebarVariant;
  navItems: SidebarNavItem[];
  bottomLink?: SidebarNavItem;
  logoLabel?: string;
  onLogout?: () => void;
}

export default function Sidebar({ variant, navItems, bottomLink, logoLabel, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = SIDEBAR_THEMES[variant];
  const DotIcon = theme.dotIcon;

  const isActive = (path: string) => location.pathname === path;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    onLogout?.();
    navigate('/');
  };

  return (
    <>
      <div
        className={`${isCollapsed ? 'w-20' : 'w-64'} ${theme.container} h-full flex flex-col pt-6 relative z-40 shrink-0 transition-[width] duration-300 ease-in-out`}
      >
        {/* Logo Area */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center mb-8 ${
            isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'
          } transition-all duration-300`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 ${theme.logoDot} hover:scale-105 hover:brightness-110 transition-transform duration-200`}
          >
            <DotIcon size={20} className="text-white" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col text-left overflow-hidden whitespace-nowrap transition-opacity duration-300">
              <span className="text-xl font-black tracking-tight leading-none mb-1">
                Occusync
              </span>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                {logoLabel ?? theme.logoLabel}
              </span>
            </div>
          )}
        </button>

        {/* Navigation Links */}
        <nav className={`flex-1 space-y-2 ${isCollapsed ? 'px-4' : 'px-4'}`}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center rounded-xl py-3 ${
                  active ? theme.navActive : theme.navInactive
                } ${
                  isCollapsed
                    ? 'justify-center px-0 gap-0'
                    : 'px-4 gap-3'
                } transition-colors duration-200`}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && (
                  <span className="overflow-hidden whitespace-nowrap transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`pb-8 pt-4 space-y-2 mt-auto ${theme.logoutbg} ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {bottomLink && (
            <Link
              to={bottomLink.path}
              title={isCollapsed ? bottomLink.name : undefined}
              className={`flex items-center rounded-xl py-3 ${theme.navInactive} ${
                isCollapsed
                  ? 'justify-center px-0 gap-0'
                  : 'px-4 gap-3'
              } transition-colors duration-200`}
            >
              <bottomLink.icon size={20} className="shrink-0" />
              {!isCollapsed && (
                <span className="overflow-hidden whitespace-nowrap transition-opacity duration-300">
                  {bottomLink.name}
                </span>
              )}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? 'Log Out' : undefined}
            className={`flex items-center w-full rounded-xl py-3 ${theme.logout} ${
              isCollapsed
                ? 'justify-center px-0 gap-0'
                : 'px-4 gap-3'
            } transition-colors duration-200`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && (
              <span className="overflow-hidden whitespace-nowrap transition-opacity duration-300">
                Log Out
              </span>
            )}
          </button>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}