import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function Profile() {
    const navigate = useNavigate();
    const currentUserName = localStorage.getItem("name");
    const email = localStorage.getItem("email");

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

                <div className="p-4 d-flex justify-content-center align-items-center">
                    <div style={{ width: "50%",height:"60vh", borderRadius: "20px" }} className="card p-4 shadow-lg">
                        <h2>
                            Profile Page
                        </h2>
                        <div className="card-body">
                            <div className="card-body">
                                <div className="w-100 d-flex justify-content-center align-items-center mb-3">
                                <img style={{height:"100px"}} src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" />
                                </div>
                                
                                <table className="w-100">
                                    <tr className="w-100 d-flex">
                                        <td><label style={{fontSize:"18px",marginBottom:"5px"}} className="fw-bold" htmlFor="">Name : </label></td>
                                        <td className="ms-2" ><span style={{fontSize:"18px",marginBottom:"5px"}}>{currentUserName}</span></td>
                                    </tr>
                                    <tr className="w-100 d-flex">
                                        <td><label style={{fontSize:"18px",marginBottom:"5px"}} className="fw-bold" htmlFor="">Email : </label></td>
                                        <td className="ms-2"><span style={{fontSize:"18px",marginBottom:"5px"}}>{email}</span></td>
                                    </tr>
                                </table> 
                                
                            </div>

                                <div className="w-100 d-flex justify-content-center align-items-end flex-column">
                                    <button
                                    className="btn btn-primary w-50 mt-3"
                                    onClick={() => navigate("/change-password", { state: { email: localStorage.getItem("email") } })}
                                >
                                    Change Password
                                </button>
                                </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
