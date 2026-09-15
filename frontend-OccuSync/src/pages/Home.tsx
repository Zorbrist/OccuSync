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
    <main
      id="home"
      className="occusync-page min-h-screen relative overflow-x-hidden flex flex-col bg-[#05030a] text-slate-100"
    >

      {/* ========================================
          GLOBAL BACKGROUND
      ======================================== */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">

        {/* Top purple glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[150px]" />

        {/* Left maroon glow */}
        <div className="absolute top-[30%] -left-40 w-[500px] h-[500px] rounded-full bg-fuchsia-900/15 blur-[150px]" />

        {/* Bottom purple glow */}
        <div className="absolute bottom-[-200px] right-[10%] w-[550px] h-[550px] rounded-full bg-purple-900/20 blur-[160px]" />

      </div>

      {/* ========================================
          NAVBAR
      ======================================== */}
      <Navbar />

      {/* ========================================
          MAIN CONTENT
      ======================================== */}
      <div className="relative z-10 flex-grow">

        {/* HERO */}
        <Hero />

        {/* ========================================
            ABOUT / METRICS
        ======================================== */}
        <Metrics />

        {/* ========================================
            CUSTOMER CATEGORIES
        ======================================== */}
        <Categories />

        {/* ========================================
            SERVICE PROVIDER PORTAL
        ======================================== */}
        <ServicesGrid />

        {/* ========================================
            BUSINESS DASHBOARD
        ======================================== */}
        <section id="dashboard">
          <DashboardPreview />
        </section>

        {/* ========================================
            CONTACT
        ======================================== */}
        <section id="contact">
          <ContactUs />
        </section>

      </div>

      {/* ========================================
          FOOTER
      ======================================== */}
      <Footer />

    </main>
  );
}