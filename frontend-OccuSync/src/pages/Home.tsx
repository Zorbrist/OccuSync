import Navbar from '../components/home_page/Navbar';
import Hero from '../components/home_page/Hero';
import Metrics from '../components/home_page/Metrics';
import Categories from '../components/home_page/Categories';
import ServicesGrid from '../components/home_page/ServicesGrid';
import DashboardPreview from '../components/home_page/DashboardPreview';
import ContactUs from '../components/home_page/ContactUs';
import Footer from '../components/home_page/Footer';

export default function Home() {
  return (
    // Instead of a fixed div overlay:
    <main id="home" className="occusync-page min-h-screen relative overflow-x-hidden flex flex-col bg-white text-[#1E293B] font-sans">
      {/* Position absolute moves with the document scroll layer */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>
      ...

      <Navbar />

      <div className="relative z-10 flex-grow">
        <Hero />
        <Metrics />
        <Categories />
        <ServicesGrid />

        <section id="dashboard">
          <DashboardPreview />
        </section>

        <section id="contact">
          <ContactUs />
        </section>
      </div>

      <Footer />
    </main>
  );
}