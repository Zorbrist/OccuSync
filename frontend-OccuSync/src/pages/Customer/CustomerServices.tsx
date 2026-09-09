import CustomerSidebar from '../../components/CustomerSidebar';
import { Search } from 'lucide-react';

export default function CustomerServices() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">Browse Services</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for mechanics, tutors, cleaners..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Service Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">Image Placeholder</div>
            <h3 className="text-xl font-bold mb-1">Home Cleaning</h3>
            <p className="text-gray-500 text-sm mb-4">Starting from RM 50/hour</p>
            <button className="w-full bg-[#233876] text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}