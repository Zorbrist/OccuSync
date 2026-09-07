export default function ServicesGrid() {
  const services = [
    { name: "Aircon Repair", rating: "4.9 ★", price: "From $80", desc: "Chemical overhaul, gas top-ups, leaking fixes" },
    { name: "Aircon Maintenance", rating: "4.8 ★", price: "From $50", desc: "Regular quarterly servicing & filter cleaning" },
    { name: "Aircon Installation", rating: "5.0 ★", price: "From $350", desc: "Inverter system setups, pipe trunking, multi-split" },
    { name: "Electrical Wiring", rating: "4.9 ★", price: "From $90", desc: "Short circuit repair, DB box upgrades, lighting" },
    { name: "Plumbing Unclog", rating: "4.7 ★", price: "From $70", desc: "Drain clearage, pipe leaks, sanitary installations" },
    { name: "Deep Home Cleaning", rating: "4.8 ★", price: "From $120", desc: "Post-renovation, tenancy handover, disinfection" }
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">SERVICE PROVIDER PORTAL</h2>
        <p className="text-slate-500 text-sm mt-1">Book directly or manage scheduled assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                <span className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">{item.rating}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">{item.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">{item.price}</span>
              <button className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}