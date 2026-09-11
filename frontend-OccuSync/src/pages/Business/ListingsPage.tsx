import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MoreVertical,
} from 'lucide-react';

import { useBusinessListings } from '../../hooks/useBusinessData';



export default function ListingsPage() {

  /* ========================= */
  /* HOOK */
  /* ========================= */

  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    fetchBusinessListings,
  } = useBusinessListings();


  /* ========================= */
  /* LOCAL UI STATE */
  /* ========================= */

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState('All Status');


  /* ========================= */
  /* FETCH LISTINGS */
  /* ========================= */

  useEffect(() => {

    fetchBusinessListings();

  }, []);


  /* ========================= */
  /* FILTER LISTINGS */
  /* ========================= */

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


      /*
       * Your current backend response does not contain
       * a status field.
       *
       * Therefore, status filtering cannot be fully
       * implemented until the backend returns status.
       */

      const matchesStatus =
        statusFilter === 'All Status';


      return matchesSearch && matchesStatus;

    });

  }, [data, search, statusFilter]);


  /* ========================= */
  /* LOADING */
  /* ========================= */

  if (loading) {

    return (
      <div className="p-8">

        <p className="text-slate-500">
          Loading services...
        </p>

      </div>
    );

  }


  /* ========================= */
  /* ERROR */
  /* ========================= */

  if (error) {

    return (
      <div className="p-8">

        <p className="text-red-600 font-semibold">
          {error}
        </p>

      </div>
    );

  }


  /* ========================= */
  /* PAGE */
  /* ========================= */

  return (

    <div className="p-8 space-y-8">


      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

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
          className="flex items-center justify-center gap-2 bg-rose-950 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-rose-900 transition"
        >

          <Plus size={18} />

          Add New Service

        </button>

      </div>


      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

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
                total + Number(listing.booking_count || 0),
              0
            )}

          </h2>

          <p className="text-xs text-slate-400 mt-1">
            From all services
          </p>

        </div>

      </div>


      {/* ========================= */}
      {/* SEARCH & FILTER */}
      {/* ========================= */}

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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-300"
            />

          </div>


          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 outline-none"
          >

            <option>
              All Status
            </option>

            <option>
              Active
            </option>

            <option>
              Inactive
            </option>

          </select>

        </div>

      </div>


      {/* ========================= */}
      {/* SERVICE LIST */}
      {/* ========================= */}

      <div className="space-y-4">


        <div className="flex items-center justify-between">

          <h2 className="text-lg font-bold text-slate-900">
            Your Services
          </h2>

          <span className="text-xs text-slate-400">
            Showing {filteredListings.length} of {data?.total_listings ?? 0} services
          </span>

        </div>


        {/* ========================= */}
        {/* LISTINGS */}
        {/* ========================= */}

        {filteredListings.length > 0 ? (

          filteredListings.map((service) => (

            <div
              key={service.id}
              onClick={() => navigate(`/business/listings/${service.id}`)}
              className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5 hover:shadow-2xl transition"
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
                        RM{Number(service.base_price).toLocaleString()}
                      </p>

                    </div>


                    {/* DURATION */}

                    <div>

                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="text-sm font-bold text-slate-900">
                        {service.estimated_duration} mins
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


                {/* ACTIONS */}

                <div className="flex items-center gap-2">


                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                    onClick={() => navigate(`/business/listings/${service.id}`)}
                  >

                    <Pencil size={15} />

                    Edit

                  </button>


                  <button
                    className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100"
                  >

                    <Trash2 size={17} />

                  </button>


                  <button
                    className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500"
                  >

                    <MoreVertical size={17} />

                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

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