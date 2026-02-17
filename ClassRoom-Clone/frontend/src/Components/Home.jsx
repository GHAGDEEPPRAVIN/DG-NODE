import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const currentUserName = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    const [classrooms, setClassrooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredClassrooms = classrooms.filter(classroom =>
        classroom.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app-container">
            <main className="main-content">

                {/* Header */}
                <header className="header">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search classes..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="header-actions">
                        <Link to="/profilePage">
                            <div style={{
                                border: "1px solid black",
                                padding: "5px 16px",
                                borderRadius: "50px"
                            }}>
                                {currentUserName}
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <div className="content">
                    <h1>Welcome back, {currentUserName} 👋</h1>

                    <div className="section-header">
                        <h2>Enrolled Classes</h2>

                        {role === "admin" ? (
                            <button onClick={() => navigate("/createClass")}>
                                + Create Class
                            </button>
                        ) : (
                            <button onClick={() => navigate("/joinClass")}>
                                + Join Class
                            </button>
                        )}
                    </div>

                    <div className="classroom-grid">
                        {filteredClassrooms.map((classroom) => (
                            <div key={classroom._id} className="classroom-card">

                                {/* Top Colored Header */}
                                <button className="btn" onClick={()=>navigate("/classRoom",{state:{result:classroom}})} style={{border:"none",borderRadius:"10px 10px 0 0",width:"100%",textAlign:"left"}}>
                                    <div
                                    className="card-header"
                                    style={{
                                        backgroundColor: `#${classroom.joiningCode}`
                                    }}
                                >
                                    <div className="card-header-content">
                                        <h3>{classroom.title}</h3>
                                        <p>Admin</p>
                                        <p>Joining Code : {classroom.joiningCode}</p>
                                    </div>
                                </div>
                                

                                {/* Card Body */}
                                <div className="card-body">
                                    <p><strong>Status:</strong> {classroom.status}</p>
                                    <p><strong>Students:</strong> {classroom.studentsData?.length || 0}</p>
                                </div>
                                </button>

                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
