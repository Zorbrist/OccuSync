import { Search } from 'lucide-react';
import CustomerSidebar from '../../components/CustomerSidebar';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function CustomerDashboard() {
  // Call the custom hook to get the data
  const { profile, services, isLoading } = useDashboardData();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9]">Loading Dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />

      <div className="flex-1 p-10">
        
        {/* Header Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#233876] mb-1">
            Hello, {profile?.first_name}
          </h1>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            {new Date().toLocaleDateString('en-MY', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Big Search Bar */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-[#233876] mb-3 uppercase">What service do you need?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search services, businesses, or keywords.." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: Active Services */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Active Services Found</h3>
            
            {services.map((business) => (
              <div key={business.id} className="bg-white p-6 rounded-2xl shadow-sm mb-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {business.industry}
                  </span>
                  <span className="text-gray-400 text-sm">ID: {business.id}</span>
                </div>
                <h4 className="text-xl font-bold mb-1">{business.name}</h4>
                <p className="text-gray-500 text-sm mb-6">Location: {business.area_of_service}</p>
                <a href="#" className="text-[#233876] font-bold text-sm hover:underline">[View Details]</a>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Activity & Notifications */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Recent Activity & Inquiries</h3>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">CoolPro Services</h4>
                <span className="text-gray-400 text-sm">2h ago</span>
              </div>
              <p className="text-gray-600 italic text-sm mb-6">"We can arrange a technician tomorrow morning at 10 AM..."</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-semibold">Awaiting your response</span>
                </div>
                <button className="text-[#233876] font-bold text-sm tracking-wider">REPLY →</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}