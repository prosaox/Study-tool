import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "../style/home.css"
import { Col, Container, Row } from 'react-bootstrap';
const Home = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [print, setPrint] = useState('');

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
                const res = await fetch("http://localhost:5001/api/tasks/" + userId, {
                    method: "GET",

                    headers: {
                    },
                })
                    .then(res => res.json());
                setPrint("");
                let content = "";
                let counter = 1;
                for (let i = 0; i < res.length; i++) {

                    var d = res[i].due_date;
                    d = d.split('T')[0];
                    content += "Task " + counter + ":" + res[i].name + "\nTask info: " + res[i].description + "\nDue date:" + (d) + "\n\n\n";
                    counter++;
                }
                content = content.split('\n');
                setPrint(content);
                // var s = res;
                // var result = JSON.parse(s); 
                 setTasks(res) 
                // alert(res.status);
            } catch (err) {
            }
        };
        getTasks();

    });

    if (user === null || tasks === null) {
        return <p>{user === null} loading </p>;
    } else {
        return (
            <div>
                <Navbar />
                <Container className='d-flex flex-column '>
                    <Row className='w-100'>
                        <Col className='align-items-center' lg={12}>
                            <p className='text-center'>Hello {name}! Welcome to StudyBuddy!</p>
                        </Col>
                    </Row>
                    <Row className='w-100'>
                        <Col s={12} lg={6}>
                            <h6>My profile</h6>
                            <p>Degree: {user.degree}</p>
                            <p>Studying at: {user.school}</p>
                            <p>{user.description}</p>
                        </Col>
                        <Col s={12} lg={6}>
                            <h2>Upcoming Tasks:</h2>
                                {/* puts each task on a new line sorted by date */}
                                {tasks.map(t => <p key={t.due_date}>{t.due_date.split('T')[0] + " - " + t.name + " - " + t.description}</p>)}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;