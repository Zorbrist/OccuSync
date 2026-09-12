// pages/CustomerServices.tsx
import CustomerSidebar from '../../components/CustomerSidebar';
import { Search, SlidersHorizontal, MapPin, Clock, Sparkles } from 'lucide-react';
import { useServicesData } from '../../hooks/useServicesData';
import ServiceBookingModal from '../../components/ServiceBookingModal';
import BookingSuccessModal from '../../components/BookingSuccessModal';
import ConfirmBookingModal from '../../components/ConfirmBookingModal';

export default function CustomerServices() {
  const {
    filteredServices,
    industries,
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    isLoading,
    error,
    selectedService,
    setSelectedService,
    isSubmitting,
    successData,
    setSuccessData,
    pendingPayload,
    handleInitiateBooking,
    handleConfirmBooking,
    handleCancelConfirmation
  } = useServicesData();

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Subtle Ambient Glows for Canvas Depth */}
      <div className="fixed top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <CustomerSidebar />

      {/* 1. Add this new scrolling container */}
<div className="flex-1 h-full overflow-y-auto relative z-10">
      
      <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto relative z-10">
        
        {/* Premium Hero Section */}
        <div className="mb-10 relative overflow-hidden bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-800">
           <div className="relative z-10 max-w-2xl">
             <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-500" /> Occusync Directory
             </p>
             <h1 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-slate-100">
               Find the perfect service.
             </h1>
             <p className="text-slate-400 text-lg font-medium">
               Browse verified professionals and book your next service in minutes.
             </p>
           </div>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-800 sticky top-6 z-20">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for mechanics, tutors, cleaners..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-950/50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 font-medium text-slate-100 placeholder:text-slate-500"
            />
          </div>
          
          <div className="relative w-full md:w-64 border-t border-slate-800/50 md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
            <SlidersHorizontal className="absolute left-4 md:left-8 top-7 md:top-3.5 text-slate-500" size={20} />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-slate-950/50 rounded-xl border-none appearance-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 font-medium text-slate-100 cursor-pointer"
            >
              {industries.map(ind => (
                <option key={ind} value={ind} className="bg-slate-900 text-slate-100">
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content State Handling */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
             <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-5"></div>
             <p className="text-slate-300 font-medium animate-pulse">Loading directory...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-red-500/20 text-center max-w-md mx-auto my-10 backdrop-blur-md">
            <p className="text-slate-300 font-medium">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredServices.length === 0 && (
          <div className="bg-slate-900/60 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-800 text-center max-w-2xl mx-auto my-10">
            <div className="w-16 h-16 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search size={28} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">No services found</h3>
            <p className="text-slate-400 text-sm mb-8">We couldn't find any services matching "{searchQuery}". Try adjusting your filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); }}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/60 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div>
                <div className="flex justify-between items-start mb-5 gap-2">
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase">
                    {service.industry}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                    RM {Number(service.base_price).toFixed(2)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-100 mb-1 leading-tight group-hover:text-indigo-300 transition-colors duration-200">
                  {service.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-4">{service.business_name}</p>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-5 bg-slate-950/50 border border-slate-800/50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-indigo-400" />
                    <span>{service.estimated_duration} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-indigo-400" />
                    <span className="truncate max-w-[100px]">{service.area_of_service || 'Anywhere'}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl text-sm font-medium group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-200"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {selectedService && (
          <ServiceBookingModal 
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            onSubmit={handleInitiateBooking}
            isSubmitting={isSubmitting}
          />
        )}

        <ConfirmBookingModal 
          isOpen={!!pendingPayload}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelConfirmation}
          isSubmitting={isSubmitting}
        />

        <BookingSuccessModal 
          data={successData} 
          onClose={() => setSuccessData(null)} 
        />

      </div>
    </div>
    </div>
  );
}