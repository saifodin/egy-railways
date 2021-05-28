import React from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon'
import './Segments.scss'


const Segments = (props) => {
  const routeStations = props.routeStations;

  // 0: {name: "Cairo", orderInRoute: 1, arrives: "18:00:00", departs: "18:10:00", stopTime: 10}
  // 1: {name: "Tanta", orderInRoute: 2, arrives: "19:07:00", departs: "19:10:00", stopTime: 3}
  // 2: {name: "Sidi Gaber", orderInRoute: 3, arrives: "20:28:00", departs: "20:30:00", stopTime: 2}
  // 3: {name: "Alexandria", orderInRoute: 4, arrives: "20:35:00", departs: "20:40:00", stopTime: 5}

  // const timeNow = new Date().toLocaleString('en-GB').slice(-8);
  //// "08:48:47"

  //* time in specific station
  // const timeNow = "17:28:00" // not moving yet 
  // const timeNow = "18:10:00" // in cairo
  // const timeNow = "19:07:00" // arrive tanta now
  // const timeNow = "19:10:00" // depart from tanta
  // const timeNow = "20:28:00" // arrive sidi gaber
  // const timeNow = "20:30:00" //depart sidi gaber
  // const timeNow = "20:35:00" // arrive alex
  const timeNow = "20:40:00" // depart alex
  // const timeNow = "22:35:00" // arrive ism


  // const timeNow = "18:11:00" // between cairo & tanta 
  // const timeNow = "18:09:00" // waiting in tant
  // const timeNow = "19:12:00" // between tanta & sidi gaber
  // const timeNow = "19:29:00" // waiting in sidi gaber
  // const timeNow = "20:31:00" // between sidi  & alex
  // const timeNow = "20:37:00" // waiting in alex
  // const timeNow = "20:40:00" // between alex & ism




  const time24To12 = (time) => {
    //// time = "18:00:00"

    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    //// time = ["18:00:00", "18", ":", "00", ":00"]

    // Remove "18:00:00" and ":00" 
    time = time.slice(1, 4);
    //// time = ["18", ":", "00"]

    // time[3] = "null + AM" if time[0] < 12 
    time[3] = time[0] < 12 ? ' AM' : ' PM';
    //// time = ["23", ":", "00", "PM"]

    // time[0] = time[0] % 12
    // if (time[0] % 12 !== 0) time[0] = 12
    time[0] = time[0] % 12 || 12;
    //// time = [6, ":", "00", "PM"]

    // 6 => "06"
    time[0] = time[0] < 10 ? `0${time[0]}` : time[0]
    //// time = ["06", ":", "00", "PM"]

    time = time.join('');
    //// time = "06:00 PM"

    return time
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
    let result = timeDate - timeNowIn >= 0 ? true : false;
    //// result = 7

    return result
  }

  let dataPieces = [];
  for (let key = 0; key < routeStations.length; key++) {
    if (key === 0) {
      dataPieces.push(
        <div className="piece start">
          <div className="start">{time24To12(routeStations[key].departs)}</div>
          <div className="middle">{subTwoTimes(routeStations[key].departs, routeStations[key + 1].arrives)}</div>
        </div>
      )
    } else if (key < routeStations.length - 1) {
      dataPieces.push(
        <div className="piece">
          <div className="start">{time24To12(routeStations[key].arrives)}</div>
          <div className="middle first">{subTwoTimes(routeStations[key].arrives, routeStations[key].departs).slice(-3)}</div>
          <div className="end">{time24To12(routeStations[key].departs)}</div>
          <div className="middle second">{subTwoTimes(routeStations[key].departs, routeStations[key + 1].arrives)}</div>
        </div>
      )
    }
    else {
      dataPieces.push(
        <div className="piece end">
          <div className="start">{time24To12(routeStations[key].arrives)}</div>
        </div>
      )
    }
  }

  let infoPieces = [];
  for (let key = 0; key < routeStations.length; key++) {
    if (key === 0) {
      infoPieces.push(
        <div className="piece start">
          <div className="start">{routeStations[key].name}</div>
          <div></div>
        </div>
      )
    } else if (key < routeStations.length - 1) {
      infoPieces.push(
        <div className="piece">
          <div className="start">{routeStations[key].name}</div>
          <div></div>
          <div className="end">{routeStations[key].name}</div>
          <div></div>
        </div>
      )
    }
    else {
      infoPieces.push(
        <div className="piece end">
          <div className="start">{routeStations[key].name}</div>
        </div>
      )
    }
  }


  let shapesPieces = [];
  let color = "";
  for (let key = 0; key < routeStations.length; key++) {
    if (key === 0) {
      if (isPastDate(routeStations[key].departs)) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece start ${color}`}>
            <div className="start train"><TrainIcon widthHight="18px" /></div>
            <div className="verLine"></div>
          </div>
        )
      }
      else {
        shapesPieces.push(
          <div className={`piece start ${color}`}>
            <div className="start"><div className="circle"></div></div>
            <div className="verLine"></div>
          </div>
        )
      }
    }

    else if (key < routeStations.length - 1) {
      if (routeStations[key].arrives === timeNow) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece ${color}`}>
            <div className="start"><TrainIcon widthHight="18px" /></div>
            <div className="verLine first"></div>
            <div className="end"><div className="circle"></div></div>
            <div className="verLine second"></div>
          </div>
        )
      }
      else if (routeStations[key].departs === timeNow) {
        color = "colored"
        shapesPieces.push(
          <div className={`piece ${color} train`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
            <div className="verLine first"></div>
            <div className="end train"><TrainIcon widthHight="18px" /></div>
            <div className="verLine second"></div>
          </div>
        )
      }

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

    else {
      if (routeStations[key].arrives === timeNow) {
        shapesPieces.push(
          <div className={`piece end ${color}`}>
            <div className="start train"><TrainIcon widthHight="18px" /></div>
          </div>
        )
      } else {
        shapesPieces.push(
          <div className={`piece end ${color}`}>
            <div className="start"><i class="fas fa-map-marker-alt"></i></div>
          </div>
        )
      }
    }
  }


  /* <div className="start train"><TrainIcon widthHight="18px" /></div> */

  return (
    <div className="segments">

      <div className="date">
        {dataPieces}
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
