import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div style={{ height: "60px", marginBottom: "20px", position:"absolute",top:"0",left:"0" }}>
            <nav style={{ padding: "12px 28px",width:"100%" }} className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a style={{ width: "160px", display: "flex", justifyContent: "end" }} className="navbar-brand" href="#">
                        <img style={{ width: "100px", height: "45px" }} src="/image/logo/logo.png" alt="logo not loaded..." />
                    </a>
                    <form style={{ height: "40px" }} className="d-flex">
                        <button style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", border: "none", padding: "8px", backgroundColor: "#F0F5FF" }} type="submit"><IoSearchOutline /></button>
                        <input style={{ width: "700px", borderRadius: "none", border: "none", backgroundColor: "#F0F5FF", outline: "none" }} className=" me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a style={{ width: "110px", padding: "8px", margin: "0px 20px", fontSize: "16px" }} className="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="p-2"><HiOutlineUserCircle style={{ height: "24px", width: "24px" }} /></span>Flipkart
                                </a>
                                <ul style={{ backgroundColor: "white", borderRadius: "5px", fontSize:"14px"}} className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to="/profile" className="dropdown-item"><span className="p-2"><HiOutlineUserCircle style={{ height: "20px", width: "20px" }} /></span> My Profile</Link></li>
                                    <li><a className="dropdown-item" href="#">Orders</a></li>
                                    <li><a className="dropdown-item" href="#">Wishlist</a></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="https://www.flipkart.com/mobile-apps?otracker=ch_vn_mobile_apps">link</a>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
