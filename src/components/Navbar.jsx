import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const topCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune",
  "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Bhopal"
];

const cityToCountryCode = {
  Mumbai: "IN",
  Delhi: "IN",
  Bangalore: "IN",
  Hyderabad: "IN",
  Chennai: "IN",
  Pune: "IN",
  Kolkata: "IN",
  Ahmedabad: "IN",
  Jaipur: "IN",
  Lucknow: "IN",
  Surat: "IN",
  Bhopal: "IN"
};

export default function Navbar({ city, setCity, setRegion }) {
  const nav = useNavigate();
  const [userCity, setUserCity] = useState(city || "Detecting...");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const detectedCity = data.address.city || data.address.state || "Your City";
        setUserCity(detectedCity);
        setCity && setCity(detectedCity);
        if (setRegion && cityToCountryCode[detectedCity]) {
          setRegion(cityToCountryCode[detectedCity]);
        }
      } catch {
        setUserCity("Unknown");
      }
    });
  }, []);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setUserCity(selectedCity);
    setCity && setCity(selectedCity);
    if (setRegion && cityToCountryCode[selectedCity]) {
      setRegion(cityToCountryCode[selectedCity]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      nav(`/?query=${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => nav("/")}>
          <span className="navbar-logo">🎬</span>
          <span className="navbar-title">CineFlex</span>
        </div>
        
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <div className="navbar-location">
          <i className="fas fa-map-marker-alt location-icon"></i>
          <select 
            value={userCity} 
            onChange={handleCityChange}
            className="city-selector"
          >
            {topCities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div className="navbar-actions">
          <button className="btn-login" onClick={() => nav("/login")}>
            Sign In
          </button>
          <button className="btn-signup">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}