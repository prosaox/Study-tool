import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';

const Home = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5001/api/auth/", {
                    method: "GET",

                    headers: {
                        "x-auth-token": token
                    },
                })
                    .then(res => res.json());
                setUser(res);
                setName(res.name);
            } catch (err) {

            }
        };
        getUser();
    },[]);

    if (user === null) {
        return <p> loading </p>;
    } else {
        return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <p> Welcome, {name}!</p>
            </div>
        )
    }
}

export default Home;