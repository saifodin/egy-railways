import React, { Fragment, useEffect, useState } from 'react';
import DayBox from './DayBox/DayBox';
import { createDateFormat, digitDateToFire } from '../../shared/utility'
import firebase from '../../firebase/firebase'


const DayBoxes = props => {

  //#region - props
  const fromStation = props.fromStation
  const toStation = props.toStation
  const trainNumber = props.trainNumber
  const classSelect = props.classSelect
  const weekDayRuns = props.weekDayRuns
  const digitDate = props.digitDate
  //#endregion


  // console.log(fromStation)
  // console.log(toStation)
  // console.log(trainNumber)
  // console.log(classSelect)
  // console.log(weekDayRuns)
  // console.log(digitDate)
  // console.log(day.dateFormateDigit)
  // console.log(day.dateFormat)

  const day = createDateFormat(0)

  const [journeysColl, setJourneysColl] = useState(null)


  useEffect(() => {
    firebase.firestore().collection("journeys").get().then(querySnapshot => {
      let arr = [];
      querySnapshot.docs.map((doc) =>
        arr.push({ trainNum: doc.id, value: doc.data() })
      );
      setJourneysColl(arr)
    })
  }, [])

  if (journeysColl) {

    //! all journeysColl
    console.log(journeysColl)

    //* get the specific train
    let myTrain = null
    for (const val of journeysColl) {
      if (val.trainNum === trainNumber) {
        myTrain = val
        break;
      }
    }

    //! myTrain
    console.log(myTrain)

    console.log(Object.keys(myTrain.value.scheduels[0])[0] === fromStation)
    //// true

    let station = Object.keys(myTrain.value.scheduels[0])[0];
    console.log(station)
    //// "Alexandria"

    console.log(myTrain.value.scheduels[0][station])
    ////{Tue, 20 Jul: {…}}

    console.log(myTrain.value.scheduels[0][station][digitDateToFire("18/07/2021")])
    ////{2A: 330, 3A: 350}  check if not undefined

    console.log(myTrain.value.scheduels[0][station][digitDateToFire("18/07/2021")][classSelect])
    //// 350 if > 0 then put this day
  }








  let DayBoxes = []
  for (let i = 0; i < 7; i++) {
    DayBoxes.push(
      <DayBox
        key={i}
        date={createDateFormat(i).dateFormat}
        availability="available"
        theDayIWant={createDateFormat(i).dateFormateDigit === digitDate}
      />
    )
  }






  return (
    <Fragment>
      {DayBoxes}
      {/* <DayBox date="3 May, Mon" availability="available" />
      <DayBox date="6 May, Thu" availability="not available" />
      <DayBox date="9 May, Sun" availability="available" theDayIWant={true} />
      <DayBox date="12 May, Wed" availability="not exist" />
      <DayBox date="12 May, Wed" availability="not exist" />
      <DayBox date="12 May, Wed" availability="not exist" />
      <DayBox date="12 May, Wed" availability="not exist" /> */}
    </Fragment>
  );
}

export default DayBoxes;
