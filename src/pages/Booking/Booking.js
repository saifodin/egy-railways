import React, { useState } from 'react';
import './Booking.scss'
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
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

const Booking = () => {
  const ourTrain = {
    name: "02461",
    start: "08:27 PM",
    end: "10:40 PM",
    startFrom: "Cairo",
    endIn: "Tanta",
    journeyTime: "0h13m",
    numberOfStops: 2,
    day: "02 May, Sun",
    class: "2A",
    price: "50"
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
    vodNumberError = !vodNumber ? <p className="validationError">Required</p> : (vodNumber.length !== 11 ? <p className="validationError">Invalid</p> : null)
  }

  //* cardNumber
  const { wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  // when this undefined then the card is full and valid
  // console.log("wrapperProps.error", wrapperProps.error)
  const [cardNumber, setCardNumber] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [cvc, setCvc] = useState(null)
  console.log(cardNumber)




  return (
    <div className="booking">
      <div className="upperPart">
        <Navbar extraStyle="whiteBackground" />
        <div className="blueBar">
          <div className="container">
            <div className="blueBarContent">
              <p>Passenger Details</p>
              <i class="fas fa-chevron-right"></i>
              <p>Payment Method</p>
              <i class="fas fa-chevron-right"></i>
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
              <i class="fas fa-check-circle"></i>
              <p>This ticket can be shown on your smartphone or tablet with no printing required.</p>
            </div>
          }

          {!isTicketTypeMobile &&
            <div className="whenTicketStation">
              <i class="fas fa-exclamation-circle"></i>
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
                <div className="paymentContainer">
                  {/* //// visa => 4539298728713761 */}
                  {/* //// MasterCard => 5131378213242564 */}
                  {/* //// American Express => 342304893033616 */}
                  <p className="likeLabel">Card number</p>
                  <PaymentInputsWrapper {...wrapperProps}>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps({ onChange: e => setCardNumber(e.target.value) })} />
                    <input {...getExpiryDateProps({ onChange: e => setExpiry(e.target.value) })} />
                    <input {...getCVCProps({ onChange: e => setCvc(e.target.value) })} />
                  </PaymentInputsWrapper>
                </div>
              </div>

              <div className={`selectVodafone ${!isSelectCard ? "selected" : null}`} onClick={_ => setIsSelectCard(false)}>
                <div className="radioButton"></div>
                <div className="paymentImgs"><img alt="vodafone Cash" src={vodafoneCash} /></div>
              </div>

              <div className={`vodafoneContent ${!isSelectCard ? null : "contentDisabled"}`}>
                <div className="visaName">
                  <label htmlFor="vodNumber">Vodafone number</label>
                  <input className={vodNumberError ? "inputError" : null} value={vodNumber} onBlur={_ => setVodNumberAccess(true)} onChange={e => setVodNumber(e.target.value.replace(/\D/, '').trim())} type="tel" id="vodNumber" name="vodNumber" />
                  {vodNumberError}
                </div>
              </div>

            </section>
          </section>

          <button className="payButton">Pay</button>

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
    </div >
  );
}

export default Booking;
