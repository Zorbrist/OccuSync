import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Pencil,
  Trash2,
  DollarSign
} from 'lucide-react';

import {
  useBusinessListingDetails,
  useUpdateBusinessListing,
  useDeleteBusinessListing,
} from '../../hooks/useBusinessData';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, fetchBusinessListingDetails } = useBusinessListingDetails();
  const { loading: updating, error: updateError, updateListing } = useUpdateBusinessListing();
  const { loading: deleting, error: deleteError, deleteListing } = useDeleteBusinessListing();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    base_price: '',
    estimated_duration: '',
  });

  useEffect(() => {
    if (!id) return;
    const listingId = Number(id);
    if (Number.isNaN(listingId)) return;
    fetchBusinessListingDetails(listingId);
  }, [id]);

  useEffect(() => {
    if (!data) return;
    setForm({
      name: data.name || '',
      description: data.description || '',
      base_price: data.base_price || '',
      estimated_duration: data.estimated_duration || '',
    });
  }, [data]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateListing(Number(id), {
        name: form.name,
        description: form.description,
        base_price: Number(form.base_price),
        estimated_duration: Number(form.estimated_duration),
      });
      await fetchBusinessListingDetails(Number(id));
      setEditing(false);
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (!confirmed) return;
    try {
      await deleteListing(Number(id));
      navigate('/business/listings');
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 flex items-center justify-center h-64">
        <p className="text-slate-500 font-medium">Loading service details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 space-y-6">
        <button
          onClick={() => navigate('/business/listings')}
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#FFFFFF] shadow-sm text-sm text-slate-500 hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Services
        </button>
        <p className="font-medium text-red-400">{error || 'Service not found.'}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 lg:px-10 pb-12 space-y-8">

      {/* BACK NAVIGATION */}
      <button
        onClick={() => navigate('/business/listings')}
        className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#FFFFFF] shadow-sm text-sm text-slate-500 hover:text-[#1E293B] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Services
      </button>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#1E293B]">
              {data.name}
            </h1>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Active
            </span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-3">
            Service ID: {data.id}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors"
            title="Edit Details"
          >
            <Pencil size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
            title="Delete Service"
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* UPDATE FORM */}
      {editing && (
        <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
          <h2 className="text-xl font-semibold text-[#1E293B] mb-6">Edit Service Details</h2>
          
          {(updateError || deleteError) && (
            <p className="text-sm text-red-400 mb-4">{updateError || deleteError}</p>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Service name"
              required
              className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Service description"
              required
              rows={5}
              className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                placeholder="Base price"
                min="0"
                step="0.01"
                required
                className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
              />
              <input
                type="number"
                value={form.estimated_duration}
                onChange={(e) => setForm({ ...form, estimated_duration: e.target.value })}
                placeholder="Duration (minutes)"
                min="1"
                required
                className="w-full bg-[#F1F5F9] border-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[1rem] px-4 py-3 text-sm text-[#1E293B] outline-none focus:ring-1 focus:ring-slate-200 transition-shadow"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 rounded-[1rem] bg-[#000000] text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-2.5 rounded-[1rem] bg-[#F1F5F9] text-slate-500 text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MAIN CONTENT PANEL */}
      {!editing && (
        <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 lg:p-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] space-y-6">
          
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Service Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* DESCRIPTION CARD (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 bg-[#FFFFFF] rounded-[1.5rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)]">
              <h2 className="text-xl font-semibold text-[#1E293B]">Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 whitespace-pre-wrap">
                {data.description || 'No description available.'}
              </p>
            </div>

            {/* METRICS COLUMN */}
            <div className="space-y-6">
              
              <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex items-start gap-4">
                <div className="text-slate-400 mt-0.5">
                  <DollarSign size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Base Price</p>
                  <p className="mt-1 text-2xl font-semibold text-[#1E293B]">
                    RM{Number(data.base_price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex items-start gap-4">
                <div className="text-slate-400 mt-0.5">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Duration</p>
                  <p className="mt-1 text-2xl font-semibold text-[#1E293B]">
                    {data.estimated_duration} <span className="text-sm font-medium text-slate-400">mins</span>
                  </p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_8px_24px_rgba(149,157,165,0.1)] flex items-start gap-4">
                <div className="text-slate-400 mt-0.5">
                  <CalendarDays size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Bookings</p>
                  <p className="mt-1 text-2xl font-semibold text-[#1E293B]">
                    {Number(data.booking_count || 0)}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}