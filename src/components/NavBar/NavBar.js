import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import Logo from '../Logo/Logo'
import NavigationItem from './NavigationItem/NavigationItem'
import css from './Navbar.module.scss'
import AuthItem from './AuthItem/AuthItem'
import AuthComponent from '../AuthComponent/AuthComponent'
import firebase from '../../firebase/firebase'


const Navbar = props => {

  //#region go to Home page when click on logo
  const history = useHistory();
  const GoToHomePage = _ => {
    history.push("/Home");
  }
  //#endregion

  //#region - got to myAccount Page when click on passengerDetails or yourBookings
  //* when hover on yourBooking hover passengerDetails also
  const [hoverYourBookings, setHoverYourBookings] = useState(false)

  const gotToAccountPage = _ => {
    history.push("/my-account");
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

  //#region - get the current user, singOut function

  const [userInfo, setUserInfo] = useState(null)
  const [myDisplayName, setMyDisplayName] = useState(null)

  useEffect(_ => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUserInfo(user) : setUserInfo(null)
    });
  }, []);

  //* because after signUp first render userInfo is obj, but userInfo.displayName in null
  //* then second render userInfo is obj, and userInfo.displayName in string
  //* i don't know why, probably there are problem in set the username to firebase
  //**
  //* these leads to infinity refreshPage when singUp
  //* i put refreshPage() when sinUp complete in auth page instead here
  // if (userInfo && !userInfo.displayName) {
  //   refreshPage()
  // }
  // if (userInfo) {
  //   console.log("userInfo", userInfo)
  //   console.log("userInfo.displayName", userInfo.displayName)
  //   console.log("firebase.auth().currentUser.displayName", firebase.auth().currentUser.displayName)
  // }

  //* in first render => useIfo is obj and displayName inside it is string, but when print userInfo.displayName alone is null !!!
  // console.log("userInfo", userInfo, userInfo.displayName)


  //* solve problem userInfo found but displayName not found
  if (userInfo && !myDisplayName && !userInfo.displayName) {
    setMyDisplayName(localStorage.getItem('nameAfterSignUp'));
  } else if (userInfo && userInfo.displayName) {
    if (myDisplayName !== userInfo.displayName) {
      setMyDisplayName(userInfo.displayName)
    }
  }


  const signOut = _ => {
    firebase.auth().signOut()
    setOpenUserList(false)
  }
  //#endregion

  //#region - push the user details to profiles in firestore when userInfo changes and not exist in profiles collection
  useEffect(_ => {
    if (userInfo && myDisplayName) {
      firebase.firestore().collection("profiles").doc(userInfo.uid).get().then(doc => {
        if (!doc.exists) {
          firebase.firestore().collection("profiles").doc(userInfo.uid).set({
            name: myDisplayName,
            email: userInfo.email,
            imgURL: userInfo.photoURL
          })
            .then(_ => {
              console.log("Document successfully written userId Doc in profiles !");
            })
            .catch(error => {
              console.error("Error writing userId Doc in profiles ", error);
            });
        }
      }).catch((error) => {
        console.log("Error getting document user id to check if is exist or not:", error);
      });
    }
  }, [userInfo, myDisplayName]);

  //#region - is an admin to show statistics or not
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(_ => {
    if (userInfo) {
      firebase.firestore().collection("profiles").doc(userInfo.uid).get().then((doc) => {
        if (doc.exists) {
          if (doc.data().admin) {
            setIsAdmin(true)
          }
        } else {
          console.log("No such user id doc in profiles!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  }, [userInfo]);
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
        {/* <NavigationItem to="/booking" extraStyle={props.extraStyle} >Booking</NavigationItem> */}
        {/* <NavigationItem to="/my-account" extraStyle={props.extraStyle} >myAccount</NavigationItem> */}
        {isAdmin && <NavigationItem to="/statistics" extraStyle={props.extraStyle} >Statistics</NavigationItem>}
        {!userInfo &&
          <AuthItem extraStyle={props.extraStyle} setOpenAuth={setOpenAuth} />
        }
        {userInfo && myDisplayName &&
          <div className={`${css.userInfoContainer} ${extraCss}`}>
            <div className={css.nameAndImg} onClick={_ => setOpenUserList(true)}>
              <div className={css.name}>{myDisplayName.split(" ")[0]}</div>
              {!userInfo.photoURL && <div className={css.charCircle}>{myDisplayName[0]}</div>}
              {userInfo.photoURL && <img alt="user profile" src={userInfo.photoURL} />}
            </div>
            {openUserList &&
              <div className={css.dropDownContainer}>
                <div className={css.close} onClick={_ => setOpenUserList(false)}></div>
                <div className={css.list}>
                  <div onClick={gotToAccountPage} className={`${css.passengerDetails} ${hoverYourBookings ? css.likeHover : null}`}><i className="fas fa-user-alt"></i>Passenger details</div>
                  <div onClick={gotToAccountPage} className={css.yourBookings} onMouseEnter={_ => setHoverYourBookings(true)} onMouseLeave={_ => setHoverYourBookings(false)}><i className="fas fa-bookmark"></i>Your bookings</div>
                  <div onClick={signOut} className={css.signOut}><i className="fas fa-sign-out-alt"></i>Sign Out</div>
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