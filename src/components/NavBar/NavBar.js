import React from "react";

import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'

import css from './Navbar.module.css'

const Navbar = props => {

  return (
    <nav className={`container ${css.Navbar}`}>
      <Logo className={`${css.Logo}`}/>
      <ul>
        {/* <NavigationItem to="/">Home</NavigationItem> */}
        <NavigationItem to="/YourBooking" >Your booking</NavigationItem>
        <NavigationItem to="/SignIn" >Sign in</NavigationItem>
        <NavigationItem to="/CreateAccount" >Create an account</NavigationItem>
      </ul>
    </nav>
  )
}
export default Navbar;