import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { AUTHENTICATION_URL } from '../../../backend/env/globals.js';
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
      `${AUTHENTICATION_URL}/all/verifyOtp`,
      { email: state, otp: Number(otp) },
      { withCredentials: true }
    );

    alert(res.data.message);

    if (res.data.status) {
      
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "seller") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    }
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div style={{ width: "60%", height: "500px" }} className='container d-flex justify-content-center align-items-center shadow p-0'>
        <div style={{ height: "100%", width: "40%" }} className='bg-primary p-5 d-flex flex-column justify-content-center align-items-center'>
          <div className='vh-100 w-100'>
            <h2 className='text-white mb-3'>Login</h2>
            <span className='text-light'>Get access to your Orders, Wishlist and Recommendations</span>
          </div>
          <div className='mt-3 vh-100 w-100'>
            <img className='w-100' src="/image/login/loginImage.png" alt="" />
          </div>
        </div>
        <div style={{ width: "60%", height: "100%" }} className='d-flex flex-column justify-content-between align-items-between p-5'>
          <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className='p-3 text-center w-100'>
              <span className='w-50 mb-4 text-center'>Please enter OTP sent to <br /> {state} .</span>

              <div className='d-flex justify-content-center my-4'>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                />
              </div>

              <button
                onClick={verifyOtp}
                className='w-100 btn text-light fw-bold'
                disabled={time <= 0}
                 style={{ backgroundColor: "#FB641B" }}
              >
                Verify
              </button>

              <p className='text-center mt-3'>
                Your OTP will be expired in{" "}
                {time > 0 ? `${time} seconds` : "Time's up!"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
