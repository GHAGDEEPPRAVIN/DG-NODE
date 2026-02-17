import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${AUTHENTICATION_URL}/signup`,
        { name, email, password }   
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      
      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        
        <h2 style={{fontFamily:"-moz-initial"}} className="text-center mb-4 fw-bold text-dark">
          SIGN UP
        </h2>

        <form onSubmit={handleSignup}>
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 my-3 fw-semibold rounded-3"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-decoration-none fw-semibold"
              >
                Login Here
              </Link>
            </small>
          </div>

        </form>
      </div>
    </div>
  );
}
