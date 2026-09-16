// pages/AdminDashboardPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Imported useNavigate
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useAdminDashboard } from "../../hooks/adminHooks/useAdminDashboard";
import BusinessApprovalModal from "../../components/Admin/BusinessApprovalModal";
import type { PendingBusiness } from "../../types/adminType";

import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  CreditCard,
  Search,
  Users,
  AlertCircle,
} from "lucide-react";

// ==============================
// Light Theme Chart Config
// ==============================
const CHART_COLORS = ["#7C3AED", "#A78BFA"];
const GRID_STROKE = "#E2E8F0";
const AXIS_TICK = { fill: "#64748B", fontSize: 12, fontWeight: 600 };

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #F1F5F9",
  borderRadius: "1rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  color: "#0F172A",
  fontSize: "13px",
  fontWeight: 700,
  padding: "16px",
};

const TOOLTIP_LABEL_STYLE = {
  color: "#64748B",
  marginBottom: "6px",
  fontWeight: 600,
};
const LEGEND_STYLE = {
  color: "#475569",
  fontSize: "13px",
  fontWeight: 600,
  paddingTop: "12px",
};

// ==============================
// Component
// ==============================
export default function AdminDashboard() {
  const navigate = useNavigate(); // <-- Initialized hook for routing
  const { data, loading, error, updateBusinessStatusInDashboard } =
    useAdminDashboard();
  const [selectedBusiness, setSelectedBusiness] =
    useState<PendingBusiness | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="w-10 h-10 border-[4px] border-slate-300 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#E8EDF2]">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-sm">
          <h3 className="text-[#0F172A] text-xl font-bold mb-2">
            Failed to load
          </h3>
          <p className="text-slate-600 text-sm mb-6 font-medium">
            {error || "Data unavailable"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-violet-600 text-white rounded-full text-sm font-bold w-full shadow-md"
          >
            Retry Connection
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
    date: new Date(item.date).toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "short",
    }),
    registrations: item.count,
  }));

  const scrollbarClasses =
    "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-16 bg-[#E8EDF2]">
      <Particles
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        quantity={400}
        ease={80}
        size={1}
        color="#7C3AED"
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                Platform Overview
              </h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Admin control center and analytics
              </p>
            </div>
          </div>
        </BlurFade>

        {/* SECTION 1: Key Performance Indicators (Clickable) */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Added onClick and hover effects */}
              <div
                onClick={() => navigate("/admin/users")}
                className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                    <Users size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Total Users
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#0F172A]">
                    {data.user_overview.total_users}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1.5">
                    Clients & Businesses
                  </p>
                </div>
              </div>

              {/* Added onClick and hover effects */}
              <div
                onClick={() => navigate("/admin/services")}
                className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                    <Briefcase size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Services
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#0F172A]">
                    {data.service_job_overview.total_services}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1.5">
                    Active directory listings
                  </p>
                </div>
              </div>

              {/* Added onClick and hover effects */}
              <div
                onClick={() => navigate("/admin/jobs")}
                className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-600">
                    <CheckCircle size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Completed
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#0F172A]">
                    {data.service_job_overview.jobs_completed}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1.5">
                    Jobs successfully fulfilled
                  </p>
                </div>
              </div>

              {/* Added onClick and hover effects */}
              <div
                onClick={() => navigate("/admin/transactions")}
                className="bg-white rounded-[1.5rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-slate-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                    <CreditCard size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
                    Revenue Volume
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#0F172A]">
                    <span className="text-2xl text-violet-500 mr-1.5">RM</span>
                    {Number(data.total_transaction_value).toLocaleString(
                      "en-MY",
                      { maximumFractionDigits: 0 },
                    )}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1.5">
                    Total platform transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* SECTION 2: Pending Registrations */}
        <BlurFade delay={0.3}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-3">
                  Pending Registrations
                  {data.pending_businesses.length > 0 && (
                    <span className="px-3.5 py-1.5 bg-amber-100 text-amber-700 text-[11px] font-black rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle size={14} /> Action Needed (
                      {data.pending_businesses.length})
                    </span>
                  )}
                </h3>
              </div>
            </div>

            {/* Kept visible scrollbar for data tables that may get very long, removed p-2 to stop underlap */}
            <div
              className={`overflow-x-auto overflow-y-auto max-h-[400px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 ${scrollbarClasses}`}
            >
              <table className="w-full text-left min-w-[800px]">
                <thead className="sticky top-0 z-10">
                  {/* Added bg-white to <th> to prevent underlap */}
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                    <th className="py-5 pl-8 bg-white rounded-tl-[1.5rem]">
                      Business Entity
                    </th>
                    <th className="py-5 bg-white">Industry</th>
                    <th className="py-5 bg-white">Contact Details</th>
                    <th className="py-5 text-right pr-8 bg-white rounded-tr-[1.5rem]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.pending_businesses.map((business) => (
                    <tr
                      key={business.id}
                      onClick={() => setSelectedBusiness(business)}
                      className="hover:bg-slate-50 transition-colors border-b border-slate-100 cursor-pointer group"
                    >
                      <td className="py-5 pl-8">
                        <p className="font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors">
                          {business.name}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-1">
                          Reg No: {business.registration_no || "N/A"}
                        </p>
                      </td>
                      <td className="py-5 text-slate-600 font-semibold">
                        {business.industry}
                      </td>
                      <td className="py-5 text-slate-500 font-medium">
                        {business.email}
                      </td>
                      <td className="py-5 text-right pr-8">
                        <button className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-full font-bold text-xs hover:bg-[#0F172A] hover:text-white transition-colors uppercase tracking-wider shadow-sm">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.pending_businesses.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-slate-500 font-semibold bg-slate-50"
                      >
                        The registration queue is currently clear.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* SECTION 3: Split Data Panels (Analytics & Live Feed) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Analytics Panel */}
          <BlurFade delay={0.4} className="h-full">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 h-full flex flex-col">
              <h3 className="text-xl font-bold text-[#0F172A] mb-8">
                Growth Analytics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 min-h-[250px] flex flex-col">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    Registrations (30 Days)
                  </h4>
                  <div className="h-[200px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={registrationData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={GRID_STROKE}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="date"
                          tick={AXIS_TICK}
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={AXIS_TICK}
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                          width={30}
                        />
                        <RechartsTooltip
                          contentStyle={TOOLTIP_STYLE}
                          labelStyle={TOOLTIP_LABEL_STYLE}
                          cursor={{ stroke: "#E2E8F0", strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="registrations"
                          stroke="#7C3AED"
                          strokeWidth={4}
                          dot={false}
                          activeDot={{
                            r: 7,
                            fill: "#7C3AED",
                            stroke: "#FFFFFF",
                            strokeWidth: 3,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 min-h-[250px] flex flex-col">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    User Distribution
                  </h4>
                  <div className="h-[200px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={4}
                        >
                          {userChartData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={TOOLTIP_STYLE}
                          itemStyle={{ color: "#0F172A", fontWeight: 700 }}
                        />
                        <Legend wrapperStyle={LEGEND_STYLE} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Live Job Feed */}
          <BlurFade delay={0.5} className="h-full">
            <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Live Job Feed
                </h3>
                <button
                  onClick={() => navigate("/admin/jobs")}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-black transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Applied hidden scrollbar class and removed p-2 to stop underlap */}
              <div className="overflow-x-auto overflow-y-auto max-h-[350px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="sticky top-0 z-10">
                    {/* Added bg-white to <th> to prevent underlap */}
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                      <th className="py-4 pl-6 bg-white rounded-tl-[1.5rem]">
                        Service Required
                      </th>
                      <th className="py-4 bg-white">Scheduled For</th>
                      <th className="py-4 text-right pr-6 bg-white rounded-tr-[1.5rem]">
                        Current Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {data.latest_jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                      >
                        <td className="py-4 pl-6">
                          <p className="font-bold text-[#0F172A]">
                            {job.service_name}
                          </p>
                          <p className="text-xs font-semibold text-slate-500 mt-1">
                            {job.business_name}
                          </p>
                        </td>
                        <td className="py-4 text-slate-600 font-semibold">
                          {job.date
                            ? new Date(job.date).toLocaleDateString("en-MY", {
                                day: "numeric",
                                month: "short",
                              })
                            : "Pending Date"}
                        </td>
                        <td className="py-4 text-right pr-6">
                          <span className="inline-flex items-center justify-end gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                job.status === "COMPLETED"
                                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                  : job.status === "CANCELLED"
                                    ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                    : job.status === "CONFIRMED"
                                      ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                                      : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                              }`}
                            ></span>
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                              {job.status}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {data.latest_jobs.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-12 text-center text-slate-500 font-semibold bg-slate-50 rounded-xl"
                        >
                          No active jobs in the feed.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </BlurFade>
        </div>
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
