import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./login.css"

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
        if(token)
        {
            if(token==="undefined"){
                alert("Wrong email or password");
            }
            else{
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
        if(token)
        {
            if(token==="undefined"){
                alert("Email has been used to sign up previously");
            }
            else{
                navigate("/home");
            }
        }
    }
    if (showSignInView) {
        return (
            <div className="container-fluid  bg-dark vh-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-3">
                        <div className="text-light text-center">StudyBuddy</div>
                        <div className="login  p-5 bg-light rounded shadow-sm">
                            <form onSubmit={loginClick}>
                                <div className="form-group">
                                    <input id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-dark">Sign In</button>
                            </form>
                            <div className="text-dark">
                                Or
                            </div>
                            <button className="btn btn-secondary" onClick={toggleViewClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-fluid  bg-dark vh-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-3">
                        <div className="text-light text-center">StudyBuddy</div>
                        <div className="login  p-5 bg-light rounded shadow-sm">
                            <form onSubmit={signupClick}>
                                <div className="form-group">
                                    <input id="signupName" value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input id="signupEmail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input id="signupPassword" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-dark">Sign Up</button>
                            </form>
                            <div className="text-dark">
                                <button className="btn btn-link" onClick={toggleViewClick}>Go Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;