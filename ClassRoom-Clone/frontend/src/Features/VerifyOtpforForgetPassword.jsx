import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URL } from "../utiles/globals.js";
import OTPInput from "otp-input-react";

export default function VerifyOtpforForgetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [time, setTime] = useState(120);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        `${AUTHENTICATION_URL}/forgetPasswordOtp`,
        { email, otp: Number(otp), newPassword }
      );

      alert(res.data.message);

      if (res.data.status) {
        navigate("/signin");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light rounded">
      
      <div
        className="card shadow-lg border-0 rounded-4 p-5 text-center"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        
        <h2 style={{ fontFamily: "-moz-initial" }} className="fw-bold mb-3">
          VERIFY OTP
        </h2>

        <p className="text-muted mb-4">
          Please enter the OTP sent to <br />
          <span className="fw-semibold text-dark">{email}</span>
        </p>

        {/* OTP INPUT */}
        <div className="d-flex justify-content-center mb-4">
          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            inputStyles={{
              width: "45px",
              height: "45px",
              margin: "0 5px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              backgroundColor: "#fff",
              color: "black",
            }}
          />
        </div>

        {/* NEW PASSWORD */}
        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control rounded-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>New Password</label>
        </div>

        <button
          onClick={handleVerify}
          className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
          disabled={time <= 0}
        >
          Update Password
        </button>

        <p className="mt-3 text-muted">
          {time > 0
            ? `OTP expires in ${time} seconds`
            : "OTP expired. Please request again."}
        </p>

      </div>
    </div>
  );
}
