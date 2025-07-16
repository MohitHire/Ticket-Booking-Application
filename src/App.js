import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TicketBooking from "./pages/TicketBooking";
import SeatBooking from "./pages/SeatBooking";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Booking Flow */}
        <Route path="/book/:id" element={<TicketBooking />} />
        <Route path="/seats/:id" element={<SeatBooking />} />
        <Route path="/payment/:id" element={<Payment />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
