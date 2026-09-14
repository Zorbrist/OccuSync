// pages/CustomerServices.tsx
import { Search, SlidersHorizontal, MapPin, Clock, Sparkles, Heart, Scale, X } from 'lucide-react';
import { useServicesData } from '../../hooks/useServicesData';
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
    isSubmitting,
    successData,
    setSuccessData,
    pendingPayload,
    handleInitiateBooking,
    handleConfirmBooking,
    handleCancelConfirmation,
    savedServiceIds,
    toggleSaved,
    compareList,
    setCompareList,
    toggleCompare,
    showCompareModal,
    setShowCompareModal
  } = useServicesData();

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden">
      <div className="fixed top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="flex-1 h-full overflow-y-auto relative z-10">
        <div className="flex-1 p-6 md:p-10 lg:pl-12 max-w-7xl mx-auto relative z-10 pb-32">
          
          {/* Hero Section */}
          <div className="mb-10 relative overflow-hidden bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-800">
             <div className="relative z-10 max-w-2xl">
               <p className="text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-500" /> Occusync Directory
               </p>
               <h1 className="text-3xl md:text-5xl font-semibold mb-4 tracking-tight text-slate-100">
                 Find the perfect service.
               </h1>
               <p className="text-slate-400 text-lg font-medium">
                 Browse verified professionals and request a booking in one click.
               </p>
             </div>
          </div>
          
          {/* Search & Filter */}
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
                  <option key={ind} value={ind} className="bg-slate-900 text-slate-100">{ind}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading/Error/Empty States */}
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
              <button 
                onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); }}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-500 mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isSaved = savedServiceIds.has(service.id);
              const isComparing = compareList.some(s => s.id === service.id);

              return (
                <div key={service.id} className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-5 gap-2">
                      <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase">
                        {service.industry}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleCompare(service)}
                          className={`p-2 rounded-lg border transition-colors ${isComparing ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                          title="Compare"
                        >
                          <Scale size={16} />
                        </button>
                        <button 
                          onClick={() => toggleSaved(service.id)}
                          className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-100 mb-1 leading-tight">{service.name}</h3>
                    <p className="text-xs font-medium text-slate-500 mb-4">{service.business_name}</p>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{service.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-emerald-400">RM {Number(service.base_price).toFixed(0)}</span>
                      <div className="flex flex-col items-end gap-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Clock size={12} className="text-indigo-400"/> {service.estimated_duration} mins</span>
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-indigo-400"/> {service.postcode || 'Anywhere'}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleInitiateBooking(service)}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-xl text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200"
                    >
                      Request Service
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Compare Action Bar */}
          {compareList.length > 0 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 px-6 py-4 rounded-2xl flex items-center gap-6 z-40 animate-fade-in-up">
              <div className="text-sm font-medium">
                <span className="text-indigo-400 font-bold">{compareList.length}</span> / 3 selected
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCompareModal(true)}
                  disabled={compareList.length < 2}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                >
                  Compare Now
                </button>
                <button 
                  onClick={() => setCompareList([])}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Compare Modal */}
          {showCompareModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                  <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-3">
                    <Scale className="text-indigo-400" /> Comparing Services
                  </h2>
                  <button onClick={() => setShowCompareModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 overflow-x-auto">
                  <div className="flex gap-6 min-w-max">
                    {compareList.map(service => (
                      <div key={service.id} className="w-72 bg-slate-950/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-100 mb-1">{service.name}</h3>
                          <p className="text-sm text-indigo-400 mb-4">{service.business_name}</p>
                          <div className="space-y-4 text-sm text-slate-300 border-t border-slate-800 pt-4">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Price</span>
                              <span className="font-bold text-emerald-400">RM {Number(service.base_price).toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Duration</span>
                              <span className="font-medium">{service.estimated_duration} mins</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Industry</span>
                              <span className="font-medium">{service.industry}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => { setShowCompareModal(false); handleInitiateBooking(service); }}
                          className="w-full mt-6 bg-slate-800 text-slate-100 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors"
                        >
                          Select This
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation & Success Modals */}
          <ConfirmBookingModal 
            isOpen={!!pendingPayload}
            serviceName={selectedService?.name}
            businessName={selectedService?.business_name}
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