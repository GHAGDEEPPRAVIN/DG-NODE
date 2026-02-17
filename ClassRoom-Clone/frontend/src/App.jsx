import { useState } from 'react'
import './App.css'
import Signin from './Features/Signin.jsx'
import Signup from './Features/Signup.jsx'
import { Route, Routes } from 'react-router-dom'
import VerifyOTPforSignin from './Features/VerifyOTPforSignin.jsx'
import ForgetPassword from './Features/ForgetPassword.jsx'
import ChangePassword from './Features/ChangePassword.jsx'
import VerifyOtpforForgetPassword from './Features/VerifyOtpforForgetPassword.jsx'
import Navbar from './Components/Navbar.jsx'
import Profile from './Components/Profile.jsx';
import CreateClassRoom from './Components/CreateClassRoom.jsx'
import JoinClassRoom from './Components/JoinClassRoom.jsx'
import ClassRoom from './Components/ClassRoom.jsx'

function App() {
  return (
    <div>
      <Routes>
        {/* Signin page */}
        <Route path="/" element={<Signin />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />


        {/* Home page */}
        <Route path="/home" element={<Navbar />} />


        {/* verify OTP for Signin */}
        <Route path="/verifyOtp" element={<VerifyOTPforSignin />} />

        {/* forget Password */}
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Change password */}
        <Route path="/change-password" element={<ChangePassword />} />

        {/* verify OTP for forget password */}
        <Route path="/verify-Otp" element={<VerifyOtpforForgetPassword />} />

        {/* profile page */}
        <Route path="/profilePage" element={<Profile />} />

        {/* create Classroom */}
        <Route path="/createClass" element={<CreateClassRoom />} />

        {/* join classroom */}
        <Route path="/joinClass" element={<JoinClassRoom />} />

        {/* classRoom menu page */}
        <Route path="/classRoom" element={<ClassRoom />} />

      </Routes>
    </div>
  )
}

export default App
