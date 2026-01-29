import AboutUs from "@/components/Home/AboutUs";
import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Services from "@/components/Home/Services";
import Testimonials from "@/components/Home/Testimonials";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Contact from "@/components/Home/Contact";

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default HomePage;
