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
    <div className="p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-extrabold text-rose-950">
          Merchant Support
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Get help managing your CoreBiz business account.
        </p>

      </div>

      {/* SEARCH */}
      <div className="bg-gradient-to-r from-rose-950 to-red-900 rounded-3xl p-8 mb-8">

        <h2 className="text-2xl font-black text-white">
          How can we help?
        </h2>

        <p className="text-rose-200 mt-1 mb-5">
          Search our help centre for answers.
        </p>

        <div className="relative max-w-2xl">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search for help..."
            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-sm"
          />

        </div>

      </div>

      {/* SUPPORT OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* HELP CENTRE */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center mb-4">
            <BookOpen size={22} />
          </div>

          <h3 className="font-bold text-lg">
            Help Centre
          </h3>

          <p className="text-sm text-slate-400 mt-2">
            Browse guides and tutorials for using CoreBiz.
          </p>

          <button className="text-sm font-bold text-rose-950 mt-4 hover:underline">
            Browse guides →
          </button>

        </div>

        {/* LIVE CHAT */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center mb-4">
            <MessageCircle size={22} />
          </div>

          <h3 className="font-bold text-lg">
            Live Chat
          </h3>

          <p className="text-sm text-slate-400 mt-2">
            Chat with our support team about your problem.
          </p>

          <button className="text-sm font-bold text-rose-950 mt-4 hover:underline">
            Start conversation →
          </button>

        </div>

        {/* EMAIL */}
        <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-950 flex items-center justify-center mb-4">
            <Mail size={22} />
          </div>

          <h3 className="font-bold text-lg">
            Email Support
          </h3>

          <p className="text-sm text-slate-400 mt-2">
            Send our support team a detailed message.
          </p>

          <button className="text-sm font-bold text-rose-950 mt-4 hover:underline">
            Contact support →
          </button>

        </div>

      </div>

      {/* FAQ */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-950/5">

        <div className="p-6 border-b border-slate-100">

          <h2 className="font-bold text-lg">
            Frequently Asked Questions
          </h2>

        </div>

        <div>

          {faqs.map((faq, index) => (

            <button
              key={index}
              className="w-full flex items-center justify-between px-6 py-5 text-left border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
            >

              <span className="text-sm font-semibold text-slate-700">
                {faq}
              </span>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}