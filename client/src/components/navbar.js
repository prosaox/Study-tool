import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import '../style/navbar.css'

const navbar = () => {
    return (
        <Navbar expand='lg'>
            <Navbar.Brand className='text-light' href='/home'>StudyBuddy</Navbar.Brand>
            <Nav>
                <Nav.Link className='text-light' href='/home'>Home</Nav.Link>
                <Nav.Link className='text-light' href='/courses'>Courses</Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
                <Nav.Link className='text-light' href='/profile'>Profile</Nav.Link>
                <Nav.Link className='text-light' href='/logout'>Logout</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default navbar