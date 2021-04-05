import React from "react";

import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'

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