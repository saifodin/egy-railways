import React from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon'
import './Segments.scss'
import {
  timeNow,
  trainData,
  weekDayToday,
  time24To12,
  subTwoTimes,
  isPastDate,
  isTimeBetween
} from '../../../shared/utility'


const Segments = () => {

  const routeStations = trainData.routeStations;


  //#region - generate timePieces inside <div className = "time">
  let timePieces = [];
  for (let key = 0; key < routeStations.length; key++) {

    //* first time
    if (key === 0) {
      timePieces.push(
        <div className="piece start">
          <div className="start">{time24To12(routeStations[key].departs)}</div>
          <div className="middle">{subTwoTimes(routeStations[key].departs, routeStations[key + 1].arrives)}</div>
        </div>
      )
    }

    //* between first time and last time
    else if (key < routeStations.length - 1) {
      timePieces.push(
        <div className="piece">
          <div className="start">{time24To12(routeStations[key].arrives)}</div>
          <div className="middle first">{subTwoTimes(routeStations[key].arrives, routeStations[key].departs).slice(-3)}</div>
          <div className="end">{time24To12(routeStations[key].departs)}</div>
          <div className="middle second">{subTwoTimes(routeStations[key].departs, routeStations[key + 1].arrives)}</div>
        </div>
      )
    }

    //* last time
    else {
      timePieces.push(
        <div className="piece end">
          <div className="start">{time24To12(routeStations[key].arrives)}</div>
        </div>
      )
    }

  }
  //#endregion

  //#region - generate shapesPieces inside <div className = "shapes">
  let shapesPieces = [];
  let color = "";
  for (let key = 0; key < routeStations.length; key++) {

    //* first shape
    if (key === 0) {
      //  1 - train in depart station (train on circle), will start Now, will start after 1h, train finish
      if (
        routeStations[key].departs === timeNow ||
        isPastDate(routeStations[key].departs) ||
        !isPastDate(routeStations[routeStations.length - 1].departs) ||
        !trainData.weekdaysRuns[weekDayToday]
      ) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece start ${color}`}>
            <div className="start train trainStopContainer"><TrainIcon widthHight="18px" /></div>
            <div className="verLine"></div>
          </div>
        )
      }
      // 2 - train between the station and the next station (train on center of solid line)
      else if (isTimeBetween((routeStations[key].departs), (routeStations[key + 1].arrives))) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece start trainBetween ${color}`}>
            <div className="start"><div className="circle"></div></div>
            <div className="verLineWithTrain">
              <div className="halfVarLine firstHalf"></div>
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
              </div>
              <div className="halfVarLine secondHalf"></div>
            </div>
          </div>
        )
      }
      // 3 - not have any train
      else {
        shapesPieces.push(
          <div className={`piece start ${color}`}>
            <div className="start"><div className="circle"></div></div>
            <div className="verLine"></div>
          </div>
        )
      }
    }

    //* between first shape and last shapes
    else if (key < routeStations.length - 1) {
      // 1 - today is not workDay - not have any train === else
      if (!trainData.weekdaysRuns[weekDayToday]) {
        shapesPieces.push(
          <div className={`piece ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLine first"></div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLine second"></div>
          </div>
        )
      }
      // 2 - train in arrives station (train on mapMarker)
      else if (routeStations[key].arrives === timeNow) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece ${color}`}>
            <div className="start train trainStopContainer"><TrainIcon widthHight="18px" /></div>
            <div className="verLine first"></div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLine second"></div>
          </div>
        )
      }
      // 3 - train in center waiting (train on center of dashed line)
      else if (isTimeBetween((routeStations[key].arrives), (routeStations[key].departs))) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece trainBetween dashed ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLineWithTrain first">
              <div className="halfVarLine firstHalf"></div>
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
              </div>
              <div className="halfVarLine secondHalf"></div>
            </div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLine second"></div>
          </div>
        )
      }
      // 4 - train in departs station (train on circle)
      else if (routeStations[key].departs === timeNow) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece ${color} train`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLine first"></div>
            <div className="end train trainStopContainer"><TrainIcon widthHight="18px" /></div>
            <div className="verLine second"></div>
          </div>
        )
      }
      // 5 - train between the station and the next station (train on center of solid line)
      else if (isTimeBetween((routeStations[key].departs), (routeStations[key + 1].arrives))) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece trainBetween solid ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLine first"></div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLineWithTrain second">
              <div className="halfVarLine firstHalf"></div>
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
              </div>
              <div className="halfVarLine secondHalf"></div>
            </div>
          </div>
        )
      }
      // 6 - not have any train
      else {
        shapesPieces.push(
          <div className={`piece ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLine first"></div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLine second"></div>
          </div>
        )
      }
    }

    //* last shape
    else {
      // 1 - today is not workDay - not have any train === else
      if (!trainData.weekdaysRuns[weekDayToday]) {
        shapesPieces.push(
          <div className={`piece end ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
          </div>
        )
      }
      //  2 - train in arrives station (train on mapMarker)
      else if (routeStations[key].arrives === timeNow) {
        shapesPieces.push(
          <div className={`piece end ${color}`}>
            <div className="start train trainStopContainer"><TrainIcon widthHight="18px" /></div>
          </div>
        )
      }
      // 3 - not have any train
      else {
        shapesPieces.push(
          <div className={`piece end ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
          </div>
        )
      }
    }
  }
  //#endregion

  //#region - generate infoPieces inside <div className = "info">

  let infoPieces = [];
  for (let key = 0; key < routeStations.length; key++) {

    //* first info
    if (key === 0) {
      infoPieces.push(
        <div className="piece start">
          <div className="start">{routeStations[key].name}</div>
          <div className="stationInfo">departure from {routeStations[key].name}</div>
        </div>
      )
    }

    //* between first info and last info
    else if (key < routeStations.length - 1) {
      infoPieces.push(
        <div className="piece">
          <div className="start">{routeStations[key].name}</div>
          <div className="stationInfo">arrival to {routeStations[key].name}</div>
          <div className="end">{routeStations[key].name}</div>
          <div className="stationInfo">departure from {routeStations[key].name}</div>
        </div>
      )
    }

    //* last info
    else {
      infoPieces.push(
        <div className="piece end">
          <div className="start">{routeStations[key].name}</div>
        </div>
      )
    }

  }
  //#endregion

  return (
    <div className="segments">

      <div className="date">
        {timePieces}
      </div>

      <div className="shapes">
        {shapesPieces}
      </div>

      <div className="info">
        {infoPieces}
      </div>

    </div>
  );
}

export default Segments;
