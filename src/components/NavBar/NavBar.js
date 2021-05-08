import React from "react";
import { useHistory, useLocation } from "react-router-dom"

import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'
import css from './Navbar.module.css'

const Navbar = props => {

  //#region go to Home page when click on logo
  const history = useHistory();
  const GoToHomePage = _ => {
    history.push("/Home");
  }
  //#endregion

  //#region comments how add extra styles based on current location
  //// import { useLocation } from "react-router-dom";
  // const location = useLocation();
  // let extraCss = "";
  // if (location.pathname === '/trains-between-stations') {
  //   extraCss = css.trainsBetweenStations;
  // }
  //#endregion

  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
    extraCss = css.trainsBetweenStations;
  }
  //#endregion



  return (

    <nav className={`container ${css.Navbar} ${extraCss}`}>

      <div onClick={GoToHomePage}>
        <Logo className={`${css.Logo}`} extraStyle={props.extraStyle}/>
      </div>

      <ul>
        {/* add new page here and in App.js */}
        <NavigationItem to="/trains-between-stations" extraStyle={props.extraStyle}>Trains</NavigationItem>
        <NavigationItem to="/train" extraStyle={props.extraStyle} >Train</NavigationItem>
        <NavigationItem to="/SignIn" extraStyle={props.extraStyle}>Sign in</NavigationItem>
        <NavigationItem to="/CreateAccount" extraStyle={props.extraStyle}>Create an account</NavigationItem>
      </ul>
    </nav>
  )
}
export default Navbar;