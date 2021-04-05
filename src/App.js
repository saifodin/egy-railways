import React from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink, Link } from "react-router-dom";

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn.js';
import YourBooking from './pages/YourBooking/YourBooking.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';

function App() {
  return (
    <Router>
      <div>
        
        <Navbar/>

        <hr />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/YourBooking" component={YourBooking} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/SignIn" component={SignIn} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
