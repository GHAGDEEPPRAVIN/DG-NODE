import axios from "axios";
import { useState } from "react";

export default function VerifyOtp({ setStep }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("otp_email");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      localStorage.removeItem("otp_email");
      setStep("home");
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>
      {message && <p className="auth-message">{message}</p>}
      <form onSubmit={submit} className="auth-form">
        <input
          className="auth-input"
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Verify OTP</button>
      </form>
    </div>
  );
}
