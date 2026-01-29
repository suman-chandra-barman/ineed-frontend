import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Services from "@/components/Home/Services";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <Services />
    </main>
  );
}

export default HomePage;
