import { BrowserRouter as Router, Routes, Route ,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';

const Topic = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');

    const[tasks,setTasks]=useState(null);
//topic
const [userId, setUserId] = useState(null);
const [courseId, setCourseId] = useState(null);
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [start, setStart] = useState(Date.now());
const [due, setDue] = useState(Date.now());

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/tasks/", {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                setTasks(res);
            } catch (err) {

            }
        };
        const getTopic = async () => {
            try {
                const s="http://localhost:5001/api/courses/"+topicId;
                const res = await fetch(s, {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                    // alert(`hello, ${res.status}`);
                setTopic(res);
                setCourseId(res._id);
            } catch (err) {

            }
        };
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
                setUserId(res._id)
            } catch (err) {

            }
        };
        getUser();
        getTopic();
        getTasks();
    });
    const createTask = async (event) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/tasks/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'userId':userId,
                    'courseId':courseId,
                    'name': name,
                    'description': description,
                    'start_date':start,
                    'due_date':due,
                }),
            })
                .then(res => res);
                // setStart(Date.now());
                alert(`hello, ${res.status}`);
        } catch (err) {

        }
    }
    const getTask = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/courses/", {
                method: "GET",

                headers: {

                },
            })
                .then(res => res.json());
                // alert(`hello, ${res.status}`);
        } catch (err) {

        }
    };
    return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <ul>
                    <li>
                    <Link to={`flashcard`}>{userId}</Link>
                    </li>
                    <li>
                    <Link to={`tools`}>Tools</Link>
                    </li>
                    {/* {tasks.map(c =><li>{c.name}</li>)} */}
                </ul>
                <form onSubmit={createTask}>
                                <div className="form-group">
                                    <input id="courseName" value={name} onChange={(e) => setName(e.target.value)} type="Name" placeholder="Task Name" />
                                </div>
                                <div className="form-group">
                                    <input id="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)} type="Task description" placeholder="Description" />
                                </div>
                                {/* <div className="form-group">
                                    <input id="courseDue" value={due} onChange={(e) => setDescription(e.target.value)} type="Task due date" placeholder="31-03-2022" />
                                </div> */}
                                <button type="submit" className="btn btn-dark">Add new task</button>
                </form>
            </div>
        )
}

export default Topic;