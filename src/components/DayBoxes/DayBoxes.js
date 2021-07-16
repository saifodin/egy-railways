import React, { Fragment, useEffect, useState } from 'react';
import DayBox from './DayBox/DayBox';
import { createDateFormat, digitDateToFire, timeNow, isPastDate, subTwoTimes } from '../../shared/utility'
import firebase from '../../firebase/firebase'


const DayBoxes = props => {

  //#region - variables
  const fromStation = props.fromStation
  const toStation = props.toStation
  const trainNumber = props.trainNumber
  const classSelect = props.classSelect
  const weekDayRuns = props.weekDayRuns
  const digitDate = props.digitDate
  const departTimeDigit = props.departTimeDigit
  const forBookingInfo = props.forBookingInfo

  const [trainDoc, setTrainDoc] = useState(null)
  let myStations = [];
  let DayBoxes = []
  //#endregion


  //## get train doc from firestore
  useEffect(() => {
    firebase.firestore().collection("journeys").doc(trainNumber).get().then(doc => {
      setTrainDoc({ trainNum: doc.id, value: doc.data() })
    })
  }, [trainNumber, classSelect])


  //## determine my stations only 
  if (trainDoc) {
    let foundFirstStation = false
    for (const i in trainDoc.value.scheduels) {
      let station = Object.keys(trainDoc.value.scheduels[i])[0];
      if (!foundFirstStation) {
        if (station === fromStation) {
          foundFirstStation = true
        }
      }
      if (foundFirstStation) {
        if (station === toStation) {
          break;
        }
        myStations.push({ index: i, station: station })
      }
    }
  }


  //## function tell my if there are seats available or not
  const isBoxCanBook = digitDate => {
    let canBookThisBox = true
    for (const i in myStations) {
      let thatDay = trainDoc.value.scheduels[myStations[i].index][myStations[i].station][digitDateToFire(digitDate)]
      if (thatDay) {
        if (thatDay[classSelect] < 1) {
          canBookThisBox = false
        }
      }
    }
    return canBookThisBox
  }


  //## generate all <DayBox/> in this train (available, notAvailable, departed, notExist)
  if (trainDoc) {
    for (let i = 0; i < 7; i++) {
      //* when This train run in this day, based on week Day Work
      if (weekDayRuns[createDateFormat(i).weekDayName.toLowerCase()]) {
        //* when this day in today (available or notAvailable or departed)
        if (i === 0) {
          DayBoxes.push(
            <DayBox
              key={i}
              date={createDateFormat(i).dateFormat}
              availability={!isBoxCanBook(createDateFormat(i).dateFormat) ? "not available" : (isPastDate(departTimeDigit) ? "available" : "departed")}
              theDayIWant={createDateFormat(i).dateFormateDigit === digitDate}
              departAfter={isPastDate(departTimeDigit) ? subTwoTimes(timeNow, departTimeDigit) : null}
              departSince={!isPastDate(departTimeDigit) ? subTwoTimes(departTimeDigit, timeNow) : null}
              forBookingInfo={forBookingInfo}
              trainNumber={props.trainNumber}
              fromStation={props.fromStation}
              toStation={props.toStation}
              dayDigit={createDateFormat(i).dateFormateDigit}
              classSelect={props.classSelect}
            />
          )
        }
        //* when this day is not today (available or notAvailable)
        else (
          DayBoxes.push(
            <DayBox
              key={i}
              date={createDateFormat(i).dateFormat}
              availability={isBoxCanBook(createDateFormat(i).dateFormat) ? "available" : "not available"}
              theDayIWant={createDateFormat(i).dateFormateDigit === digitDate}
              forBookingInfo={forBookingInfo}
              trainNumber={props.trainNumber}
              fromStation={props.fromStation}
              toStation={props.toStation}
              dayDigit={createDateFormat(i).dateFormateDigit}
              classSelect={classSelect}
            />
          )
        )
      }
      //* when this train not running in this day, based on week Day Work (not exist)
      else {
        DayBoxes.push(
          <DayBox
            key={i}
            date={createDateFormat(i).dateFormat}
            availability="not exist"
          />
        )
      }
    }
  }




  return (
    <Fragment>
      {DayBoxes}
    </Fragment>
  );
}

export default DayBoxes;
