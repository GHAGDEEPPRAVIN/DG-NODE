import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { GoHome } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";

export default function Navbar() {

    const routingData = [
        { title: "Home", path: "/" , icon: <GoHome />},
        { title: "Add Movie", path: "/addmovie",icon: <IoMdAdd /> },
    ];

    return (
        <div className="navbar">
            <nav>
                {routingData.map((route, i) => (
                    <p key={i}>
                        <NavLink
                        className="navBtn"
                            to={route.path}
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? "#214162" : "transparent",
                                textDecoration: "none",
                                fontWeight: isActive ? "700" : "400",
                            })}
                        >
                            <span>{route.icon}</span> {route.title}
                        </NavLink>
                    </p>
                ))}
            </nav>
        </div>
    );
}
