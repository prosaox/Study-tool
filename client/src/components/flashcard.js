import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "./flashcard.css"
const FlashCard = () => {
    const [user, setUser] = useState(null);
    const { topicId } = useParams();
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);
    const [courseId, setCourseId] = useState(null);        
    const [flashcard,setFlashcard]=useState(null);
    let counter=0;
    useEffect(() => {
        const getFlashcard = async () => {
            const token = localStorage.getItem("token");
            try {
                const res =await fetch("http://localhost:5001/api/flashcards/", {
                    method: "GET",
    
                    headers: {
                        "x-auth-token": token
                    },
                })
                .then(res => res.json());
                setFlashcard(res);
                // alert(`hello, ${res.length}`);
            } catch (err) {
    
            }
        };
        getFlashcard();
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
                    'courseId':topicId,
                    'title': title,
                    'content': content,
                }),
            })
        } catch (err) {

        }
        // alert(`hello, ${tasks}`);
    };
    const removeFlashcard = async (id) => {
        try {
            const res = await fetch("http://localhost:5001/api/flashcards/delete/"+id, {
                method: "DELETE",

                headers: {

                },
            })
                // alert(`hello, ${res.status}`);
        } catch (err) {

        }
    };
    function toggle_element(element_id) {
        var element = document.getElementById(element_id);
        element.style.display = (element.style.display != 'none' ? 'none' : 'block' );
  }
    
    
    
    if (flashcard === null) {
        return <p> loading </p>;
    } else {
        return (
            <div class="herohome">
                <h1> StudyBuddy </h1>
                <Navbar />
                <div class="form-style-3">
                    <form onSubmit={createFlashCard}>
                        <fieldset><legend>Add new Card</legend>
                        <label for="field1"><span>Title <span >*</span></span><input value={title} onChange={(e) => setTitle(e.target.value)} type="text" class="input-field" name="field1" /></label>
                        <label for="field2"><span>Definition <span >*</span></span><input value={content} onChange={(e) => setContent(e.target.value)} type="text" class="input-field" name="field2" /></label>
                        <label><input type="submit" value="Add" /></label>
                        </fieldset>
                        
                    </form>
                </div>
                <ul class="row">
                    {flashcard.map(c => 
                    <li key={c._id}>
                        <div class="cardD">
                            <div class="container">
                                <h3>{c.title}</h3>
                                <div id={c._id}>
                                    <p>{c.content}</p>
                                </div>
                                <button class="removeButton" onClick={removeFlashcard.bind(this,c._id)}>Remove</button>
                                <button class="revealButton" onClick={toggle_element.bind(this,c._id)}>Reveal/Hide</button>
                            </div>
                        </div>
                    </li>)}                
                </ul>
            </div>
        )
    }
}

export default FlashCard;