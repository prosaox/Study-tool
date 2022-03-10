import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Routes ,Route} from "react-router-dom";
import store from './store';
import NavBar from './components/general/NavBar';
import './App.css';

import Background from "./components/landing/background";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path='/' caseSensitive={false} element={< Background />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
