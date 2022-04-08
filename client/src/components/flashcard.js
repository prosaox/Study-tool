import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
const FlashCard = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);
    const [courseId, setCourseId] = useState(null);        
    useEffect(() => {
        let abortController;
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
                setUserId(res._id);
                
            } catch (err) {

            }
        };
        getUser();
        getTopic();
    });
    const createFlashCard = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/flashcards/", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'userId':userId,
                    'courseId':courseId,
                    'title': title,
                    'content': content,
                }),
            })
                .then(res => res.json());
                // setStart(Date.now());

                alert(`hello, ${courseId}`);
        } catch (err) {

        }
        // alert(`hello, ${tasks}`);
    };
    
    
    
    
    
    if (user === null) {
        return <p> loading </p>;
    } else {
        return (
            <div class="herohome">
                <h1> StudyBuddy </h1>
                <Navbar />
                <p> Welcome, {user.name} to StudyBuddy!</p>
                <h6>Self description</h6>
                <p>Degree:{user.degree}</p>
                <p>Studying at:{user.school}</p>
                <h6>My profile</h6>
                <p>{user.description}</p>
            </div>
        )
    }
}

export default FlashCard;