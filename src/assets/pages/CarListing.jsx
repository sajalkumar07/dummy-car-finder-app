import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import CarCard from "../components/CarCard";
import FilterSection from "../components/FilterSection";

const CarListing = ({ cars, loading, wishlist, toggleWishlist }) => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    transmission: "",
    priceRange: [0, 5000000],
    sortOrder: "", // Added sortOrder to filters
  });
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;
  const resultsRef = useRef(null);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...cars];

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (car) =>
          car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Other filters
    if (filters.brand) {
      results = results.filter((car) => car.brand === filters.brand);
    }

    if (filters.fuelType) {
      results = results.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.transmission) {
      results = results.filter(
        (car) => car.transmission === filters.transmission
      );
    }

    if (filters.priceRange) {
      results = results.filter(
        (car) =>
          car.price >= filters.priceRange[0] &&
          car.price <= filters.priceRange[1]
      );
    }

    // Apply sorting
    if (filters.sortOrder === "lowToHigh") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "highToLow") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(results);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [cars, filters, searchTerm]);

  // Scroll to results when page changes
  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      brand: "",
      fuelType: "",
      transmission: "",
      priceRange: [0, 5000000],
      sortOrder: "",
    });
    setSearchTerm("");
  };

  const activeFiltersCount = [
    filters.brand,
    filters.fuelType,
    filters.transmission,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000,
    searchTerm,
    filters.sortOrder,
  ].filter(Boolean).length;

  // Loading skeleton array
  const loadingSkeletons = Array(6).fill(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Skeleton */}
            <div className="lg:w-1/4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="mb-6">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="h-4 bg-gray-100 rounded w-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="lg:w-3/4">
              {/* Search Skeleton */}
              <div className="mb-6">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Results Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingSkeletons.map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <FilterSection cars={cars} onFilter={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Active Filters */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, brand or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X
                      size={18}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  </button>
                )}
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center flex-wrap gap-2 mt-3">
                  <span className="text-sm text-gray-500">
                    {filteredCars.length} results • Active filters:
                  </span>
                  {filters.brand && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Brand: {filters.brand}
                    </span>
                  )}
                  {filters.fuelType && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Fuel: {filters.fuelType}
                    </span>
                  )}
                  {filters.transmission && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {filters.transmission}
                    </span>
                  )}
                  {(filters.priceRange[0] > 0 ||
                    filters.priceRange[1] < 5000000) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ₹{filters.priceRange[0].toLocaleString()} - ₹
                      {filters.priceRange[1].toLocaleString()}
                    </span>
                  )}
                  {filters.sortOrder && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Sort:{" "}
                      {filters.sortOrder === "lowToHigh"
                        ? "Low to High"
                        : "High to Low"}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            <div ref={resultsRef}>
              {currentCars.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCars.map((car, index) => (
                      <div
                        key={car.id}
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CarCard
                          car={car}
                          isInWishlist={wishlist.some(
                            (item) => item.id === car.id
                          )}
                          toggleWishlist={toggleWishlist}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className={`px-3 py-2 rounded-l-md border border-gray-300 ${
                            currentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Previous
                        </button>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 border-t border-b border-gray-300 ${
                              currentPage === page
                                ? "bg-blue-50 text-blue-600 border-blue-500"
                                : "bg-white text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 rounded-r-md border border-gray-300 ${
                            currentPage === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center animate-fadeIn">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No cars found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filters to find what you're
                    looking for
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
