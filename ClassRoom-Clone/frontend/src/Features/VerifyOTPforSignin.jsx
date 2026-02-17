import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { AUTHENTICATION_URL } from '../utiles/globals.js';
import OTPInput from 'otp-input-react';

export default function VerifyOTPforSignin() {
  const navigate = useNavigate();
  const { state } = useLocation("/signin");

  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(120);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const verifyOtp = async () => {
  try {
    const res = await axios.post(
      `${AUTHENTICATION_URL}/verifyOtp`,
      { email: state, otp: Number(otp) },
      { withCredentials: true }
    );

    alert(res.data.message);
    localStorage.setItem("name", res.data.data.name);
    localStorage.setItem("email", res.data.data.email);

    if (res.data.status) {
      
      localStorage.setItem("role", res.data.role);

    }
    navigate("/home");
  } catch (err) {
    alert(err.message);
  }
};


  return (
  <div className="vh-100 d-flex justify-content-center align-items-center bg-light">

    <div 
      className="card shadow-lg border-0 rounded-4 p-5 text-center"
      style={{ width: "100%", maxWidth: "420px" }}
    >
      
      <h2 style={{fontFamily:"-moz-initial"}} className="fw-bold mb-3">VERIFY OTP</h2>

      <p className="text-muted mb-4">
        Please enter the OTP sent to <br />
        <span className="fw-semibold text-dark">{state}</span>
      </p>

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

      <button
        onClick={verifyOtp}
        className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
        disabled={time <= 0}
      >
        Verify OTP
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
