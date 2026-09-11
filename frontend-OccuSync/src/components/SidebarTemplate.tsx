// Sidebar.tsx
//
// Single reusable sidebar built on the Sidebar.tsx / CustomerSidebar.tsx
// logic (Link + useLocation for active state, shared collapse + logout
// flow). Styling is chosen via `variant`, using the colocated
// SIDEBAR_THEMES map below — see the conversation this came out of for
// why themes live here instead of a separate file or CSS.
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, type LucideIcon } from 'lucide-react';
import LogoutModal from './authentication/LogoutModal';

export interface SidebarNavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

// --- themes ---------------------------------------------------------------
//
// One object per persona. Every key here is a full Tailwind class string,
// not a raw color — keeps a variant's look atomic so pieces of it can't
// drift out of sync with each other (that's what caused AdminNavBar's
// mismatched rose-colored toggle button on an emerald sidebar).
const SIDEBAR_THEMES = {
  business: {
    logoLabel: 'CoreBiz',
    container: 'bg-gradient-to-b from-rose-950 via-red-950 to-stone-950 text-white',
    toggleButton: 'bg-white text-rose-950 hover:bg-rose-50',
    logoDot: 'bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 shadow-lg',
    navActive: 'bg-rose-100 text-rose-950 font-semibold shadow-sm',
    navInactive: 'text-rose-200 hover:text-white hover:bg-rose-900/40',
    logout: 'text-rose-300 hover:text-rose-100 hover:bg-rose-900/40',
  },
  customer: {
    logoLabel: 'CorePortal',
    container: 'bg-[#233876] text-white',
    toggleButton: 'bg-white text-[#233876] hover:bg-gray-100',
    logoDot: 'bg-purple-500',
    navActive: 'bg-white text-[#233876] font-semibold shadow-sm',
    navInactive: 'text-gray-300 hover:text-white hover:bg-white/10',
    logout: 'text-red-300 hover:text-red-100 hover:bg-red-900/30',
  },
  admin: {
    logoLabel: 'CoreAdmin',
    container: 'bg-stone-950 border-r border-zinc-800 shadow-[0_0_25px_rgba(255,255,255,0.05)] text-zinc-100',
    toggleButton: 'bg-white text-emerald-950 hover:bg-emerald-50',
    logoDot: 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_0_15px_rgba(52,211,153,0.4)]',
    navActive: 'bg-zinc-800 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] border border-emerald-500/30',
    navInactive: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
    logout: 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200',
  },
} as const;

export type SidebarVariant = keyof typeof SIDEBAR_THEMES;

// --- component --------------------------------------------------------

interface SidebarProps {
  variant: SidebarVariant;
  navItems: SidebarNavItem[];
  /** Optional link above the logout button, e.g. "Support" / "Merchant Support". */
  bottomLink?: SidebarNavItem;
  /** Overrides the theme's default wordmark if you need a one-off label. */
  logoLabel?: string;
  /** Called after logout storage-clearing and before the redirect to '/'. */
  onLogout?: () => void;
}

export default function Sidebar({ variant, navItems, bottomLink, logoLabel, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = SIDEBAR_THEMES[variant];

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
        className={`${isCollapsed ? 'w-20' : 'w-64'} ${theme.container} h-full flex flex-col pt-6 transition-all duration-300 relative z-40 shrink-0`}
      >
        {/* Toggle Collapse Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`absolute -right-3 top-8 p-1.5 rounded-full shadow-md transition ${theme.toggleButton}`}
        >
          <Menu size={16} />
        </button>

        {/* Logo Area */}
        <div className={`flex items-center gap-3 px-6 mb-10 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 ${theme.logoDot}`}>
            ∞
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-wide transition-opacity">
              {logoLabel ?? theme.logoLabel}
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active ? theme.navActive : theme.navInactive
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions (optional support link + logout) */}
        <div className="px-4 pb-6 space-y-2 mt-auto">
          {bottomLink && (
            <Link
              to={bottomLink.path}
              title={isCollapsed ? bottomLink.name : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${theme.navInactive} ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <bottomLink.icon size={20} className="shrink-0" />
              {!isCollapsed && <span>{bottomLink.name}</span>}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? 'Log Out' : undefined}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition ${theme.logout} ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Log Out</span>}
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