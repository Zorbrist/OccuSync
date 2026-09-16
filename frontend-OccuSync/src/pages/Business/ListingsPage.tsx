import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '@/ui/blur-fade';

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Search,
  Briefcase
} from 'lucide-react';

import {
  useBusinessListings,
  useCreateBusinessListing,
  useDeleteBusinessListing,
} from '../../hooks/useBusinessData';

export default function ListingsPage() {
  const navigate = useNavigate();

  const { data, loading, error, fetchBusinessListings } = useBusinessListings();
  const { loading: creating, error: createError, createListing } = useCreateBusinessListing();
  const { loading: deleting, error: deleteError, deleteListing } = useDeleteBusinessListing();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    base_price: '',
    estimated_duration: '',
  });

  useEffect(() => {
    fetchBusinessListings();
  }, []);

  const filteredListings = useMemo(() => {
    if (!data?.listings) return [];
    return data.listings.filter((listing) => {
      const matchesSearch =
        listing.name.toLowerCase().includes(search.toLowerCase()) ||
        listing.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All Status';
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      await createListing({
        name: form.name,
        description: form.description,
        base_price: Number(form.base_price),
        estimated_duration: Number(form.estimated_duration),
      });
      setForm({ name: '', description: '', base_price: '', estimated_duration: '' });
      setShowCreateForm(false);
      await fetchBusinessListings();
    } catch (error) {
      console.error('Failed to create service:', error);
    }
  };

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (!confirmed) return;
    try {
      await deleteListing(id);
      await fetchBusinessListings();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 flex items-center justify-center h-64">
        <p className="text-slate-500 font-medium">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10">
        <p className="text-red-400 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <BlurFade delay={0.3}>
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 pb-12 space-y-8">


        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1E293B]">
              Service Listings
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-2">
              Manage business offerings
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center justify-center gap-2 bg-[#000000] text-white px-6 py-2.5 rounded-[1rem] text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Service
          </button>
        </div>


        {/* CREATE FORM */}
        {showCreateForm && (
          <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-6">Create New Service</h2>
            {createError && <p className="text-sm text-red-400 mb-4">{createError}</p>}

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Service name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
              />
              <textarea
                placeholder="Service description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Base price (RM)"
                  value={form.base_price}
                  onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                  min="0"
                  step="0.01"
                  required
                  className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={form.estimated_duration}
                  onChange={(e) => setForm({ ...form, estimated_duration: e.target.value })}
                  min="1"
                  required
                  className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-[1rem] bg-[#000000] text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2.5 rounded-[1rem] bg-[#F1F5F9] text-slate-500 text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {deleteError && (
          <p className="text-sm text-red-400 font-medium px-4">{deleteError}</p>
        )}

        {/* STATISTICS PANEL */}
        <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)]">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Listing Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Listings</p>
              <h2 className="text-3xl font-semibold text-[#1E293B] mt-3">{data?.total_listings ?? 0}</h2>
            </div>
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Listings</p>
              <h2 className="text-3xl font-semibold text-[#1E293B] mt-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                {data?.active_listings ?? 0}
              </h2>
            </div>
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Bookings</p>
              <h2 className="text-3xl font-semibold text-[#1E293B] mt-3">
                {data?.listings?.reduce((total, listing) => total + Number(listing.booking_count || 0), 0)}
              </h2>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-[#FFFFFF] rounded-[1.5rem] p-4 lg:p-5 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] py-3 pl-11 pr-4 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-5 py-3 text-sm text-slate-500 outline-none focus:ring-1 focus:ring-slate-200"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* SERVICE LIST */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-semibold text-[#1E293B]">Your Services</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {filteredListings.length} of {data?.total_listings ?? 0}
            </span>
          </div>

          {filteredListings.length > 0 ? (
            <div className="space-y-4">
              {filteredListings.map((service) => (
                <div
                  key={service.id}
                  onClick={() => navigate(`/business/listings/${service.id}`)}
                  className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                    <div className="w-16 h-16 rounded-[1rem] bg-[#F1F5F9] shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 text-slate-400">
                      <Briefcase size={24} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#1E293B]">{service.name}</h3>
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">{service.description}</p>

                      <div className="flex flex-wrap items-center gap-8 mt-4">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Base Price</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">RM{Number(service.base_price).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Duration</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">{service.estimated_duration} mins</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Bookings</p>
                          <p className="text-sm font-medium text-[#1E293B] mt-0.5">{service.booking_count}</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/business/listings/${service.id}`); }}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); navigate(`/business/listings/${service.id}`); }}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        disabled={deleting}
                        onClick={(e) => { e.stopPropagation(); handleDelete(service.id); }}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] rounded-[1.5rem] p-10 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] text-center flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </BlurFade>
  );
}