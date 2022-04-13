import { useNavigate,Link,useParams} from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "./exam.css"
const Exam = () => {
    const { topicId } = useParams();
    const [title, setTitle] = useState('');
    const [current, setCurrent] = useState(0);
    const [distribute, setDistribute] = useState(0);     
    const [day, setDay] = useState(Date.now());    
    const [exams,setExams]=useState(null);
    const [totalCurr,setTotalCurr]=useState(0);
    const [totalDistribute,setTotalDistribute]=useState(0);
    let counter=0;
    useEffect(() => {
        const getExam = async () => {
            const token = localStorage.getItem("token");
            try {
                const res =await fetch("http://localhost:5001/api/exams/"+topicId, {
                    method: "GET",
    
                    headers: {
                        "x-auth-token": token
                    },
                })
                .then(res => res.json());
                setExams(res);
                let tempCurr=0;
                let tempDistribute=0;
                exams.map(c=>tempCurr+=c.current);
                exams.map(c=>tempDistribute+=c.distribute);
                setTotalCurr(tempCurr);
                setTotalDistribute(tempDistribute);
            } catch (err) {
    
            }
        };
        getExam();
        // alert(exams);
    },[]);
    const createExam = async () => {
        if(+current>+distribute)
        {
            alert("Your score need to be lower than distributed score    "+current+"   "+distribute);
        }
        else if(title===""){
            alert("Your score need to be lower than distributed score");
        }
        else{
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5001/api/exams/", {
                    method: "POST",

                    headers: {
                        'Content-Type': 'application/json',
                        "x-auth-token": token
                    },
                    body: JSON.stringify({
                        'courseId':topicId,
                        'title': title,
                        'current':current,
                        'distribute':distribute,
                        'day':day,
                    }),
                    
                })
                alert(`hello, ${res.status}`);
            } catch (err) {

            }
        }
        // alert(`hello, ${tasks}`);
    };
    const removeExam = async (id) => {
        try {
            const res = await fetch("http://localhost:5001/api/exams/delete/"+id, {
                method: "DELETE",

                headers: {

                },
            })
                // alert(`hello, ${res.status}`);
        } catch (err) {

        }
    };
    
    
    
    if (exams === null) {
        return <p> loading </p>;
    } else {
        return (
            <div class="herohome">
                <h1> StudyBuddy </h1>
                <Navbar />
                <div class="form-style-3">
                    <form onSubmit={createExam}>
                        <fieldset><legend>Add new Test/Assignment/Exam</legend>
                        <label for="field1"><span>Title <span >*</span></span><input value={title} onChange={(e) => setTitle(e.target.value)} type="text" class="input-field" name="field1" required/></label>
                        <label for="field2"><span>Current <span ></span></span><input value={current} onChange={(e) => setCurrent(e.target.value)} type="number" class="input-field" name="field2" min="0" max="100"/></label>
                        <label for="field3"><span>Distribution <span >*</span></span><input value={distribute} onChange={(e) => setDistribute(e.target.value)} type="number" class="input-field" name="field3" min="0" max="100" required/></label>
                        <label for="field4"><span>Day <span >*</span></span><input value={day} onChange={(e) => setDay(e.target.value)} type="date" class="input-field" name="field4"required/></label>
                        <label><input type="submit" value="Add" /></label>
                        </fieldset>
                        
                    </form>
                </div>
                <table>
                    <tr>
                        <th><h1>Day</h1></th>
                        <th><h1>Tests</h1></th>
                        <th><h1>Score/Grade Distribution</h1></th>
                        <th><h1>Options</h1></th>
                    </tr>
                    
                    {exams.map(c => 
                    <tr key={c._id} >
                                <td><h2>{c.day}</h2></td>
                                <td><h2>{c.title}</h2></td>
                                <td><h3>{c.current}/{c.distribute}</h3></td>
                                <td><button class="xButton" onClick={removeExam.bind(this,c._id)}>X</button></td>
                    </tr>)}     
                    <tr>
                        <th><h1></h1></th>
                        <th><h1>Total</h1></th>
                        <th><h1>{totalCurr}/{totalDistribute}</h1></th>
                    </tr>           
                </table>
            </div>
        )
    }
}

export default Exam;