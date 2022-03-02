import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home'
import Login from './components/login.js'
import Courses from './components/courses';
import './App.css'

function App() {
  return (
      <div className='content'>

          <Router>
              <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/courses' element={<Courses/>} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
