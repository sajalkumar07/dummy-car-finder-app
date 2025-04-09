/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate random avatar URLs using different styles
  const avatarStyles = useMemo(() => {
    return [
      // Each testimonial gets a different style of avatar
      `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`,
      `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random()}`,
      `https://api.dicebear.com/7.x/personas/svg?seed=${Math.random()}`,
    ].map((url) => "/api/placeholder/80/80"); // Fallback to placeholder since external URLs aren't allowed
  }, []);

  // Sample testimonials data with random avatars
  const testimonials = [
    {
      quote:
        "The process was seamless from start to finish. I found my dream car in just three days, and the team at GoCar made financing a breeze.",
      author: "Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      avatar: avatarStyles[0],
      carPurchased: "Toyota Corolla 2022",
    },
    {
      quote:
        "I was skeptical about buying a car online, but GoCar exceeded all my expectations. Their virtual tour feature let me see every detail before making a decision.",
      author: "Michael Rodriguez",
      location: "Chicago, IL",
      rating: 5,
      avatar: avatarStyles[1],
      carPurchased: "Honda Civic 2021",
    },
    {
      quote:
        "Best car shopping experience I've ever had. The price transparency and no-haggle policy made everything stress-free. I'll never go back to traditional dealerships.",
      author: "Jennifer Lee",
      location: "Austin, TX",
      rating: 5,
      avatar: avatarStyles[2],
      carPurchased: "Hyundai Creta 2023",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Function to generate initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">Don't just take our word for it</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-6 left-6 text-blue-100">
              <Quote size={120} strokeWidth={1} />
            </div>
            <div className="absolute bottom-6 right-6 text-blue-50">
              <Quote size={90} strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-12">
              <div
                className={`transition-opacity duration-500 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex justify-center mb-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-3 h-3 mx-1 rounded-full transition-all ${
                        i === activeIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    {/* Avatar with fallback to initials */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold">
                      {getInitials(testimonials[activeIndex].author)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full">
                      <Star size={16} fill="white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="text-xl text-gray-700 mb-6 text-center italic leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </p>

                <div className="text-center">
                  <h4 className="font-medium text-gray-900 text-lg">
                    {testimonials[activeIndex].author}
                  </h4>
                  <p className="text-gray-500 text-sm mb-2">
                    {testimonials[activeIndex].location}
                  </p>
                  <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Purchased: {testimonials[activeIndex].carPurchased}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
