import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Send,
  CalendarDays,
  Briefcase
} from 'lucide-react';

import {
  sendOrderProposal,
  toggleDateAvailability
} from '../../services/businessService';

import { useBusinessOrders } from '../../hooks/useBusinessData';

export default function OrderProposalPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ============================================================
  // PROPOSAL DATA
  // ============================================================

// Convert string to number (returns NaN if conversion fails, or null if param missing)
const job_id: number = Number(searchParams.get('jobId') ?? 0);


  // ============================================================
  // EXISTING BUSINESS ORDERS
  // ============================================================

  const {
    data: orders,
    fetchBusinessOrders
  } = useBusinessOrders();

  // ============================================================
  // FORM STATE
  // ============================================================

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ============================================================
  // CALENDAR STATE
  // ============================================================

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const [availabilityMap, setAvailabilityMap] =
    useState<Record<string, boolean>>({});

  // ============================================================
  // FETCH CONFIRMED ORDERS
  // ============================================================

  useEffect(() => {
    fetchBusinessOrders('CONFIRMED');
  }, []);

  // ============================================================
  // SEND PROPOSAL
  // ============================================================

  const handlePropose = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();


    if (!date || !time) {
      setError(
        'Please select a proposed date and time.'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendOrderProposal({

        job_id: job_id,
        proposed_date: date,
        proposed_time: time,
        message,
      });

      // Keep the existing redirect for now.
      navigate('/business/orders');

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to send order proposal. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // TOGGLE AVAILABILITY
  // ============================================================

  const handleToggleDay = async (
    dateStr: string
  ) => {
    const currentStatus =
      availabilityMap[dateStr] ?? true;

    const newStatus = !currentStatus;

    setAvailabilityMap((prev) => ({
      ...prev,
      [dateStr]: newStatus,
    }));

    try {
      await toggleDateAvailability(
        dateStr,
        newStatus
      );
    } catch (error) {
      console.error(
        'Failed to update date availability:',
        error
      );

      // Revert UI if the backend update fails
      setAvailabilityMap((prev) => ({
        ...prev,
        [dateStr]: currentStatus,
      }));
    }
  };

  // ============================================================
  // CALENDAR HELPERS
  // ============================================================

  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const firstDayOfMonth =
    new Date(
      year,
      month,
      1
    ).getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const handleMonthChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMonth =
      Number(e.target.value);

    setCurrentMonth(
      new Date(
        year,
        newMonth,
        1
      )
    );
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newYear =
      Number(e.target.value);

    setCurrentMonth(
      new Date(
        newYear,
        month,
        1
      )
    );
  };

  const currentYearNum =
    new Date().getFullYear();

  const yearsList =
    Array.from(
      { length: 12 },
      (_, i) =>
        currentYearNum + i
    );

  // ============================================================
  // COUNT JOBS FOR DATE
  // ============================================================

  const getJobCountForDate = (
    dateStr: string
  ) => {
    if (!orders) return 0;

    return orders.filter((order) => {
      const orderDate =
        (
          order as typeof order & {
            date?: string;
          }
        ).date;

      return (
        orderDate?.startsWith(dateStr) ??
        false
      );
    }).length;
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-full bg-slate-50 p-8 space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-rose-950">
          Draft Order Proposal
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Propose a date and time for the customer&apos;s order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ====================================================
            PROPOSAL FORM
        ==================================================== */}

        <form
          onSubmit={handlePropose}
          className="space-y-5 rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5 xl:col-span-2"
        >

          <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
            Scheduling Details
          </h2>

          {/* Date + Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Date
              </label>

              <input
                type="date"
                required
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none transition focus:border-rose-300"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Time
              </label>

              <input
                type="time"
                required
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none transition focus:border-rose-300"
              />
            </div>

          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Message to Customer
            </label>

            <textarea
              rows={3}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Add any additional information for the customer..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-rose-300"
            />
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-950 py-3 font-bold text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={16} />

            {loading
              ? 'Sending Proposal...'
              : 'Send Proposal'}
          </button>

        </form>
      </div>

      {/* ======================================================
          CALENDAR
      ====================================================== */}

      <div className="space-y-6 rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-950/5">

        {/* Calendar Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <CalendarDays
              size={20}
              className="text-rose-950"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Manage Availability Calendar
            </h2>
          </div>

          <div className="flex items-center gap-2">

            {/* Month */}
            <select
              value={month}
              onChange={handleMonthChange}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-rose-950 outline-none transition focus:border-rose-300"
            >
              {monthNames.map(
                (mName, idx) => (
                  <option
                    key={mName}
                    value={idx}
                  >
                    {mName}
                  </option>
                )
              )}
            </select>

            {/* Year */}
            <select
              value={year}
              onChange={handleYearChange}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-rose-950 outline-none transition focus:border-rose-300"
            >
              {yearsList.map(
                (yNum) => (
                  <option
                    key={yNum}
                    value={yNum}
                  >
                    {yNum}
                  </option>
                )
              )}
            </select>

          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {[
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ].map((d) => (
            <span
              key={d}
              className="py-1 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">

          {/* Empty Days */}
          {Array.from({
            length: firstDayOfMonth
          }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="h-28 rounded-2xl border border-transparent bg-slate-50/50"
            />
          ))}

          {/* Actual Days */}
          {Array.from({
            length: daysInMonth
          }).map((_, i) => {

            const dayNum =
              i + 1;

            const formattedMonth =
              String(month + 1)
                .padStart(2, '0');

            const formattedDay =
              String(dayNum)
                .padStart(2, '0');

            const dateStr =
              `${year}-${formattedMonth}-${formattedDay}`;

            const isAvailable =
              availabilityMap[dateStr] ??
              true;

            const jobCount =
              getJobCountForDate(
                dateStr
              );

            return (
              <div
                key={dateStr}
                className={`flex h-28 flex-col justify-between rounded-2xl border p-3 transition ${
                  isAvailable
                    ? 'border-green-100 bg-green-50/30'
                    : 'border-rose-100 bg-rose-50/40'
                }`}
              >

                {/* Day + Toggle */}
                <div className="flex items-center justify-between">

                  <span
                    className={`text-xs font-bold ${
                      isAvailable
                        ? 'text-slate-700'
                        : 'text-rose-950'
                    }`}
                  >
                    {dayNum}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleToggleDay(
                        dateStr
                      )
                    }
                    className={`flex h-5 w-9 items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      isAvailable
                        ? 'bg-green-600'
                        : 'bg-rose-400'
                    }`}
                  >
                    <div
                      className={`h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                        isAvailable
                          ? 'translate-x-4'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>

                </div>

                {/* Day Information */}
                <div className="mt-auto flex flex-col gap-1">

                  {/* Existing Jobs */}
                  {jobCount > 0 && (
                    <span className="flex w-fit items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      <Briefcase size={10} />

                      {jobCount} Job
                      {jobCount > 1
                        ? 's'
                        : ''}
                    </span>
                  )}

                  {/* Availability */}
                  <span
                    className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isAvailable
                        ? 'bg-green-100 text-green-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {isAvailable
                      ? 'Available'
                      : 'Busy'}
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