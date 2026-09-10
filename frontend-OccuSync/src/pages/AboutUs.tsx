import Navbar from '../components/home_page/Navbar';
import Footer from '../components/home_page/Footer';
import { Target, ShieldCheck, Users, Zap, Sparkles } from 'lucide-react';

export default function AboutUs({  }: { currentPage?: string; onNavigate?: (page: string) => void }) {
  const values = [
    {
      icon: Target,
      title: 'Precision Dispatching',
      description: 'Automated technician matching based on skills, location, availability, and active workload.'
    },
    {
      icon: ShieldCheck,
      title: 'Trust & Verification',
      description: 'Comprehensive business verification and credential tracking to ensure client security.'
    },
    {
      icon: Zap,
      title: 'Seamless Automation',
      description: 'End-to-end management from initial service request to invoicing, payment, and maintenance reminders.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Empowering field businesses to offer instant booking, live tracking, and transparent communication.'
    }
  ];

  const milestones = [
    { number: '10k+', label: 'Active Technicians' },
    { number: '99.8%', label: 'On-Time Dispatch Rate' },
    { number: '500k+', label: 'Jobs Managed Annually' },
    { number: '4.9★', label: 'Service Provider Rating' }
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <Navbar />

      <div className="relative z-10 flex-grow max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6 text-blue-700 font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> About OccuSync
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Connecting Service Pros with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600">
              Operational Excellence
            </span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            OccuSync is the all-in-one central SaaS platform designed to transition small service businesses away from fragmented spreadsheets, paper records, and manual chats into streamlined operational synchronicity.
          </p>
        </div>

        {/* Mission Statement Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-16">
          <div className="max-w-2xl">
            <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">Our Mission</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-4">
              To empower field service teams with intelligent, hands-free automation.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Whether handling air conditioning, electrical work, plumbing, cleaning, or landscaping, OccuSync bridges service providers and clients through automated scheduling, smart route dispatching, friction-free invoicing, and proactive maintenance tracking.
            </p>
          </div>
        </div>

        {/* Key Values Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">Why Choose OccuSync</h2>
            <p className="text-slate-500 text-sm mt-1">Built specifically for modern field operations and service teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones / Impact Stats */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl md:text-4xl font-extrabold text-blue-600">{m.number}</div>
                <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}