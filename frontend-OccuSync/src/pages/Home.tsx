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
    <main className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col justify-between">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-blur rounded-full pointer-events-none -z-0"></div>

      <Navbar />

      <div className="relative z-10 flex-grow">
        <Hero />
        <Metrics />
        <Categories />


        <section id="services">
          <ServicesGrid />
        </section>

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