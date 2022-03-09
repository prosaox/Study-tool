import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from './store';

import './App.css';
import NavBar from './components/general/NavBar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/"></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
