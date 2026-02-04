import './App.css'
import Signin from './frontend/feactures/authentications pages/Signin'
import SignupforSeller from './frontend/feactures/authentications pages/SignupforSeller'
import SignupforUser from './frontend/feactures/authentications pages/SignupforUser'
import { Routes, Route } from "react-router";
import SignupRolePage from './frontend/feactures/authentications pages/SignupRolePage';
import Home from './frontend/components/Home/Home';
import VerifyOTPforSignin from './frontend/feactures/authentications pages/VerifyOTPforSignin';
import Navbar from './frontend/components/Navbar/Navbar';
import Profile from './frontend/components/Profile/Profile';

function App() {

  return (
    <div>
      <div style={{height:"30px"}} className='d-flex flex-column justify-content-between align-items-between'>
        <Navbar />
      </div>
      <div style={{backgroundColor:"#F0F5FF"}}>
        <Routes>
        {/* routes for authhentications */} 
        <Route path="/" element={<Signin />} />
        <Route path="/choose-role" element={<SignupRolePage />} />
        <Route path="/signup-user" element={<SignupforUser />} />
        <Route path="/signup-seller" element={<SignupforSeller />} />
        <Route path="verify-otp" element={<VerifyOTPforSignin />} />

        {/* routes for ui main page */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
