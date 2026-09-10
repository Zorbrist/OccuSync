import { Bell, Check, Filter } from 'lucide-react';
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
    unreadCount
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

  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-6 md:p-10 relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#233876] mb-2">Notifications</h1>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              You have {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 max-w-fit">
            <button 
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                filter === 'ALL' ? 'bg-[#233876] text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('UNREAD')}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                filter === 'UNREAD' ? 'bg-[#233876] text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Unread
            </button>
          </div>
        </div>
        
        {/* State Handling */}
        {isLoading && <p className="text-gray-500 font-medium">Loading notifications...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!isLoading && !error && filteredNotifications.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-4xl">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">You're all caught up!</h3>
            <p className="text-gray-500">You don't have any {filter === 'UNREAD' ? 'unread ' : ''}notifications at the moment.</p>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4 max-w-4xl">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 rounded-2xl transition border ${
                !notification.is_read 
                  ? 'bg-blue-50/50 border-blue-200 border-l-4 border-l-[#233876] shadow-sm' 
                  : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-full ${!notification.is_read ? 'bg-blue-100 text-[#233876]' : 'bg-gray-100 text-gray-400'}`}>
                  <Bell size={18} />
                </div>
                <div>
                  <p className={`text-sm md:text-base ${!notification.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs font-semibold text-gray-400 mt-2 block">
                    {formatDate(notification.created_at)}
                  </span>
                </div>
              </div>
              
              {!notification.is_read && (
                <button 
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="flex items-center justify-center gap-2 sm:self-center px-4 py-2 bg-white border border-gray-200 text-[#233876] rounded-xl text-xs font-bold hover:bg-gray-50 transition shadow-sm whitespace-nowrap"
                >
                  <Check size={14} />
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}