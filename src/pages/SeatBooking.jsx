import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import theaters from "../data/theaters";
import "./SeatBooking.css";

export default function SeatBooking() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const show = theaters
    .find((t) => t.id === state.theaterId)
    .shows.find((s) => s.time === state.time && s.date === state.date);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    if (show.seats.find((s) => s.id === seatId).status === "booked") return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handlePayment = () => {
    navigate(`/payment/${id}`, {
      state: {
        seats: selectedSeats,
        total: selectedSeats.length * 200,
      },
    });
  };

  return (
    <div className="seat-booking">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {show.seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${
              selectedSeats.includes(seat.id) ? "selected" : ""
            }`}
            onClick={() => toggleSeat(seat.id)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
        <p>Total: ₹{selectedSeats.length * 200}</p>
        <button onClick={handlePayment} disabled={selectedSeats.length === 0}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
