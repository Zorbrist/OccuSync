import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getAllServices } from "../../services/adminService";

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

  return (
    <div className="min-h-screen space-y-6 bg-zinc-950 p-6 text-zinc-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Services</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Monitor all services provided by business owners across the platform.
        </p>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search services or business..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-10 pr-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 transition focus:border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.03)]"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Platform Services</h2>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-zinc-500">Loading services...</div>
        ) : error ? (
          <div className="px-6 py-10 text-center text-sm text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/70 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-6 py-3">Service Name</th>
                  <th className="px-6 py-3">Business</th>
                  <th className="px-6 py-3">Base Price (RM)</th>
                  <th className="px-6 py-3">Est. Duration</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {services.map((service) => (
                  <tr key={service.id} className="transition-colors hover:bg-violet-500/5">
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-100">{service.name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500 truncate max-w-xs">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-medium">
                      {service.business_name}
                    </td>
                    <td className="px-6 py-4 text-violet-300 font-semibold">
                      {Number(service.base_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {service.estimated_duration} mins
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">
                      {new Date(service.created_at).toLocaleDateString("en-MY")}
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-500">
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}