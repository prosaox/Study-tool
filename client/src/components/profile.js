import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState(Date.now());
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
                setDate(res.date);
            } catch (err) {

            }
        };
        getUser();
    },[]);

    console.log("right before check : " + user);
    if (user === null) {
        return <p> loading </p>;
    } else {
        return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <p> Welcome, {name}!</p>
                <h5> Update your information </h5>
            </div>
        )
    }
}

export default Profile;