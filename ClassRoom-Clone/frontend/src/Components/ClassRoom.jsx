import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineAssignment } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi2";
import { useEffect, useState } from "react";

export default function ClassRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Data, setData] = useState(location.state?.result || []);

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
          fetchClassrooms();
      }, []);
  

  const fetchClassrooms = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/classroom");

            if (res.data.status) {
                setClassrooms(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <div className="d-flex vh-100 bg-light">
      <aside className="sidebar bg-white border-end d-flex flex-column p-3">
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

      <div style={{marginLeft:"280px"}} className="flex-grow-1 p-4 overflow-auto">
        <ul className="nav nav-tabs mb-4 d-flex align-items-center">
          <li className="w-100 nav-item">
            <span className="nav-link active">Stream</span>
          
            <span className="nav-link">Classwork</span>
          
            <span className="nav-link">People</span>
          </li>
        </ul>
        <div
          className="rounded text-white d-flex align-items-center mb-4"
          style={{
            height: "180px",
            background: "linear-gradient(90deg, #1976d2, #1565c0)",
            paddingLeft: "40px",
          }}
        >
          <h2 className="fw-light">{Data.titl || "New ClassRoom"}</h2>
        </div>

        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Upcoming</h5>
                <p className="text-muted small">
                  Woohoo, no work due soon!
                </p>
                <button className="btn btn-link p-0">
                  View all
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <button className="btn btn-info text-white rounded-pill mb-4 d-flex align-items-center">
              <HiOutlinePencil className="me-2" />
              New announcement
            </button>

            
            {Data.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow-sm border-0"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <div className="card-body d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <MdOutlineAssignment size={20} />
                  </div>

                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.date}</small>
                  </div>

                  <FiMoreVertical className="ms-auto text-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
