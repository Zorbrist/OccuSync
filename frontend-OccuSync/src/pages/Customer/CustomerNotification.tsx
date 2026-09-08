import CustomerSidebar from '../../components/CustomerSidebar';
import { Bell } from 'lucide-react';

export default function CustomerNotification() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">Notifications</h1>
        
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
          {/* Unread Notification */}
          <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border-l-4 border-[#233876]">
            <div className="mt-1 text-[#233876]">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">New Quotation Received</h4>
              <p className="text-sm text-gray-600 mt-1">CoolPro Services has replied to your inquiry with a quotation.</p>
              <span className="text-xs text-gray-400 mt-2 block">10 minutes ago</span>
            </div>
          </div>

          {/* Read Notification */}
          <div className="flex items-start gap-4 p-4 rounded-xl">
            <div className="mt-1 text-gray-400">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-700">Receipt Available</h4>
              <p className="text-sm text-gray-500 mt-1">Your receipt for #ORD-8812 from TashaPro Services is ready to download.</p>
              <span className="text-xs text-gray-400 mt-2 block">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}