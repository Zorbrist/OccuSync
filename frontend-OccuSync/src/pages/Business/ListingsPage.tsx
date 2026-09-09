import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MoreVertical,
} from 'lucide-react';

export default function ListingsPage() {

  const services = [
    {
      id: 1,
      name: 'Aircond Repair',
      category: 'Repair & Maintenance',
      description: 'General air conditioning repair and troubleshooting.',
      price: 'RM80 - RM250',
      bookings: 24,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Chemical Cleaning',
      category: 'Cleaning',
      description: 'Deep chemical cleaning for residential air conditioners.',
      price: 'RM120 - RM350',
      bookings: 18,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Aircond Installation',
      category: 'Installation',
      description: 'Professional installation for new air conditioning units.',
      price: 'RM250 - RM600',
      bookings: 12,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Aircond Gas Refill',
      category: 'Repair & Maintenance',
      description: 'Air conditioning gas refill and pressure inspection.',
      price: 'RM90 - RM180',
      bookings: 9,
      status: 'Inactive',
    },
  ];

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

        <button className="flex items-center justify-center gap-2 bg-rose-950 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-rose-900 transition">

          <Plus size={18} />

          Add New Service

        </button>

      </div>


      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Total Listings
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-2">
            8
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Services created
          </p>

        </div>


        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Active Listings
          </p>

          <h2 className="text-3xl font-black text-green-600 mt-2">
            7
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Currently visible to customers
          </p>

        </div>


        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Total Bookings
          </p>

          <h2 className="text-3xl font-black text-rose-950 mt-2">
            63
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
              placeholder="Search services..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-rose-300"
            />

          </div>


          {/* CATEGORY */}
          <select className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 outline-none">

            <option>
              All Categories
            </option>

            <option>
              Repair & Maintenance
            </option>

            <option>
              Cleaning
            </option>

            <option>
              Installation
            </option>

          </select>


          {/* STATUS */}
          <select className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 outline-none">

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
            Showing 4 of 8 services
          </span>

        </div>


        {services.map((service) => (

          <div
            key={service.id}
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

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      service.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {service.status}
                  </span>

                </div>

                <p className="text-xs font-semibold text-rose-950 mt-1">
                  {service.category}
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  {service.description}
                </p>


                <div className="flex flex-wrap items-center gap-6 mt-4">

                  <div>

                    <p className="text-xs text-slate-400">
                      Price Range
                    </p>

                    <p className="text-sm font-bold text-rose-950">
                      {service.price}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Bookings
                    </p>

                    <p className="text-sm font-bold text-slate-900">
                      {service.bookings}
                    </p>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}
              <div className="flex items-center gap-2">

                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
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

        ))}

      </div>

    </div>
  );
}