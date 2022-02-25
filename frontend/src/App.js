import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Testhome from './components/testhome';
import Courses from './components/courses';


function App() {
  return (
      <div >
          <Router>
              <Navbar />
              <Routes>
              <Route path='/' element={<Testhome/>} />
                  <Route path='/home' element={<Testhome/>} />
                  <Route path='/courses' element={<Courses/>} />
              </Routes>
          </Router>
    </div>
  );
}

export default App;
