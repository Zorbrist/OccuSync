import CustomerSidebar from '../../components/CustomerSidebar';
import { Search, SlidersHorizontal, MapPin, Clock } from 'lucide-react';
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
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <CustomerSidebar />
      <div className="flex-1 p-6 md:p-10 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#233876] mb-8">Browse Services</h1>
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for mechanics, tutors, cleaners..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#233876] transition"
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <SlidersHorizontal className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#233876] transition font-medium text-gray-700"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content State Handling */}
        {isLoading && <p className="text-gray-500 font-medium">Loading available services...</p>}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {!isLoading && !error && filteredServices.length === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-4xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or selecting a different category.</p>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-gray-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-blue-50 text-[#233876] text-xs font-bold px-3 py-1 rounded-full">
                    {service.industry}
                  </span>
                  <span className="text-xl font-extrabold text-[#233876]">
                    RM {Number(service.base_price).toFixed(2)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{service.name}</h3>
                <p className="text-sm font-semibold text-gray-500 mb-3 line-clamp-1">{service.business_name}</p>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{service.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-4 px-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>~{service.estimated_duration}m</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span className="truncate max-w-[100px]">{service.area_of_service || 'Anywhere'}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-gray-50 text-[#233876] py-3 rounded-xl font-bold hover:bg-[#233876] hover:text-white transition shadow-sm"
                >
                  View Details & Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 1. Initial Form Booking Modal */}
        {selectedService && (
          <ServiceBookingModal 
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            onSubmit={handleInitiateBooking}
            isSubmitting={isSubmitting}
          />
        )}

        {/* 2. Small Overlay Confirmation Modal */}
        <ConfirmBookingModal 
          isOpen={!!pendingPayload}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelConfirmation}
          isSubmitting={isSubmitting}
        />

        {/* 3. Post-Booking Success Modal */}
        <BookingSuccessModal 
          data={successData} 
          onClose={() => setSuccessData(null)} 
        />

      </div>
    </div>
  );
}