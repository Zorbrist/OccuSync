import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Phone, Send, CalendarDays, Briefcase } from 'lucide-react';
import { sendOrderProposal, toggleDateAvailability } from '../../services/businessService';
// Import your existing hooks
import { useBusinessOrders } from '../../hooks/useBusinessData';

export default function OrderProposalPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const inquiryId = searchParams.get('inquiryId') || '';
  const customerName = searchParams.get('customerName') || 'Customer';
  const customerPhone = searchParams.get('phone') || 'No phone provided';
  const inquiryMessage = searchParams.get('message') || '';

  // NEW: Fetch existing jobs to display on the calendar
  const { data: orders, fetchBusinessOrders } = useBusinessOrders();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch active orders when the page loads
    fetchBusinessOrders('CONFIRMED'); 
  }, []);

 const handlePropose = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inquiryId) {
    setError('This proposal is missing its inquiry. Please open it from the inquiries page.');
    return;
  }

  if (!date || !time) {
    setError('Please select a proposed date and time.');
    return;
  }

  setLoading(true);
  setError(''); // Clear any previous errors

  try {
    await sendOrderProposal({
      inquiry_id: Number(inquiryId),
      proposed_date: date,
      proposed_time: time,
      notes,
    });
    navigate('/business/inquiries');
  } catch (err: any) {
    // Safely catch and set the error message from Axios
    setError(
      err.response?.data?.message || 
      err.message || 
      'Failed to send order proposal. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};

  const handleToggleDay = async (dateStr: string) => {
    const currentStatus = availabilityMap[dateStr] ?? true; 
    const newStatus = !currentStatus;

    setAvailabilityMap((prev) => ({
      ...prev,
      [dateStr]: newStatus,
    }));

    await toggleDateAvailability(dateStr, newStatus);
  };

  // Calendar generation helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value);
    setCurrentMonth(new Date(year, newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setCurrentMonth(new Date(newYear, month, 1));
  };

  const currentYearNum = new Date().getFullYear();
  const yearsList = Array.from({ length: 12 }, (_, i) => currentYearNum + i);

  // NEW: Helper function to count jobs on a specific date
  const getJobCountForDate = (dateStr: string) => {
    if (!orders) return 0;
    // Assuming 'date' from the backend is formatted as 'YYYY-MM-DD' or starts with it
    return orders.filter(order => {
      const orderDate = (order as typeof order & { date?: string }).date;
      return orderDate?.startsWith(dateStr) ?? false;
    }).length;
  };

  return (
    <div className="min-h-full bg-slate-50 p-8 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
        Draft Order Proposal
      </h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Proposal Form */}
        <form onSubmit={handlePropose} className="space-y-5 rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5 xl:col-span-2">
          {/* ... [Keep your existing form inputs here] ... */}
          <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
            Scheduling Details
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Date</label>
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none transition focus:border-rose-300" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Time</label>
              <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none transition focus:border-rose-300" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">Message to Customer</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-rose-300" />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-950 py-3 font-bold text-white transition hover:bg-rose-900 disabled:opacity-50">
            <Send size={16} /> {loading ? 'Sending Proposal...' : 'Send Proposal'}
          </button>
        </form>

        {/* Customer Info Card */}
        <div className="h-fit rounded-3xl bg-gradient-to-br from-rose-950 to-red-900 p-6 text-white shadow-xl">
          {/* ... [Keep existing customer info block] ... */}
          <h3 className="mb-4 flex items-center gap-2 font-bold"><User size={18} /> Customer Info</h3>
          <div className="space-y-3">
            <p className="text-sm font-semibold">{customerName}</p>
            <p className="flex items-center gap-2 text-sm text-rose-200"><Phone size={14} /> {customerPhone}</p>
            <div className="mt-4 rounded-xl bg-rose-900/50 p-3">
              <p className="mb-1 text-xs text-rose-200">Inquiry Context</p>
              <p className="text-sm italic">"{inquiryMessage}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-rose-950" />
            <h2 className="text-lg font-bold text-slate-900">Manage Availability Calendar</h2>
          </div>

          <div className="flex items-center gap-2">
            <select value={month} onChange={handleMonthChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-rose-950 outline-none transition focus:border-rose-300 cursor-pointer">
              {monthNames.map((mName, idx) => (<option key={mName} value={idx}>{mName}</option>))}
            </select>
            <select value={year} onChange={handleYearChange} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-rose-950 outline-none transition focus:border-rose-300 cursor-pointer">
              {yearsList.map((yNum) => (<option key={yNum} value={yNum}>{yNum}</option>))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-xs font-bold uppercase tracking-wider text-slate-400 py-1">{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-28 rounded-2xl bg-slate-50/50 border border-transparent" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
            
            const isAvailable = availabilityMap[dateStr] ?? true;
            
            // Fetch job count for this specific day
            const jobCount = getJobCountForDate(dateStr);

            return (
              <div
                key={dateStr}
                className={`flex flex-col justify-between h-28 p-3 rounded-2xl border transition ${
                  isAvailable ? 'border-green-100 bg-green-50/30' : 'border-rose-100 bg-rose-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isAvailable ? 'text-slate-700' : 'text-rose-950'}`}>
                    {dayNum}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleDay(dateStr)}
                    className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      isAvailable ? 'bg-green-600' : 'bg-rose-400'
                    }`}
                  >
                    <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isAvailable ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex flex-col gap-1 mt-auto">
                  {/* Existing Job Indicator Badge */}
                  {jobCount > 0 && (
                    <span className="flex items-center gap-1 w-fit text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      <Briefcase size={10} /> {jobCount} Job{jobCount > 1 ? 's' : ''}
                    </span>
                  )}

                  {/* Manual Availability Status Badge */}
                  <span className={`w-fit text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isAvailable ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}