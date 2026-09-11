import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Pencil,
  Trash2,
} from 'lucide-react';

import {
  useBusinessListingDetails,
  useUpdateBusinessListing,
  useDeleteBusinessListing,
} from '../../hooks/useBusinessData';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    fetchBusinessListingDetails,
  } = useBusinessListingDetails();

  const {
    loading: updating,
    error: updateError,
    updateListing,
  } = useUpdateBusinessListing();

  const {
    loading: deleting,
    error: deleteError,
    deleteListing,
  } = useDeleteBusinessListing();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    base_price: '',
    estimated_duration: '',
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    const listingId = Number(id);

    if (Number.isNaN(listingId)) {
      return;
    }

    fetchBusinessListingDetails(listingId);
  }, [id]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setForm({
      name: data.name || '',
      description: data.description || '',
      base_price: data.base_price || '',
      estimated_duration: data.estimated_duration || '',
    });
  }, [data]);

  const handleUpdate = async (e:any) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    const listingId = Number(id);

    try {
      await updateListing(listingId, {
        name: form.name,
        description: form.description,
        base_price: Number(form.base_price),
        estimated_duration: Number(form.estimated_duration),
      });

      await fetchBusinessListingDetails(listingId);

      setEditing(false);
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteListing(Number(id));
      navigate('/business/listings');
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading service details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate('/business/listings')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Services
        </button>

        <p className="font-semibold text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate('/business/listings')}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Services
        </button>

        <p className="text-slate-500">
          Service not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/business/listings')}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Services
      </button>

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800">
              {data.name}
            </h1>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Active
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Service ID: {data.id}
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={17} />
            {editing ? 'Cancel' : 'Edit'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 size={17} />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>

        </div>

      </div>

      {/* UPDATE FORM */}
      {editing && (
        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Edit Service
          </h2>

          {updateError && (
            <p className="text-sm text-red-600 mb-4">
              {updateError}
            </p>
          )}

          {deleteError && (
            <p className="text-sm text-red-600 mb-4">
              {deleteError}
            </p>
          )}

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Service name"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Service description"
              required
              rows={5}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="number"
                value={form.base_price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    base_price: e.target.value,
                  })
                }
                placeholder="Base price"
                min="0"
                step="0.01"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
              />

              <input
                type="number"
                value={form.estimated_duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    estimated_duration: e.target.value,
                  })
                }
                placeholder="Duration (minutes)"
                min="1"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-rose-300"
              />

            </div>

            <button
              type="submit"
              disabled={updating}
              className="px-5 py-3 rounded-2xl bg-rose-950 text-white text-sm font-bold hover:bg-rose-900 disabled:opacity-50"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>

          </form>
        </div>
      )}

      {/* DESCRIPTION */}
      {!editing && (
        <div className="rounded-xl border bg-white p-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Service Description
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {data.description || 'No description available.'}
          </p>

        </div>
      )}

      {/* SERVICE INFORMATION */}
      {!editing && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* PRICE */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <span className="font-bold">
                  RM
                </span>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Base Price
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  RM{Number(data.base_price).toLocaleString()}
                </p>
              </div>

            </div>
          </div>

          {/* DURATION */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Clock size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Estimated Duration
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {data.estimated_duration} mins
                </p>
              </div>

            </div>
          </div>

          {/* BOOKINGS */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Bookings
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {Number(data.booking_count || 0)}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}