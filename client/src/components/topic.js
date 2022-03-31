import { BrowserRouter as Router, Routes, Route ,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';

const Topic = () => {
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
    useEffect(() => {
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
            } catch (err) {

            }
        };
        getTopic();
    });
    return (
            <div>
                <h1> StudyBuddy </h1>
                <Navbar />
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <ul>
                    <li>
                    <Link to={`flashcard`}>Flash card</Link>
                    </li>
                    <li>
                    <Link to={`tools`}>Tools</Link>
                    </li>
                </ul>
            </div>
        )
}

export default Topic;