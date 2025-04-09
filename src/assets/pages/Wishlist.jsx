import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";

const Wishlist = ({ wishlist, toggleWishlist }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Your Wishlist ({wishlist.length})
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't added any cars to your wishlist yet
            </p>
            <Link
              to="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isInWishlist={true}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
