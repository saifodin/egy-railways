import React from "react";
import './App.css';
// import Navbar from './components/Navbar/Navbar.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn.js';
import TrainsBetweenStations from './pages/TrainsBetweenStations/TrainsBetweenStations';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import Train from './pages/Train/Train'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/trains-between-stations" component={TrainsBetweenStations} />
          <Route path="/train" component={Train} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
