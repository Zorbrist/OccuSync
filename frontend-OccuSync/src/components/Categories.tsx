import { ShieldCheck, Wrench, Building, Home, Zap, Brush } from 'lucide-react';

export default function Categories() {
  const categories = [
    { title: "Residential Repairs", icon: Home, count: "1.2k Providers" },
    { title: "HVAC & Air Conditioning", icon: Zap, count: "850 Providers" },
    { title: "Commercial Plumbing", icon: Wrench, count: "620 Providers" },
    { title: "Facility Maintenance", icon: Building, count: "410 Providers" },
    { title: "Electrical Installations", icon: ShieldCheck, count: "930 Providers" },
    { title: "Landscaping & Cleaning", icon: Brush, count: "1.5k Providers" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">CUSTOMER CATEGORIES</h2>
        <p className="text-slate-500 text-sm mt-1">Browse verified service categories near you</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-blue-500 transition cursor-pointer flex flex-col items-center text-center group shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{cat.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}