import React, { useEffect, useState } from 'react'
import { useNavigate ,Link} from "react-router-dom";
import { Button,Modal} from 'react-bootstrap';
import Navbar from './navbar'
import "./courses.css"
const Courses = () => {
    const navigate = useNavigate();
    const [deleteId, setDelete]=useState('');
    const [courses, setCourses] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const imglist=["https://www.w3schools.com/css/img_5terre.jpg","https://www.w3schools.com/css/img_forest.jpg","https://www.w3schools.com/css/img_lights.jpg","https://www.w3schools.com/css/img_mountains.jpg"];
    const counter =0;

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
        event.preventDefault();
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
    const removeCourse = async (id) => {
        try {
            const res = await fetch("http://localhost:5001/api/courses/delete/"+id, {
                method: "DELETE",

                headers: {

                },
            })
                .then(res => res.json());
                // alert(`hello, ${res.status}`);
            setCourses(res);
        } catch (err) {

        }
    };

    if (courses == null) {
        return <div>
            <div>
        <form onSubmit={createCourse}>
            <div className="form-group">
                <input id="courseName" value={name} onChange={(e) => setName(e.target.value)} type="Name" placeholder="Course Name" />
            </div>
            <div className="form-group">
                <input id="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)} type="Description" placeholder="Description" />
            </div>
            <button type="submit" className="btn btn-dark">Add new class</button>
    </form></div></div>;
    } else {
        return (
            
            <div class="hero">
                <h1>StudyBuddy</h1>
                <Navbar />
                <h2>Courses</h2>
                <div class="form-style-3">
                    <form onSubmit={createCourse}>
                        <fieldset><legend>Add new Course</legend>
                        <label for="field1"><span>Course Name <span >*</span></span><input value={name} onChange={(e) => setName(e.target.value)} type="text" class="input-field" name="field1" /></label>
                        <label for="field2"><span>Course Description <span >*</span></span><input value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="input-field" name="field2" /></label>
                        <label><span> </span><input type="submit" value="Submit" /></label>
                        </fieldset>
                        
                    </form>
                </div>
                <div className='container-fluid'> 
                    <ul >
                    
                        {courses.map(c => 
                        <li key={c._id}>
                            <div class="card">
                                <img src={imglist[(counter)%4]} alt="course image"/>
                                <div class="container">
                                    <h3>{c.name}</h3>
                                    <p>{c.description}</p>
                                    <button onClick={removeCourse.bind(this,c._id)} class="removeButton">Remove</button>
                                    <Link to={"topic/"+c._id}><button class="linkButton">View detail</button></Link>
                                    <Link to={"flashcard/"+c._id}><button class="flashcardButton">Flash Card</button></Link>
                                </div>
                                </div>
                        </li>)}
                    
                    </ul>
                </div>
            </div>
        )
    }
}

export default Courses