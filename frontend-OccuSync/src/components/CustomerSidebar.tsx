import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, FileText, ShoppingBag, 
  ArrowLeftRight, Bookmark, Bell, HelpCircle, 
  Menu, LogOut 
} from 'lucide-react';
import LogoutModal from './authentication/LogoutModal';

export default function CustomerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    
    // 1. Destroy the saved tokens in the browser
    // (Check your useLogin.ts file to see exactly what you named these)
    localStorage.removeItem('token'); 
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('user');
    
    // 2. Redirect to home or login page
    navigate('/');
  };

  // List of navigation items to keep the code DRY (Don't Repeat Yourself)
  const navItems = [
    { name: 'Dashboard', path: '/customerDashboard', icon: LayoutDashboard },
    { name: 'Find Services', path: '/customerServices', icon: Search },
    { name: 'Inquiries', path: '/customerInquiries', icon: FileText },
    { name: 'My Orders', path: '/customerOrders', icon: ShoppingBag },
    { name: 'Compare', path: '/customerCompare', icon: ArrowLeftRight },
    { name: 'Saved', path: '/customerSaved', icon: Bookmark },
    { name: 'Notifications', path: '/customerNotifications', icon: Bell },
  ];

  return (
    <>
      <div 
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#233876] min-h-screen text-white flex flex-col pt-6 transition-all duration-300 relative z-40 shrink-0`}
      >
        {/* Toggle Collapse Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white text-[#233876] p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Menu size={16} />
        </button>

        {/* Logo Area */}
        <div className={`flex items-center gap-3 px-6 mb-10 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold shrink-0">
            ∞
          </div>
          {!isCollapsed && <span className="text-xl font-bold tracking-wide transition-opacity">CorePortal</span>}
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
                  active 
                    ? 'bg-white text-[#233876] font-semibold shadow-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions (Support & Logout) */}
        <div className="px-4 pb-6 space-y-2 mt-auto">
          <Link 
            to="/support" 
            title={isCollapsed ? "Support" : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-300 hover:text-white hover:bg-white/10 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <HelpCircle size={20} className="shrink-0" />
            {!isCollapsed && <span>Support</span>}
          </Link>
          
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? "Log Out" : undefined}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition text-red-300 hover:text-red-100 hover:bg-red-900/30 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* Render the Logout Modal */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </>
  );
}