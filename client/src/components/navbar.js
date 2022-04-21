import React from 'react'
import { Link } from 'react-router-dom'
import '../style/navbar.css'

const navbar = () => {
  return (
    <div className="navbar">
          <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/logout">Logout</Link>
            </li>
        </ul>
    </div>
  )
}

export default navbar