import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Connect With Us</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">LET'S TRANSFORM YOUR BUSINESS TODAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Email Support</h3>
            <p className="text-xs text-slate-500 mt-1">General enquiries & technical help</p>
            <a href="mailto:support@occusync.com" className="text-sm font-semibold text-blue-600 mt-3">support@occusync.com</a>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Hotline</h3>
            <p className="text-xs text-slate-500 mt-1">Mon-Fri from 8am to 6pm</p>
            <a href="tel:+18005550199" className="text-sm font-semibold text-blue-600 mt-3">+1 (800) 555-0199</a>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Head Office</h3>
            <p className="text-xs text-slate-500 mt-1">OccuSync HQ Technology Park</p>
            <span className="text-sm font-semibold text-blue-600 mt-3">San Francisco, CA</span>
          </div>
        </div>
      </div>
    </section>
  );
}