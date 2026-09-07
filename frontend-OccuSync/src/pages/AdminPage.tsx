
import { 
  LayoutDashboard, UserCheck, ShieldCheck, FileText, 
  Bell, HelpCircle, LogOut 
} from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex h-screen w-full font-sans bg-zinc-950 text-zinc-100">
      
      {/* SIDEBAR - BLACK GLOW */}
      <aside className="w-64 bg-stone-950 border-r border-zinc-800 shadow-[0_0_25px_rgba(255,255,255,0.05)] flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center space-x-3 px-3 py-4 mb-6">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              <span className="text-black font-black text-lg">∞</span>
            </div>
            <span className="font-bold tracking-tight text-white text-lg">CoreAdmin</span>
          </div>

          <nav className="space-y-1.5">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold bg-zinc-800 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] border border-emerald-500/30">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
              <UserCheck size={18} />
              <span>User Management</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
              <ShieldCheck size={18} />
              <span>Audit Logs</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
              <FileText size={18} />
              <span>System Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
              <Bell size={18} />
              <span>System Alerts</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
              <HelpCircle size={18} />
              <span>Support Desk</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">Hello, SuperAdmin</h1>
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mt-1">MONDAY 1:35 PM</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Status Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-500 px-1">SYSTEM HEALTH</h3>
            
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">Optimal</span>
                <span className="text-xs text-zinc-500">NODE-01</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-zinc-100">Database Cluster</h4>
              <p className="text-xs text-zinc-500 mb-4">PostgreSQL Primary</p>
              <button className="text-xs font-bold underline text-emerald-400 hover:opacity-80">[View Metrics]</button>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">Active</span>
                <span className="text-xs text-zinc-500">API-GW</span>
              </div>
              <h4 className="text-lg font-bold mt-3 text-zinc-100">FastAPI Gateway</h4>
              <p className="text-xs text-zinc-500 mb-4">Latency: 12ms</p>
              <button className="text-xs font-bold underline text-emerald-400 hover:opacity-80">[View Traffic]</button>
            </div>
          </div>

          {/* Activity Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-500 px-1">SECURITY LOGS & ISSUES</h3>

            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)] space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-zinc-100">User Authorization Service</h4>
                <span className="text-xs text-zinc-500">5m ago</span>
              </div>
              <p className="text-sm italic text-zinc-400">"New OAuth key generated for Vendor: CoolPro Services..."</p>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <span className="text-xs flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Verified Event
                </span>
                <button className="text-xs font-black uppercase tracking-wider text-emerald-400">AUDIT →</button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">System Notifications</h4>
              <div className="flex items-center justify-between text-sm py-1 text-zinc-300">
                <span className="flex items-center gap-2">🔒 <strong>SSL Renewal</strong> - Portal Gateway</span>
                <span className="text-xs text-zinc-500">Auto-Renewed</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-t border-zinc-800 text-zinc-300">
                <span className="flex items-center gap-2">⚠️ <strong>Rate Limit Alert</strong> - IP 192.168.1.1</span>
                <span className="text-xs text-zinc-500">Resolved</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}