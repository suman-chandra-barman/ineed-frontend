import ServiceCard from "@/components/Cards/ServiceCard";
import PageHeader from "@/components/Dashboard/PageHeader";
import { Service } from "@/components/Home/Services";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";

const services: Service[] = [
  {
    id: 1,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 2,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 3,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 4,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
  {
    id: 5,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 6,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 7,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 8,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
];


function FavoritePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
      <PageHeader title="Favorite" />

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default FavoritePage;
