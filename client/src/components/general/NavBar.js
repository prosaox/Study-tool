import React from 'react';
import {Link} from "react-router-dom";
const NavBar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to=''>
                    <i className="fas fa-store"></i> StudyBuddy   
                </Link>    
            </h1>

            <ul>
                <li>
                    <Link to="">Register</Link>
                </li>
                <li>
                    <Link to="">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar