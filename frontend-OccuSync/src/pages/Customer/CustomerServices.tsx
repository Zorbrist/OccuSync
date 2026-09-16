// pages/CustomerServices.tsx
import { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Clock, Scale, X, Briefcase, ChevronDown } from 'lucide-react';
import { useServicesData } from '../../hooks/useServicesData';
import BookingSuccessModal from '../../components/BookingSuccessModal';
import ConfirmBookingModal from '../../components/ConfirmBookingModal';

import { BlurFade } from '../../ui/blur-fade';
import { Particles } from '../../ui/particles';

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
    compareList,
    setCompareList,
    toggleCompare,
    showCompareModal,
    setShowCompareModal
  } = useServicesData();

  // Custom Dropdown State & Ref
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollbarClasses = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400";

  return (
    <div className="min-h-full font-sans text-slate-800 selection:bg-violet-200 relative pb-32 bg-[#E8EDF2]">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={400} ease={80} color="#7C3AED" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 space-y-8 pt-4">
        
        {/* ==============================
            Header
        ============================== */}
        <BlurFade delay={0.1}>
          <div className="flex items-center justify-between py-2 border-b border-slate-200/50 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Service Directory</h2>
              <p className="text-sm font-semibold text-slate-500 mt-1.5 uppercase tracking-wider">
                Browse verified professionals
              </p>
            </div>
           
          </div>
        </BlurFade>

        {/* ==============================
            Main Panel
        ============================== */}
        <BlurFade delay={0.2}>
          <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60 flex flex-col min-h-[600px]">
            
            {/* Search & Custom Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              
              <div className="relative w-full md:flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for mechanics, tutors, cleaners..." 
                  className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-5 py-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                />
              </div>
              
              {/* Fully Custom Themed Dropdown Filter */}
              <div className="relative w-full md:w-64" ref={filterRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`w-full bg-white border rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all flex items-center justify-between px-4 py-3 ${isFilterOpen ? 'border-violet-500 ring-4 ring-violet-50' : 'border-slate-200 hover:border-violet-300'}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <SlidersHorizontal className="text-slate-400 shrink-0" size={16} />
                    <span className="text-sm font-bold text-slate-600 truncate">{selectedIndustry}</span>
                  </div>
                  <ChevronDown className={`text-slate-400 shrink-0 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} size={16} />
                </button>

                {isFilterOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-60 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                      {industries.map(ind => (
                        <button
                          key={ind}
                          onClick={() => { 
                            setSelectedIndustry(ind); 
                            setIsFilterOpen(false); 
                          }}
                          className={`w-full text-left px-5 py-2.5 text-sm font-bold transition-colors ${
                            selectedIndustry === ind 
                              ? 'bg-violet-50 text-violet-700' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading/Error/Empty States */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 bg-white/50 rounded-[2rem] border border-slate-100">
                 <div className="w-10 h-10 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-semibold text-sm">Loading directory...</p>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center h-64 bg-red-50/50 rounded-[2rem] border border-red-100">
                <p className="text-red-500 font-semibold text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && filteredServices.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 bg-white/50 rounded-[2rem] border border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">No services found</h3>
                <p className="text-sm font-medium text-slate-500 mb-4">Try adjusting your search criteria</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedIndustry('All'); }}
                  className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm"
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
                  <div key={service.id} className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <span className="bg-violet-50 text-violet-700 border border-violet-100 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                          {service.industry}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => toggleCompare(service)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border shadow-sm ${isComparing ? 'bg-violet-50 border-violet-200 text-violet-600' : 'bg-white border-slate-100 text-slate-400 hover:text-[#0F172A] hover:bg-slate-50'}`}
                            title="Compare"
                          >
                            <Scale size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#0F172A] mb-1.5 leading-tight">{service.name}</h3>
                      <p className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
                        <Briefcase size={12} className="text-slate-400"/> {service.business_name}
                      </p>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{service.description}</p>
                    </div>

                    <div>
                      <div className="flex items-end justify-between mb-6 border-t border-slate-50 pt-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Base Price</p>
                          <span className="text-xl font-black text-[#0F172A]">RM {Number(service.base_price).toFixed(0)}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-slate-500 font-semibold">
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {service.estimated_duration} mins</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {service.postcode || 'Anywhere'}, {service.state || 'Anywhere'}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleInitiateBooking(service)}
                        className="w-full bg-[#0F172A] text-white py-3 rounded-xl text-sm font-bold tracking-wide hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Request Service
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* Floating Compare Action Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] px-6 py-4 rounded-full flex items-center gap-6 z-40 animate-in slide-in-from-bottom-10">
            <div className="text-sm font-semibold text-slate-500">
              <span className="text-violet-600 font-black">{compareList.length}</span> / 3 selected
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setCompareList([])}
                className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowCompareModal(true)}
                disabled={compareList.length < 2}
                className="bg-violet-600 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:shadow-none shadow-md hover:bg-violet-700 transition-all"
              >
                Compare Now
              </button>
            </div>
          </div>
        )}

        {/* Compare Modal */}
        {showCompareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white border border-white rounded-[2rem] w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
              
              <div className="p-6 md:px-8 border-b border-slate-100 flex justify-between items-center bg-[#F1F5F9]/50 shrink-0">
                <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600"><Scale size={16}/></div>
                  Comparing Services
                </h2>
                <button onClick={() => setShowCompareModal(false)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 transition-all border border-slate-100">
                  <X size={16} />
                </button>
              </div>

              <div className={`p-6 md:p-8 overflow-x-auto overflow-y-auto ${scrollbarClasses}`}>
                <div className="flex gap-6 min-w-max pb-2">
                  {compareList.map(service => (
                    <div key={service.id} className="w-72 bg-white border border-slate-100 rounded-[1.5rem] p-6 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-violet-200 transition-colors">
                      <div className="flex-1">
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase mb-3 inline-block">
                          {service.industry}
                        </span>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-1">{service.name}</h3>
                        <p className="text-xs font-semibold text-slate-500 mb-6">{service.business_name}</p>
                        
                        <div className="space-y-4 text-sm font-semibold text-slate-600 border-t border-slate-100 pt-5">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-xs uppercase tracking-wider">Base Price</span>
                            <span className="font-black text-[#0F172A]">RM {Number(service.base_price).toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-xs uppercase tracking-wider">Duration</span>
                            <span>{service.estimated_duration} mins</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setShowCompareModal(false); handleInitiateBooking(service); }}
                        className="w-full mt-8 bg-violet-50 text-violet-700 py-3 rounded-xl text-sm font-bold hover:bg-violet-600 hover:text-white transition-colors"
                      >
                        Select This Service
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
  );
}