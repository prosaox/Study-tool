import React from 'react'
import Navbar from './navbar';
// this is just a test homepage for initial setup of the react.js frontend

const home = () => {
  return (
      <div>
          <h1> StudyBuddy </h1>
        <Navbar />
          <p> This is a webapge created with react.js.</p>
    </div>
  )
}

export default home;