
import { 
  LayoutDashboard, Search, FileText, ShoppingBag, 
  GitCompare, Bookmark, Bell, HelpCircle, LogOut 
} from 'lucide-react';

export default function CustomerPage() {
  return (
    <div className="flex h-screen w-full font-sans bg-slate-100">
      
      {/* SIDEBAR - BLUE GRADIENT */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 via-blue-900 to-indigo-950 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center space-x-3 px-3 py-4 mb-6">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">∞</span>
            </div>
            <span className="font-bold tracking-tight text-white text-lg">CorePortal</span>
          </div>

          <nav className="space-y-1.5">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold bg-slate-100 text-blue-900 shadow-md">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <Search size={18} />
              <span>Find Services</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <FileText size={18} />
              <span>Inquiries</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <ShoppingBag size={18} />
              <span>My Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <GitCompare size={18} />
              <span>Compare</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <Bookmark size={18} />
              <span>Saved</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-blue-100 hover:bg-blue-800/40">
              <HelpCircle size={18} />
              <span>Support</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-blue-100 hover:bg-blue-800/40">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Hello, Natas</h1>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">MONDAY 1:35 PM</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-extrabold tracking-wider uppercase text-slate-700">WHAT SERVICE DO YOU NEED?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search services, businesses, or keywords.."
              className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl shadow-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Active Orders */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 px-1">ACTIVE ORDERS</h3>
            
            <div className="p-5 rounded-3xl bg-white shadow-xl shadow-blue-900/5 border border-blue-50">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">In Progress</span>
                <span className="text-xs text-slate-400">#ORD-9021</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-slate-900">Aircond Repair</h4>
              <p className="text-xs text-slate-400 mb-4">CoolPro Services</p>
              <button className="text-xs font-bold underline text-blue-900 hover:opacity-80">[View Order]</button>
            </div>

            <div className="p-5 rounded-3xl bg-white shadow-xl shadow-blue-900/5 border border-blue-50">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">Active</span>
                <span className="text-xs text-slate-400">#ORD-8812</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-slate-900">Mathematic Class</h4>
              <p className="text-xs text-slate-400 mb-4">Anak Cerdik</p>
              <button className="text-xs font-bold underline text-blue-900 hover:opacity-80">[View Order]</button>
            </div>
          </div>

          {/* Activity */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 px-1">RECENT ACTIVITY & INQUIRIES</h3>

            <div className="p-6 rounded-3xl bg-white shadow-xl shadow-blue-900/5 border border-blue-50 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900">CoolPro Services</h4>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
              <p className="text-sm italic text-slate-600">"We can arrange a technician tomorrow morning at 10 AM..."</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs flex items-center gap-1.5 text-emerald-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Awaiting your response
                </span>
                <button className="text-xs font-black uppercase tracking-wider text-blue-900">REPLY →</button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white shadow-xl shadow-blue-900/5 border border-blue-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</h4>
              <div className="flex items-center justify-between text-sm py-1">
                <span className="flex items-center gap-2">📄 <strong>Quotation</strong> - CoolPro Services</span>
                <span className="text-xs text-slate-400">10m ago</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-t border-slate-100">
                <span className="flex items-center gap-2">🧾 <strong>Receipt</strong> - TashaPro Services</span>
                <span className="text-xs text-slate-400">1d ago</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}