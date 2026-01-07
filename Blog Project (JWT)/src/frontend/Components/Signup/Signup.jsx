import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

function SignUpPage({ setStep }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/auth/signup`, form);
      setMessage(res.data.message);
      setStep("signin");
    } catch (err) {
      setMessage(err.response?.data?.message || "Sign Up failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {message && <p className="auth-message">{message}</p>}
      <form onSubmit={handleSignUp} className="auth-form">
        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="auth-button" type="submit">Sign Up</button>
      </form>
      <p className="auth-footer">
        Already have an account? <button onClick={() => setStep("signin")} className="link-button">Sign In</button>
      </p>
    </div>
  );
}

export default SignUpPage;
