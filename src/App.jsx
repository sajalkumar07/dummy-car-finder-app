import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Landing from "./assets/pages/Landing";
import CarListing from "./assets/pages/CarListing";
import CarDetail from "./assets/pages/CarDetail";
import Wishlist from "./assets/pages/Wishlist";

const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Failed to parse ${key}`, error);
    return defaultValue;
  }
};

function App() {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState(loadFromStorage("carWishlist", []));
  const [loading, setLoading] = useState(true);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("carWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "https://67f6c68142d6c71cca633ecb.mockapi.io/api/v1/cars"
        );
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const toggleWishlist = (car) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === car.id);
      return isInWishlist
        ? prev.filter((item) => item.id !== car.id)
        : [...prev, car];
    });
  };

  return (
    <Router>
      <Navbar wishlistCount={wishlist.length} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/cars"
          element={
            <CarListing
              cars={cars}
              loading={loading}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        <Route
          path="/cars/:id"
          element={
            <CarDetail
              cars={cars}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
