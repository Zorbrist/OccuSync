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

  useEffect(() => {
    fetchBusinessNotifications();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ORDER': return <ShoppingBag size={18} />;
      case 'QUOTATION': return <FileText size={18} />;
      case 'PAYMENT': return <CreditCard size={18} />;
      case 'REVIEW': return <Star size={18} />;
      case 'WARNING': return <AlertCircle size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'ORDER': return 'New Customer Order';
      case 'QUOTATION': return 'Quotation Update';
      case 'PAYMENT': return 'Payment Update';
      case 'REVIEW': return 'New Review';
      case 'WARNING': return 'Important Notice';
      default: return 'Notification';
    }
  };

  const formatTime = (date: string | number | Date | null | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-MY', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-xl font-semibold text-[#1E293B]">Notifications</h1>
            <p className="text-sm text-slate-500 mt-1">Stay updated with your business activities.</p>
            {unreadCount > 0 && (
              <div className="inline-flex items-center gap-2 mt-3 bg-blue-50/50 border border-blue-100 px-3 py-1.5 rounded-full shadow-sm">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                 <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                   {unreadCount} Unread
                 </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || loading}
            className="px-5 py-2.5 rounded-[1rem] bg-white shadow-sm border border-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600 hover:text-black hover:shadow-md transition-all disabled:opacity-50 disabled:shadow-none"
          >
            Mark all as read
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-12 text-center border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Loading notifications...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-8 text-center border border-slate-50">
            <p className="text-sm text-red-500 font-medium mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchBusinessNotifications}
              className="px-5 py-2.5 rounded-[1rem] bg-[#F1F5F9] text-sm font-medium text-[#1E293B] shadow-inner hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && notifications.length === 0 && (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-16 text-center border border-slate-50">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#F1F5F9] shadow-inner text-slate-300 flex items-center justify-center mb-4">
               <Bell size={24} />
            </div>
            <p className="text-sm text-slate-500">No notifications yet.</p>
          </div>
        )}

        {/* Notifications */}
        {!loading && !error && notifications.length > 0 && (
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 overflow-hidden p-2">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 flex gap-5 rounded-[1rem] transition-all duration-300 ${
                    notification.is_read
                      ? 'bg-transparent hover:bg-[#F1F5F9]'
                      : 'bg-[#F1F5F9] shadow-inner'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    notification.is_read 
                      ? 'bg-[#F1F5F9] text-slate-400 shadow-inner' 
                      : 'bg-white text-[#1E293B] shadow-sm border border-slate-50'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <h3 className={`font-semibold text-sm truncate ${notification.is_read ? 'text-slate-600' : 'text-[#1E293B]'}`}>
                        {getNotificationTitle(notification.type)}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                        {formatTime(notification.created_at)}
                      </span>
                    </div>

                    <p className={`text-sm mb-4 line-clamp-2 ${notification.is_read ? 'text-slate-400' : 'text-slate-500'}`}>
                      {notification.message}
                    </p>

                    {!notification.is_read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="text-[11px] font-semibold uppercase tracking-wider text-black hover:text-slate-500 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  {/* Unread Dot */}
                  {!notification.is_read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}