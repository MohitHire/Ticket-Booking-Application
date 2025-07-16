import React from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const { state } = useLocation();

  const handlePayment = (method) => {
    alert(`Payment Successful with ${method}! Booking Confirmed 🎉`);
  };

  return (
    <div className="payment">
      <h2>Payment Options</h2>
      <p>Amount to Pay: ₹{state.total}</p>
      <div className="payment-options">
        <button onClick={() => handlePayment("Razorpay")}>Pay with Razorpay</button>
        <button onClick={() => handlePayment("UPI")}>Pay with UPI</button>
        <button onClick={() => handlePayment("Debit Card")}>Pay with Debit Card</button>
      </div>
    </div>
  );
}
