import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TicketBooking from "./pages/TicketBooking";
import SeatBooking from "./pages/SeatBooking";
import Payment from "./pages/Payment";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        
        {/* Booking Flow Routes */}
        <Route path="/book/:id" element={<TicketBooking />} />
        <Route path="/seats/:id" element={<SeatBooking />} />
        <Route path="/payment/:id" element={<Payment />} />
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;