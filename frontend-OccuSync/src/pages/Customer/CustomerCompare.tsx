

export default function CustomerCompare() {
  return (
    <div className="flex min-h-screen bg-[#f4f7f9] font-sans">
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-[#233876] mb-8">Compare Services</h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">No services selected</h2>
          <p className="text-gray-500 mb-6">Browse services and click "Compare" to see them side-by-side here.</p>
          <button className="bg-[#233876] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
            Find Services
          </button>
        </div>
      </div>
    </div>
  );
}