import React, { useEffect, useState } from 'react'
import Navbar from './navbar'

const Courses = () => {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/courses/", {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                setCourses(res);
            } catch (err) {

            }
        };
        getCourses();
    }, []);

    if (courses == null) {
        return <p> loading </p>;
    } else {
        return (
            <div>
                <h1>StudyBuddy</h1>
                <Navbar />
                <div className='container-fluid'>
                    <h2>Courses</h2>
                    {courses.map(c => <p key={c._id}>{c.name + ": " + c.description}</p>)}
                </div>
            </div>
        )
    }
}

export default Courses