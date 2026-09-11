import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Search,
} from 'lucide-react';

import {
  useBusinessListings,
  useCreateBusinessListing,
  useDeleteBusinessListing,
} from '../../hooks/useBusinessData';

export default function ListingsPage() {
  const navigate = useNavigate();

  // ============================================================
  // BUSINESS LISTINGS HOOK
  // ============================================================

  const {
    data,
    loading,
    error,
    fetchBusinessListings,
  } = useBusinessListings();

  // ============================================================
  // CREATE LISTING HOOK
  // ============================================================

  const {
    loading: creating,
    error: createError,
    createListing,
  } = useCreateBusinessListing();

  // ============================================================
  // DELETE LISTING HOOK
  // ============================================================

  const {
    loading: deleting,
    error: deleteError,
    deleteListing,
  } = useDeleteBusinessListing();

  // ============================================================
  // LOCAL UI STATE
  // ============================================================

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    base_price: '',
    estimated_duration: '',
  });

  // ============================================================
  // FETCH LISTINGS
  // ============================================================

  useEffect(() => {
    fetchBusinessListings();
  }, []);

  // ============================================================
  // FILTER LISTINGS
  // ============================================================

  const filteredListings = useMemo(() => {
    if (!data?.listings) {
      return [];
    }

    return data.listings.filter((listing) => {
      const matchesSearch =
        listing.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        listing.description
          .toLowerCase()
          .includes(search.toLowerCase());

      // Current backend does not provide a status field.
      const matchesStatus =
        statusFilter === 'All Status';

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  // ============================================================
  // CREATE LISTING
  // ============================================================

  const handleCreate = async (e:any) => {
    e.preventDefault();

    try {
      await createListing({
        name: form.name,
        description: form.description,
        base_price: Number(form.base_price),
        estimated_duration: Number(form.estimated_duration),
      });

      setForm({
        name: '',
        description: '',
        base_price: '',
        estimated_duration: '',
      });

      setShowCreateForm(false);

      await fetchBusinessListings();
    } catch (error) {
      console.error('Failed to create service:', error);
    }
  };

  // ============================================================
  // DELETE LISTING
  // ============================================================

  const handleDelete = async (id:any) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteListing(id);
      await fetchBusinessListings();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading services...
        </p>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 font-semibold">
          {error}
        </p>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="p-8 space-y-8">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
            Service Listings
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Create and manage the services offered by your business.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowCreateForm(!showCreateForm)
          }
          className="flex items-center justify-center gap-2 bg-rose-950 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-rose-900 transition"
        >
          <Plus size={18} />
          Add New Service
        </button>

      </div>

      {/* ========================================================
          CREATE FORM
      ======================================================== */}

      {showCreateForm && (
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Create New Service
          </h2>

          {createError && (
            <p className="text-sm text-red-600 mb-4">
              {createError}
            </p>
          )}

          <form
            onSubmit={handleCreate}
            className="space-y-4"
          >

            {/* SERVICE NAME */}

            <input
              type="text"
              placeholder="Service name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
            />

            {/* DESCRIPTION */}

            <textarea
              placeholder="Service description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
            />

            {/* PRICE & DURATION */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Base price"
                value={form.base_price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    base_price: e.target.value,
                  })
                }
                min="0"
                step="0.01"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
              />

              <input
                type="number"
                placeholder="Duration (minutes)"
                value={form.estimated_duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    estimated_duration: e.target.value,
                  })
                }
                min="1"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
              />

            </div>

            {/* FORM ACTIONS */}

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={creating}
                className="px-5 py-3 rounded-2xl bg-rose-950 text-white text-sm font-bold hover:bg-rose-900 disabled:opacity-50"
              >
                {creating
                  ? 'Creating...'
                  : 'Create Service'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowCreateForm(false)
                }
                className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ========================================================
          DELETE ERROR
      ======================================================== */}

      {deleteError && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">

          <p className="text-sm text-red-600">
            {deleteError}
          </p>

        </div>
      )}

      {/* ========================================================
          STATISTICS
      ======================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* TOTAL LISTINGS */}

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Total Listings
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-2">
            {data?.total_listings ?? 0}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Services created
          </p>

        </div>

        {/* ACTIVE LISTINGS */}

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Active Listings
          </p>

          <h2 className="text-3xl font-black text-green-600 mt-2">
            {data?.active_listings ?? 0}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Currently visible to customers
          </p>

        </div>

        {/* TOTAL BOOKINGS */}

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Total Bookings
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-2">
            {data?.listings?.reduce(
              (total, listing) =>
                total +
                Number(
                  listing.booking_count || 0
                ),
              0
            )}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            From all services
          </p>

        </div>

      </div>

      {/* ========================================================
          SEARCH & FILTER
      ======================================================== */}

      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-xl shadow-rose-950/5">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search services..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-300"
            />

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 outline-none"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

      </div>

      {/* ========================================================
          SERVICE LIST
      ======================================================== */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-bold text-slate-900">
            Your Services
          </h2>

          <span className="text-xs text-slate-400">
            Showing {filteredListings.length} of{' '}
            {data?.total_listings ?? 0} services
          </span>

        </div>

        {/* ======================================================
            LISTINGS
        ====================================================== */}

        {filteredListings.length > 0 ? (

          filteredListings.map((service) => (

            <div
              key={service.id}
              onClick={() =>
                navigate(
                  `/business/listings/${service.id}`
                )
              }
              className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:shadow-2xl transition cursor-pointer"
            >

              <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                {/* SERVICE ICON */}

                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center shrink-0">

                  <span className="text-2xl">
                    ❄️
                  </span>

                </div>

                {/* SERVICE DETAILS */}

                <div className="flex-1">

                  <div className="flex items-center gap-3 flex-wrap">

                    <h3 className="text-lg font-bold text-slate-900">
                      {service.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      Active
                    </span>

                  </div>

                  <p className="text-sm text-slate-400 mt-2">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mt-4">

                    {/* PRICE */}

                    <div>
                      <p className="text-xs text-slate-400">
                        Base Price
                      </p>

                      <p className="text-sm font-bold text-rose-950">
                        RM
                        {Number(
                          service.base_price
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* DURATION */}

                    <div>
                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        {service.estimated_duration}{' '}
                        mins
                      </p>
                    </div>

                    {/* BOOKINGS */}

                    <div>
                      <p className="text-xs text-slate-400">
                        Bookings
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        {service.booking_count}
                      </p>
                    </div>

                  </div>

                </div>

                {/* ==================================================
                    ACTION BUTTONS
                ================================================== */}

                <div className="flex items-center gap-2">

                  {/* VIEW DETAILS */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(
                        `/business/listings/${service.id}`
                      );
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    title="View Listing Details"
                  >
                    <Eye size={17} />
                  </button>

                  {/* EDIT LISTING */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(
                        `/business/listings/${service.id}`
                      );
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    title="Edit Listing"
                  >
                    <Pencil size={17} />
                  </button>

                  {/* DELETE LISTING */}

                  <button
                    type="button"
                    disabled={deleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(service.id);
                    }}
                    className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-50"
                    title="Delete Listing"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          /* EMPTY STATE */

          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-xl shadow-rose-950/5 text-center">

            <p className="text-sm text-slate-400">
              No services found.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}