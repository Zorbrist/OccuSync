// pages/CustomerPayment.tsx
import { ArrowLeft, CreditCard, Landmark, Smartphone, UploadCloud, ShieldCheck, Lock } from 'lucide-react';
import { usePaymentData } from '../../hooks/usePaymentData';
import PaymentSuccessModal from '../../components/PaymentSuccessModal';

import { BlurFade } from '../../ui/blur-fade';
import { Particles } from '../../ui/particles';

export default function CustomerPayment() {
  const {
    invoice,
    isLoading,
    error,
    selectedMethod,
    setSelectedMethod,
    receiptFile,
    setReceiptFile,
    isSubmitting,
    showSuccessModal,
    handlePayment,
    handleSuccessClose,
    navigate
  } = usePaymentData();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#E8EDF2]">
        <div className="flex flex-col items-center gap-4 bg-white/50 p-8 rounded-[2rem] border border-white">
          <div className="w-10 h-10 border-[3px] border-slate-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Initializing secure checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#E8EDF2] p-6">
        <div className="bg-white border border-red-100 rounded-[2rem] p-8 max-w-md text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <h3 className="text-lg font-bold text-[#0F172A] mb-2">Checkout Error</h3>
          <p className="text-slate-500 text-sm font-medium mb-6">{error || "Invoice not found"}</p>
          <button onClick={() => navigate('/customer/invoices')} className="px-6 py-2.5 bg-[#0F172A] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black transition-all w-full">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'ONLINE_BANKING', label: 'Online Banking', icon: Landmark, desc: 'FPX / Manual Transfer' },
    { id: 'CARD', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
    { id: 'E_WALLET', label: 'E-Wallet', icon: Smartphone, desc: 'Touch n Go, GrabPay' },
    { id: 'CASH', label: 'Cash on Site', icon: Smartphone, desc: 'Pay directly to provider' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#E8EDF2] font-sans text-slate-800 selection:bg-violet-200 relative overflow-hidden py-12">
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={50} ease={80} color="#7C3AED" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-[#0F172A] mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 w-fit"
        >
          <ArrowLeft size={14} />
          <span className="font-bold text-[11px] uppercase tracking-wider">Back to Invoice</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Payment Selection */}
          <div className="lg:col-span-2 space-y-6">
            <BlurFade delay={0.1}>
              <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 shadow-[inset_0_2px_15px_rgba(255,255,255,1)] border border-white/60">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-2 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Lock size={16} /></div>
                    Secure Checkout
                  </h1>
                  <p className="text-slate-500 text-sm font-medium">Select your preferred payment method to complete this transaction.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    const Icon = method.icon;
                    
                    return (
                      <div 
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`
                          p-5 rounded-[1.5rem] border cursor-pointer transition-all duration-200 flex flex-col gap-3 shadow-sm hover:shadow-md
                          ${isSelected 
                            ? 'bg-violet-50 border-violet-200 shadow-[0_0_15px_rgba(124,58,237,0.1)]' 
                            : 'bg-white border-slate-100 hover:border-violet-100'}
                        `}
                      >
                        <div className="flex justify-between items-start">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-violet-100 text-violet-600' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                            <Icon size={18} />
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-violet-600 bg-violet-600' : 'border-slate-200 bg-slate-50'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-sm font-bold ${isSelected ? 'text-violet-700' : 'text-[#0F172A]'}`}>{method.label}</h3>
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{method.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Receipt Upload Section */}
                {selectedMethod === 'ONLINE_BANKING' && (
                  <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 mt-6 shadow-sm">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
                      <UploadCloud size={14} className="text-violet-500" /> Upload Transfer Receipt
                    </h3>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 hover:border-violet-300 transition-all bg-[#F8FAFC]">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                          <UploadCloud size={18} className="text-violet-500" />
                        </div>
                        <p className="text-xs font-bold text-[#0F172A]">
                          <span className="text-violet-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">PDF, JPG or PNG (MAX. 5MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*,.pdf"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    {receiptFile && (
                      <p className="text-[11px] font-bold text-emerald-500 mt-3 flex items-center gap-1.5 uppercase tracking-wider">
                        <ShieldCheck size={14} /> Attached: {receiptFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <BlurFade delay={0.2}>
              <div className="bg-white border border-white rounded-[2.5rem] p-8 sticky top-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                <h3 className="text-lg font-bold text-[#0F172A] mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Provider</span>
                    <span className="text-[#0F172A] text-sm font-black text-right">{invoice.business_name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Service</span>
                    <span className="text-[#0F172A] text-sm font-black text-right line-clamp-2 w-2/3">{invoice.service_name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Invoice No.</span>
                    <span className="text-[#0F172A] text-sm font-black text-right">#{invoice.invoice_id}</span>
                  </div>
                </div>

                <div className="flex flex-col mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Due</span>
                  <span className="text-3xl font-black text-[#0F172A] tracking-tight">
                    RM {Number(invoice.total_amount).toFixed(2)}
                  </span>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full bg-[#0F172A] text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Processing...' : `Pay RM ${Number(invoice.total_amount).toFixed(2)}`}
                </button>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mt-5 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" /> Secure encrypted payment
                </p>
              </div>
            </BlurFade>
          </div>

        </div>
      </div>

      <PaymentSuccessModal 
        isOpen={showSuccessModal} 
        amount={invoice?.total_amount} 
        onClose={handleSuccessClose} 
      />
    </div>
  );
}