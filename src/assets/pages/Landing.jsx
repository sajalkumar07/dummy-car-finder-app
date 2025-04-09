import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  ArrowRight,
  Star,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  MousePointer,
  Sparkles,
} from "lucide-react";
import Testimonials from "../components/Testimonials";

const Landing = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    // Auto-rotate features every 3 seconds
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  });

  const features = [
    {
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      title: "Verified Listings",
      description:
        "Every vehicle undergoes a 200-point inspection for your peace of mind",
    },
    {
      icon: <BadgeCheck size={24} className="text-blue-600" />,
      title: "Best Value",
      description:
        "We negotiate directly with sellers to secure the best prices",
    },
    {
      icon: <Star size={24} className="text-blue-600" />,
      title: "Premium Selection",
      description: "Curated collection of the finest vehicles in the market",
    },
  ];

  // Sample featured vehicles
  const featuredVehicles = [
    {
      id: 1,
      carName: "Toyota Corolla",
      brand: "Toyota",
      model: "Corolla",
      year: 2022,
      color: "Silver",
      mileage: 20000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      horsepower: 169,
      seating: 5,
      price: 2050000,
      imageURL:
        "https://imgd.aeplcdn.com/642x336/cw/ec/26588/Toyota-Corolla-Altis-Exterior-92974.jpg?wm=0&q=80",
    },
    {
      id: 2,
      carName: "Honda Civic",
      brand: "Honda",
      model: "Civic",
      year: 2021,
      color: "White",
      mileage: 25000,
      fuelType: "Gasoline",
      transmission: "Manual",
      horsepower: 158,
      seating: 5,
      price: 1900000,
      imageURL:
        "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/27074/civic-exterior-right-front-three-quarter-148155.jpeg?q=80&q=80",
    },
    {
      id: 3,
      carName: "Hyundai Creta",
      brand: "Hyundai",
      model: "Creta",
      year: 2023,
      color: "Blue",
      mileage: 10000,
      fuelType: "Diesel",
      transmission: "Automatic",
      horsepower: 113,
      seating: 5,
      price: 1800000,
      imageURL:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with parallax effect */}
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 h-screen flex items-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/api/placeholder/1200/800')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollPosition * 0.2}px)`,
          }}
        ></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-blue-600 bg-opacity-30 text-blue-200 text-sm">
              <Sparkles size={16} className="mr-2" />
              New models just arrived
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Find your <span className="text-blue-400">perfect</span> ride
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore our premium collection and experience a new standard in
              automotive excellence
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className=" ">
                {" "}
                <Link
                  to="/cars"
                  className="group inline-flex items-center px-8 py-4 bg-blue-800 hover:bg-blue-600 text-white font-medium rounded-xl transition-all"
                >
                  Browse Cars
                  <ArrowRight
                    size={20}
                    className="ml-3 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
              <div>
                {" "}
                <Link
                  to="/"
                  className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium rounded-lg transition-colors border border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown size={24} className="text-white/70" />
        </div>
      </section>

      {/* Features Section with interaction */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose GoCar
            </h2>
            <p className="text-gray-600">
              We're redefining the car buying experience with transparency and
              convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                  activeFeature === index
                    ? "border-blue-500 shadow-md"
                    : "border-transparent"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600">
              Explore our latest and most popular offerings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all"
              >
                <div className="relative">
                  <img
                    src={vehicle.imageURL}
                    alt={vehicle.carName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <span className="text-gray-500 ">{vehicle.year}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {vehicle.horsepower} HP
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {vehicle.mileage.toLocaleString()} km
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {vehicle.fuelType}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {vehicle.transmission}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-blue-600 font-bold text-lg">
                      ₹{vehicle.price.toLocaleString()}
                    </p>
                    <Link
                      to={`/cars/${vehicle.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/cars"
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
            >
              View All Vehicles
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials with carousel indicator */}
      <Testimonials></Testimonials>
      {/* CTA Section with gradient background */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to find your dream car?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect
              vehicle with us. Start your journey today.
            </p>
            <Link
              to="/cars"
              className="group inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-800 font-medium rounded-xl transition-all"
            >
              Start Your Search
              <ArrowRight
                size={20}
                className="ml-3 group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold">25k+</p>
                <p className="text-sm opacity-80">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">1,500+</p>
                <p className="text-sm opacity-80">Vehicles Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">4.9</p>
                <p className="text-sm opacity-80">Customer Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm opacity-80">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
