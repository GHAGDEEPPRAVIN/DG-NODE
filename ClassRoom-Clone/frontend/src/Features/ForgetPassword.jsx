import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URL } from '../utiles/globals.js';

export default function ForgetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${AUTHENTICATION_URL}/forgetPassword`,
        { email }
      );

      alert(res.data.message);

      if (res.data.status) {
        navigate("/verify-otp", { state: { email } });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-5" style={{ width: "100%", maxWidth: "420px" }}>
        
        <h2 style={{fontFamily:"-moz-initial"}} className="text-center mb-4 fw-bold text-dark">
          FORGET PASSWORD
        </h2>

        <form onSubmit={handleSendOtp}>
          
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email address</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
          >
            Send OTP
          </button>

        </form>
      </div>
    </div>
  );
}
