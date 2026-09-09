import {
  ShoppingBag,
  FileText,
  CreditCard,
  Star,
  AlertCircle,
} from 'lucide-react';

export default function NotificationsPage() {

  const notifications = [
    {
      icon: <ShoppingBag size={20} />,
      title: 'New Customer Order',
      message: 'Natas submitted a new Aircond Repair order.',
      time: '2 hours ago',
    },
    {
      icon: <FileText size={20} />,
      title: 'Quotation Accepted',
      message: 'Sarah accepted quotation #QUO-1018.',
      time: '5 hours ago',
    },
    {
      icon: <CreditCard size={20} />,
      title: 'Payout Processed',
      message: 'Your payout of RM1,250.00 has been processed.',
      time: 'Today',
    },
    {
      icon: <Star size={20} />,
      title: 'New Review',
      message: 'Tasha left a 5-star review for your service.',
      time: 'Yesterday',
    },
    {
      icon: <AlertCircle size={20} />,
      title: 'Quotation Expiring',
      message: 'Quotation #QUO-1008 will expire tomorrow.',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-extrabold text-rose-950">
            Notifications
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Stay updated with your business activities.
          </p>

        </div>

        <button className="text-sm font-bold text-rose-950 hover:underline">
          Mark all as read
        </button>

      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5 overflow-hidden">

        {notifications.map((notification, index) => (

          <div
            key={index}
            className="p-6 flex gap-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
          >

            <div className="h-11 w-11 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center shrink-0">
              {notification.icon}
            </div>

            <div className="flex-1">

              <div className="flex justify-between gap-4">

                <h3 className="font-bold text-slate-900">
                  {notification.title}
                </h3>

                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {notification.time}
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                {notification.message}
              </p>

              <button className="text-xs font-bold text-rose-950 mt-3 hover:underline">
                View details →
              </button>

            </div>

            {/* UNREAD DOT */}
            <div className="h-2 w-2 rounded-full bg-rose-600 mt-2 shrink-0" />

          </div>

        ))}

      </div>

    </div>
  );
}