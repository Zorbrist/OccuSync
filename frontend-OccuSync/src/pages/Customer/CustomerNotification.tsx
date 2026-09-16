// pages/CustomerNotification.tsx
import { Bell, Check, AlertCircle, CalendarClock, CreditCard, Box } from 'lucide-react';
import { useNotificationsData } from '../../hooks/useNotificationsData';

import { BlurFade } from '../../ui/blur-fade';
import { Particles } from '../../ui/particles';

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
    const baseClass = isRead ? "text-slate-400" : "";
    switch (type) {
      case 'ORDER_UPDATE': return <Box size={20} className={baseClass || "text-sky-500"} />;
      case 'PAYMENT': return <CreditCard size={20} className={baseClass || "text-emerald-500"} />;
      case 'REMINDER': return <CalendarClock size={20} className={baseClass || "text-amber-500"} />;
      case 'SYSTEM': return <AlertCircle size={20} className={baseClass || "text-red-500"} />;
      default: return <Bell size={20} className={baseClass || "text-violet-600"} />;
    }
  };

  const getIconBg = (type?: string, isRead?: boolean) => {
    if (isRead) return 'bg-slate-50 border border-slate-100';
    switch (type) {
      case 'ORDER_UPDATE': return 'bg-sky-50 border border-sky-100 shadow-[0_0_10px_rgba(14,165,233,0.1)]';
      case 'PAYMENT': return 'bg-emerald-50 border border-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'REMINDER': return 'bg-amber-50 border border-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.1)]';
      case 'SYSTEM': return 'bg-red-50 border border-red-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      default: return 'bg-violet-50 border border-violet-100 shadow-[0_0_10px_rgba(124,58,237,0.1)]';
    }
  };

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-32 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />

      <div className={`relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 space-y-8 pt-4 overflow-y-auto ${scrollbarClasses}`}>
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between py-2 border-b border-slate-200/50 pb-6 gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-1.5 flex items-center gap-3">
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-[10px] font-black rounded-full uppercase tracking-wider translate-y-[-2px]">
                    {unreadCount} New
                  </span>
                )}
              </h2>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Stay updated on your account activity
              </p>
            </div>

            {/* Styled Filter Toggle */}
            <div className="flex bg-slate-200/50 p-1.5 rounded-full border border-slate-200 w-fit">
              <button 
                onClick={() => setFilter('ALL')}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  filter === 'ALL' 
                    ? 'bg-white text-violet-700 shadow-sm' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                All Alerts
              </button>
              <button 
                onClick={() => setFilter('UNREAD')}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2 ${
                  filter === 'UNREAD' 
                    ? 'bg-white text-violet-700 shadow-sm' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className={`w-2 h-2 rounded-full ${filter === 'UNREAD' ? 'bg-violet-600' : 'bg-red-500 animate-pulse'}`}></span>
                )}
              </button>
            </div>
          </div>
        </BlurFade>
        
        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-6 md:p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 min-h-[500px] flex flex-col">
            
            {/* State Handling */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center flex-1 bg-white/50 rounded-[2rem] border border-slate-100 min-h-[300px]">
                 <div className="w-10 h-10 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-semibold text-sm">Fetching alerts...</p>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center flex-1 bg-red-50/50 rounded-[2rem] border border-red-100 min-h-[300px]">
                <p className="text-red-500 font-semibold text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && filteredNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 bg-white/50 rounded-[2rem] border border-slate-100 min-h-[300px]">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 relative">
                  <Bell size={24} className="text-slate-400" />
                  {filter === 'UNREAD' && (
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-slate-100">
                      <Check size={12} className="text-emerald-500" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">You're all caught up!</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">You don't have any {filter === 'UNREAD' ? 'unread ' : ''}notifications right now.</p>
                {filter === 'UNREAD' && (
                  <button 
                    onClick={() => setFilter('ALL')}
                    className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    View History
                  </button>
                )}
              </div>
            )}

            {/* Notifications List */}
            <BlurFade key={filter} delay={0.3}>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-[1.5rem] transition-all duration-200 border relative overflow-hidden group ${
                      !notification.is_read 
                        ? 'bg-white border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5' 
                        : 'bg-slate-50/50 border-slate-100/50 opacity-80 hover:opacity-100 hover:bg-white'
                    }`}
                  >
                    {/* Unread Indicator Bar */}
                    {!notification.is_read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-500"></div>
                    )}

                    <div className="flex items-start sm:items-center gap-5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${getIconBg(notification.type, notification.is_read)}`}>
                         {getNotificationIcon(notification.type, notification.is_read)}
                      </div>
                      <div>
                        <p className={`text-sm pr-4 leading-relaxed ${!notification.is_read ? 'font-bold text-[#0F172A]' : 'font-semibold text-slate-500'}`}>
                          {notification.message}
                        </p>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-2 flex items-center gap-2">
                          {formatDate(notification.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    {!notification.is_read && (
                      <button 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="flex items-center justify-center gap-1.5 sm:self-center px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-[#0F172A] hover:text-white hover:border-black transition-all duration-200 shadow-sm whitespace-nowrap shrink-0"
                      >
                        <Check size={12} strokeWidth={3} />
                        Mark Read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </BlurFade>

          </div>
        </BlurFade>

      </div>
    </div>
  );
}