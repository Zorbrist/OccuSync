// components/CustomerSidebar.tsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, FileText, ShoppingBag, 
  Bell, HelpCircle, LogOut, Receipt, Sparkles
} from 'lucide-react';
import LogoutModal from './authentication/LogoutModal';
import { useNotificationsData } from '../hooks/useNotificationsData';

export default function CustomerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pull the unread count directly from your hook
  const { unreadCount } = useNotificationsData();

  const isActive = (path: string) => location.pathname === path;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token'); 
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/customerDashboard', icon: LayoutDashboard },
    { name: 'Find Services', path: '/customerServices', icon: Search },
    { name: 'My Orders', path: '/customerOrders', icon: ShoppingBag },
    { name: 'Invoices', path: '/customerInvoices', icon: Receipt },
    { name: 'Notifications', path: '/customerNotifications', icon: Bell, hasBadge: true },
    { name: 'Inquiries', path: '/customerInquiries', icon: FileText },
  ];

  return (
    <>
      {/* Changed to h-screen and sticky top-0 so it locks to the viewport */}
      <div 
        className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen sticky top-0 bg-gradient-to-b from-[#1E293B] to-[#233876] text-white flex flex-col pt-8 transition-all duration-300 z-50 shrink-0 shadow-2xl border-r border-blue-900/50`}
      >
        

        {/* Premium Logo Area */}
        <button 
        onClick={() => setIsCollapsed(!isCollapsed)} className={`flex items-center gap-3 px-6 mb-12 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-inner">
            <Sparkles size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-xl font-black tracking-tight leading-none mb-1">Occusync</span>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Customer Portal</span>
            </div>
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path} 
                title={isCollapsed ? item.name : undefined}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 relative ${
                  active 
                    ? 'bg-white text-[#233876] font-extrabold shadow-md' 
                    : 'text-blue-100 hover:text-white hover:bg-white/10 font-medium'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2} 
                  className={`shrink-0 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                {!isCollapsed && <span className="tracking-wide whitespace-nowrap">{item.name}</span>}
                
                {/* Notification Badge Indicator */}
                {item.hasBadge && unreadCount > 0 && (
                  <span className={`absolute right-4 flex h-2.5 w-2.5 ${isCollapsed ? 'right-2 top-2' : ''}`}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions (Support & Logout) */}
        <div className="px-4 pb-8 pt-4 space-y-1.5 mt-auto bg-gradient-to-t from-[#161d2b] to-transparent">
          <Link 
            to="/support" 
            title={isCollapsed ? "Support" : undefined}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 text-blue-100 hover:text-white hover:bg-white/10 font-medium ${isCollapsed ? 'justify-center' : ''}`}
          >
            <HelpCircle size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="tracking-wide whitespace-nowrap">Support</span>}
          </Link>
          
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? "Log Out" : undefined}
            className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl transition-all duration-200 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 font-bold ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="tracking-wide whitespace-nowrap">Log Out</span>}
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