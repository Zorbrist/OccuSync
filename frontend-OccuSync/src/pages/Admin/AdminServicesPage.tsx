// pages/Admin/AdminServicesPage.tsx
import { useEffect, useState } from "react";
import { Search, Layers, Briefcase, Clock } from "lucide-react";
import { getAllServices } from "../../services/adminService";

import { BlurFade } from "../../ui/blur-fade";
import { Particles } from "../../ui/particles";

type Service = {
  id: string | number;
  name: string;
  description?: string;
  business_name: string;
  base_price: number | string;
  estimated_duration: number;
  created_at: string;
};

function useAdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllServices();
      setServices(Array.isArray(data) ? data : data.services ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  loadServices();
}, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredServices = services.filter((service) =>
    `${service.name} ${service.business_name}`.toLowerCase().includes(normalizedSearch),
  );

  return { services: filteredServices, loading, error, search, changeSearch: setSearch };
}

export default function AdminServicesPage() {
  const { services, loading, error, search, changeSearch } = useAdminServices();

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-16 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Platform Services</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Monitor business service directory
              </p>
            </div>
           
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Controls Row: Search */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  placeholder="Search services or business..."
                  className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            {/* Table Area */}
            <div className={`overflow-x-auto overflow-y-auto max-h-[500px] bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex-1 ${scrollbarClasses}`}>
              <BlurFade delay={0.3}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-8 h-8 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-semibold text-sm">Loading service directory...</p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-64 text-red-500 font-semibold text-sm bg-red-50/50">
                    {error}
                  </div>
                ) : (
                  <table className="w-full text-left min-w-[900px]">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                        <th className="py-5 pl-8 bg-white rounded-tl-[1.5rem]">Service Overview</th>
                        <th className="py-5 bg-white">Provider</th>
                        <th className="py-5 bg-white">Base Price</th>
                        <th className="py-5 bg-white">Duration</th>
                        <th className="py-5 text-right pr-8 bg-white rounded-tr-[1.5rem]">Date Listed</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {services.map((service) => (
                        <tr
                          key={service.id}
                          className="hover:bg-slate-50 transition-colors border-b border-slate-100 group"
                        >
                          {/* Service Details */}
                          <td className="py-5 pl-8">
                            <p className="font-bold text-[#0F172A] group-hover:text-violet-700 transition-colors">
                              {service.name}
                            </p>
                            <p className="text-[11px] font-medium text-slate-500 mt-1 truncate max-w-sm">
                              {service.description || "No description provided"}
                            </p>
                          </td>
                          
                          {/* Business Name */}
                          <td className="py-5 text-slate-600 font-semibold">
                            <div className="flex items-center gap-2">
                              <Briefcase size={14} className="text-slate-400" />
                              <span className="truncate max-w-[150px]">{service.business_name}</span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-5">
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 font-bold text-[11px] tracking-wider">
                              RM {Number(service.base_price).toFixed(2)}
                            </span>
                          </td>

                          {/* Duration */}
                          <td className="py-5 text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} className="text-slate-400" />
                              {service.estimated_duration} mins
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-5 text-right pr-8 text-slate-400 font-medium">
                            {new Date(service.created_at).toLocaleDateString("en-MY", { 
                              day: 'numeric', month: 'short', year: 'numeric' 
                            })}
                          </td>
                        </tr>
                      ))}
                      {services.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-slate-500 font-semibold bg-slate-50">
                            No services found matching your criteria.
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
      </div>
    </div>
  );
}