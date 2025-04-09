import {
  Heart,
  ArrowLeft,
  Phone,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  Gauge,
  Car,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const CarDetail = ({ cars, wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const car = cars.find((c) => c.id.toString() === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Car Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === car.id);

  const features = [
    { icon: <Car size={18} />, label: "Brand", value: car.brand },
    { icon: <Calendar size={18} />, label: "Year", value: car.year },
    {
      icon: <Gauge size={18} />,
      label: "Mileage",
      value: `${car.mileage.toLocaleString()} km`,
    },
    { icon: <Zap size={18} />, label: "Fuel", value: car.fuelType },
    { icon: <Users size={18} />, label: "Seats", value: car.seating },
    {
      icon: <ShieldCheck size={18} />,
      label: "Transmission",
      value: car.transmission,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/cars"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to results
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Image Gallery */}
          <div className="relative">
            <img
              src={car.imageURL}
              alt={car.carName}
              className="w-full h-96 object-contain"
            />
            <button
              onClick={() => toggleWishlist(car)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm ${
                isInWishlist
                  ? "bg-red-500/90 text-white"
                  : "bg-white/80 text-gray-700 hover:bg-gray-100/90"
              } transition-colors`}
            >
              <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.carName}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {car.brand} • {car.model}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{feature.label}</p>
                        <p className="font-medium text-gray-900">
                          {feature.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-600">
                    {car.description ||
                      "This premium vehicle offers exceptional performance and comfort. With its well-maintained condition and low mileage, it represents excellent value in its class."}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{car.price.toLocaleString()}
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Available
                    </span>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      <Phone size={18} />
                      Contact Seller
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                      Schedule Test Drive
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Seller Information
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">SS</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sajal Soni</p>
                        <p className="text-sm text-gray-500">
                          Certified Dealer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
