import CustomerSidebar from '../../components/CustomerSidebar';
import { Bookmark } from 'lucide-react';

export default function CustomerSave() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">Saved Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Saved Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm relative">
            <button className="absolute top-4 right-4 text-blue-600">
              <Bookmark size={24} fill="currentColor" />
            </button>
            <div className="h-32 bg-gray-100 rounded-xl mb-4"></div>
            <h3 className="text-xl font-bold mb-1">Advanced Mathematics Tutor</h3>
            <p className="text-gray-500 text-sm mb-4">Cikgu Ahmad</p>
            <button className="w-full border-2 border-[#233876] text-[#233876] py-2 rounded-lg font-semibold hover:bg-gray-50 transition">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}