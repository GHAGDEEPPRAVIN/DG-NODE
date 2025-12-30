import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:1000/api/blog/login/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        // If login is successful, go to home page
        navigate("/home");
      } else {
        // If login fails, redirect to signup page
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signin;
