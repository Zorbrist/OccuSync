// pages/CustomerDashboard.tsx
import { Clock, Calendar, CheckCircle, FileText, Bell, ChevronRight, Wrench } from 'lucide-react';
import CustomerSidebar from '../../components/CustomerSidebar';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function CustomerDashboard() {
  const { profile, services, orders, notifications, isLoading, error } = useDashboardData();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9]">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9] text-red-500">{error}</div>;
  }

  // Calculate Dashboard Summaries
  const activeOrders = orders.filter(o => o.status !== 'COMPLETED');
  const completedOrders = orders.filter(o => o.status === 'COMPLETED');
  const unreadNotifications = notifications.filter(n => !n.is_read).length;
  
  // Grab a quick preview of services for the sidebar widget
  const suggestedServices = services.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-700';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-700';
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />

      <div className="flex-1 p-6 md:p-10">
        
        {/* Header Greeting */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#233876] mb-1">
              Welcome back, {profile?.first_name}
            </h1>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button className="bg-[#233876] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-800 transition flex items-center gap-2">
            <Wrench size={18} />
            Request Service
          </button>
        </div>

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Active Jobs</p>
              <h3 className="text-2xl font-extrabold text-gray-800">{activeOrders.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Unpaid Invoices</p>
              <h3 className="text-2xl font-extrabold text-gray-800">0</h3> {/* Placeholder for future invoice API */}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Completed Jobs</p>
              <h3 className="text-2xl font-extrabold text-gray-800">{completedOrders.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl relative">
              <Bell size={24} />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Unread Alerts</p>
              <h3 className="text-2xl font-extrabold text-gray-800">{unreadNotifications}</h3>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Job Tracking (Takes up 2/3 of the space) */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Service Requests</h3>
              <button className="text-sm font-bold text-[#233876] hover:underline">View All History</button>
            </div>
            
            {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h4 className="text-lg font-bold text-gray-700 mb-1">No active requests</h4>
                <p className="text-gray-500 text-sm">You haven't requested any services yet.</p>
              </div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm mb-4 border-l-4 border-[#233876] hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-sm font-extrabold text-gray-800 block mb-1">Order #{order.id}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{order.business_name || 'Service Provider'}</span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {order.notes && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">"{order.notes}"</p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{new Date(order.scheduled_start).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT COLUMN: Service Discovery Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Suggested Services</h3>
              </div>
              
              <div className="p-5">
                {suggestedServices.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No services available.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {suggestedServices.map((service) => (
                      <div key={service.id} className="group cursor-pointer">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#233876] transition">{service.name}</h4>
                          <span className="text-sm font-extrabold text-[#233876]">RM {Number(service.base_price).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2 truncate">{service.business_name}</p>
                        <hr className="border-gray-50 group-last:hidden" />
                      </div>
                    ))}
                  </div>
                )}
                
                <button className="w-full mt-6 bg-blue-50 text-[#233876] py-2.5 rounded-xl text-sm font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2">
                  Find More Services <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}