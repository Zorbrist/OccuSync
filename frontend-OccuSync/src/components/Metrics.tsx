export default function Metrics() {
  const stats = [
    { label: "Active Service Pros", value: "20,000+" },
    { label: "Bookings Completed", value: "85M+" },
    { label: "Average Customer Rating", value: "2.4k+ (4.9★)" }
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-10 text-white shadow-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold">FOR USERS & SERVICE PROVIDERS</h2>
          <p className="text-blue-200 mt-2 text-sm max-w-xl mx-auto">
            Whether you are looking for a reliable pro or running a field operations team, OccuSync simplifies your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="pt-6 md:pt-0">
              <div className="text-4xl md:text-5xl font-black text-white">{stat.value}</div>
              <div className="text-blue-200 font-medium mt-2 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}