import { ArrowRight, ShieldCheck, Zap, Users, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center">
      
      {/* Main Headline */}
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl leading-tight text-center">
        Empower Your Field Operations with <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600">
          Intelligent Automation
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-slate-600 max-w-2xl text-lg text-center leading-relaxed">
        Replace spreadsheets and fragmented WhatsApp chats. OccuSync unifies smart technician matching, automated scheduling, real-time job tracking, and invoicing into one platform.
      </p>

      {/* Call To Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button className="btn-primary text-sm py-3.5 px-8 w-full sm:w-auto flex items-center justify-center gap-2 group">
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-semibold text-sm py-3.5 px-8 rounded-xl transition w-full sm:w-auto shadow-xs">
          Schedule Live Demo
        </button>
      </div>

      {/* Feature Value Highlights */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Smart Dispatch</h4>
            <p className="text-xs text-slate-500">Skill & location matching</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Instant Verification</h4>
            <p className="text-xs text-slate-500">Automated compliance</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">Automated CRM</h4>
            <p className="text-xs text-slate-500">Invoicing & job history</p>
          </div>
        </div>
      </div>

      {/* Interactive Platform Mock Preview Card */}
      <div className="mt-12 w-full max-w-4xl bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-mono text-slate-400 ml-2">occusync.app/dispatch-overview</span>
          </div>
          <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
            Live System Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <div className="text-xs text-blue-400 font-bold mb-1">AUTO-DISPATCH</div>
            <div className="font-semibold text-sm text-slate-100">Aircon Maintenance</div>
            <div className="text-xs text-slate-400 mt-2">Technician: Marcus V. (Nearest)</div>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <div className="text-xs text-amber-400 font-bold mb-1">SCHEDULED REMINDER</div>
            <div className="font-semibold text-sm text-slate-100">Plumbing Inspection</div>
            <div className="text-xs text-slate-400 mt-2">Client Notification Sent</div>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50">
            <div className="text-xs text-emerald-400 font-bold mb-1">PAYMENT COMPLETED</div>
            <div className="font-semibold text-sm text-slate-100">Electrical Wiring Fix</div>
            <div className="text-xs text-slate-400 mt-2">Invoice #INV-2026-08</div>
          </div>
        </div>
      </div>
    </section>
  );
}