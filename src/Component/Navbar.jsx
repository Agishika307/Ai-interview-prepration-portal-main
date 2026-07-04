import { useEffect, useState } from "react";
import logo from "../assets/image.png";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    const [user, setUser] = useState(null);

useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
}, []);

    return (

        <nav>

            <div className="brand">

                <div className="logo-circle">
                    <img
                        src={logo}
                        alt="PrepAI Logo"
                        className="nav-logo"
                    />
                </div>

                <div>
                    <h2>PrepAI</h2>
                    <p className="tagline">
                        AI Interview Portal
                    </p>
                </div>

            </div>

            <div className="nav-links">

                <a href="#">Home</a>

                <a href="#">Dashboard</a>

                <a href="#">Interview</a>

            </div>

            <div className="user-section">

                <FaUserCircle className="user-icon" />

                <span>{user?.username || "Guest"}</span>

            </div>

        </nav>

    );

}

export default Navbar;