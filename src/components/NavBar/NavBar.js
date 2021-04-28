import React from "react";
import { useHistory ,useLocation} from "react-router-dom"

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

  //#region add extra styles for different pages
  const location = useLocation();
  let extraCss = "";
  if (location.pathname === '/trains-between-stations') {
    extraCss = css.trainsBetweenStations;
  }
  //#endregion


  return (

    <nav className={`container ${css.Navbar} ${extraCss}`}>

      <div onClick={GoToHomePage}>
        <Logo className={`${css.Logo}`} />
      </div>

      <ul>

        {/* <NavigationItem to="/">Home</NavigationItem> */}
        <NavigationItem to="/trains-between-stations" >Trains</NavigationItem>
        <NavigationItem to="/SignIn" >Sign in</NavigationItem>
        <NavigationItem to="/CreateAccount" >Create an account</NavigationItem>
      </ul>
    </nav>
  )
}
export default Navbar;