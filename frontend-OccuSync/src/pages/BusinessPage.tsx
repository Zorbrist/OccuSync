
import { 
  LayoutDashboard, Briefcase, FileText, ShoppingBag, 
  Bell, HelpCircle, LogOut 
} from 'lucide-react';

export default function BusinessPage() {
  return (
    <div className="flex h-screen w-full font-sans bg-stone-100">
      
      {/* SIDEBAR - MAROON GRADIENT */}
      <aside className="w-64 bg-gradient-to-b from-rose-950 via-red-950 to-stone-950 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center space-x-3 px-3 py-4 mb-6">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">∞</span>
            </div>
            <span className="font-bold tracking-tight text-white text-lg">CoreBiz</span>
          </div>

          <nav className="space-y-1.5">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold bg-rose-100 text-rose-950 shadow-md">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-200 hover:bg-rose-900/40">
              <Briefcase size={18} />
              <span>Listings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-200 hover:bg-rose-900/40">
              <FileText size={18} />
              <span>Quotations</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-200 hover:bg-rose-900/40">
              <ShoppingBag size={18} />
              <span>Customer Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-200 hover:bg-rose-900/40">
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-200 hover:bg-rose-900/40">
              <HelpCircle size={18} />
              <span>Merchant Support</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-rose-200 hover:bg-rose-900/40">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">Hello, CoolPro Vendor</h1>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">MONDAY 1:35 PM</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Active Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 px-1">ACTIVE SERVICES</h3>
            
            <div className="p-5 rounded-3xl bg-white shadow-xl shadow-rose-950/5 border border-rose-100">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-900">Pending Acceptance</span>
                <span className="text-xs text-slate-400">#ORD-9021</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-slate-900">Aircond Repair</h4>
              <p className="text-xs text-slate-400 mb-4">Customer: Natas</p>
              <button className="text-xs font-bold underline text-rose-950 hover:opacity-80">[Manage Order]</button>
            </div>

            <div className="p-5 rounded-3xl bg-white shadow-xl shadow-rose-950/5 border border-rose-100">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-900">Scheduled</span>
                <span className="text-xs text-slate-400">#ORD-8900</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-slate-900">Chemical Cleaning</h4>
              <p className="text-xs text-slate-400 mb-4">Customer: Sarah</p>
              <button className="text-xs font-bold underline text-rose-950 hover:opacity-80">[Manage Order]</button>
            </div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 px-1">INCOMING INQUIRIES</h3>

            <div className="p-6 rounded-3xl bg-white shadow-xl shadow-rose-950/5 border border-rose-100 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">Inquiry from Natas</h4>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
              <p className="text-sm italic text-slate-600">"Can you arrange a technician tomorrow for aircond repair?"</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs flex items-center gap-1.5 text-amber-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                  Action Required
                </span>
                <button className="text-xs font-black uppercase tracking-wider text-rose-950">SEND QUOTATION →</button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white shadow-xl shadow-rose-950/5 border border-rose-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Business Alerts</h4>
              <div className="flex items-center justify-between text-sm py-1">
                <span className="flex items-center gap-2">💳 <strong>Payout Processed</strong> - RM 1,250.00</span>
                <span className="text-xs text-slate-400">Today</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-t border-slate-100">
                <span className="flex items-center gap-2">⭐ <strong>New Review</strong> - 5 Stars from Tasha</span>
                <span className="text-xs text-slate-400">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}