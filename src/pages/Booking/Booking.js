import React, { useState, useEffect } from 'react';
import './Booking.scss'
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import Footer from '../../components/Footer/Footer'
import images from 'react-payment-inputs/images';
import Navbar from '../../components/Navbar/NavBar'
import TrainCard from '../../components/TrainCard/TrainCard'
import ticket from '../../assets/imgs/otherSvg/ticket.svg'
import ticketFromStation from '../../assets/imgs/otherSvg/ticketFromStation.svg'
import ticketFromMobile from '../../assets/imgs/otherSvg/ticketFromMobile.svg'
import visa from '../../assets/imgs/otherImgs/visa.png'
import MasterCard from '../../assets/imgs/otherImgs/MasterCard.png'
import vodafoneCash from '../../assets/imgs/otherImgs/vodafoneCash.gif'
import americanExpress from '../../assets/imgs/otherSvg/americanExpress.svg'
import { digitDateToNice, digitDateToFire } from '../../shared/utility'
import firebase from '../../firebase/firebase'

const Booking = () => {

  let params = new URLSearchParams(window.location.search);
  // const stationsBooking = window.localStorage.getItem("stationsBooking");
  // console.log(stationsBooking)

  const dayDigit = params.get('day')
  const dayFirFormate = digitDateToFire(dayDigit)

  const ourTrain = {
    name: params.get('name'),
    startFrom: params.get('fromStation'),
    endIn: params.get('toStation'),
    day: digitDateToNice(dayDigit),
    start: params.get('startAt'),
    end: params.get('endAt'),
    journeyTime: params.get('journeyTime'),
    numberOfStops: params.get('stops'),
    class: params.get('class'),
    price: params.get('price'),
  }

  const currentUser = {
    name: "Saifodin Ibrahim",
    email: "saifodin@gmail.com",
    cardInfo: {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    },
    vodafoneNumber: ""
  }

  const [isTicketTypeMobile, setIsTicketTypeMobile] = useState(true)
  const [isSelectCard, setIsSelectCard] = useState(true)


  //#region - inputs validation and values

  //* visaName
  const [visaName, setVisaName] = useState(null)
  const [visaNameAccess, setVisaNameAccess] = useState(false)
  let visaNameError = null
  if (visaNameAccess) {
    visaNameError = !visaName ? <p className="validationError">Required</p> : null
  }

  //* vodNumber
  const [vodNumber, setVodNumber] = useState(null)
  const [vodNumberAccess, setVodNumberAccess] = useState(false)
  let vodNumberError = null
  if (vodNumberAccess) {
    vodNumberError = !vodNumber ? <p className="validationError">Required</p> : (vodNumber.slice(0, 2) !== "01" ? <p className="validationError">Invalid</p> : (vodNumber.length !== 11 ? <p className="validationError">Invalid</p> : null))
  }

  //* cardNumber
  // these two useState, because PaymentInputsWrapper haven't error message when click pay Button without focus in card inputs
  const [cardErrorAfterSubmitButton, setCardErrorAfterSubmitButton] = useState(null)
  const [cardErrorOne, setCardErrorOne] = useState(false)

  const { wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  // when this undefined then the card is full and valid
  console.log("wrapperProps.error", wrapperProps)
  const [isAllInputsTouched, setIsAllInputsTouched] = useState(false)
  const [cardNumber, setCardNumber] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [cvc, setCvc] = useState(null)
  //#endregion

  //#region - get myStations that will be increment, fareClassess, isTrainDocUE Contain MyDate or not

  const [trainDocUE, setTrainDocUE] = useState(null)

  useEffect(() => {
    firebase.firestore().collection("journeys").doc(ourTrain.name).get().then(doc => {
      setTrainDocUE(doc.data())
    })
  }, [ourTrain.name])

  let myStations = [];
  if (trainDocUE) {
    let foundFirstStation = false
    for (const i in trainDocUE.scheduels) {
      let station = Object.keys(trainDocUE.scheduels[i])[0];
      if (!foundFirstStation) {
        if (station === ourTrain.startFrom) {
          foundFirstStation = true
        }
      }
      if (foundFirstStation) {
        if (station === ourTrain.endIn) {
          break;
        }
        // console.log({ index: i, station: station })
        myStations.push({ index: i, station: station })
      }
    }
  }

  let fareClassess = null;
  if (trainDocUE) {
    fareClassess = trainDocUE.fareClassess
    // console.log("fareClassess", fareClassess)
  }

  let isTrainDocUEContainMyDate
  if (trainDocUE) {
    // console.log("fistObjInTrainDocUE", Object.keys(trainDocUE.scheduels[0])[0])
    // if (trainDocUE.scheduels[0][Object.keys(trainDocUE.scheduels[0])[0]]["Tue, 20 Jul"]) {
    if (trainDocUE.scheduels[0][Object.keys(trainDocUE.scheduels[0])[0]][dayFirFormate]) {
      isTrainDocUEContainMyDate = true
    }
    else {
      isTrainDocUEContainMyDate = false
    }
    // console.log(isTrainDocUEContainMyDate)
  }

  //#endregion

  //#region - updateJourneysDoc() called by submitPayButton() - get trainDoc from journeys, update, push to journeys again 

  const [trainDocOld, setTrainDocOld] = useState(null)

  const updateJourneysDoc = _ => {
    console.log("updateJourneysDoc")

    firebase.firestore().collection("journeys").doc(ourTrain.name).get().then(doc => {
      setTrainDocOld(doc.data())
    })
      .catch(error => {
        console.error("Error writing document: ", error);
      })
  }

  if (trainDocOld) {
    // console.log(trainDocOld);

    trainDocOld.passengers += 1;
    trainDocOld.profit += Number(ourTrain.price);

    if (!isTrainDocUEContainMyDate) {
      for (const i in trainDocOld.scheduels) {
        trainDocOld.scheduels[i][Object.keys(trainDocUE.scheduels[i])[0]][dayFirFormate] = { ...fareClassess }
      }
    }

    // console.log(myStations)

    for (const i in myStations) {
      let indexIWant = myStations[i].index;
      let stationIWant = myStations[i].station;
      trainDocOld.scheduels[indexIWant][stationIWant][dayFirFormate][ourTrain.class] -= 1
    }

    // console.log(trainDocOld);

    firebase.firestore().collection("journeys").doc(ourTrain.name).set(trainDocOld)
      .then(_ => {
        console.log("Document successfully written!");
        setTrainDocOld(null)
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }
  //#endregion


  const submitPayButton = _ => {
    //* pay by card
    if (isSelectCard) {
      if (!wrapperProps.error && visaName) {
        // ... push to server
        updateJourneysDoc()
        console.log("by card => push")
      }
      else {
        if (!cardErrorOne) {
          setCardErrorAfterSubmitButton(wrapperProps.error)
          setCardErrorOne(true)
        }
      }

    }
    //* pay by vodafone
    else {
      if (vodNumber && vodNumber.slice(0, 2) === "01" && vodNumber.length === 11) {
        // ... push to server
        console.log("by vodafone => push")
        updateJourneysDoc()
      }
      else {
        setVodNumberAccess(true)
      }
    }
  }

  return (
    <div className="booking">

      <div className="upperPart">
        <Navbar extraStyle="whiteBackground" />
        <div className="blueBar">
          <div className="container">
            <div className="blueBarContent">
              <p>Passenger Details</p>
              <i className="fas fa-chevron-right"></i>
              <p>Payment Method</p>
              <i className="fas fa-chevron-right"></i>
              <p>Review and Pay</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mainPart container">
        <div className="section">
          <section className="ticketType">
            <header>Choose a ticket type</header>
            <section>
              <div className={isTicketTypeMobile ? "selected" : null} onClick={_ => setIsTicketTypeMobile(true)}>
                <img alt="ticket on mobile" src={ticketFromMobile} />
                <div>
                  <header>Ticket on my phone</header>
                  <p>Your ticket will be emailed to you straight away as a PDF and can either be printed or downloaded to your phone.</p>
                </div>
              </div>
              <div className={isTicketTypeMobile ? null : "selected"} onClick={_ => setIsTicketTypeMobile(false)}>
                <img alt="ticket from station" src={ticketFromStation} />
                <div>
                  <header>Collect ticket at station</header>
                  <p>Use your booking number to collect your ticket from a self-service machine at the station before your departure.</p>
                </div>
              </div>
            </section>
          </section>

          <section className="passengerDetails">
            <header>Passenger Details</header>
            <section>
              <p>{currentUser.name}</p>
              <div><i className="fas fa-ticket-alt"></i>Your ticket will be sent to: {currentUser.email}</div>
            </section>
          </section>

          {isTicketTypeMobile &&
            <div className="whenTicketMobile">
              <i className="fas fa-check-circle"></i>
              <p>This ticket can be shown on your smartphone or tablet with no printing required.</p>
            </div>
          }

          {!isTicketTypeMobile &&
            <div className="whenTicketStation">
              <i className="fas fa-exclamation-circle"></i>
              <p>The ticket must be collected from a machine at the station. You will need to insert any bank card and enter your booking number into the machine in order to collect your ticket.</p>
            </div>
          }

          <section className="paymentMethod">
            <header>Select payment method</header>
            <section>

              <div className={`selectVisa ${isSelectCard ? "selected" : null}`} onClick={_ => setIsSelectCard(true)}>
                <div className="radioButton"></div>
                <div className="paymentImgs"><img alt="visa" src={visa} /><img alt="master card" src={MasterCard} /><img src={americanExpress} alt="american Express" /></div>
              </div>

              <div className={`visaContent ${isSelectCard ? null : "contentDisabled"}`}>
                <div className="visaName">
                  <label htmlFor="visaName">Name on Card</label>
                  <input className={visaNameError ? "inputError" : null} onBlur={_ => setVisaNameAccess(true)} onChange={e => setVisaName(e.target.value.trim())} defaultValue={currentUser.name} type="text" id="visaName" name="visaName" />
                  {visaNameError}
                </div>
                <p className="likeLabel">Card number</p>
                <div className={`paymentContainer ${cardErrorAfterSubmitButton ? "errorFistTime": null}`} onClick={_ => setIsAllInputsTouched(true)}>
                  {/* //// visa => 4539298728713761 */}
                  {/* //// MasterCard => 5131378213242564 */}
                  {/* //// American Express => 342304893033616 */}
                  <PaymentInputsWrapper {...wrapperProps} onClick={_ => { setCardErrorAfterSubmitButton(null); setCardErrorOne(true) }}>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps({ onChange: e => setCardNumber(e.target.value) })} />
                    <input {...getExpiryDateProps({ onChange: e => setExpiry(e.target.value) })} />
                    <input {...getCVCProps({ onChange: e => setCvc(e.target.value) })} />
                  </PaymentInputsWrapper>
                  {<p className="validationError">{cardErrorAfterSubmitButton}</p>}

                </div>
              </div>

              <div className={`selectVodafone ${!isSelectCard ? "selected" : null}`} onClick={_ => setIsSelectCard(false)}>
                <div className="radioButton"></div>
                <div className="paymentImgs"><img alt="vodafone Cash" src={vodafoneCash} /></div>
              </div>

              <div className={`vodafoneContent ${!isSelectCard ? null : "contentDisabled"}`}>
                <div className="visaName">
                  <label htmlFor="vodNumber">Vodafone number</label>
                  <input className={vodNumberError ? "inputError" : null} value={vodNumber || ''} onBlur={_ => setVodNumberAccess(true)} onChange={e => setVodNumber(e.target.value.replace(/\D/, '').trim())} type="tel" id="vodNumber" name="vodNumber" />
                  {vodNumberError}
                </div>
              </div>

            </section>
          </section>

          <p>01333333333</p>
          <button className="payButton" onClick={submitPayButton}>Pay</button>

        </div>
        <div className="side">
          <div className="sideContent">
            <TrainCard
              forBooking
              name={ourTrain.name}
              start={ourTrain.start}
              end={ourTrain.end}
              startFrom={ourTrain.startFrom}
              endIn={ourTrain.endIn}
              journeyTime={ourTrain.journeyTime}
              numberOfStops={ourTrain.numberOfStops}
            />
            <div className="dayContainer">
              <img alt="ticket icon" src={ticket}></img>
              <span>Booking day is&nbsp;</span>
              <span className="day">{ourTrain.day}</span>
            </div>

            <div className="classAndPrice">
              <div>
                <span>Class</span>
                <span>{ourTrain.class}</span>
              </div>
              <div>
                <span>Price</span>
                <span>{ourTrain.price} <span className="egp">EGP</span></span>
              </div>
              <div>
                <span>Service fee</span>
                <span>0 <span className="egp">EGP</span></span>
              </div>
              <div>
                <span>Total</span>
                <span>{ourTrain.price} <span className="egp">EGP</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footerContainer">
        <Footer />
      </div>

    </div >
  );
}

export default Booking;
