import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import theaters from "../data/theaters";
import "./TicketBooking.css";

export default function TicketBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("2025-07-17");
  const [selectedTime, setSelectedTime] = useState("");

  const handleProceed = () => {
    if (!selectedTheater || !selectedTime || !selectedDate) {
      alert("Please select theater, date and showtime");
      return;
    }

    console.log("Navigating with:", {
      theaterId: selectedTheater,
      time: selectedTime,
      date: selectedDate
    });

    navigate(`/seats/${id}`, {
      state: {
        theaterId: selectedTheater,
        time: selectedTime,
        date: selectedDate,
      },
    });
  };

  return (
    <div className="ticket-booking">
      <h2>Select Show</h2>

      <label>Select Theater:</label>
      <select onChange={(e) => setSelectedTheater(e.target.value)} value={selectedTheater}>
        <option value="">-- Choose a theater --</option>
        {theaters.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <label>Select Date:</label>
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

      <label>Select Show Time:</label>
      <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime}>
        <option value="">-- Choose a time --</option>
        {selectedTheater &&
          theaters
            .find((t) => t.id === selectedTheater)
            ?.shows.map((s, i) => (
              <option key={i} value={s.time}>
                {s.time}
              </option>
            ))}
      </select>

      <button className="proceed-btn" onClick={handleProceed}>Continue to Seat Booking</button>
    </div>
  );
}
