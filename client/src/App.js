import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login.js';
import Courses from './components/courses';
import Logout from './components/logout';
import Topic from './components/topic'
import Profile from './components/profile'
import CurrUserId from './components/currUserId';
import './App.css'
import { useEffect, useState } from 'react';
import FlashCard from './components/flashcard';

function App() {
    // authentication 
    const [ token, setToken ] = useState('');

    useEffect(() => {
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            setToken(lsToken);
        }
    }, []);

    console.log(CurrUserId());
    if (token) {
        return (
            <Router>
            <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/courses' element={<Courses/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/courses/topic/:topicId" element={<Topic />}/>
                    <Route path="/courses/flashcard/:topicId" element={<FlashCard />}/>
            </Routes>
          </Router>
        );
    }

  return (
          <Router>
          <Routes>
                    <Route exact path="/" element={<Login  />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/courses' element={<Courses/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/courses/topic/:topicId" element={<Topic />}/>
                    <Route path="/courses/flashcard/:topicId" element={<FlashCard />}/>
            </Routes>
          </Router>
  );
}

export default App;
