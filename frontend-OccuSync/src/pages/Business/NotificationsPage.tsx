import { useEffect } from 'react';
import {
  ShoppingBag,
  FileText,
  CreditCard,
  Star,
  AlertCircle,
  Bell,
} from 'lucide-react';

import { useBusinessNotifications } from '../../hooks/useBusinessData';

export default function NotificationsPage() {
  const {
    notifications,
    loading,
    error,
    unreadCount,
    fetchBusinessNotifications,
    markAsRead,
    markAllAsRead,
  } = useBusinessNotifications();

  // Fetch notifications when page loads
  useEffect(() => {
    fetchBusinessNotifications();
  }, []);

  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ORDER':
        return <ShoppingBag size={20} />;
      case 'QUOTATION':
        return <FileText size={20} />;
      case 'PAYMENT':
        return <CreditCard size={20} />;
      case 'REVIEW':
        return <Star size={20} />;
      case 'WARNING':
        return <AlertCircle size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  // Get notification title
  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'ORDER':
        return 'New Customer Order';
      case 'QUOTATION':
        return 'Quotation Update';
      case 'PAYMENT':
        return 'Payment Update';
      case 'REVIEW':
        return 'New Review';
      case 'WARNING':
        return 'Important Notice';
      default:
        return 'Notification';
    }
  };

  // Format notification date
  const formatTime = (date: string | number | Date | null | undefined) => {
    if (!date) return '';

    return new Date(date).toLocaleString('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-rose-950">
            Notifications
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Stay updated with your business activities.
          </p>

          {unreadCount > 0 && (
            <p className="text-xs text-rose-600 font-semibold mt-2">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0 || loading}
          className="text-sm font-bold text-rose-950 hover:underline disabled:text-slate-300 disabled:no-underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-3xl border border-rose-100 p-8">
          <p className="text-sm text-slate-500">
            Loading notifications...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 rounded-3xl border border-red-100 p-6">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchBusinessNotifications}
            className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && notifications.length === 0 && (
        <div className="bg-white rounded-3xl border border-rose-100 p-8 text-center">
          <Bell className="mx-auto text-slate-300" size={32} />

          <p className="text-sm text-slate-500 mt-3">
            No notifications yet.
          </p>
        </div>
      )}

      {/* Notifications */}
      {!loading && !error && notifications.length > 0 && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5 overflow-hidden">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 flex gap-4 border-b border-slate-100 last:border-b-0 transition ${
                notification.is_read
                  ? 'hover:bg-slate-50'
                  : 'bg-rose-50/40 hover:bg-rose-50'
              }`}
            >
              {/* Icon */}
              <div className="h-11 w-11 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center shrink-0">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <h3 className="font-bold text-slate-900">
                    {getNotificationTitle(notification.type)}
                  </h3>

                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {formatTime(notification.created_at)}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-1">
                  {notification.message}
                </p>

                {!notification.is_read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs font-bold text-rose-950 mt-3 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>

              {/* Unread Dot */}
              {!notification.is_read && (
                <div className="h-2 w-2 rounded-full bg-rose-600 mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}