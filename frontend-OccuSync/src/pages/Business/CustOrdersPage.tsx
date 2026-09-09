import {
  Eye,
} from 'lucide-react';

export default function CustomerOrdersPage() {

  const orders = [
    {
      id: '#ORD-9021',
      customer: 'Natas',
      service: 'Aircond Repair',
      date: '10 Sep 2026',
      amount: 'RM180.00',
      status: 'Pending Acceptance',
    },
    {
      id: '#ORD-8900',
      customer: 'Sarah',
      service: 'Chemical Cleaning',
      date: '11 Sep 2026',
      amount: 'RM250.00',
      status: 'Scheduled',
    },
    {
      id: '#ORD-8872',
      customer: 'Daniel',
      service: 'Aircond Installation',
      date: '8 Sep 2026',
      amount: 'RM450.00',
      status: 'Completed',
    },
  ];

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-extrabold text-rose-950">
          Customer Orders
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Track and manage all customer service orders.
        </p>

      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-xl shadow-rose-950/5 mb-6 flex flex-wrap gap-3">

        <button className="px-4 py-2 rounded-xl bg-rose-950 text-white text-sm font-semibold">
          All Orders
        </button>

        <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200">
          Pending
        </button>

        <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200">
          Scheduled
        </button>

        <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200">
          Completed
        </button>

      </div>

      {/* ORDERS */}
      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xl shadow-rose-950/5"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <span className="font-black text-rose-950">
                    {order.id}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">
                  {order.service}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Customer: {order.customer}
                </p>

                <p className="text-sm text-slate-400">
                  Appointment: {order.date}
                </p>

              </div>

              <div className="flex items-center gap-6">

                <div className="text-right">

                  <p className="text-xs uppercase font-bold text-slate-400">
                    Order Value
                  </p>

                  <p className="text-xl font-black text-rose-950">
                    {order.amount}
                  </p>

                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950 text-white text-sm font-bold hover:bg-rose-900">

                  <Eye size={16} />

                  Manage

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}