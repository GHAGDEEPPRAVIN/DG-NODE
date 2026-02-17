import axios from "axios";
import { useState } from "react";
import { AUTHENTICATION_URL } from '../utiles/globals.js';
import { useLocation, useNavigate } from "react-router";

export default function ChangePassword() {

  const navigate = useNavigate();
  const location = useLocation();
  const {email} = location.state || {};
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${AUTHENTICATION_URL}/changePassword`,
        { email, oldPassword, newPassword }
      );

      alert(res.data.message);
      navigate("/profilePage");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-5" style={{ width: "100%", maxWidth: "420px" }}>
        
        <h2 style={{fontFamily:"-moz-initial"}} className="text-center mb-4 fw-bold text-dark">
          CHANGE PASSWORD
        </h2>

        <form onSubmit={handleChangePassword}>
          
          <div className="form-floating mb-3">
            <input
            disabled
              type="email"
              className="form-control rounded-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <label>Old Password</label>
          </div>

          <div className="form-floating mb-3">
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
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3"
          >
            Change Password
          </button>

        </form>
      </div>
    </div>
  );
}
