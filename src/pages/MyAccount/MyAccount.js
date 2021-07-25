import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/NavBar';
import './MyAccount.scss'
import firebase from '../../firebase/firebase'
import TrainCard from '../../components/TrainCard/TrainCard';
import Footer from '../../components/Footer/Footer';
import ticketsWallet from '../../assets/imgs/otherSvg/ticketsWallet.svg'
import emailTickets from '../../assets/imgs/otherSvg/emailTickets.svg'
import { isPastDayAndTime, time12To24, digitDateToNice, time24To12, subTwoTimes } from '../../shared/utility'



const MyAccount = () => {

  //#region - variable and states
  let currentUser = {
    name: "userName",
    email: "email@email.com",
    photoURL: null
  }
  const [userInfo, setUserInfo] = useState(null)

  const [isUpcoming, setIsUpcoming] = useState(true)
  const [myReservations, setMyReservations] = useState([])
  let upComingRes = []
  let archivedRes = []
  let resCards = []
  //#endregion

  //#region - because auth take a second when reload the page, i put init data until auth finish
  
  useEffect(_ => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUserInfo(user) : setUserInfo(null)
    });
  }, []);

  if (userInfo) {
    currentUser = {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      photoURL: firebase.auth().currentUser.photoURL,
    }
  }
  //#endregion

  //## get reservations of this user, after auth finish
  useEffect(_ => {
    if (userInfo) {
      firebase.firestore().collection("profiles").doc(firebase.auth().currentUser.uid).collection("reservations").get().then(querySnapshot => {
        let arr = []
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        );
        setMyReservations(arr)
      })
    }
  }, [userInfo])

  //## get split myReservations to upComingRes and archivedRes
  if (myReservations.length) {
    for (const val of myReservations) {
      if (isPastDayAndTime(val.value.journeyDate, time12To24(val.value.journeyStartsAt))) {
        archivedRes.push(val)
      } else {
        upComingRes.push(val)
      }
    }
  }

  //## generate UpcomingRes
  if (isUpcoming) {
    if (upComingRes.length) {
      for (const val of upComingRes) {
        resCards.push(
          <TrainCard
            key={val.id}
            myAccount
            bookingDate={digitDateToNice(val.value.bookingDate)}
            bookingTime={time24To12(val.value.bookingTime)}
            name={val.value.trainNo}
            trainStart={val.value.source}
            trainEnd={val.value.destination}
            journeyDate={digitDateToNice(val.value.journeyDate)}
            journeyTime={subTwoTimes(time12To24(val.value.journeyStartsAt), time12To24(val.value.journeyEndsAt))}
            startTime={val.value.journeyStartsAt}
            endTime={val.value.journeyEndsAt}
            numberOfStations={val.value.numberOfStops}
            myClass={val.value.fareClass}
            price={val.value.price}
          />
        )
      }
    }
    else {
      resCards.push(
        <div className="upcoming bookingEmpty">
          <img src={ticketsWallet} alt="tickets Wallet icon" />
          <div>
            <header>You have no upcoming journeys.</header>
            <p>You can retrieve any bookings that aren't already listed here.</p>
          </div>
        </div>
      )
    }
  }

  //## generate archivedRes
  if (!isUpcoming) {
    if (archivedRes.length) {
      for (const val of archivedRes) {
        resCards.push(
          <TrainCard
            key={val.id}
            myAccount
            bookingDate={digitDateToNice(val.value.bookingDate)}
            bookingTime={time24To12(val.value.bookingTime)}
            name={val.value.trainNo}
            trainStart={val.value.source}
            trainEnd={val.value.destination}
            journeyDate={digitDateToNice(val.value.journeyDate)}
            journeyTime={subTwoTimes(time12To24(val.value.journeyStartsAt), time12To24(val.value.journeyEndsAt))}
            startTime={val.value.journeyStartsAt}
            endTime={val.value.journeyEndsAt}
            numberOfStations={val.value.numberOfStops}
            myClass={val.value.fareClass}
            price={val.value.price}
          />
        )
      }
    }
    else {
      resCards.push(
        <div className="Archived bookingEmpty">
          <img src={emailTickets} alt="email tickets icon" />
          <div>
            <header>You have no archived bookings.</header>
            <p>Your bookings will be archived here.</p>
          </div>
        </div>
      )
    }
  }

  
  return (
    <div className="myAccount">

      <header className="header">
        <Navbar />
        <h1 className="title container">Your Bookings</h1>
        <div className="switcherContainer container">
          <div className="switcher">
            <div className={`${isUpcoming ? "selected" : ""} upcoming`} onClick={_ => setIsUpcoming(true)}>
              <span>Upcoming</span>
              <i className="fas fa-circle"></i>
              <span>{upComingRes.length}</span>
            </div>
            <div className={`${!isUpcoming ? "selected" : ""} archived`} onClick={_ => setIsUpcoming(false)}>
              <span>Archived</span>
              <i className="fas fa-circle"></i>
              <span>{archivedRes.length}</span>
            </div>
            <div className={`${!isUpcoming ? "secondSwitch" : ""} tabsHighlight`}></div>
          </div>
        </div>
      </header>

      <main className="container">

        <div className="yourBookings">
          {resCards}
        </div>

        <aside>
          <section className="passengerDetails">
            <header>Main passenger</header>
            <section>
              <div className="accountHolder">
                <div className="nameAndImg">
                  {!currentUser.photoURL && <div className="charCircle">{currentUser.name[0]}</div>}
                  {currentUser.photoURL && <img alt="user profile" src={currentUser.photoURL} />}
                  <div className="name">{currentUser.name} (Account holder)</div>
                </div>
                <div className="warningMessage">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>These details mush match your ID card</p>
                </div>
              </div>

              <div className="basicInfo">
                <header>Basic info</header>
                <div>
                  <i className="fas fa-envelope"></i>
                  <span>Email</span>
                  <span>{currentUser.email}</span>
                </div>
                <div>
                  <i className="fas fa-user"></i>
                  <span>Name</span>
                  <span>{currentUser.name}</span>
                </div>
              </div>
            </section>
          </section>

        </aside>

      </main>

      <div className="footerContainer">
        <Footer />
      </div>

    </div >
  );
}

export default MyAccount;
