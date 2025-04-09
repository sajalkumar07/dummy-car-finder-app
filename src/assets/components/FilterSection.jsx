import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PriceSlider from "./PriceSlider";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FilterSection = ({ cars, onFilter }) => {
  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    transmission: "",
    priceRange: [0, 5000000],
    sortOrder: "",
  });

  // Get unique filter values
  const brands = [...new Set(cars.map((car) => car.brand))];
  const fuelTypes = [...new Set(cars.map((car) => car.fuelType))];
  const transmissions = [...new Set(cars.map((car) => car.transmission))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handlePriceChange = (newRange) => {
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const toggleFilter = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: filters[filterName] === value ? "" : value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSortChange = (value) => {
    const newFilters = { ...filters, sortOrder: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      brand: "",
      fuelType: "",
      transmission: "",
      priceRange: [0, 5000000],
      sortOrder: "",
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Reset all
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort Order Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by Price
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSortChange("lowToHigh")}
              className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                filters.sortOrder === "lowToHigh"
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Low to High
            </button>
            <button
              onClick={() => handleSortChange("highToLow")}
              className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                filters.sortOrder === "highToLow"
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              High to Low
            </button>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="relative w-full">
          <FormControl fullWidth size="small">
            <InputLabel id="brand-select-label">Brand</InputLabel>
            <Select
              labelId="brand-select-label"
              id="brand-select"
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              label="Brand"
            >
              <MenuItem value="">
                <em>All Brands</em>
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <PriceSlider
            min={0}
            max={5000000}
            value={filters.priceRange}
            onChange={handlePriceChange}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Fuel Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fuelTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter("fuelType", type)}
                className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                  filters.fuelType === type
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <div className="grid grid-cols-2 gap-2">
            {transmissions.map((trans) => (
              <button
                key={trans}
                onClick={() => toggleFilter("transmission", trans)}
                className={`py-2 px-3 rounded-lg text-sm border transition-colors ${
                  filters.transmission === trans
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {trans}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
