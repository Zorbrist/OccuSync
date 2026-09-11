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


// ============================================================
// LISTING - VIEW SERVICE DETAILS
// ============================================================
// Displays the details of one specific service.
//
// Example URL:
// /business/listings/1
//
// The "1" is the service ID.
// ============================================================

export default function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();


  // ==========================================================
  // HOOK
  // ==========================================================
  // Handles the API request and stores the service data.
  // ==========================================================

  const {
    data,
    loading,
    error,
    fetchBusinessListingDetails,
  } = useBusinessListingDetails();


  // ==========================================================
  // FETCH SERVICE DETAILS
  // ==========================================================
  // Runs when the page loads.
  //
  // Example:
  // id = "1"
  //
  // GET /business/listings/1
  // ==========================================================

  useEffect(() => {
    if (id) {
      fetchBusinessListingDetails(Number(id));
    }
  }, [id]);


  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading service details...
        </p>
      </div>
    );
  }


  // ==========================================================
  // ERROR STATE
  // ==========================================================

  if (error) {
    return (
      <div className="p-8">
        <p className="font-semibold text-red-600">
          {error}
        </p>
      </div>
    );
  }


  // ==========================================================
  // SERVICE NOT FOUND
  // ==========================================================

  if (!data) {
    return (
      <div className="p-8">
        <p className="text-slate-400">
          Service not found.
        </p>
      </div>
    );
  }


  // ==========================================================
  // SERVICE DETAILS PAGE
  // ==========================================================

  return (
    <div className="space-y-8 p-8">

      {/* ======================================================
          BACK TO LISTINGS
          ====================================================== */}

      <button
        onClick={() => navigate('/business/listings')}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-950"
      >
        <ArrowLeft size={17} />

        Back to Listings
      </button>


      {/* ======================================================
          SERVICE HEADER
          ====================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex flex-wrap items-center gap-3">

            {/* Service name */}

            <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
              {data.name}
            </h1>


            {/* Service status */}

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Active
            </span>

          </div>


          {/* Service ID */}

          <p className="mt-2 text-sm text-slate-400">
            Service ID: #{data.id}
          </p>

        </div>


        {/* ==================================================
            SERVICE ACTIONS
            ================================================== */}

        <div className="flex items-center gap-2">

          {/* Edit service */}

          <button
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
          >
            <Pencil size={15} />

            Edit
          </button>


          {/* Delete service */}

          <button
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-100"
          >
            <Trash2 size={15} />

            Delete
          </button>

        </div>

      </div>


      {/* ======================================================
          SERVICE INFORMATION
          ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ====================================================
            SERVICE DESCRIPTION
            ==================================================== */}

        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-xl shadow-rose-950/5 lg:col-span-2">

          <h2 className="text-lg font-bold text-slate-900">
            Service Description
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            {data.description}
          </p>

        </div>


        {/* ====================================================
            SERVICE DETAILS
            ==================================================== */}

        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-xl shadow-rose-950/5">

          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Service Information
          </h2>


          {/* Base price */}

          <div className="flex items-center justify-between border-b border-slate-100 py-4">

            <span className="text-sm text-slate-400">
              Base Price
            </span>

            <span className="text-lg font-black text-rose-950">
              RM{Number(data.base_price).toLocaleString()}
            </span>

          </div>


          {/* Estimated duration */}

          <div className="flex items-center justify-between border-b border-slate-100 py-4">

            <div className="flex items-center gap-2">

              <Clock
                size={16}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-400">
                Duration
              </span>

            </div>

            <span className="text-sm font-bold text-slate-900">
              {data.estimated_duration} mins
            </span>

          </div>


          {/* Total bookings */}

          <div className="flex items-center justify-between py-4">

            <div className="flex items-center gap-2">

              <CalendarDays
                size={16}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-400">
                Bookings
              </span>

            </div>

            <span className="text-sm font-bold text-slate-900">
              {data.booking_count}
            </span>

          </div>

        </div>

      </div>


      {/* ======================================================
          BOOKING SUMMARY
          ====================================================== */}

      <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-xl shadow-rose-950/5">

        <h2 className="text-lg font-bold text-slate-900">
          Booking Summary
        </h2>


        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">


          {/* Total bookings */}

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Bookings
            </p>

            <p className="mt-2 text-3xl font-black text-rose-950">
              {data.booking_count}
            </p>

          </div>


          {/* Base price */}

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Base Price
            </p>

            <p className="mt-2 text-3xl font-black text-rose-950">
              RM{Number(data.base_price).toLocaleString()}
            </p>

          </div>


          {/* Duration */}

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Duration
            </p>

            <p className="mt-2 text-3xl font-black text-rose-950">

              {data.estimated_duration}

              <span className="ml-1 text-sm font-bold text-slate-400">
                mins
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}