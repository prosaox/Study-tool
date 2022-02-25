import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div className="navbar">
          <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/courses">Courses</Link>
            </li>
        </ul>
    </div>
  )
}

export default navbar