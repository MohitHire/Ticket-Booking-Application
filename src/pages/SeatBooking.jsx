import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './SeatBooking.css';
import Navbar from '../components/Navbar';

export default function SeatBooking() {
  const { movieId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample seat data - in a real app, this would come from an API
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const seatsPerRow = 10;

  useEffect(() => {
    // Simulate loading seat data from API
    const timer = setTimeout(() => {
      // Randomly book some seats for demo purposes
      const randomBookedSeats = [];
      for (let i = 0; i < 15; i++) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const num = Math.floor(Math.random() * seatsPerRow) + 1;
        randomBookedSeats.push(`${row}${num}`);
      }
      setBookedSeats(randomBookedSeats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!state?.movie) {
    return (
      <div className="error-container">
        <h2>Movie information missing</h2>
        <button onClick={() => navigate(`/movie/${movieId}`)}>Back to Movie</button>
      </div>
    );
  }

  const { movie, cinema, date, time, city } = state;

  const toggleSeatSelection = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const calculateTotal = () => {
    return selectedSeats.length * 250; // Assuming ₹250 per ticket
  };

  const handlePayment = () => {
    navigate(`/payment/${movieId}`, { 
      state: { 
        movie, 
        cinema, 
        date, 
        time, 
        seats: selectedSeats,
        total: calculateTotal(),
        city
      } 
    });
  };

  return (
    <div className="seat-booking-container">
      <Navbar />
      
      <div className="seat-booking-header">
        <h1>Select Seats</h1>
        <div className="breadcrumb">
          <span>Movie</span> &gt; <span>Cinema & Time</span> &gt; <span className="active">Seats</span>
        </div>
      </div>

      <div className="seat-booking-content">
        <div className="booking-summary">
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>{cinema.name} • {date} • {time}</p>
          </div>
          
          <div className="screen-indicator">
            <div className="screen">SCREEN</div>
          </div>
          
          <div className="seat-map">
            {loading ? (
              <div className="loading-seats">
                <div className="spinner"></div>
                <p>Loading seat arrangement...</p>
              </div>
            ) : (
              <>
                {rows.map(row => (
                  <div key={row} className="seat-row">
                    <div className="row-label">{row}</div>
                    <div className="seats">
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seatNum = i + 1;
                        const seatId = `${row}${seatNum}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        
                        return (
                          <button
                            key={seatNum}
                            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleSeatSelection(seatId)}
                            disabled={isBooked}
                          >
                            {seatNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-color booked"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>
        
        <div className="booking-details">
          <h3>Booking Summary</h3>
          
          <div className="detail-item">
            <span>Movie:</span>
            <span>{movie.title}</span>
          </div>
          
          <div className="detail-item">
            <span>Cinema:</span>
            <span>{cinema.name}</span>
          </div>
          
          <div className="detail-item">
            <span>Date & Time:</span>
            <span>{date}, {time}</span>
          </div>
          
          <div className="detail-item">
            <span>Seats:</span>
            <span>
              {selectedSeats.length > 0 
                ? selectedSeats.join(', ') 
                : 'No seats selected'}
            </span>
          </div>
          
          <div className="detail-item total">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
          
          <button 
            className="proceed-button"
            onClick={handlePayment}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}