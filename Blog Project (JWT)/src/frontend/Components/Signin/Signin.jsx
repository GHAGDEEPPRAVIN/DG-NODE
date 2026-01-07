import axios from "axios";
import { useState } from "react";
import "./Signin.css";

export default function SignIn({ setStep }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/auth/signin",
        form,
        { withCredentials: true }
      );
      localStorage.setItem("otp_email", form.email);
      setStep("verifyOtp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Sign In failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {message && <p className="auth-message">{message}</p>}
      <form onSubmit={submit} className="auth-form">
        <label>Email</label>
        <input
          className="auth-input"
          name="email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          className="auth-input"
          name="password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="auth-button" type="submit">Sign In</button>
      </form>
      <p className="auth-footer">
        Don't have an account? <button onClick={() => setStep("signup")} className="link-button">Sign Up</button>
      </p>
    </div>
  );
}
