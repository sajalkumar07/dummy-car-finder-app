import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CarCard = ({ car, isInWishlist, toggleWishlist }) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 ">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.imageURL}
          alt={car.carName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(car);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isInWishlist
              ? "bg-red-500/90 text-white"
              : "bg-white/80 text-gray-700 hover:bg-gray-100/90"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/cars/${car.id}`} className="hover:underline">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
              {car.carName}
            </h3>
          </Link>
          <span className="text-sm font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded">
            {car.year}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {car.brand} • {car.model}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {car.fuelType}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {car.transmission}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {car.mileage.toLocaleString()} km
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ₹{car.price.toLocaleString()}
          </span>
          <Link
            to={`/cars/${car.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 group"
          >
            View details
            <ArrowRight
              size={16}
              className="ml-1 group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
