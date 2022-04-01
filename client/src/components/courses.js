import React, { useEffect, useState } from 'react'
import { useNavigate ,Link} from "react-router-dom";
import { Button,Modal} from 'react-bootstrap';
import Navbar from './navbar'
import "./courses.css"
const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/courses/", {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                    // alert(`hello, ${res.status}`);
                setCourses(res);
            } catch (err) {

            }
        };
        getCourses();
    });

    const createCourse = async (event) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/courses/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'name': name,
                    'description': description,
                }),
            })
                .then(res => res.json());
                // alert(`hello, ${res.status}`);
        } catch (err) {
            console.log("Error in createCourse");
        }
    }

    if (courses == null) {
        return <p> loading </p>;
    } else {
        return (
            
            <div>
                <h1>StudyBuddy</h1>
                <Navbar />
                <div className='container-fluid'>
                    <h2>Courses</h2>
                    <ul>
                    {courses.map(c => <li class='button' key={c._id}>
                        <Link to={c._id}>{c.name}</Link></li>)}
                    </ul>
                </div>
                <form onSubmit={createCourse}>
                                <div className="form-group">
                                    <input id="courseName" value={name} onChange={(e) => setName(e.target.value)} type="Name" placeholder="Course Name" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)} type="Description" placeholder="Description" />
                                </div>
                                <button type="submit" className="btn btn-dark">Add new class</button>
                </form>
            </div>
        )
    }
}

export default Courses