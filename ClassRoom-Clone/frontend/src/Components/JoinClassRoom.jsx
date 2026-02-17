import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { AUTHENTICATION_URL } from "../utiles/globals";

export default function JoinClassRoom() {
    const navigate = useNavigate();
    const currentUserName = localStorage.getItem("name");

    return (
        <div>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="menu-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div className="logo">
                        <img style={{ width: "35px" }} src="/images/logo.svg" alt="" />
                        <span className="logo-text">Classroom</span>
                    </div>
                </div>

                <nav className="sidebar-nav">

                    <button
                        key="home"
                        className="nav-item active"
                        onClick={() => { navigate("/home") }}
                    >
                        <span className="nav-icon"><IoHome /></span>
                        <span className="nav-label">Home</span>
                    </button>

                </nav>

                <div className="sidebar-footer">
                    <Link to="/profilePage" className="nav-item text-decoration-none">
                        <span className="nav-icon">
                            <FaUser />
                        </span>
                        <span className="nav-label">Profile</span>
                    </Link>
                </div>
            </aside>

            <div style={{ marginLeft: "280px" }}>
                <div style={{ height: "40px", borderBottom: "2px solid #DADCE0", marginBottom: "10px" }} className="header-actions w-100 p-4 d-flex justify-content-end align-items-center">
                    <div className="user-profile">
                        <Link to="/profilePage">
                            <div
                                style={{
                                    border: "1px solid black",
                                    padding: "5px 16px",
                                    borderRadius: "50px",
                                }}
                            >
                                {currentUserName}
                            </div>
                        </Link>
                    </div>
                </div>

                <div style={{height:"600px"}} className="p-4 d-flex justify-content-center align-items-center">
                    <div style={{width:"400px",borderRadius:"20px"}} className="card p-4 shadow-lg">
                        <h2>
                            Join Classroom
                        </h2>
                        <hr />
                        <div className="card-body d-flex flex-column align-items-center">
                            <label htmlFor="">Enter Code</label>
                            <input style={{height:"40px",outline:"none", borderRadius:"5px",padding:"10px 20px",color:"black"}} className="w-50 bg-light mb-4" type="text" />
                            <a href="#" className="btn btn-primary w-100 fw-bold">Join</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
