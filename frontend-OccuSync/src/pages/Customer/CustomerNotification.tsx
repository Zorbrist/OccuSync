// pages/CustomerNotification.tsx
import { Bell, Check, Sparkles, AlertCircle, CalendarClock, CreditCard, Box } from 'lucide-react';
import CustomerSidebar from '../../components/CustomerSidebar';
import { useNotificationsData } from '../../hooks/useNotificationsData';

export default function CustomerNotification() {
  const {
    filteredNotifications,
    filter,
    setFilter,
    isLoading,
    error,
    handleMarkAsRead,
    unreadCount,
  } = useNotificationsData();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-MY', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getNotificationIcon = (type?: string, isRead?: boolean) => {
    const baseClass = isRead ? "text-slate-500" : "";
    switch (type) {
      case 'ORDER_UPDATE': return <Box size={20} className={baseClass || "text-blue-400"} />;
      case 'PAYMENT': return <CreditCard size={20} className={baseClass || "text-emerald-400"} />;
      case 'REMINDER': return <CalendarClock size={20} className={baseClass || "text-amber-400"} />;
      case 'SYSTEM': return <AlertCircle size={20} className={baseClass || "text-rose-400"} />;
      default: return <Bell size={20} className={baseClass || "text-indigo-400"} />;
    }
  };

  const getIconBg = (type?: string, isRead?: boolean) => {
    if (isRead) return 'bg-slate-950/50 border border-slate-800/50';
    switch (type) {
      case 'ORDER_UPDATE': return 'bg-blue-500/10 border border-blue-500/20';
      case 'PAYMENT': return 'bg-emerald-500/10 border border-emerald-500/20';
      case 'REMINDER': return 'bg-amber-500/10 border border-amber-500/20';
      case 'SYSTEM': return 'bg-rose-500/10 border border-rose-500/20';
      default: return 'bg-indigo-500/10 border border-indigo-500/20';
    }
  };

  return (
   <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Subtle Ambient Glows for Depth */}
      <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <CustomerSidebar />

      {/* 1. Add this new scrolling container */}
<div className="flex-1 h-full overflow-y-auto relative z-10">
      
      <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-5xl mx-auto relative z-10">
        
        {/* Premium Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500" /> Stay Updated
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight mb-2">
              Notifications
            </h1>
            <p className="text-sm font-medium text-slate-400">
              You have <span className="text-indigo-400 font-semibold">{unreadCount} unread</span> alert{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Styled Filter Toggle */}
          <div className="flex bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 w-fit shadow-sm">
            <button 
              onClick={() => setFilter('ALL')}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                filter === 'ALL' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              All Alerts
            </button>
            <button 
              onClick={() => setFilter('UNREAD')}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                filter === 'UNREAD' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`w-2 h-2 rounded-full ${filter === 'UNREAD' ? 'bg-white' : 'bg-rose-500 animate-pulse'}`}></span>
              )}
            </button>
          </div>
        </div>
        
        {/* State Handling */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
             <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
             <p className="text-slate-300 font-medium animate-pulse">Fetching alerts...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-red-500/20 backdrop-blur-md text-center max-w-md mx-auto my-10">
            <p className="text-slate-300 font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredNotifications.length === 0 && (
          <div className="bg-slate-900/60 backdrop-blur-md p-16 rounded-2xl shadow-lg border border-slate-800 text-center mt-10">
            <div className="w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
              <Bell size={32} className="text-slate-500" />
              {filter === 'UNREAD' && (
                <div className="absolute -bottom-2 -right-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                  <Check size={16} className="text-emerald-400" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">You're all caught up!</h3>
            <p className="text-slate-400 text-sm">You don't have any {filter === 'UNREAD' ? 'unread ' : ''}notifications at the moment.</p>
            {filter === 'UNREAD' && (
              <button 
                onClick={() => setFilter('ALL')}
                className="mt-8 px-6 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700 hover:text-white transition-all duration-200"
              >
                View History
              </button>
            )}
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl transition-all duration-200 border relative overflow-hidden group ${
                !notification.is_read 
                  ? 'bg-slate-900/60 backdrop-blur-md border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 shadow-lg hover:shadow-indigo-500/5' 
                  : 'bg-slate-950/40 border-slate-800/50 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Unread Indicator Bar */}
              {!notification.is_read && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}

              <div className="flex items-start sm:items-center gap-5">
                <div className={`p-3 rounded-xl shrink-0 ${getIconBg(notification.type, notification.is_read)}`}>
                   {getNotificationIcon(notification.type, notification.is_read)}
                </div>
                <div>
                  <p className={`text-sm md:text-base pr-4 leading-relaxed ${!notification.is_read ? 'font-semibold text-slate-200' : 'font-medium text-slate-400'}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-2">
                    {formatDate(notification.created_at)}
                    {!notification.is_read && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>}
                  </span>
                </div>
              </div>
              
              {!notification.is_read && (
                <button 
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="flex items-center justify-center gap-2 sm:self-center px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 group-hover:-translate-y-0.5"
                >
                  <Check size={14} strokeWidth={2.5} />
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
    </div>
  );
}