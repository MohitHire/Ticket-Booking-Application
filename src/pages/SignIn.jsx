import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    captcha: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    if (form.captcha !== "1234") return alert("Invalid captcha");

    const stored = JSON.parse(localStorage.getItem("users")) || [];
    const existing = stored.find((u) => u.email === form.email || u.mobile === form.mobile);
    if (existing) return alert("User already exists. Please login.");

    const updatedData = [...stored, {
      email: form.email,
      password: form.password,
      mobile: form.mobile
    }];

    localStorage.setItem("users", JSON.stringify(updatedData));
    alert("Sign Up Successful");
    navigate("/login");
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="mobile" type="text" placeholder="Mobile" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" required onChange={handleChange} />
        <input name="captcha" type="text" placeholder="Enter Captcha: 1234" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}