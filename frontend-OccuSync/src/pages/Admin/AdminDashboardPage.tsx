// pages/AdminDashboardPage.tsx
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from  "recharts";

import { useAdminDashboard } from "../../hooks/adminHooks/useAdminDashboard";
import BusinessApprovalModal from "../../components/Admin/BusinessApprovalModal";
import type { PendingBusiness } from "../../types/adminType";

import { NumberTicker } from "../../ui/number-ticker";
import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";

// ==============================
// Light Theme Chart Config
// ==============================
const CHART_COLORS = ["#8b5cf6", "#c084fc", "#e879f9"]; // Violet/Purple accents
const GRID_STROKE = "#E2E8F0"; // slate-200
const AXIS_TICK = { fill: "#94A3B8", fontSize: 11, fontWeight: 500 }; // slate-400

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "none",
  borderRadius: "1rem",
  boxShadow: "0 8px 24px rgba(149,157,165,0.15)",
  color: "#1E293B",
  fontSize: "12px",
  fontWeight: 600,
  padding: "12px"
};

const TOOLTIP_LABEL_STYLE = { color: "#64748B", marginBottom: "4px" };
const LEGEND_STYLE = { color: "#64748B", fontSize: "12px", paddingTop: "10px" };

// ==============================
// Component
// ==============================
export default function AdminDashboard() {
  const { data, loading, error, updateBusinessStatusInDashboard } = useAdminDashboard();
  const [selectedBusiness, setSelectedBusiness] = useState<PendingBusiness | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="w-8 h-8 border-[3px] border-slate-300 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-sm">
          <h3 className="text-[#1E293B] text-lg font-semibold mb-2">Failed to load</h3>
          <p className="text-slate-500 text-sm mb-6">{error || "Data unavailable"}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-violet-600 text-white rounded-full text-sm font-medium w-full">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userChartData = [
    { name: "Customers", value: data.user_overview.total_customers },
    { name: "Providers", value: data.user_overview.total_business_providers },
  ];

  const registrationData = data.recent_registrations.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-MY", { day: "2-digit", month: "short" }),
    registrations: item.count,
  }));

  const scrollbarClasses = "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-12 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#8b5cf6" />

      <div className="relative z-10 max-w-[1450px] mx-auto px-6 lg:px-10 space-y-6 pt-2">
        
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2">
            <div>
              <h2 className="text-[28px] font-semibold tracking-tight text-[#1E293B]">Platform Overview</h2>
              <p className="text-[13px] font-medium text-slate-500 mt-1">Admin control center and analytics.</p>
            </div>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-black transition-colors">
              <Search size={18} />
            </button>
          </div>
        </BlurFade>

        {/* KPI Panel */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500"><Users size={18} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Users</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#1E293B]"><NumberTicker value={data.user_overview.total_users} /></h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Clients & Businesses</p>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500"><Briefcase size={18} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Services</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#1E293B]"><NumberTicker value={data.service_job_overview.total_services} /></h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Active directory listings</p>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500"><CheckCircle size={18} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Jobs</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#1E293B]"><NumberTicker value={data.service_job_overview.jobs_completed} /></h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Successfully fulfilled</p>
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-[1.5rem] p-6 shadow-[0_15px_30px_rgba(30,41,59,0.2)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"><CreditCard size={18} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300">Revenue Volume</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white">
                    <span className="text-xl text-violet-400 mr-1">RM</span>
                    {Number(data.total_transaction_value).toLocaleString("en-MY", { maximumFractionDigits: 0 })}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Total platform transactions</p>
                </div>
              </div>

            </div>
          </div>
        </BlurFade>

        {/* Analytics Charts Panel */}
        <BlurFade delay={0.3}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_24px_rgba(149,157,165,0.05)]">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-6">User Distribution</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={userChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5}>
                      {userChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#1E293B', fontWeight: 600 }} />
                    <Legend wrapperStyle={LEGEND_STYLE} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_24px_rgba(149,157,165,0.05)]">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-6">New Registrations (30 Days)</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                    <XAxis dataKey="date" tick={AXIS_TICK} axisLine={false} tickLine={false} dy={10} />
                    <YAxis allowDecimals={false} tick={AXIS_TICK} axisLine={false} tickLine={false} dx={-10} />
                    <RechartsTooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} cursor={{ stroke: '#E2E8F0', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="registrations" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#FFFFFF", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </BlurFade>

        {/* Data Tables Panel */}
        <BlurFade delay={0.4}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Pending Businesses */}
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1E293B]">Pending Registrations</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {data.pending_businesses.length} Action Needed
                </span>
              </div>
              
              <div className={`overflow-x-auto pb-4 ${scrollbarClasses}`}>
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="pb-4 font-medium pl-2">Business Details</th>
                      <th className="pb-4 font-medium">Industry</th>
                      <th className="pb-4 font-medium text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {data.pending_businesses.map((business) => (
                      <tr key={business.id} onClick={() => setSelectedBusiness(business)} className="hover:bg-white/50 transition-colors border-b border-slate-200/50 cursor-pointer group">
                        <td className="py-4 pl-2">
                          <p className="font-semibold text-[#1E293B] group-hover:text-violet-600 transition-colors">{business.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{business.email}</p>
                        </td>
                        <td className="py-4 text-slate-500 font-medium">{business.industry}</td>
                        <td className="py-4 text-right pr-2">
                          <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black ml-auto">
                            <MoreHorizontal size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {data.pending_businesses.length === 0 && (
                      <tr><td colSpan={3} className="py-8 text-center text-slate-400">Queue is clear.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest Jobs */}
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1E293B]">Live Job Feed</h3>
                <button className="text-[11px] font-bold text-slate-400 hover:text-black uppercase tracking-wider flex items-center gap-1 transition-colors">
                  View All <ArrowRight size={12} />
                </button>
              </div>
              
              <div className={`overflow-x-auto pb-4 ${scrollbarClasses}`}>
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="pb-4 font-medium pl-2">Service</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {data.latest_jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-white/50 transition-colors border-b border-slate-200/50">
                        <td className="py-4 pl-2">
                          <p className="font-semibold text-[#1E293B]">{job.service_name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{job.business_name}</p>
                        </td>
                        <td className="py-4 text-slate-500 font-medium">
                          {job.date ? new Date(job.date).toLocaleDateString("en-MY", { day: 'numeric', month: 'short' }) : "-"}
                        </td>
                        <td className="py-4 text-right pr-2">
                          <span className="flex items-center justify-end gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              job.status === "COMPLETED" ? "bg-emerald-400" :
                              job.status === "CANCELLED" ? "bg-red-400" :
                              job.status === "CONFIRMED" ? "bg-violet-400" : "bg-amber-400"
                            }`}></span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{job.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {data.latest_jobs.length === 0 && (
                      <tr><td colSpan={3} className="py-8 text-center text-slate-400">No recent activity.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </BlurFade>

      </div>

      {selectedBusiness && (
        <BusinessApprovalModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onStatusUpdated={updateBusinessStatusInDashboard}
        />
      )}
    </div>
  );
}