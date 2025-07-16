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

// ✅ High-res static banners for Hero Slider
const bannerMovies = [
  {
    id: "tt4154796",
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: "tt4154756",
    title: "Avengers: Infinity War",
    description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation puts an end to the universe.",
    image: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    id: "tt7286456",
    title: "Joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He begins a slow descent into madness as he transforms into the criminal mastermind Joker.",
    image: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: "tt2911666",
    title: "John Wick",
    description: "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    image: "https://image.tmdb.org/t/p/original/b9uYMMbm87IBFOq59pppvkkkgNg.jpg",
  },
  {
    id: "tt1877830",
    title: "The Batman",
    description: "Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    image: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`
        );
        setTrending(res.data.Search.slice(0, 12));
      } catch (error) {
        console.error("Error fetching OMDb data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();

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
              {bannerMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <div className="featured-slide">
                    <img
                      loading="lazy"
                      src={movie.image}
                      alt={movie.title}
                      className="featured-image"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                    <div className="featured-overlay">
                      <div className="featured-content">
                        <h3 className="featured-title">{movie.title}</h3>
                        <p className="featured-description">
                          {movie.description}
                        </p>
                        <button
                          className="featured-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${movie.id}`, { state: { city } });
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
