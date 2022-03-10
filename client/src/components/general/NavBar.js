import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="./" style={{ color: "white" }}>
                    <i className="fa-solid fa-building-columns" style={{ color: "white" }}></i> StudyBuddy   
                </Link>    
            </h1>

            <ul>
                <li>
                    <Link to="./" style={{ color: "white" }}>Register</Link>
                </li>
                <li>
                    <Link to="./" style={{ color: "white" }}>Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;