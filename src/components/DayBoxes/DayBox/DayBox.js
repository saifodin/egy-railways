import React from 'react';
import css from './DayBox.module.scss'
import firebase from '../../../firebase/firebase'
import { refreshPage } from '../../../shared/utility'
import { useHistory } from "react-router-dom";



const DayBox = props => {
  const history = useHistory();


  let style = "";
  switch (props.availability) {
    case "not available":
    case "departed":
      style = css.notAvail
      break;
    case "not exist":
      style = css.notExist
      break;
    default:
      break;
  }

  //## push these variables to booking page
  let name, fromStation, toStation, dayDigit, start, end, journeyTime, numberOfStops, classSelect, price
  if (props.forBookingInfo) {
    name = props.trainNumber
    dayDigit = props.dayDigit
    fromStation = props.fromStation
    toStation = props.toStation
    start = props.forBookingInfo.start
    end = props.forBookingInfo.end
    journeyTime = props.forBookingInfo.journeyTime
    numberOfStops = props.forBookingInfo.numberOfStops
    classSelect = props.classSelect
    price = props.forBookingInfo.price
  }


  const clickBookButton = _ => {
    //* button not disabled
    if (props.availability === "available") {
      //* not singIn
      if (!firebase.auth().currentUser) {
        window.localStorage.setItem('openAuth', "true");
        refreshPage()
      } else {
        history.push(`/booking?name=${name}&fromStation=${fromStation}&toStation=${toStation}&day=${dayDigit}&startAt=${start}&endAt=${end}&journeyTime=${journeyTime}&stops=${numberOfStops}&class=${classSelect}&price=${price}`);
      }
    }
  }

  return (
    <div className={`${css.dayBox} ${props.theDayIWant ? css.theDayIWant : null}`}>
      <p>{props.date}</p>
      <p className={style} >{props.availability === "not exist" ? "" : props.availability}</p>
      {props.departAfter && <p className={css.departAfter}>{props.departAfter}</p>}
      {props.departSince && <p className={css.departSince}>{props.departSince}</p>}
      <button onClick={clickBookButton}>Book Now</button>
    </div>
  );
}

export default DayBox;
