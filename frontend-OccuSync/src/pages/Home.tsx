
function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
          Welcome to OccuSync
        </h1>

        <p className="mb-8 max-w-xl text-lg text-gray-600">
          Find the services you need, connect with trusted providers, and get
          things done with ease.
        </p>

        <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
          Get Started
        </button>
      </section>
    </main>
  );
}

export default Home;

