import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "../style/login.css"

const Login = () => {

    // For Forms
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // used to determine to show signup view or signin view
    const [showSignInView, setShowSigninView] = useState(true);

    const navigate = useNavigate();

    // navigate to Sign Up button handler
    const toggleViewClick = async (event) => {
        event.preventDefault();
        setEmail('');
        setName('');
        setPassword('');
        setShowSigninView(!showSignInView);
    }

    // Login button handler
    const loginClick = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/auth/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                }),
            })
                .then(res => res.json());

            localStorage.setItem("token", res.token);
        } catch (err) {

        }
        const token = localStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("Wrong email or password");
            }
            else {
                navigate("/home");
            }
        }
    }

    // Signup button handler
    const signupClick = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:5001/api/users/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'password': password
                }),
            })
                .then(res => res.json());

            localStorage.setItem("token", res.token);
        } catch (err) {

        }
        const token = localStorage.getItem("token");
        if (token) {
            if (token === "undefined") {
                alert("Used email or password smaller than 6 character");
            }
            else {
                navigate("/home");
            }
        }
    }
    if (showSignInView) {
        return (
            <Container className='d-flex h-100'>
                <Row className='w-100 h-100'>
                    <Col xs={12} lg={6} className='d-flex flex-column align-items-center justify-content-center h-100'>
                        <h1 className='about-header'>What is StudyBuddy?</h1>
                        <p>StudyBuddy is a web-based tool to help students better manage their schedules. With StudyBuddy, students can add their courses and track their assignments, quizzes, midterms, and final exam deadlines. Additionally, users can schedule their own personal routine to create better study habits. Overall, students will be able to track their progress throughout their desired time period and track if they are progressing towards their individual goals.</p>
                    </Col>
                    <Col xs={12} lg={6} className='login-form d-flex flex-column align-items-center justify-content-center h-100'>
                        <Form className='login-form text-center w-75' onSubmit={loginClick}>
                            <img className='w-75' src='studybuddy-white-transparent.png' />
                            <h1 className='text-light'>Sign in</h1>
                            <Form.Group className='my-2 ml-2' >
                                <Form.Control id="loginEmail" type="email" onChange={(e) => setEmail(e.target.value)} size="lg" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className='my-2 ml-2'>
                                <Form.Control id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" placeholder="Password" />
                            </Form.Group>
                            <Button className='mt-2' variant="primary" type="submit">Login</Button>
                        </Form>
                        <p className='text-light my-3'>Or</p>
                        <Button className="" variant='light' onClick={toggleViewClick} >Signup</Button>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container className='d-flex h-100'>
                <Row className='w-100 h-100'>
                    <Col xs={12} lg={6} className='d-flex flex-column align-items-center justify-content-center h-100'>
                        <h1 className='about-header'>What is StudyBuddy?</h1>
                        <p>StudyBuddy is a web-based tool to help students better manage their schedules. With StudyBuddy, students can add their courses and track their assignments, quizzes, midterms, and final exam deadlines. Additionally, users can schedule their own personal routine to create better study habits. Overall, students will be able to track their progress throughout their desired time period and track if they are progressing towards their individual goals.</p>
                    </Col>
                    <Col xs={12} lg={6} className='login-form d-flex flex-column align-items-center justify-content-center h-100'>
                        <Form className='login-form text-center w-75' onSubmit={signupClick}>
                            <img className='w-75' src='studybuddy-white-transparent.png' />
                            <h1 className='text-light'>Sign Up</h1>
                            <Form.Group className='my-2 ml-2' >
                                <Form.Control id="signupName" type="text" onChange={(e) => setName(e.target.value)} size="lg" placeholder="Name" />
                            </Form.Group>
                            <Form.Group className='my-2 ml-2' >
                                <Form.Control id="signupEmail" type="email" onChange={(e) => setEmail(e.target.value)} size="lg" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className='my-2 ml-2'>
                                <Form.Control id="signupPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" placeholder="Password" />
                            </Form.Group>
                            <Button className='mt-2' variant="primary" type="submit">Signup</Button>
                        </Form>
                        <Button variant='link' onClick={toggleViewClick} >Go Back</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;