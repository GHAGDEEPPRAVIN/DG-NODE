import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'


export default function Navbar() {
    const [activeTab, setActiveTab] = useState('home')
    const sidebarItems = [
        { id: 'home', icon: <IoHome />, label: 'Home' },
        { id: 'classes', icon: <MdLibraryBooks />, label: 'Classes' },
        { id: 'assignments', icon: <BsBookmarkStarFill />, label: 'Assignments' }
    ]
    return (
        <div>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="menu-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="logo">
                        <img style={{ width: "35px" }} src="/images/logo.svg" alt="" />
                        <span className="logo-text">Classroom</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/profilePage" className="nav-item text-decoration-none">
                        <span className="nav-icon"><FaUser /></span>
                        <span className="nav-label">Profile</span>
                    </Link>
                </div>

            </aside>

            <div>
                <Routes>
                {/* home page */}
                <Route path="/" element={<Home />} />
            </Routes>
            </div>

        </div>
    )
}
