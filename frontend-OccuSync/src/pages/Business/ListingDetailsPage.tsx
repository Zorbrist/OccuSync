import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Pencil,
  Trash2,
} from 'lucide-react';

import { useBusinessListingDetails } from '../../hooks/useBusinessData';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ============================================================
  // LISTING DETAILS DATA
  // ============================================================

  const {
    data,
    loading,
    error,
    fetchBusinessListingDetails,
  } = useBusinessListingDetails();

  // ============================================================
  // FETCH LISTING DETAILS
  // ============================================================

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

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading service details...
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
        <button
          onClick={() =>
            navigate('/business/listings')
          }
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

  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (!data) {
    return (
      <div className="p-8">

        <button
          onClick={() =>
            navigate('/business/listings')
          }
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

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="p-8 space-y-8">

      {/* ========================================================
          BACK BUTTON
      ======================================================== */}

      <button
        onClick={() =>
          navigate('/business/listings')
        }
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Services
      </button>

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-bold text-slate-800">
              {data.name}
            </h1>

            {/* Current backend treats every
                listing as active */}

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Active
            </span>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            Service ID: {data.id}
          </p>

        </div>

        {/* ======================================================
            ACTIONS
        ====================================================== */}

        <div className="flex gap-2">

          <button
            type="button"
            onClick={() => {
              // Connect to update page/modal once the
              // exact update route is confirmed.
              console.log(
                'Edit listing:',
                data.id
              );
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={17} />
            Edit
          </button>

          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-300"
            title="Delete service - backend connection pending"
          >
            <Trash2 size={17} />
            Delete
          </button>

        </div>

      </div>

      {/* ========================================================
          DESCRIPTION
      ======================================================== */}

      <div className="rounded-xl border bg-white p-6">

        <h2 className="text-lg font-semibold text-slate-800">
          Service Description
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          {data.description ||
            'No description available.'}
        </p>

      </div>

      {/* ========================================================
          SERVICE INFORMATION
      ======================================================== */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Price */}

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
                RM
                {Number(
                  data.base_price
                ).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

        {/* Duration */}

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

        {/* Bookings */}

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
                {Number(
                  data.booking_count || 0
                )}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}