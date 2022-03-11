import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {

    // For Forms
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // used to determine to show signupview or signin view
    const [showSignupView, setShowSignupView] = useState(false);

    const navigate = useNavigate();

    // navigate to Sign Up button handler
    const signupNavClick = async (event) => {
        event.preventDefault();
        setShowSignupView(true);
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
        navigate("/home");
    }

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
                        <button className="btn btn-secondary" onClick={signupNavClick}>Sign Up</button>
                    </div>
                </div>
                
            </div>
        </div>

    );
}

export default Login;