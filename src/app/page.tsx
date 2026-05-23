import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import DonationSection from '@/components/sections/DonationSection';
import VolunteerSection from '@/components/sections/VolunteerSection';
import ImpactSection from '@/components/sections/ImpactSection';
import GallerySection from '@/components/sections/GallerySection';
import BlogSection from '@/components/sections/BlogSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <TeamSection />
        <DonationSection />
        <VolunteerSection />
        <ImpactSection />
        <GallerySection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
