import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testhome from './components/testhome'
import Login from './components/login.js'
import  './App.css'

function App() {
  return (
      <div className='content'>
          <Router>
              <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/home' element={<Testhome />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
