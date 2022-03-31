import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login.js';
import Courses from './components/courses';
import Logout from './components/logout';
import Topic from './components/topic'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
    // authentication 
    const [ token, setToken ] = useState('');

    useEffect(() => {
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            setToken(lsToken);
        }
    }, []);

    if (token) {
        return (
            <Router>
            <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/courses' element={<Courses/>} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/courses/:topicId" element={<Topic />}/>
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
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/courses/:topicId" element={<Topic />}/>
            </Routes>
          </Router>
  );
}

export default App;
