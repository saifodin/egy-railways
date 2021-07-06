import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'
import css from './Navbar.module.css'
import AuthItem from './AuthItem/AuthItem'
import AuthComponent from '../AuthComponent/AuthComponent'


const Navbar = props => {


  //#region go to Home page when click on logo
  const history = useHistory();
  const GoToHomePage = _ => {
    history.push("/Home");
  }
  //#endregion

  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
    extraCss = css.whiteBackground;
  }
  //#endregion

  //#region - open and close AuthComponent
  const [openAuth, setOpenAuth] = useState(false);
  //#endregion

  return (

    <nav className={`container ${css.Navbar} ${extraCss}`}>

      <div onClick={GoToHomePage}>
        <Logo className={`${css.Logo}`} extraStyle={props.extraStyle} />
      </div>

      <ul>
        {/* add new page here and in App.js */}
        {/* <NavigationItem to="/trains-between-stations" extraStyle={props.extraStyle}>Trains</NavigationItem>
        <NavigationItem to="/train" extraStyle={props.extraStyle} >Train</NavigationItem>
        <NavigationItem to="/live-train" extraStyle={props.extraStyle} >Live Train</NavigationItem>
        <NavigationItem to="/live-station" extraStyle={props.extraStyle} >Live Station</NavigationItem> */}
        <NavigationItem to="/statistics" extraStyle={props.extraStyle} >Statistics</NavigationItem>
        {/* <NavigationItem to="/SignIn" extraStyle={props.extraStyle}>Sign in</NavigationItem> */}
        {/* <NavigationItem to="/CreateAccount" extraStyle={props.extraStyle}>Create an account</NavigationItem> */}
        <AuthItem extraStyle={props.extraStyle} setOpenAuth={setOpenAuth} />
      </ul>

      {openAuth && <AuthComponent setOpenAuth={setOpenAuth}/>}

    </nav>
  )
}
export default Navbar;