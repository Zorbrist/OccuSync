import { useState, useEffect, useMemo } from "react";
import { getAllServices } from "../../services/adminService";
import type { AdminService } from "../../types/adminType";

export const useAdminServices = () => {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getAllServices();
        setServices(data.services);
      } catch (err) {
        setError("Failed to load platform services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.business_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  return {
    services: filteredServices,
    loading,
    error,
    search,
    changeSearch: setSearch,
  };
};