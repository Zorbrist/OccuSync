// pages/CustomerPayment.tsx
import { 
  ArrowLeft, 
  CreditCard, 
  Landmark, 
  Smartphone,  
  UploadCloud, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { usePaymentData } from '../../hooks/usePaymentData';
import PaymentSuccessModal from '../../components/PaymentSuccessModal';

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
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Initializing secure checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 p-6">
        <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
          <p className="text-slate-300 mb-6">{error || "Invoice not found"}</p>
          <button onClick={() => navigate('/customer/invoices')} className="px-6 py-2 bg-slate-800 text-slate-200 rounded-xl">Go Back</button>
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 relative overflow-hidden py-12">
      
      {/* Ambient Background */}
      <div className="fixed top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Invoice</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Payment Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-2 flex items-center gap-2">
                <Lock size={20} className="text-emerald-400" /> Secure Checkout
              </h1>
              <p className="text-slate-400 text-sm">Select your preferred payment method to complete this transaction.</p>
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
                      p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col gap-3
                      ${isSelected 
                        ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-950 text-slate-400'}`}>
                        <Icon size={20} />
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-500' : 'border-slate-700'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>}
                      </div>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isSelected ? 'text-slate-200' : 'text-slate-300'}`}>{method.label}</h3>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Receipt Upload Section (Condition based on method) */}
            {selectedMethod === 'ONLINE_BANKING' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mt-6 animate-fade-in-up">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <UploadCloud size={16} className="text-indigo-400" /> Upload Transfer Receipt
                </h3>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all bg-slate-950/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud size={24} className="text-slate-400 mb-2" />
                    <p className="text-sm text-slate-400">
                      <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (MAX. 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*,.pdf"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  />
                </label>
                {receiptFile && (
                  <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1">
                    <ShieldCheck size={14} /> Attached: {receiptFile.name}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sticky top-6 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-100 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex justify-between items-start">
                  <span className="text-slate-400 text-sm">Provider</span>
                  <span className="text-slate-200 text-sm font-medium text-right">{invoice.business_name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-400 text-sm">Service</span>
                  <span className="text-slate-200 text-sm font-medium text-right line-clamp-2 w-2/3">{invoice.service_name}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-400 text-sm">Invoice No.</span>
                  <span className="text-slate-200 text-sm font-medium text-right">#{invoice.invoice_id}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-slate-300 font-semibold">Total Due</span>
                <span className="text-3xl font-bold text-emerald-400 tracking-tight">
                  RM {Number(invoice.total_amount).toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Processing...' : `Pay RM ${Number(invoice.total_amount).toFixed(2)}`}
              </button>

              <p className="text-[10px] text-slate-500 text-center mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Payments are secure and encrypted
              </p>
            </div>
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
