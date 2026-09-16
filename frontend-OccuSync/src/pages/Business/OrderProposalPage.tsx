import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, CalendarDays, Briefcase } from 'lucide-react';
import { sendOrderProposal, toggleDateAvailability } from '../../services/businessService';
import { useBusinessOrders } from '../../hooks/useBusinessData';

export default function OrderProposalPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const job_id: number = Number(searchParams.get('jobId') ?? 0);

  const { data: orders, fetchBusinessOrders } = useBusinessOrders();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchBusinessOrders('CONFIRMED');
  }, []);

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Please select a proposed date and time.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendOrderProposal({ job_id, proposed_date: date, proposed_time: time, message });
      navigate('/business/orders');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to send order proposal.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDay = async (dateStr: string) => {
    const currentStatus = availabilityMap[dateStr] ?? true;
    const newStatus = !currentStatus;
    setAvailabilityMap((prev) => ({ ...prev, [dateStr]: newStatus }));
    try {
      await toggleDateAvailability(dateStr, newStatus);
    } catch (error) {
      setAvailabilityMap((prev) => ({ ...prev, [dateStr]: currentStatus }));
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(new Date(year, Number(e.target.value), 1));
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(new Date(Number(e.target.value), month, 1));
  };

  const currentYearNum = new Date().getFullYear();
  const yearsList = Array.from({ length: 12 }, (_, i) => currentYearNum + i);

  const getJobCountForDate = (dateStr: string) => {
    if (!orders) return 0;
    return orders.filter((order) => {
      const orderDate = (order as typeof order & { date?: string }).date;
      return orderDate?.startsWith(dateStr) ?? false;
    }).length;
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">Draft Order Proposal</h1>
          <p className="text-sm text-slate-500 mt-1">Propose a date and time for the customer's order.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          
          {/* Form */}
          <form
            onSubmit={handlePropose}
            className="space-y-6 bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-8 xl:col-span-1 h-fit"
          >
            <h2 className="text-sm font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">
              Scheduling Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#F1F5F9] shadow-inner rounded-[1rem] border-none p-3.5 text-sm text-[#1E293B] outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Time</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#F1F5F9] shadow-inner rounded-[1rem] border-none p-3.5 text-sm text-[#1E293B] outline-none focus:ring-2 focus:ring-slate-200 transition-all cursor-pointer"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Message (Optional)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Additional context..."
                  className="w-full bg-[#F1F5F9] shadow-inner rounded-[1rem] border-none p-4 text-sm text-[#1E293B] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-200 transition-all resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-[1rem] bg-red-50 p-4 text-sm font-medium text-red-500 text-center border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-[1rem] bg-black py-3.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-slate-800 disabled:opacity-50 transition-all"
            >
              <Send size={16} />
              {loading ? 'Sending...' : 'Send Proposal'}
            </button>
          </form>

          {/* Calendar */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-8 xl:col-span-2">
            
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-[#1E293B]">
                  <CalendarDays size={18} />
                </div>
                <h2 className="text-sm font-semibold text-[#1E293B]">Availability Calendar</h2>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={month}
                  onChange={handleMonthChange}
                  className="bg-[#F1F5F9] shadow-inner rounded-[1rem] border-none px-4 py-2.5 text-sm font-medium text-[#1E293B] outline-none cursor-pointer"
                >
                  {monthNames.map((mName, idx) => (<option key={mName} value={idx}>{mName}</option>))}
                </select>
                <select
                  value={year}
                  onChange={handleYearChange}
                  className="bg-[#F1F5F9] shadow-inner rounded-[1rem] border-none px-4 py-2.5 text-sm font-medium text-[#1E293B] outline-none cursor-pointer"
                >
                  {yearsList.map((yNum) => (<option key={yNum} value={yNum}>{yNum}</option>))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d} className="py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 sm:h-28 rounded-[1.5rem] bg-transparent" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const formattedMonth = String(month + 1).padStart(2, '0');
                const formattedDay = String(dayNum).padStart(2, '0');
                const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
                
                const isAvailable = availabilityMap[dateStr] ?? true;
                const jobCount = getJobCountForDate(dateStr);

                return (
                  <div
                    key={dateStr}
                    className={`flex h-24 sm:h-28 flex-col justify-between p-3 sm:p-4 transition-all duration-300 rounded-[1.25rem] sm:rounded-[1.5rem] ${
                      isAvailable
                        ? 'bg-white shadow-[0_4px_14px_rgba(149,157,165,0.08)] border border-slate-50'
                        : 'bg-[#F1F5F9] shadow-inner border border-transparent opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-sm font-semibold ${isAvailable ? 'text-[#1E293B]' : 'text-slate-400'}`}>
                        {dayNum}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleDay(dateStr)}
                        className={`flex h-5 w-9 sm:h-6 sm:w-10 items-center rounded-full p-1 transition-all duration-300 ${
                          isAvailable ? 'bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]' : 'bg-[#E8EDF2] shadow-inner border border-slate-200'
                        }`}
                      >
                        <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isAvailable ? 'translate-x-4 sm:translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-col gap-1.5 items-start">
                      {jobCount > 0 && (
                        <span className="flex items-center gap-1 bg-white shadow-sm border border-slate-100 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-[#1E293B]">
                          <Briefcase size={10} className="text-slate-400" />
                          {jobCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}