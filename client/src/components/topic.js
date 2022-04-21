import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "../style/topic.css"
const Topic = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
    const [tasks,setTasks]=useState(null);
    const [print,setPrint]=useState('');

//task
const [userId, setUserId] = useState(null);
const [courseId, setCourseId] = useState(null);
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [start, setStart] = useState(Date.now());
const [due, setDue] = useState(Date.now());
//course
const [courseName, setCourseName] = useState('');
const [courseDescription, setCourseDescription] = useState('');
const [show,setShow]=useState(false);
    useEffect(() => {
        let abortController;
        const getTopic = async () => {
            try {
                const s="http://localhost:5001/api/courses/courseId/"+topicId;
                const res = await fetch(s, {
                    method: "GET",

                    headers: {

                    },
                })
                    .then(res => res.json());
                    
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
                setUserId(res._id);
                
            } catch (err) {

            }
        };
        getUser();
        getTopic();
        getTasks();
    });

    const getTasks = async () => {
        const token = localStorage.getItem("token");
        try {
            const res =await fetch("http://localhost:5001/api/tasks/course/"+topicId, {
                method: "GET",

                headers: {
                    "x-auth-token": token
                },
            })
                .then(res => res.json());
                setPrint("");
                let content="";
                let counter=1;
                for(let i=0;i<res.length;i++)
                {
                    if(res[i].courseId===topicId)
                    {
                        var d=res[i].due_date;
                        d = d.split('T')[0];
                    content+="Task "+counter+":"+res[i].name+"\nTask info: "+res[i].description+"\n"+"Due date:"+(d)+"\n\n\n";
                    counter++;
                    }
                }
                setPrint(content);
                
            setTasks(res);
        } catch (err) {

        }
    };
    const createTask = async () => {
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
                .then(res => res.json());
                // setStart(Date.now());

        } catch (err) {

        }
        // alert(`hello, ${tasks}`);
    };
    const updateTopic = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/courses/update/"+topicId, {
                method: "PUT",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'name': ""+courseName,
                    'description':courseDescription,
                }),
            })
                .then(res => res);
        } catch (err) {

        }
    };
    if(show)
    {
    return (
            <div class="hero">
                <Navbar />
                <h2>{topic.name}</h2>
                <h5>{topic.description}</h5>
                <button onClick={setShow.bind(this,false)}>Update Course Info</button>
                <form onSubmit={updateTopic}>
<ul class="form-style-1">
    <li><label>Course Name <span class="required">*</span></label><input type="text" name="field1" class="field-long" required value={courseName} onChange={(e) => setCourseName(e.target.value)}/></li>
    <li>
        <label>Course description </label>
        <textarea name="field5" id="field5" class="field-long field-textarea" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></textarea>
    </li>
    <li>
        <input type="submit" value="Submit" />
    </li>
</ul>
</form>
                <div class="form-style-3">
                    <form onSubmit={createTask}>
                        <fieldset><legend>Add new Task</legend>
                        <label for="field1"><span>Task name <span >*</span></span><input value={name} onChange={(e) => setName(e.target.value)} type="text" class="input-field" name="field1" required/></label>
                        <label for="field2"><span>Task description <span >*</span></span><input value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="input-field" name="field2"/></label>
                        <label for="field3"><span>Deadline <span >*</span></span><input value={due} onChange={(e) => setDue(e.target.value)} type="date" class="input-field" name="field3"required/></label>
                        <label><input type="submit" value="Add" /></label>
                        </fieldset>
                        
                    </form>
                </div>
                <div class="note">
                <h6>To do list</h6>
                <h6>{print}</h6></div>

            </div>
        )
    }          
    else{
        return (
            <div class="hero">
                <Navbar />
                <h2>{topic.name}</h2>
                <h5>{topic.description}</h5>
                <button onClick={setShow.bind(this,true)}>Update Course Info</button>
                {/* <p>{tasks}</p> */}
                <br></br><br></br>
                <div class="form-style-3">
                    <form onSubmit={createTask}>
                        <fieldset><legend>Add new Task</legend>
                        <label for="field1"><span>Task name <span >*</span></span><input value={name} onChange={(e) => setName(e.target.value)} type="text" class="input-field" name="field1" required/></label>
                        <label for="field2"><span>Task description <span >*</span></span><input value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="input-field" name="field2"/></label>
                        <label for="field3"><span>Deadline <span >*</span></span><input value={due} onChange={(e) => setDue(e.target.value)} type="date" class="input-field" name="field3"required/></label>
                        <label><input type="submit" value="Add" /></label>
                        </fieldset>
                        
                    </form>
                </div>
                <div class="note">
                <h5>To do list</h5>
                <h6>{print}</h6></div>

            </div>
        )
    }                 
}


export default Topic;