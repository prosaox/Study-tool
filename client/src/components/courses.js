import React, { useEffect, useState } from 'react'
import { useNavigate ,Link} from "react-router-dom";
import { Button,Modal} from 'react-bootstrap';
import Navbar from './navbar'
import "../style/courses.css"

const Courses = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [deleteId, setDelete]=useState('');
    const [courses, setCourses] = useState(null);
    const [start,setStart]=useState(Date.now());
    const [end,setEnd]=useState(Date.now());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const imglist=["https://www.w3schools.com/css/img_5terre.jpg","https://www.w3schools.com/css/img_forest.jpg","https://www.w3schools.com/css/img_lights.jpg","https://www.w3schools.com/css/img_mountains.jpg"];
    const counter =0;

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
                setUserId(res._id);
                
            } catch (err) {

            }
        };
        getUser();
        getCourses();
    });
    const getCourses = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/courses/"+userId, {
                method: "GET",

                headers: {

                },
            })
                .then(res => res.json());
            setCourses(res);
        
        } catch (err) {

        }
    };
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
                    'start_date':start,
                    'end_date':end
                }),
            })
                .then(res => res.json());
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
            setCourses(res);
        } catch (err) {

        }
    };
    function showDay( date)
    {
        let text=date.toString();
        text=text.split('T')[0];
        return text;
    }
    if (courses == null) {
        return (<p>loading</p>);
    } else {
        return (
            
            <div class="hero">
                <Navbar />
                <div class="form-style-3">
                    <form onSubmit={createCourse}>
                        <fieldset><legend>Add new Course</legend>
                        <label for="field1"><span>Course Name <span >*</span></span><input value={name} onChange={(e) => setName(e.target.value)} type="text" class="input-field" name="field1" required/></label>
                        <label for="field2"><span>Course Description</span><input value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="input-field" name="field2" /></label>
                        <label for="field3"><span>Start date</span><input value={start} onChange={(e) => setStart(e.target.value)} type="date" class="input-field" name="field3" required/></label>
                        <label for="field4"><span>End date</span><input value={end} onChange={(e) => setEnd(e.target.value)} type="date" class="input-field" name="field4" required/></label>
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
                                    <h3 style={{color: "red"}}>{c.name}</h3>
                                    <h5 style={{color: "blue"}}>{c.description}</h5>
                                    <h6>Start at:{showDay(c.start_date)}</h6>
                                    <h6>End at:{showDay(c.end_date)}</h6>
                                    <button onClick={removeCourse.bind(this,c._id)} class="removeButton">Remove</button>
                                    <Link to={"topic/"+c._id}><button class="linkButton">View detail</button></Link>
                                    <Link to={"flashcard/"+c._id}><button class="flashcardButton">Flash Card</button></Link>
                                    <Link to={"exam/"+c._id}><button class="examButton">Grade tracking</button></Link>
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