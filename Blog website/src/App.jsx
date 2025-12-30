import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./frontend/Components/SignUp/Signup.jsx";
import Signin from "./frontend/Components/SignIn/Signin.jsx";
import Home from "./frontend/Components/Home/Home.jsx";

const App = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Auth routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Home route */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
