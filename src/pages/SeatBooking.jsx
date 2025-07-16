import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import theaters from "../data/theaters";
import "./SeatBooking.css";

export default function SeatBooking() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [theater, setTheater] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (!state) return;
    const foundTheater = theaters.find((t) => t.id === state.theaterId);
    const foundShow = foundTheater?.shows?.find(
      (s) => s.time === state.time && s.date === state.date
    );
    setTheater(foundTheater);
    setShow(foundShow);
  }, [state]);

  if (!state || !theater || !show) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error: Show or theater not found</h2>
        <p>Please go back and select show details again.</p>
      </div>
    );
  }

  const toggleSeat = (seatId) => {
    const seatStatus = show.seats.find((s) => s.id === seatId).status;
    if (seatStatus === "booked" || seatStatus === "reserved") return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
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
      <h2>
        {theater.name} — {state.date} @ {state.time}
      </h2>

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