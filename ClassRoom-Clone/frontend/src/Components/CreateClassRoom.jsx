import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { CLASSROOM_URL } from "../utiles/globals.js";
import axios from "axios";

export default function CreateClassRoom() {
    const navigate = useNavigate();
    const currentUserName = localStorage.getItem("name");
    const [classTitle, setClassTitle] = useState("");

    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "";

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }


    const handleCreateClassroom = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${CLASSROOM_URL}/createClassroom`, { title: classTitle, joiningCode: generateRandomColor() });
            alert(res.data.status);
            navigate("/classRoom", { state: res.data.result });
        } catch (error) {
            alert(error.message);
        }
    }



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
                        className={"nav-item active"}
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

                <div style={{ height: "600px" }} className="p-4 d-flex justify-content-center align-items-center">
                    <div style={{ width: "400px", borderRadius: "20px" }} className="card p-4 shadow-lg">
                        <h2>
                            Create Classroom
                        </h2>
                        <hr />
                        <div className="card-body">
                            <h5 className="w-100" htmlFor="">Class Name</h5>
                            <input value={classTitle} onChange={(e) => { setClassTitle(e.target.value) }} style={{ height: "40px", outline: "none", borderRadius: "5px", padding: "10px 20px", color: "black" }} className="w-100 bg-light mb-4" type="text" />
                            <h5 className="w-100" htmlFor="">By</h5>
                            <span>{currentUserName}</span>
                            <button onClick={handleCreateClassroom} className="btn btn-primary fw-bold w-100 mt-3">CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
