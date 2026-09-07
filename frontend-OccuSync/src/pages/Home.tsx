import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import Categories from '../components/Categories';
import ServicesGrid from '../components/ServicesGrid';
import DashboardPreview from '../components/DashboardPreview';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

export default function Home({ currentPage, onNavigate }: { currentPage?: string; onNavigate?: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-blur rounded-full pointer-events-none -z-0"></div>
      
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      
      <div className="relative z-10 flex-grow">
        <Hero />
        <Metrics />
        <Categories />
        <ServicesGrid />
        <DashboardPreview />
        <ContactUs />
      </div>

      <Footer />
    </main>
  );
}