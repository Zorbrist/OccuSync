import { Calendar, Users, ClipboardList, CheckCircle } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <span className="text-blue-400 font-semibold text-xs tracking-wider uppercase">Business Management Dashboard</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-1">Hello, CoolPro Staff!</h2>
            <p className="text-slate-400 text-sm">Here is your operational summary for today.</p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition">
            + New Work Order
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 p-4 rounded-xl space-y-2 text-xs font-medium text-slate-300">
            <div className="p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Work Orders</div>
            <div className="p-2 hover:bg-slate-800 rounded-lg flex items-center gap-2"><Calendar className="w-4 h-4" /> Technician Schedule</div>
            <div className="p-2 hover:bg-slate-800 rounded-lg flex items-center gap-2"><Users className="w-4 h-4" /> Customer CRM</div>
            <div className="p-2 hover:bg-slate-800 rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Invoices & Payments</div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-center text-xs text-emerald-400 font-bold mb-2">
                <span>IN PROGRESS</span>
                <span>#WO-9021</span>
              </div>
              <h4 className="font-bold text-sm">Aircon Repair</h4>
              <p className="text-xs text-slate-400 mt-1">Client: John Doe</p>
              <p className="text-xs text-slate-400">Tech: Alex R. (Dispatched)</p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-center text-xs text-amber-400 font-bold mb-2">
                <span>SCHEDULED</span>
                <span>#WO-9022</span>
              </div>
              <h4 className="font-bold text-sm">Aircon Maintenance</h4>
              <p className="text-xs text-slate-400 mt-1">Client: Tech Corp Inc</p>
              <p className="text-xs text-slate-400">Tech: Unassigned</p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-center text-xs text-blue-400 font-bold mb-2">
                <span>COMPLETED</span>
                <span>#WO-9020</span>
              </div>
              <h4 className="font-bold text-sm">System Installation</h4>
              <p className="text-xs text-slate-400 mt-1">Client: Sarah Smith</p>
              <p className="text-xs text-slate-400">Paid: $450.00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}