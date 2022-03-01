import React from "react";
import { useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {
    const navigate = useNavigate();

    // Sign Up button
    const signupClick = () => {
        // do signup stuff
        // for now just go to home
        navigate("/home");
    }

    // Login button
    const loginClick = () => {
        // do login stuff
        // for now just go to home
        navigate("/home");
    }

    return (
        <div className="login">
            <form onSubmit={loginClick}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password"/>
                <button type="submit">Sign In</button>
            </form>
            <button onClick={signupClick}>Sign Up</button>
        </div>
    );
}

export default Login;