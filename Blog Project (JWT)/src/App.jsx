import React, { useEffect, useState } from "react";
import axios from "axios";

import SignInPage from "./frontend/Components/Signin/Signin.jsx";
import SignUpPage from "./frontend/Components/Signup/Signup.jsx";
import VerifyOtpPage from "./frontend/Components/VerifyOTP/VerifyOtpPage.jsx";
import Home from "./frontend/Components/Home/Home.jsx";

axios.defaults.withCredentials = true; // important for cookies

function App() {
  const [step, setStep] = useState("signin"); // signin, signup, verifyOtp, home
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // pass email to OTP page

  // Auto-check if already logged in
  const fetchHome = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/home");
      setUser(res.data.user);
      setStep("home");
    } catch (err) {
      setStep("signin");
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      {step === "signin" && <SignInPage setStep={setStep} setEmail={setEmail} />}
      {step === "signup" && <SignUpPage setStep={setStep} />}
      {step === "verifyOtp" && <VerifyOtpPage setStep={setStep} email={email} />}
      {step === "home" && <Home user={user} setStep={setStep} />}
    </div>
  );
}

export default App;
