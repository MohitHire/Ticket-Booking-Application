import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const API_KEY = "18da1d3c";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [trending, setTrending] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [featuredRes, trendingRes] = await Promise.all([
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`),
          axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`),
        ]);

        setLatest(featuredRes.data.Search.slice(0, 6));
        setTrending(trendingRes.data.Search.slice(0, 12));
      } catch (error) {
        console.error("Error fetching OMDb data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Timeout fallback
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar city={city} setCity={setCity} />
      <main className="home-main">
        {/* Hero Slider */}
        <section className="hero-section">
          <h2 className="section-title">Featured Now in {city}</h2>
          <div className="slider-container">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 8000, disableOnInteraction: false }}
              navigation={true}
              pagination={{ clickable: true }}
              modules={[Autoplay, Navigation, Pagination]}
              className="featured-slider"
            >
              {latest.map((movie) => (
                <SwiperSlide key={movie.imdbID}>
                  <div className="featured-slide">
                    <img
                      loading="lazy"
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/1280x720?text=No+Image"
                      }
                      alt={movie.Title}
                      className="featured-image"
                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                    />
                    <div className="featured-overlay">
                      <div className="featured-content">
                        <h3 className="featured-title">{movie.Title}</h3>
                        <p className="featured-description">
                          {movie.Year} | {movie.Type}
                        </p>
                        <button
                          className="featured-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${movie.imdbID}`, { state: { city } });
                          }}
                        >
                          Book Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Trending Movies */}
        <section className="trending-section">
          <div className="section-header">
            <h2 className="section-title">Trending This Week</h2>
            <button className="see-all" onClick={() => navigate("/trending")}>
              See All
            </button>
          </div>

          <div className="trending-grid">
            {trending.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                <div className="movie-poster">
                  <img
                    loading="lazy"
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.Title}
                  />
                  <div className="movie-rating">
                    <span>{movie.Year}</span>
                  </div>
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.Title}</h3>
                  <p className="movie-genre">{movie.Type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2023 CineFlexBooking. All rights reserved.</p>
      </footer>
    </div>
  );
}
