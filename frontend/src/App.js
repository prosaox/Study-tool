import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testhome from './components/testhome'
import Login from './components/login.js'
import Courses from './components/courses';
import  './App.css'

function App() {
  return (
      <div className='content'>
          <Router>
              <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/home' element={<Testhome />} />
                  <Route path='/courses' element={<Courses/>} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
