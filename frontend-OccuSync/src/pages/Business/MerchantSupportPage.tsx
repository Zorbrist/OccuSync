import {
  Search,
  MessageCircle,
  BookOpen,
  Mail,
  ChevronRight,
} from 'lucide-react';

export default function MerchantSupportPage() {
  const faqs = [
    'How do I create a new service listing?',
    'How can I manage customer orders?',
    'How do I send a quotation?',
    'How are payouts processed?',
    'How can I update my business information?',
  ];

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-[#1E293B]">Merchant Support</h1>
          <p className="text-sm text-slate-500 mt-1">Get help managing your CoreBiz business account.</p>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-8 mb-10 text-center">
          <h2 className="text-[#1E293B] text-lg font-semibold mb-2">How can we help?</h2>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Search our help centre for answers
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full bg-[#F1F5F9] shadow-inner rounded-[1.5rem] py-4 pl-12 pr-6 outline-none text-sm text-[#1E293B] placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200 transition-all border-none"
            />
          </div>
        </div>

        {/* SUPPORT OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* HELP CENTRE */}
          <div className="bg-white p-8 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.05)] hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center mb-6">
              <BookOpen size={22} />
            </div>
            <h3 className="font-semibold text-sm text-[#1E293B] mb-2">Help Centre</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">
              Browse guides and tutorials for using CoreBiz.
            </p>
            <button className="text-[11px] font-semibold uppercase tracking-wider text-black hover:text-slate-500 transition-colors flex items-center gap-1">
              Browse guides <ChevronRight size={14} />
            </button>
          </div>

          {/* LIVE CHAT */}
          <div className="bg-white p-8 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.05)] hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center mb-6">
              <MessageCircle size={22} />
            </div>
            <h3 className="font-semibold text-sm text-[#1E293B] mb-2">Live Chat</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">
              Chat with our support team about your problem.
            </p>
            <button className="text-[11px] font-semibold uppercase tracking-wider text-black hover:text-slate-500 transition-colors flex items-center gap-1">
              Start conversation <ChevronRight size={14} />
            </button>
          </div>

          {/* EMAIL */}
          <div className="bg-white p-8 rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.05)] hover:shadow-[0_12px_30px_rgba(149,157,165,0.1)] transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B] flex items-center justify-center mb-6">
              <Mail size={22} />
            </div>
            <h3 className="font-semibold text-sm text-[#1E293B] mb-2">Email Support</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">
              Send our support team a detailed message.
            </p>
            <button className="text-[11px] font-semibold uppercase tracking-wider text-black hover:text-slate-500 transition-colors flex items-center gap-1">
              Contact support <ChevronRight size={14} />
            </button>
          </div>

        </div>

        {/* FAQ */}
        <div className="bg-white rounded-[1.5rem] border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.1)] overflow-hidden p-2">
          <div className="p-6">
            <h2 className="text-[#1E293B] font-semibold text-sm">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-6 py-4 text-left rounded-[1rem] hover:bg-[#F1F5F9] transition-all duration-200 group"
              >
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#1E293B]">
                  {faq}
                </span>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-black border border-slate-50 transition-all">
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}