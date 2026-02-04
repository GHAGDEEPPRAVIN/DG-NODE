import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_URL } from '../../../backend/env/globals.js';

export default function SignupforUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignupforUser = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const res = await axios.post(`${AUTHENTICATION_URL}/User/signup`, { name, email, password });
            if (res.data.status) {
                alert(res.data.message);
                navigate("/");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div style={{ width: "60%", height: "500px" }} className='container d-flex justify-content-center align-items-center shadow p-0'>
                <div style={{ height: "100%", width: "40%" }} className='bg-primary p-5 d-flex flex-column justify-content-center align-items-center'>
                    <div className='vh-100 w-100'>
                        <h2 className='text-white mb-3'>Looks like you're new here!</h2>
                        <span className='text-light'>Sign up with your mobile number to get started</span>
                    </div>
                    <div className='mt-3 vh-100 w-100'>
                        <img className='w-100' src="/image/login/loginImage.png" alt="" />
                    </div>
                </div>
                <div style={{ width: "60%", height: "100%" }} className='d-flex flex-column justify-content-between align-items-between p-5'>
                    <div>
                        <form>
                            <div className="form-floating mb-3">
                                <input onChange={(e) => setName(e.target.value)} style={{ border: "none", borderBottom: "2px solid #FB641B", outline: "none" }} type="text" className="form-control" id="floatingInput" placeholder="" />
                                <label htmlFor="floatingInput">Full Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={(e) => setEmail(e.target.value)} style={{ border: "none", borderBottom: "2px solid #FB641B", outline: "none" }} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input onChange={(e) => setPassword(e.target.value)} style={{ border: "none", borderBottom: "2px solid #FB641B", outline: "none" }} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="my-3">
                                <p style={{ fontSize: "14px" }}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                            </div>
                            <div className='d-flex justify-content-center align-items-center my-3'>
                                <button onClick={handleSignupforUser} style={{ backgroundColor: "#FB641B" }} className="fw-bold text-center text-light btn w-100">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Link className="text-center text-primary btn w-100 shadow" to="/signin">Existing User? Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
