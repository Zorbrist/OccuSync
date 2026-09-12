
import { MessageSquare } from 'lucide-react';

export default function CustomerInquiries() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">My Inquiries</h1>
        
        <div className="bg-white rounded-2xl shadow-sm p-2">
          {/* Example Inquiry Row */}
          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer border-b border-gray-100 last:border-0">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">CoolPro Services</h4>
              <p className="text-sm text-gray-500 truncate">Do you provide servicing for 2.0HP Daikin airconds?</p>
            </div>
            <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Pending Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}