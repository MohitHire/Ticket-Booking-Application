import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ user: "", password: "", captcha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (u) => (u.email === form.user || u.mobile === form.user) && u.password === form.password
    );

    if (!userFound) return alert("Invalid credentials");
    if (form.captcha !== "1234") return alert("Invalid captcha");

    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful");
    navigate("/");
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="user" type="text" placeholder="Email or Mobile" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <input name="captcha" type="text" placeholder="Enter Captcha: 1234" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}