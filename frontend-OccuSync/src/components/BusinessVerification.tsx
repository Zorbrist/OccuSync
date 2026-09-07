import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function BusinessVerification() {
  return (
    <section id="verification" className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Business Verification Status</h2>
        <p className="text-slate-500 text-center text-sm mb-8">Ensure your service compliance and trust ratings are active.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-3" />
            <h3 className="font-bold text-emerald-950">VERIFIED</h3>
            <p className="text-xs text-emerald-700 mt-2">All business documents, licenses, and insurance policies are fully validated.</p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center text-center">
            <Clock className="w-10 h-10 text-amber-600 mb-3" />
            <h3 className="font-bold text-amber-950">UNDER REVIEW</h3>
            <p className="text-xs text-amber-700 mt-2">Updated tax information and licenses submitted. Processing time: 24h.</p>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col items-center text-center">
            <AlertTriangle className="w-10 h-10 text-rose-600 mb-3" />
            <h3 className="font-bold text-rose-950">ACTION REQUIRED</h3>
            <p className="text-xs text-rose-700 mt-2">Annual liability certificate needs renewal to maintain priority booking.</p>
          </div>
        </div>
      </div>
    </section>
  );
}