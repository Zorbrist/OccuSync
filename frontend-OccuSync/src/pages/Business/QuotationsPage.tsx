import {
  Eye,
} from 'lucide-react';

export default function QuotationsPage() {

  const quotations = [
    {
      id: '#QUO-1021',
      customer: 'Natas',
      service: 'Aircond Repair',
      amount: 'RM180.00',
      status: 'Pending',
      date: 'Today',
    },
    {
      id: '#QUO-1018',
      customer: 'Sarah',
      service: 'Chemical Cleaning',
      amount: 'RM250.00',
      status: 'Accepted',
      date: 'Yesterday',
    },
    {
      id: '#QUO-1012',
      customer: 'Daniel',
      service: 'Aircond Installation',
      amount: 'RM450.00',
      status: 'Rejected',
      date: '2 days ago',
    },
  ];

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-extrabold text-rose-950">
          Quotations
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Create and manage quotations sent to customers.
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs font-bold uppercase text-slate-400">
            Pending
          </p>

          <p className="text-3xl font-black text-amber-500 mt-2">
            4
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs font-bold uppercase text-slate-400">
            Accepted
          </p>

          <p className="text-3xl font-black text-green-600 mt-2">
            12
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <p className="text-xs font-bold uppercase text-slate-400">
            Total Value
          </p>

          <p className="text-3xl font-black text-rose-950 mt-2">
            RM4,820
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5 overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <h2 className="font-bold text-lg">
            Recent Quotations
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-left text-xs uppercase text-slate-400">

                <th className="px-6 py-4">
                  Quotation
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Service
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {quotations.map((quotation) => (

                <tr key={quotation.id} className="hover:bg-slate-50">

                  <td className="px-6 py-5 font-bold text-rose-950">
                    {quotation.id}
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {quotation.customer}
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {quotation.service}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {quotation.amount}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        quotation.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : quotation.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {quotation.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <button className="flex items-center gap-2 text-xs font-bold text-rose-950">

                      <Eye size={16} />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}