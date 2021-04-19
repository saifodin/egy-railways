import React from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn.js';
import YourBooking from './pages/YourBooking/YourBooking.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';

function App() {
  return (
    <Router>
      <div>
        {/* <header>
          <Navbar />
          <h1>Book Train Tickets across Europe</h1>
          <HomeSearchBar/>
        </header> */}


        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/YourBooking" component={YourBooking} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
