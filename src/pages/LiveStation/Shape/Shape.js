import React, { useEffect, useState } from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon';
import chairLeft from '../../../assets/imgs/otherSvg/chairLeft.svg';
import chairRight from '../../../assets/imgs/otherSvg/chairRight.svg';
import Railroad from '../../../assets/imgs/otherSvg/Railroad.svg';
// import { dbTrainsArray } from '../../../firebase/database';
import firebase from '../../../firebase/firebase';
import './Shape.scss';
import {
  timeNow,
  weekDayToday,
} from '../../../shared/utility'

const Shape = props => {




  const isTimeBetweenOrEqual = (startTime, endTime) => {
    let timeNowIn = timeNow
    timeNowIn = timeNowIn.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeNowIn];
    startTime = startTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [startTime];
    endTime = endTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [endTime];


    timeNowIn = timeNowIn.slice(1, 4);
    startTime = startTime.slice(1, 4);
    endTime = endTime.slice(1, 4);

    timeNowIn = (parseInt(timeNowIn[0], 10) * 60) + parseInt(timeNowIn[2], 10);
    startTime = (parseInt(startTime[0], 10) * 60) + parseInt(startTime[2], 10);
    endTime = (parseInt(endTime[0], 10) * 60) + parseInt(endTime[2], 10);

    if (timeNowIn >= startTime && endTime >= timeNowIn) {
      return true
    } else {
      return false
    }
  }

  const isBetweenStations = (trainData) => {
    for (let key = 0; key < trainData.stopStation.length - 1; key++) {
      if (isTimeBetweenOrEqual(trainData.stopStation[key].arrivalTime, trainData.stopStation[key + 1].departTime)) {
        return {
          result: true,
          lastStation: trainData.stopStation[key].name,
          nextStation: trainData.stopStation[key + 1].name,
        }
      }
    }
    return {
      result: false
    }
  }

  const subTwoTimes = (startTime, endTime) => {
    //// startTime = "18:10:00"
    //// endTime = "18:17:00"

    startTime = startTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [startTime];
    endTime = endTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [endTime];
    //// startTime = ["18:10:00", "18", ":", "10", ":00"]
    //// endTime = ["18:10:00", "18", ":", "17", ":00"]

    // Remove "18:00:00" and ":00" 
    startTime = startTime.slice(1, 4);
    endTime = endTime.slice(1, 4);
    //// startTime = ["18", ":", "10"]
    //// endTime = ["18", ":", "17"]

    // get minutes of startTime and endTime // (hour.int * 60 ) + (min.int)
    startTime = (parseInt(startTime[0], 10) * 60) + parseInt(startTime[2], 10);
    endTime = (parseInt(endTime[0], 10) * 60) + parseInt(endTime[2], 10);
    //// startTime = 1090 //m
    //// endTime = 1097  //m

    // to get subtract minutes
    let result = endTime - startTime;
    //// result = 7

    // get 0h7m => then git 0h07m 
    result = `${Math.floor(result / 60)}h${result > 10 ? result % 60 : `0${result % 60}`}m`
    //// result = "0h07m"

    return result
  }

  const isPastDate = (timeDate) => {
    //// startTime = "18:10:00"
    //// endTime = "18:17:00"

    let timeNowIn = timeNow
    timeNowIn = timeNowIn.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeNowIn];
    timeDate = timeDate.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [timeDate];
    //// startTime = ["18:10:00", "18", ":", "10", ":00"]
    //// endTime = ["18:10:00", "18", ":", "17", ":00"]

    // Remove "18:00:00" and ":00" 
    timeNowIn = timeNowIn.slice(1, 4);
    timeDate = timeDate.slice(1, 4);
    //// startTime = ["18", ":", "10"]
    //// endTime = ["18", ":", "17"]

    // get minutes of startTime and endTime // (hour.int * 60 ) + (min.int)
    timeNowIn = (parseInt(timeNowIn[0], 10) * 60) + parseInt(timeNowIn[2], 10);
    timeDate = (parseInt(timeDate[0], 10) * 60) + parseInt(timeDate[2], 10);
    //// startTime = 1090 //m
    //// endTime = 1097  //m

    // to get subtract minutes
    let result = timeDate - timeNowIn > 0 ? true : false;
    //// result = 7

    return result
  }

  const selectedStation = props.stationName;

  const [trainsArray, setTrainsArray] = useState([])

  const db = firebase.firestore();
  useEffect(_ => {
    db.collection("trains").get().then((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>
        arr.push({ id: doc.id, value: doc.data() })
      );
      setTrainsArray(arr)
      window.localStorage.setItem('trainsDb', JSON.stringify(arr));
    });

    // db.collection("trains").doc("new-train-03").set({
    //   name: "test3"
    // });

  }, [db]);

  const allStations = [
    "Alexandria",
    "Sidi Gaber",
    "Kafr Aldawaar",
    "Abu Homs",
    "Damanhur",
    "Etay Elbarrowd",
    "Eltawfiqiuh",
    "Kafr Elzyat",
    "Tanta",
    "Barkih alsabe",
    "Quesna",
    "Banha",
    "Tookh",
    "Qaha",
    "Qalyoub",
    "Shubra",
    "Cairo"
  ];

  const selectedStationIndex = allStations.indexOf(selectedStation);

  //#region - create northStationsArrays, southStationsArrays
  let northStationsArrays = [];
  for (let i = selectedStationIndex - 1; i !== selectedStationIndex - 4; i--) {
    if (allStations[i]) {
      northStationsArrays.push(
        allStations[i]
      )
    }
  }
  northStationsArrays.reverse()


  let southStationsArrays = [];
  for (let i = selectedStationIndex + 1; i !== selectedStationIndex + 4; i++) {
    if (allStations[i]) {
      southStationsArrays.push(
        allStations[i]
      )
    }
  }
  //#endregion

  //#region - generate stations_northStations_pieces, stations_southStations_pieces
  let stations_northStations_pieces = [];
  for (const key in northStationsArrays) {
    stations_northStations_pieces.push(
      <div className="piece" key={key}>
        <div className="station">
          <div className="stationName">{northStationsArrays[key]}</div>
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="verLine"></div>
      </div>
    )
  }

  let stations_southStations_pieces = [];
  for (const key in southStationsArrays) {
    stations_southStations_pieces.push(
      <div className="piece" key={key}>
        <div className="station">
          <div className="stationName">{southStationsArrays[key]}</div>
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="verLine"></div>
      </div>
    )
  };
  //#endregion

  //#region - generate multiple imgs, railRoad and arrowIcons
  const railroads = [];
  for (let i = 0; i < 5; i++) {
    railroads.push(
      <img src={Railroad} alt="Railroad" key={i} />
    )
  }
  const arrowIcons = [];
  for (let i = 0; i < 25; i++) {
    arrowIcons.push(
      <i className="fas fa-angle-double-down" key={i}></i>
    )
  }
  //#endregion

  // const stationsOnScope = [...northStationsArrays, selectedStation, ...southStationsArrays]
  const southStationsArraysRev = [...southStationsArrays].reverse();
  const northStationsArraysRev = [...northStationsArrays].reverse();
  // console.log(stationsOnScopeRev)
  // console.log(stationsOnScope)


  let firstWayTrains_theStation = null;
  let secondWayTrains_theStation = null;
  let piece = <div className="piece">
    <div className="railroadsContainer">{railroads}</div>
  </div>
  let firstWayTrains_northStations_1 = piece;
  let firstWayTrains_northStations_2 = piece;
  let firstWayTrains_northStations_3 = piece;
  let firstWayTrains_southStations_1 = piece;
  let firstWayTrains_southStations_2 = piece;
  let firstWayTrains_southStations_3 = piece;

  let secondWayTrains_northStations_1 = piece;
  let secondWayTrains_northStations_2 = piece;
  let secondWayTrains_northStations_3 = piece;
  let secondWayTrains_southStations_1 = piece;
  let secondWayTrains_southStations_2 = piece;
  let secondWayTrains_southStations_3 = piece;

  let firstWayTrains_outNorthStations = []
  let firstWayTrains_outSouthStations = []

  let secondWayTrains_outNorthStations = []
  let secondWayTrains_outSouthStations = []

  if (trainsArray.length) {

    // * print value keys to check spill of fields
    // for (const key in trainsArray) {
    // console.log(trainsArray[key].id)
    // console.log(Object.keys(trainsArray[key].value))
    // }

    // * print id and number
    // for (const key in trainsArray) {
    //   console.log(`${trainsArray[key].id} => ${trainsArray[key].value.number}`)
    // }

    // * print value to check all documents
    // for (const key in trainsArray) {
    //   console.log(trainsArray[key])
    // }

    //#region - create trainsOnScope 
    let trainsOnScope = [];
    for (const key in trainsArray) {
      // return all train running today && running now
      if (trainsArray[key].value.weekDayRuns[weekDayToday] && isTimeBetweenOrEqual(trainsArray[key].value.stopStation[0].departTime, trainsArray[key].value.stopStation[trainsArray[key].value.stopStation.length - 1].arrivalTime)) {
        for (let i = 0; i < trainsArray[key].value.stopStation.length; i++) {
          // return all train stop in selectedStation
          if (trainsArray[key].value.stopStation[i].name === selectedStation) {
            trainsOnScope.push({
              id: trainsArray[key].id,
              number: trainsArray[key].value.number,
              firstStation: trainsArray[key].value.stopStation[0].name,
              arrivalMainStation: trainsArray[key].value.stopStation[i].arrivalTime,
              departMainStation: trainsArray[key].value.stopStation[i].departTime,
              stopStation: trainsArray[key].value.stopStation
            })
            // don't continue other stopStation[i]
            break;
          }
        }
      }
    }
    //#endregion

    //#region - create trainsOnScopeFirstWay, trainsOnScopeSecondWay
    let trainsOnScopeFirstWay = [];
    let trainsOnScopeSecondWay = [];
    for (const key in trainsOnScope) {
      if (trainsOnScope[key].firstStation === "Alexandria") {
        trainsOnScopeFirstWay.push({
          ...trainsOnScope[key]
        })
      }
      else if (trainsOnScope[key].firstStation === "Cairo") {
        trainsOnScopeSecondWay.push({
          ...trainsOnScope[key]
        })
      }
      console.log(trainsOnScope[key])
      console.log(isBetweenStations(trainsOnScope[key]).lastStation)
      // console.log(trainsOnScope[key].arrivalMainStation)
      // console.log(subTwoTimes(timeNow, trainsOnScope[key].arrivalMainStation))
      console.log(isBetweenStations(trainsOnScope[key]).nextStation)
      // if (!isPastDate(trainsOnScope[key].arrivalMainStation)) {
      //   console.log(subTwoTimes(timeNow, trainsOnScope[key].arrivalMainStation))
      // }
      // console.log(!isPastDate(trainsOnScope[key].arrivalMainStation))
    }
    console.log(trainsOnScopeFirstWay)
    console.log("---")
    console.log(trainsOnScopeSecondWay)
    //#endregion

    //#region - put train in (.firstWayTrains .theStation) & in (.secondWayTrains .theStation)
    for (const key in trainsOnScopeFirstWay) {
      if (isTimeBetweenOrEqual(trainsOnScopeFirstWay[key].arrivalMainStation, trainsOnScopeFirstWay[key].departMainStation)) {
        firstWayTrains_theStation = (
          <div className="trainContainer">
            <TrainIcon widthHight="18px" color="white" />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeFirstWay[key].number}</span>
              <span>departs after</span>
              <span>{subTwoTimes(timeNow, trainsOnScopeFirstWay[key].departMainStation)}</span>
            </div>
          </div>
        )
      }
    }

    for (const key in trainsOnScopeSecondWay) {
      if (isTimeBetweenOrEqual(trainsOnScopeSecondWay[key].arrivalMainStation, trainsOnScopeSecondWay[key].departMainStation)) {
        secondWayTrains_theStation = (
          <div className="trainContainer">
            <TrainIcon widthHight="18px" color="white" />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeSecondWay[key].number}</span>
              <span>departs after</span>
              <span>{subTwoTimes(timeNow, trainsOnScopeSecondWay[key].departMainStation)}</span>
            </div>
          </div>
        )
      }
    }
    //#endregion

    //#region - put train in (.firstWayTrains) 
    for (const key in trainsOnScopeFirstWay) {
      // console.log(trainsOnScopeFirstWay[key])
      // console.log(isBetweenStations(trainsOnScopeFirstWay[key]).lastStation)
      // console.log(isBetweenStations(trainsOnScopeFirstWay[key]).nextStation)

      //* .firstWayTrains .northStations

      // .firstWayTrains .northStations .piece1
      if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === northStationsArrays[0] && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === northStationsArrays[1]) {
        firstWayTrains_northStations_1 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeFirstWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .firstWayTrains .northStations .piece2
      else if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === northStationsArrays[1] && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === northStationsArrays[2]) {
        firstWayTrains_northStations_2 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeFirstWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .firstWayTrains .northStations .piece3, if not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === northStationsArrays[2] && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === selectedStation && !isTimeBetweenOrEqual(trainsOnScopeFirstWay[key].arrivalMainStation, trainsOnScopeFirstWay[key].departMainStation)) {
        firstWayTrains_northStations_3 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeFirstWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }

      //* .firstWayTrains .southStations

      // .firstWayTrains .southStations .piece1, if not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === selectedStation && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === southStationsArrays[0] && !isTimeBetweenOrEqual(trainsOnScopeFirstWay[key].arrivalMainStation, trainsOnScopeFirstWay[key].departMainStation)) {
        firstWayTrains_southStations_1 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeFirstWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .firstWayTrains .southStations .piece1, if between fourth station and fifth station && not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === southStationsArrays[0] && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === southStationsArrays[1]) {
        firstWayTrains_southStations_2 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeFirstWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .firstWayTrains .southStations .piece1, if between fourth station and fifth station && not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeFirstWay[key]).lastStation === southStationsArrays[1] && isBetweenStations(trainsOnScopeFirstWay[key]).nextStation === southStationsArrays[2]) {
        firstWayTrains_southStations_3 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeFirstWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeFirstWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }

      //* .firstWayTrains .outNorthStations

      else if (isPastDate(trainsOnScopeFirstWay[key].arrivalMainStation) && !isTimeBetweenOrEqual(trainsOnScopeFirstWay[key].arrivalMainStation, trainsOnScopeFirstWay[key].departMainStation)) {
        firstWayTrains_outNorthStations.push(
          <div className="trainContainer" key={key}>
            <TrainIcon widthHight="18px" color="white" />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeFirstWay[key].number}</span>
              <span>departs after</span>
              <span>{subTwoTimes(timeNow, trainsOnScopeFirstWay[key].arrivalMainStation)}</span>
            </div>
            <div className="fromTo">
              <span>{isBetweenStations(trainsOnScopeFirstWay[key]).lastStation}</span>
              <span>to</span>
              <span>{isBetweenStations(trainsOnScopeFirstWay[key]).nextStation}</span>
            </div>
          </div>

        )
      }

      //* .firstWayTrains .outSouthStations

      else if (!isPastDate(trainsOnScopeFirstWay[key].arrivalMainStation) && !isTimeBetweenOrEqual(trainsOnScopeFirstWay[key].arrivalMainStation, trainsOnScopeFirstWay[key].departMainStation)) {
        firstWayTrains_outSouthStations.push(
          <div className="trainContainer" key={key}>
            <TrainIcon widthHight="18px" color="white" />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeFirstWay[key].number}</span>
              <span>left since</span>
              <span>{subTwoTimes(trainsOnScopeFirstWay[key].departMainStation, timeNow)}</span>
            </div>
            <div className="fromTo">
              <span>{isBetweenStations(trainsOnScopeFirstWay[key]).lastStation}</span>
              <span>to</span>
              <span>{isBetweenStations(trainsOnScopeFirstWay[key]).nextStation}</span>
            </div>
          </div>

        )
      }



    }
    //#endregion

    //#region - put train in (.secondWayTrains)
    for (const key in trainsOnScopeSecondWay) {

      //* .secondWayTrains .southStations

      // .secondWayTrains .southStations .piece1
      if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === southStationsArraysRev[0] && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === southStationsArraysRev[1]) {
        secondWayTrains_southStations_1 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeSecondWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .secondWayTrains .southStations .piece2
      else if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === southStationsArraysRev[1] && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === southStationsArraysRev[2]) {
        secondWayTrains_southStations_2 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeSecondWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .secondWayTrains .southStations .piece3, if not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === southStationsArraysRev[2] && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === selectedStation && !isTimeBetweenOrEqual(trainsOnScopeSecondWay[key].arrivalMainStation, trainsOnScopeSecondWay[key].departMainStation)) {
        secondWayTrains_southStations_3 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>departs after</span>
                <span>{subTwoTimes(timeNow, trainsOnScopeSecondWay[key].arrivalMainStation)}</span>
              </div>
            </div>
          </div>
        )
      }

      //* .secondWayTrains .northStations

      // .secondWayTrains .northStations .piece1, if not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === selectedStation && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === northStationsArraysRev[0] && !isTimeBetweenOrEqual(trainsOnScopeSecondWay[key].arrivalMainStation, trainsOnScopeSecondWay[key].departMainStation)) {
        secondWayTrains_northStations_1 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeSecondWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .secondWayTrains .northStations .piece1, if between fourth station and fifth station && not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === northStationsArraysRev[0] && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === northStationsArraysRev[1]) {
        secondWayTrains_northStations_2 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeSecondWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }
      // .secondWayTrains .northStations .piece1, if between fourth station and fifth station && not waiting in selectedStation
      else if (isBetweenStations(trainsOnScopeSecondWay[key]).lastStation === northStationsArraysRev[1] && isBetweenStations(trainsOnScopeSecondWay[key]).nextStation === northStationsArraysRev[2]) {
        secondWayTrains_northStations_3 = (
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>{trainsOnScopeSecondWay[key].number}</span>
                <span>left since</span>
                <span>{subTwoTimes(trainsOnScopeSecondWay[key].departMainStation, timeNow)}</span>
              </div>
            </div>
          </div>
        )
      }

      //* .secondWayTrains .outSouthStations

      else if (isPastDate(trainsOnScopeSecondWay[key].arrivalMainStation) && !isTimeBetweenOrEqual(trainsOnScopeSecondWay[key].arrivalMainStation, trainsOnScopeSecondWay[key].departMainStation)) {
        secondWayTrains_outSouthStations.push(
          <div className="trainContainer">
            <TrainIcon widthHight="18px" color="white" key={key} />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeSecondWay[key].number}</span>
              <span>departs after</span>
              <span>{subTwoTimes(timeNow, trainsOnScopeSecondWay[key].arrivalMainStation)}</span>
            </div>
            <div className="fromTo">
              <span>{isBetweenStations(trainsOnScopeSecondWay[key]).nextStation}</span>
              <span>to</span>
              <span>{isBetweenStations(trainsOnScopeSecondWay[key]).lastStation}</span>

            </div>
          </div>

        )
      }

      //* .secondWayTrains .outNorthStations

      else if (!isPastDate(trainsOnScopeSecondWay[key].arrivalMainStation) && !isTimeBetweenOrEqual(trainsOnScopeSecondWay[key].arrivalMainStation, trainsOnScopeSecondWay[key].departMainStation)) {
        secondWayTrains_outNorthStations.push(
          <div className="trainContainer" key={key}>
            <TrainIcon widthHight="18px" color="white" />
            <div className="flash"><div><span></span></div></div>
            <div className="trainInfo">
              <span>{trainsOnScopeSecondWay[key].number}</span>
              <span>left since</span>
              <span>{subTwoTimes(trainsOnScopeSecondWay[key].departMainStation, timeNow)}</span>
            </div>
            <div className="fromTo">
              <span>{isBetweenStations(trainsOnScopeSecondWay[key]).nextStation}</span>
              <span>to</span>
              <span>{isBetweenStations(trainsOnScopeSecondWay[key]).lastStation}</span>
            </div>
          </div>

        )
      }
    }
    //#endregion


  }


  return (
    <div className="shape">

      <div className="arrowsContainers">
        {arrowIcons}
      </div>

      <div className="firstWayTrains">
        <div className="out outNorthStations">
          <div className="railroadsContainer">
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
          </div>
          {firstWayTrains_outNorthStations}
        </div>

        <div className="northStations">
          {firstWayTrains_northStations_1}
          {firstWayTrains_northStations_2}
          {firstWayTrains_northStations_3}
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              {firstWayTrains_theStation}

            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          {firstWayTrains_southStations_1}
          {firstWayTrains_southStations_2}
          {firstWayTrains_southStations_3}
        </div>

        <div className="out outSouthStations">
          <div className="railroadsContainer">
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
          </div>
          {firstWayTrains_outSouthStations}
        </div>
      </div>

      <div className="stations">

        <div className="out">
          <div className="piece" >
            <div className="station">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>
        </div>
        <div className="northStations">
          {stations_northStations_pieces}
        </div>
        <div className="theStation">
          <div className="piece">
            <div className="station">
              <div className="stationName">{selectedStation}</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="southStations">
          {stations_southStations_pieces}
        </div>
        <div className="out">
          <div className="piece" >
            <div className="verLine"></div>
          </div>
        </div>
      </div>

      <div className="secondWayTrains">

        <div className="out outNorthStations">
          <div className="railroadsContainer">
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
          </div>
          {secondWayTrains_outNorthStations}
        </div>

        <div className="northStations">
          {secondWayTrains_northStations_3}
          {secondWayTrains_northStations_2}
          {secondWayTrains_northStations_1}
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              {secondWayTrains_theStation}
            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          {secondWayTrains_southStations_3}
          {secondWayTrains_southStations_2}
          {secondWayTrains_southStations_1}
        </div>

        <div className="out outSouthStations">
          <div className="railroadsContainer">
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
            <img src={Railroad} alt="Railroad" />
          </div>
          {secondWayTrains_outSouthStations}
        </div>

      </div>

      <div className="arrowsContainers">
        {arrowIcons}
      </div>

    </div>
  );
}

export default Shape;
