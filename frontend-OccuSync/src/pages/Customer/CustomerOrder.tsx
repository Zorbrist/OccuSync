import CustomerSidebar from '../../components/CustomerSidebar';
import { Package } from 'lucide-react';

export default function CustomerOrder() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">My Orders</h1>
        
        <div className="space-y-4">
          {/* Example Order Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                <Package size={24} />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold tracking-wider">#ORD-9021</span>
                <h3 className="text-lg font-bold">Aircond Repair</h3>
                <p className="text-sm text-gray-500">CoolPro Services • Sept 12, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">In Progress</span>
              <button className="text-[#233876] font-bold text-sm hover:underline">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}