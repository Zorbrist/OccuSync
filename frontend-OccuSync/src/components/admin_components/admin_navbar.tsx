// AdminNavBar.tsx
import {
  LayoutDashboard,
  UserCheck,
//   ShieldCheck,
//   FileText,
//   Bell,
//   HelpCircle,
  LogOut,
  Menu,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../authentication/LogoutModal';

export interface AdminNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

export const defaultAdminNavItems: AdminNavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'users', label: 'User Management', icon: UserCheck },
//   { key: 'audit', label: 'Audit Logs', icon: ShieldCheck },
//   { key: 'analytics', label: 'System Analytics', icon: FileText },
//   { key: 'alerts', label: 'System Alerts', icon: Bell },
//   { key: 'support', label: 'Support Desk', icon: HelpCircle },
];

interface AdminNavBarProps {
  items?: AdminNavItem[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
}

export default function AdminNavBar({
  items = defaultAdminNavItems,
  activeKey,
  onNavigate,
  onLogout,
}: AdminNavBarProps) {
  const [internalActiveKey, setInternalActiveKey] = useState(
    items[0]?.key
  );
  const currentKey = activeKey ?? internalActiveKey;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    setInternalActiveKey(key);
    onNavigate?.(key);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    onLogout?.();
    navigate('/');
  };

  return (
    <aside
      className={`
        relative ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-stone-950 border-r border-zinc-800 shadow-[0_0_25px_rgba(255,255,255,0.05)] 
        flex flex-col justify-between p-4 transition-all duration-300 flex-shrink-0
      `}
    >
      {/* Collapse Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="
          absolute -right-3 top-8 z-50 
          bg-white text-rose-950 p-1.5 rounded-full shadow-md 
          hover:bg-rose-50 transition
        "
      >
        <Menu size={16} />
      </button>

      <div>
        {/* Logo */}
        <div
          className={`
            flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
            px-3 py-4 mb-6
          `}
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)] flex-shrink-0">
            <span className="text-black font-black text-lg">∞</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold tracking-tight text-white text-lg whitespace-nowrap">
              CoreAdmin
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {items.map(({ key, label, icon: Icon }) => {
            const isActive = key === currentKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(key)}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? label : undefined}
                className={
                  isActive
                    ? `
                        w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
                        px-4 py-3 rounded-2xl text-sm font-semibold 
                        bg-zinc-800 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] 
                        border border-emerald-500/30
                      `
                    : `
                        w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
                        px-4 py-3 rounded-2xl text-sm font-semibold 
                        text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200
                      `
                }
              >
                <Icon size={18} />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          title={isCollapsed ? 'Log Out' : undefined}
          className={`
            w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
            px-4 py-2.5 rounded-xl font-medium 
            text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200
          `}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </aside>
  );
}