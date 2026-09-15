import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, CalendarPlus, Phone } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

export const getBusinessInquiries = async (): Promise<any[]> => {
  const response = await axiosInstance.get('/business/inquiries');

  // Axios automatically parses the JSON and stores it in the 'data' property
  return response.data;
};

const getInquiryStatusClasses = (status: string) => {
  switch (status) {
    case "NONE":
      return "bg-zinc-100 text-zinc-700";

    case "PENDING":
      return "bg-amber-100 text-amber-700";

    case "PROPOSED":
      return "bg-violet-100 text-violet-700";

    case "ACCEPTED":
      return "bg-emerald-100 text-emerald-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
};

export default function InquiriesPage() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBusinessInquiries()
      .then(setInquiries)
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 min-h-full bg-slate-50">
        <p className="text-slate-500">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-full bg-slate-50">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
          Customer Inquiries
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Review formal service requests and send proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.inquiry_id}
            className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5 md:flex-row md:items-center transition hover:border-rose-300"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getInquiryStatusClasses(
                    inquiry.status
                  )}`}
                >
                  {inquiry.status}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {inquiry.service_name}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-rose-950">
                  <MessageSquare size={16} className="text-rose-400" />
                  {inquiry.first_name} {inquiry.last_name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={14} className="text-slate-400" />
                  {inquiry.phone}
                </span>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm italic text-slate-600">
                  "{inquiry.message}"
                </p>
              </div>
            </div>

            {inquiry.status === 'PENDING' && (
              <button
                onClick={() => navigate(`/business/proposals/new?inquiryId=${inquiry.inquiry_id}&customerName=${inquiry.first_name} ${inquiry.last_name}&phone=${inquiry.phone}&message=${encodeURIComponent(inquiry.message)}`)}
                className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-rose-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-900"
              >
                <CalendarPlus size={16} /> Propose Date
              </button>
            )}
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">
            <p className="text-sm text-slate-400">No active inquiries at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}