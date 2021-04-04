import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from "react-router-dom";

import Home from '../../pages/Home/Home.js';
import SignIn from '../../pages/SignIn/SignIn.js';
import YourBooking from '../../pages/YourBooking/YourBooking.js';
import CreateAccount from '../../pages/CreateAccount/CreateAccount.js';

import css from './NavBar.module.css';

const NavBar = props => (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName={css.linkSelected}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/YourBooking" activeClassName={css.linkSelected}>YourBooking</NavLink>
        </li>
        <li>
          <NavLink to="/SignIn" activeClassName={css.linkSelected}>SignIn</NavLink>
        </li>
        <li>
          <NavLink to="/CreateAccount" activeClassName={css.linkSelected}>CreateAccount</NavLink>
        </li>
      </ul>

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

export default NavBar;