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
        navigate("/home");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='container vh-100 d-flex justify-content-center align-items-center'>
      <div className='col-4 shadow p-3 rounded'>
        <h4 className='mb-4 text-center'>Verify OTP</h4>

        <div className='d-flex justify-content-center mb-3'>
          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
          />
        </div>

        <p className='text-end'>
          Your OTP will be expired in{" "}
          {time > 0 ? `${time} seconds` : "Time's up!"}
        </p>

        <button
          onClick={verifyOtp}
          className='w-100 btn btn-primary'
          disabled={time <= 0}
        >
          Verify & Signin
        </button>
      </div>
    </div>
  );
}
