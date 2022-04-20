import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "./home.css"
const Home = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [userId,setUserId]=useState(null);
    const [tasks,setTasks]=useState(null);
    const [print,setPrint]=useState('');

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
                setUserId(res._id);
                    
            } catch (err) {

            }
        };
        getUser(); 
    });
    useEffect(() => {
        const getTasks = async () => {
            try {
                const res =await fetch("http://localhost:5001/api/tasks/"+userId, {
                    method: "GET",
    
                    headers: {
                    },
                })
                    .then(res => res.json());   
                    setPrint("");
                    let content="";
                    let counter=1;
                    for(let i=0;i<res.length;i++)
                    {

                            var d=res[i].due_date;
                            d = d.split('T')[0];
                        content+="Task "+counter+":"+res[i].name+"\nTask info: "+res[i].description+"\n"+"Due date:"+(d)+"\n\n\n";
                        counter++;
                    }
                    setPrint(content);
                    // var s = res;
                    // var result = JSON.parse(s); 
                // setTasks(res) 
                // alert(res.status);
            } catch (err) {
            }
        };
        getTasks();
        
    });

    if (user === null) {
        return <p>{user===null} loading </p>;
    } else {
        return (
            <div class="herohome">
                    <Navbar />
                <div class="col">
                    <div>
                    <p> Welcome, {userId} to StudyBuddy!</p>
                    <h6>My profile</h6>
                    <p>Degree:{user.degree}</p>
                    <p>Studying at:{user.school}</p>
                    <p>{user.description}</p>
                    </div>

                    <div class="note">
                    <h2>Upcoming tasks reminder:</h2>
                    <p>{print}</p>
                    </div>
                </div>    
            </div>
        )
    }
}

export default Home;