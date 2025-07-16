import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import Navbar from '../components/Navbar';

export default function Payment() {
  const { movieId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  if (!state) {
    return (
      <div className="error-container">
        <h2>Booking information missing</h2>
        <button onClick={() => navigate(`/movie/${movieId}`)}>Back to Movie</button>
      </div>
    );
  }

  const { movie, cinema, date, time, seats, total } = state;

  const handlePayment = () => {
    // In a real app, this would integrate with a payment gateway
    alert('Payment successful! Redirecting to tickets...');
    // navigate('/tickets', { state: { ...state, bookingId: '12345' } });
  };

  return (
    <div className="payment-container">
      <Navbar />
      
      <div className="payment-header">
        <h1>Complete Payment</h1>
        <div className="breadcrumb">
          <span>Movie</span> &gt; <span>Cinema & Time</span> &gt; <span>Seats</span> &gt; <span className="active">Payment</span>
        </div>
      </div>

      <div className="payment-content">
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          
          <div className="summary-item">
            <span>Movie:</span>
            <span>{movie.title}</span>
          </div>
          
          <div className="summary-item">
            <span>Cinema:</span>
            <span>{cinema.name}</span>
          </div>
          
          <div className="summary-item">
            <span>Date & Time:</span>
            <span>{date}, {time}</span>
          </div>
          
          <div className="summary-item">
            <span>Seats:</span>
            <span>{seats.join(', ')}</span>
          </div>
          
          <div className="summary-total">
            <span>Total Amount:</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h2>Select Payment Method</h2>
          
          <div className="payment-option">
            <input type="radio" id="credit-card" name="payment" defaultChecked />
            <label htmlFor="credit-card">Credit/Debit Card</label>
          </div>
          
          <div className="payment-option">
            <input type="radio" id="upi" name="payment" />
            <label htmlFor="upi">UPI Payment</label>
          </div>
          
          <div className="payment-option">
            <input type="radio" id="netbanking" name="payment" />
            <label htmlFor="netbanking">Net Banking</label>
          </div>
          
          <div className="payment-option">
            <input type="radio" id="wallet" name="payment" />
            <label htmlFor="wallet">Wallet</label>
          </div>
          
          <button className="pay-button" onClick={handlePayment}>
            Pay ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}