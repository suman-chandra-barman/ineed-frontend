import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
    </main>
  );
}

export default HomePage;
