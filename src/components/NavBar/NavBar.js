import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink, Link } from "react-router-dom";

import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'

import css from './Navbar.module.css';

const Navbar = props => {

  return (
    <nav>
      <Logo/>
      <ul>
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/YourBooking" >YourBooking</NavigationItem>
        <NavigationItem to="/SignIn" >SignIn</NavigationItem>
        <NavigationItem to="/CreateAccount" >CreateAccount</NavigationItem>
      </ul>
      <button>click</button>
    </nav>
  )
}
export default Navbar;