import './App.css'
import Signin from './frontend/feactures/authentications pages/Signin'
import SignupforSeller from './frontend/feactures/authentications pages/SignupforSeller'
import SignupforUser from './frontend/feactures/authentications pages/SignupforUser'
import { Routes, Route } from "react-router";
import SignupRolePage from './frontend/feactures/authentications pages/SignupRolePage';
import Home from './frontend/components/Home/Home';
import VerifyOTPforSignin from './frontend/feactures/authentications pages/VerifyOTPforSignin';

function App() {

  return (
    <div>
      <Routes>
        {/* routes for authhentications */}
        <Route path="/" element={<Signin />} />
        <Route path="/choose-role" element={<SignupRolePage />} />
        <Route path="/signup-user" element={<SignupforUser />} />
        <Route path="/signup-seller" element={<SignupforSeller />} />
        <Route path="verify-otp" element={<VerifyOTPforSignin />} />

        {/* routes for ui main page */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
