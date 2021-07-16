import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'
import css from './Navbar.module.scss'
import AuthItem from './AuthItem/AuthItem'
import AuthComponent from '../AuthComponent/AuthComponent'
import firebase from '../../firebase/firebase'
import { refreshPage } from '../../shared/utility'


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

  //#region - open and close AuthComponent and userList
  const [openAuth, setOpenAuth] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);

  if (window.localStorage.getItem('openAuth') === "true") {
    window.localStorage.setItem('openAuth', "false");
    setOpenAuth(true)
  }
  //#endregion

  //#region - get the current user, fix string error, singOut function

  const [userInfo, setUserInfo] = useState(null)

  useEffect(_ => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUserInfo(user) : setUserInfo(null)
    });
  }, []);

  //* because after signUp first render userInfo is obj, but userInfo.displayName in null
  //* then second render userInfo is obj, and userInfo.displayName in string
  //* i don't know why, probably there are problem in set the username to firebase
  if (userInfo && !userInfo.displayName) {
    refreshPage()
  }

  //* in first render => useIfo is obj and displayName inside it is string, but when print userInfo.displayName alone is null !!!
  // console.log("userInfo", userInfo, userInfo.displayName)

  const signOut = _ => {
    firebase.auth().signOut()
    setOpenUserList(false)
  }
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
        <NavigationItem to="/booking" extraStyle={props.extraStyle} >Booking</NavigationItem>
        <NavigationItem to="/statistics" extraStyle={props.extraStyle} >Statistics</NavigationItem>
        {!userInfo &&
          <AuthItem extraStyle={props.extraStyle} setOpenAuth={setOpenAuth} />
        }
        {userInfo && userInfo.displayName &&
          <div className={`${css.userInfoContainer} ${extraCss}`}>
            <div className={css.nameAndImg} onClick={_ => setOpenUserList(true)}>
              <div className={css.name}>{userInfo.displayName.split(" ")[0]}</div>
              {!userInfo.photoURL && <div className={css.charCircle}>{userInfo.displayName[0]}</div>}
              {userInfo.photoURL && <img alt="user profile" src={userInfo.photoURL} />}
            </div>
            {openUserList &&
              <div className={css.dropDownContainer}>
                <div className={css.close} onClick={_ => setOpenUserList(false)}></div>
                <div className={css.list}>
                  <div><i className="fas fa-user-alt"></i>Passenger details</div>
                  <div><i className="fas fa-bookmark"></i>Your bookings</div>
                  <div><i className="fas fa-credit-card"></i>Payment methods</div>
                  <div onClick={signOut}><i className="fas fa-sign-out-alt"></i>Sign Out</div>
                </div>
              </div>
            }
          </div>
        }
      </ul>

      {openAuth && <AuthComponent setOpenAuth={setOpenAuth} />}

    </nav>
  )
}
export default Navbar;