import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home'
import Login from './components/login.js'
import Courses from './components/courses';
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
            </Routes>
          </Router>
  );
}

export default App;
