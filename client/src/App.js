import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Switch ,Route} from "react-router-dom";
import store from './store';
import NavBar from './components/general/NavBar';
import './App.css';


// Background Components
import Background from "./components/landing/background";

//User Components
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar />

          <Route exact path='/' component={Background} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />

        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
