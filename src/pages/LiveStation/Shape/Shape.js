import React, { useEffect, useState } from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon';
import chairLeft from '../../../assets/imgs/otherSvg/chairLeft.svg';
import chairRight from '../../../assets/imgs/otherSvg/chairRight.svg';
import Railroad from '../../../assets/imgs/otherSvg/Railroad.svg';
// import { dbTrainsArray } from '../../../firebase/database';
import firebase from '../../../firebase/firebase';
import './Shape.scss'

const Shape = () => {

  console.log("Shape.js")


  const [trainsArray, setTrainsArray] = useState([])
  const db = firebase.firestore();

  useEffect(_ => {

    db.collection("trains")
      .get().then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        );
        setTrainsArray(arr)
      });
  }, [db]);


  const selectedStation = "Abu Homs";
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
  for (const key in northStationsArrays) {
    stations_southStations_pieces.push(
      <div className="piece" key={key}>
        <div className="station">
          <div className="stationName">{northStationsArrays[key]}</div>
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
  for (let i = 0; i < 17; i++) {
    arrowIcons.push(
      <i className="fas fa-angle-double-down" key={i}></i>
    )
  }
  //#endregion


  if (trainsArray.length) {

    console.log(trainsArray)
    console.log(trainsArray[0])
    // console.log(trainsArray[0].value.stopStation.length)

    // if (trainsArray[9].value.stopStation[0].name === "Cairo") {
    //   console.log(trainsArray[0].value.stopStation[0].name)
    // }

    // for (const key in trainsArray) {
    //   for (let i = 0; i < trainsArray[key].value.stopStation.length; i++) {
    //     if (trainsArray[key].value.stopStation[i].name === "Cairo") {
    //       console.log(key)
    //       // break
    //     }
    //   }
    // }
  }

  // let trainsInOurScope = []
  // for (const iterator of dbTrainsArray) {
  //   console.log(iterator)
  //   console.table(iterator)
  //   break
  // }

  // console.log(trainsArray)
  // console.log(trainsArray[0])


  // for (const key in dbTrainsArray) {
  //   for (let i = 0; i < dbTrainsArray[key].stopStation.length; i++) {
  //     if (dbTrainsArray[key].stopStation[i].name === "Cairo") {
  //       console.log(key)
  //       break
  //     }
  //   }
  // }





  return (
    <div className="shape">

      <div className="arrowsContainers">
        {arrowIcons}
      </div>

      <div className="firstWayTrains">

        <div className="northStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
                <div className="trainInfo">
                  <span>3124</span>
                  <span>departs after</span>
                  <span>99h02m</span>
                </div>
              </div>
            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

      </div>

      <div className="stations">

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

      </div>

      <div className="secondWayTrains">

        <div className="northStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
                <div className="trainInfo">
                  <span>3124</span>
                  <span>departs after</span>
                  <span>99h02m</span>
                </div>
              </div>
            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

      </div>

      <div className="arrowsContainers">
        {arrowIcons}
      </div>

    </div>
  );
}

export default Shape;
