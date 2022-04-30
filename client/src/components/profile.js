import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './navbar';
import "../style/profile.css"
import { Button, Col, Container, Row } from 'react-bootstrap';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [degree, setDegree] = useState('');
    const [school, setSchool] = useState('');
    const [date, setDate] = useState(Date.now());

    const [showEditView, setShowEditView] = useState(false);

    // navigate to Sign Up button handler
    const toggleEditClick = async (event) => {
        event.preventDefault();
        setDescription('');
        setName('');
        setDegree('');
        setSchool('');
        setShowEditView(!showEditView);
    }

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
                setSchool(res.school);
                setDate(res.date);

            } catch (err) {

            }
        };
        getUser();
    }, []);

    // console.log("right before check : " + user);
    const updateUser = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5001/api/users/update/" + user._id, {
                method: "PUT",

                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    'name': name,
                    'description': description,
                    'degree': degree,
                    'school': school,
                }),
            })
                .then(res => res.json());
            // alert(`hello, ${user.name}`);
            setUser(res);
            setName(res.name);
            setShowEditView(!showEditView);
            // setDate(res.date);
        } catch (err) {

        }
    };


    if (user === null) {
        return <p> loading </p>;
    } else {
        if (!showEditView) {
            return (
                <div className=''>
                    <Navbar />
                    <Container className='d-flex flex-column'>
                        <Row className='w-100'>
                            <Col className='align-items-center' lg={12}>
                                <h1 className='text-center'>Profile</h1>
                            </Col>
                        </Row>
                        <Row className='w-100 '>
                            <Col lg={3}></Col>
                            <Col className=' ' lg={6}>
                                <h1 className=''> {user.name} </h1>
                                <label>Email:</label>
                                <h3> {user.email} </h3>
                                <p>Degree:</p>
                                <h3> {user.degree}</h3>
                                <p>School:</p>
                                <h3> {user.school}</h3>
                                <p>Bio:</p>
                                <h3> {user.description}</h3>
                            </Col>
                            <Col lg={3}>
                                <Button variant='primary' onClick={toggleEditClick}>Edit</Button>

                            </Col>


                        </Row>
                    </Container>
                </div>
            )
        } else {
            return (
                <div class="heroprofile">
                    <Navbar />
                    <form onSubmit={updateUser}>
                        <ul class="form-style-1">
                            <li><label>Full Name <span class="required">*</span></label><input type="text" name="field1" class="field-long" value={name} onChange={(e) => setName(e.target.value)} required placeholder={user.name} /></li>
                            <li>
                                <label>Phone number</label>
                                <input type="tel" name="field3" class="field-long" />
                            </li><br></br>
                            <li>
                                <label>Degree</label>
                                <select name="field4" class="field-select" value={degree} onChange={(e) => setDegree(e.target.value)} >
                                    <option value="High school">High school</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </li>
                            <li>
                                <label>School/University</label>
                                <input type="text" name="field3" class="field-long" value={school} onChange={(e) => setSchool(e.target.value)} placeholder={user.school} />
                            </li>
                            <li>
                                <label>Your Profile </label>
                                <textarea name="field5" id="field5" class="field-long field-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={user.description}></textarea>
                            </li>
                            <li>
                                <input type="submit" value="Submit" />
                            </li>
                        </ul>
                    </form>
                </div>
            )
        }
    }
}

export default Profile;