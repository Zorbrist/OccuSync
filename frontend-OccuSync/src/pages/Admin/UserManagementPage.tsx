// pages/Admin/UserManagementPage.tsx
import { useState } from "react";
import { useAdminUsers } from "../../hooks/adminHooks/useUserManagement";

// Import the extracted component
import UserModal from "../../components/Admin/UserModal"; 

import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";
import { Search, User, Shield } from "lucide-react";

export default function UserManagement() {
  const {
    users,
    search,
    changeSearch,
    changeRole,
    loading,
    error,
    selectedUser,
    fetchUserById,
    clearSelectedUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useAdminUsers();

  const [activeTab, setActiveTab] = useState<"CUSTOMER" | "BUSINESS_PROVIDER">("CUSTOMER");

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-16 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">User Management</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Manage Customers & Business Providers
              </p>
            </div>
          
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Controls Row: Search & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  placeholder="Search users by email..."
                  className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Tabs */}
              <div className="flex bg-slate-200/50 p-1.5 rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={() => { setActiveTab("CUSTOMER"); changeRole("CUSTOMER"); }}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    activeTab === "CUSTOMER"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500 hover:text-[#0F172A]"
                  }`}
                >
                  Customers
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab("BUSINESS_PROVIDER"); changeRole("BUSINESS_PROVIDER"); }}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    activeTab === "BUSINESS_PROVIDER"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500 hover:text-[#0F172A]"
                  }`}
                >
                  Business Providers
                </button>
              </div>
            </div>

            {/* Table Area */}
            
            <div className={`overflow-x-auto overflow-y-auto max-h-[500px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 ${scrollbarClasses}`}>
              <BlurFade key={activeTab} delay={0.1}>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-8 h-8 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-semibold text-sm">Loading directory...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64 text-red-500 font-semibold text-sm bg-red-50/50">
                  {error}
                </div>
              ) : (
                <table className="w-full text-left min-w-[800px]">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                      <th className="py-5 pl-8 bg-white rounded-tl-[1.5rem]">User Identity</th>
                      <th className="py-5 bg-white">Email Address</th>
                      <th className="py-5 bg-white">Phone Number</th>
                      <th className="py-5 text-right pr-8 bg-white rounded-tr-[1.5rem]">Date Registered</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        onClick={() => fetchUserById(user.id)}
                        className="hover:bg-slate-50 transition-colors border-b border-slate-100 cursor-pointer group"
                      >
                        <td className="py-5 pl-8">
                          <p className="font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                              <User size={14} />
                            </span>
                            {user.first_name || user.last_name
                              ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                              : "No name provided"}
                          </p>
                        </td>
                        <td className="py-5 text-slate-500 font-medium">{user.email}</td>
                        <td className="py-5 text-slate-500 font-medium">{user.phone || "Not set"}</td>
                        <td className="py-5 text-right pr-8 text-slate-400 font-medium">
                          {new Date(user.created_at).toLocaleDateString("en-MY", { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-16 text-center text-slate-500 font-semibold bg-slate-50">
                          No users found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              </BlurFade>
            </div>
            
          </div>
        </BlurFade>

        {/* The clean, extracted User Details Modal */}
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={clearSelectedUser}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}