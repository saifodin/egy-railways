import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/NavBar';
import './MyAccount.scss'
import firebase from '../../firebase/firebase'
import TrainCard from '../../components/TrainCard/TrainCard';
import Footer from '../../components/Footer/Footer';
import ticketsWallet from '../../assets/imgs/otherSvg/ticketsWallet.svg'
import emailTickets from '../../assets/imgs/otherSvg/emailTickets.svg'



const MyAccount = () => {

  // const currentUser = {
  //   name: firebase.auth().currentUser.displayName,
  //   email: firebase.auth().currentUser.email,
  //   photoURL: firebase.auth().currentUser.photoURL
  // }

  const currentUser = {
    name: "tamer Ibrahim",
    email: "saifodinii@gmail.com",
    // photoURL: "https://lh3.googleusercontent.com/a/AATXAJxg_961MZYf9U2gDZjmGkbAlfBEdLEb_cTRk_9s=s96-c",
    // photoURL: "https://lh3.googleusercontent.com/a/AATXAJxg_961MZYf9U2gDZjmGkbAlfBEdLEb_cTRk_9s=s96-c"
  }
  const [isUpcoming, setIsUpcoming] = useState(true)



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
              <span>0</span>
            </div>
            <div className={`${!isUpcoming ? "selected" : ""} archived`} onClick={_ => setIsUpcoming(false)}>
              <span>Archived</span>
              <i className="fas fa-circle"></i>
              <span>0</span>
            </div>
            <div className={`${!isUpcoming ? "secondSwitch" : ""} tabsHighlight`}></div>
          </div>
        </div>
      </header>

      <main className="container">

        <div className="yourBookings">
          <TrainCard
            myAccount
            bookingDate="12 Jul, sun"
            bookingTime="06:10 AM"
            name="903"
            trainStart="Alexandria"
            trainEnd="Tanta"
            journeyDate="23 Jul, fri"
            journeyTime="2h3m"
            startTime="08:20 AM"
            endTime="10:30 AM"
            numberOfStations={3}
            myClass="2A"
            price="34"
          />
          <TrainCard
            myAccount
            bookingDate="12 Jul, sun"
            bookingTime="06:10 AM"
            name="903"
            trainStart="Alexandria"
            trainEnd="Tanta"
            journeyDate="23 Jul, fri"
            journeyTime="2h3m"
            startTime="08:20 AM"
            endTime="10:30 AM"
            numberOfStations={3}
            myClass="2A"
            price="34"
          />
          <div className="upcoming bookingEmpty">
            <img src={ticketsWallet} alt="tickets Wallet icon" />
            <div>
              <header>You have no upcoming journeys.</header>
              <p>You can retrieve any bookings that aren't already listed here.</p>
            </div>
          </div>

          <div className="Archived bookingEmpty">
            <img src={emailTickets} alt="email tickets icon" />
            <div>
              <header>You have no archived bookings.</header>
              <p>Your bookings will be archived here.</p>
            </div>
          </div>

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
