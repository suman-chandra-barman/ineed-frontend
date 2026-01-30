import Reviews from "@/components/ServiceDetails/Reviews";
import ServiceBooking from "@/components/ServiceDetails/ServiceBooking";
import ServiceGallery from "@/components/ServiceDetails/ServiceGallery";
import ServiceInfo from "@/components/ServiceDetails/ServiceInfo";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";
import { ChevronRight, Heart, Home, Star } from "lucide-react";

// This would typically come from an API/database
const serviceData = {
  id: "1",
  name: "Lighting Services",
  bookings: 302,
  rating: 4.9,
  reviewsCount: 123,
  price: 457,
  originalPrice: 875,
  discount: 50,
  images: [sercice1, sercice2, sercice3, sercice4],
  overview: {
    title: "Service Overview",
    description:
      "Ideal for ongoing home maintenance, this service delivers reliable and thorough cleaning to keep your home looking its best. We focus on everyday cleanliness while our team manages quality, scheduling, and support for you. Designed for regular upkeep, our Standard Home Cleaning helps maintain a clean and healthy home environment. From everyday surfaces to commonly used areas, we make sure your space stays neat without the hassle.",
  },
  additionalServices: [
    {
      id: "1",
      name: "Inside Refrigerator Cleaning",
      description:
        "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
      price: 30,
      duration: 30,
      image: sercice1,
    },
    {
      id: "2",
      name: "Laundry (Wash & Fold)",
      description:
        "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
      price: 30,
      duration: 30,
      image: sercice2,
    },
    {
      id: "3",
      name: "Extra Bathroom Cleaning",
      description:
        "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
      price: 30,
      duration: 30,
      image: sercice3,
    },
    {
      id: "4",
      name: "Garage Cleaning (light)",
      description:
        "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
      price: 30,
      duration: 30,
      image: sercice4,
    },
  ],
  serviceHours: [
    { day: "Monday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Sunday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Wednesday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Thursday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Friday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Saturday", hours: "9:30 AM - 7:00 PM", closed: false },
    { day: "Sunday", hours: "", closed: true },
  ],
  reviews: {
    total: 235,
    average: 4.9,
    totalReviews: 2650,
    breakdown: [
      { stars: 5, count: 156 },
      { stars: 4, count: 156 },
      { stars: 3, count: 156 },
      { stars: 2, count: 156 },
      { stars: 1, count: 156 },
    ],
    items: [
      {
        id: "1",
        author: "Adrian Hendriques",
        avatar:
          "https://ui-avatars.com/api/?name=Adrian+Hendriques&background=3b82f6&color=fff&size=96",
        date: "2 days ago",
        serviceType: "Excellences Service!",
        rating: 4.9,
        comment:
          "The quality of work was exceptional, and they Jcft tbc sftc clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!",
        likes: 26,
        dislikes: 6,
      },
      {
        id: "2",
        author: "Sarah Martinez",
        avatar:
          "https://ui-avatars.com/api/?name=Sarah+Martinez&background=10b981&color=fff&size=96",
        date: "2 days ago",
        serviceType: "Greate Service!",
        rating: 4.9,
        comment:
          "The quality of work was exceptional, and they Jcft tbc sftc clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!",
        likes: 26,
        dislikes: 6,
      },
      {
        id: "3",
        author: "Michael Chen",
        avatar:
          "https://ui-avatars.com/api/?name=Michael+Chen&background=f59e0b&color=fff&size=96",
        date: "2 days ago",
        serviceType: "Reliabel & trustworthy Service!",
        rating: 4.0,
        comment:
          "The quality of work was exceptional, and they Jcft tbc sftc clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!",
        likes: 26,
        dislikes: 6,
      },
    ],
  },
};

export default function ServiceDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 py-8 sm:py-12 lg:py-16 bg-primary/5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Services
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Home size={20} />
          <ChevronRight size={20} />
          <span>Category</span>
          <ChevronRight size={20} />
          <span>Service Details</span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {serviceData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {serviceData.bookings}+ Bookings
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {serviceData.rating}/5
                  </span>
                  <span className="text-sm text-gray-500">
                    ({serviceData.reviewsCount} reviews)
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <ServiceGallery images={serviceData.images} />
            <ServiceInfo
              overview={serviceData.overview}
              additionalServices={serviceData.additionalServices.map(
                (service) => ({
                  ...service,
                  image: service.image.src,
                }),
              )}
            />
            <Reviews reviews={serviceData.reviews} />
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ServiceBooking
                serviceId={serviceData.id}
                price={serviceData.price}
                originalPrice={serviceData.originalPrice}
                discount={serviceData.discount}
                serviceHours={serviceData.serviceHours}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
