import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './TicketBooking.css';
import Navbar from '../components/Navbar';

const API_KEY = "aa6d4841b99d2aab47e7dd4123d88147";

export default function TicketBooking() {
  const { movieId } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  // Sample cinema data
  const cinemas = [
    { id: 1, name: "CineFlex Andheri", location: "Andheri West, Mumbai" },
    { id: 2, name: "CineFlex Bandra", location: "Bandra Kurla Complex, Mumbai" },
    { id: 3, name: "CineFlex Thane", location: "Thane West, Mumbai" }
  ];

  // Sample showtimes
  const showtimes = ["10:00 AM", "1:30 PM", "4:00 PM", "6:30 PM", "9:00 PM"];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
          {
            timeout: 5000
          }
        );
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const handleProceedToSeats = () => {
    if (!selectedTime) {
      alert("Please select a show time");
      return;
    }
    navigate(`/seats/${movieId}`, { 
      state: { 
        movie, 
        cinema: cinemas[0], // Default to first cinema for now
        date: date.toLocaleDateString(),
        time: selectedTime,
        city: state?.city || 'Mumbai'
      } 
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <div className="error-actions">
          <button onClick={() => window.location.reload()}>Retry</button>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <Navbar />
      
      <div className="booking-header">
        <h1>Book Tickets</h1>
        <div className="breadcrumb">
          <span>Movie</span> &gt; <span className="active">Cinema & Time</span> &gt; <span>Seats</span>
        </div>
      </div>

      <div className="booking-content">
        <div className="movie-details">
          <div className="movie-poster">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p className="movie-genre">{movie.genres?.map(g => g.name).join(', ')}</p>
            <p className="movie-duration">{movie.runtime} mins</p>
            <p className="movie-language">{movie.original_language?.toUpperCase()}</p>
            <p className="movie-rating">
              Rating: {movie.vote_average?.toFixed(1)}/10 ({movie.vote_count} votes)
            </p>
          </div>
        </div>

        <div className="cinema-selection">
          <h3>Select Cinema</h3>
          <div className="cinema-list">
            {cinemas.map(cinema => (
              <div key={cinema.id} className="cinema-card">
                <h4>{cinema.name}</h4>
                <p>{cinema.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="date-selection">
          <h3>Select Date</h3>
          <div className="date-navigation">
            <button onClick={() => handleDateChange(-1)}>&lt;</button>
            <div className="current-date">
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <button onClick={() => handleDateChange(1)}>&gt;</button>
          </div>
        </div>

        <div className="time-selection">
          <h3>Select Show Time</h3>
          <div className="time-slots">
            {showtimes.map(time => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-actions">
          <button 
            className="proceed-button"
            onClick={handleProceedToSeats}
          >
            Proceed to Seat Selection
          </button>
        </div>
      </div>
    </div>
  );
}