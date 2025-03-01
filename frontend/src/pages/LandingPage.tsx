import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import GovernmentDocuments from "../components/GovernmentDocuments";
import FooterSection from "../components/FooterSection";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";

function LandingPage() {
  return (
    <>
      <div className="w-full header min-h-screen">
        <div className="container">
          <Navbar />
          <Hero />
        </div>
      </div>
      {/* Download government documents */}
      <GovernmentDocuments />

      {/* About KenyAlysis */}
      <AboutUs />
      {/* Testimonials */}
      <Testimonials />

      <FooterSection />
    </>
  );
}
export default LandingPage;
