import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, ShoppingBag, Bell,HelpCircle,Menu,LogOut } from 'lucide-react';
import LogoutModal from '../authentication/LogoutModal';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    
    // Clear authentication data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('user');
    
    // Redirect to home or login page
    navigate('/');
  };

  // Navigation items matching your business routes
  const navItems = [
    { name: 'Dashboard', path: '/business', icon: LayoutDashboard },
    { name: 'Listings', path: '/business/listings', icon: Briefcase },
    { name: 'Quotations', path: '/business/quotations', icon: FileText },
    { name: 'Customer Orders', path: '/business/orders', icon: ShoppingBag },
    { name: 'Notifications', path: '/business/notifications', icon: Bell },
  ];

  return (
    <>
        <div 
          className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-rose-950 via-red-950 to-stone-950 h-full text-white flex flex-col pt-6 transition-all duration-300 relative z-40 shrink-0`}
        >
        {/* Toggle Collapse Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white text-rose-950 p-1.5 rounded-full shadow-md hover:bg-rose-50 transition"
        >
          <Menu size={16} />
        </button>

        {/* Logo Area */}
        <div className={`flex items-center gap-3 px-6 mb-10 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 flex items-center justify-center font-bold shrink-0 shadow-lg">
            ∞
          </div>
          {!isCollapsed && <span className="text-xl font-bold tracking-wide transition-opacity">CoreBiz</span>}
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
                    ? 'bg-rose-100 text-rose-950 font-semibold shadow-sm' 
                    : 'text-rose-200 hover:text-white hover:bg-rose-900/40'
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
            to="/business/support" 
            title={isCollapsed ? "Merchant Support" : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-rose-200 hover:text-white hover:bg-rose-900/40 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <HelpCircle size={20} className="shrink-0" />
            {!isCollapsed && <span>Merchant Support</span>}
          </Link>
          
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            title={isCollapsed ? "Log Out" : undefined}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition text-rose-300 hover:text-rose-100 hover:bg-rose-900/40 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* Shared Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </>
  );
}