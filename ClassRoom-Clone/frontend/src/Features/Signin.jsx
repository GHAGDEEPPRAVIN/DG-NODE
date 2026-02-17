import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URL } from '../utiles/globals.js';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${AUTHENTICATION_URL}/`,
        { email, password }
      );
      alert(res.data.message);

      navigate("/verifyOtp", { state: email });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-5" style={{ width: "100%", maxWidth: "420px" }}>
        
        <h2 style={{fontFamily:"-moz-initial"}} className="text-center mb-4 fw-bold text-dark">
          SIGN IN
        </h2>

        <form onSubmit={handleSignin}>
          
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <div className="w-100 d-flex justify-content-end ">
            <button
              type="button"
              className="btn btn-link text-decoration-none fw-semibold p-0"
              onClick={() => navigate("/forget-password", { state: { email } })}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3 my-3"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
}
