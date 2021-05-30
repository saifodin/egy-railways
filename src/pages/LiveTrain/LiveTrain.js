import React from 'react';
import './LiveTrain.scss';
import Navbar from '../../components/Navbar/Navbar'
import TrainCard from '../../components/TrainCard/TrainCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Segments from './Segments/Segments'
// import Footer from '../../components/Footer/Footer'

const LiveTrain = () => {

  const trainData = {
    number: "921",
    noOfStations: 4,
    fareClasses: [
      "1A",
      "2A",
      "3A"
    ],
    weekdaysRuns: {
      sat: false,
      sun: false, //
      mon: false,
      tue: false,
      wed: false,
      thu: true,
      fri: false
    },
    routeStations: [
      {
        name: "Cairo",
        orderInRoute: 1,
        arrives: "18:00:00",
        departs: "18:10:00",
        stopTime: 10
      },
      {
        name: "Tanta",
        orderInRoute: 2,
        arrives: "19:07:00",
        departs: "19:10:00",
        stopTime: 3
      },
      {
        name: "Sidi Gaber",
        orderInRoute: 3,
        arrives: "20:28:00",
        departs: "20:30:00",
        stopTime: 2
      },
      {
        name: "Alexandria",
        orderInRoute: 4,
        arrives: "20:35:00",
        departs: "20:40:00",
        stopTime: 5
      }
    ]
  }

  //* know my weekDayToday
  const weekDayToday = new Date().toLocaleString('en-US', { weekday: "short" }).toLowerCase();
  //// "sun"

  // const timeNow = new Date().toLocaleString('en-GB').slice(-8);

  //#region - comments - timeNow test cases for test
  //* time in specific station
  // const timeNow = "17:28:00" // not moving yet 
  // const timeNow = "18:10:00" // in cairo
  // const timeNow = "19:07:00" // arrive tanta now
  // const timeNow = "19:10:00" // depart from tanta
  // const timeNow = "20:28:00" // arrive sidi gaber
  // const timeNow = "20:30:00" //depart sidi gaber
  // const timeNow = "20:35:00" // arrive alex
  // const timeNow = "20:39:00" // still in alex
  const timeNow = "20:42:00" // not moving


  // const timeNow = "18:11:00" // between cairo & tanta 
  // const timeNow = "19:09:00" // waiting in tant
  // const timeNow = "19:12:00" // between tanta & sidi gaber
  // const timeNow = "20:29:00" // waiting in sidi gaber
  // const timeNow = "20:31:00" // between sidi  & alex

  //#endregion




  const NameNextDayWork = _ => {

    const KeysWeekdays = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"]
    const longWeekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    //* know my weekDayToday index
    const weekDayTodayIndex = KeysWeekdays.indexOf(weekDayToday)
    //// 1

    //* know the name of next day work, (either today work day or not)
    let LoopNum = 0;
    for (let i = weekDayTodayIndex + 1; LoopNum <= 1; i++) {
      // if array finish
      if (i === KeysWeekdays.length) {
        // when loop two times and didn't found true value (impossible), break
        LoopNum++
        // when array finish, start from begin
        i = 0;
      }
      // if trainData.weekdaysRuns[sun] === true, break, return
      if (trainData.weekdaysRuns[KeysWeekdays[i]]) {
        return longWeekdays[i]
      }
    }
  }

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
    let result = timeDate - timeNowIn > 0 ? true : false;
    //// result = 7

    return result
  }

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

  const isWaiting = () => {
    for (let key = 0; key < trainData.routeStations.length; key++) {
      if (isTimeBetweenOrEqual(trainData.routeStations[key].arrives, trainData.routeStations[key].departs)) {
        return {
          result: true,
          station: trainData.routeStations[key].name,
          departs: trainData.routeStations[key].departs,
          // arrives: trainData.routeStations[key].arrives
        }
      }
    }
    return {
      result: false
    }
  }

  const isBetweenStations = () => {
    for (let key = 0; key < trainData.routeStations.length - 1; key++) {
      if (isTimeBetweenOrEqual(trainData.routeStations[key].departs, trainData.routeStations[key + 1].arrives)) {
        return {
          result: true,
          nextStation: trainData.routeStations[key + 1].name,
          arrives: trainData.routeStations[key + 1].arrives
        }
      }
    }
    return {
      result: false
    }
  }


  let content;
  let secondDiv;

  //* today is a workDay
  if (trainData.weekdaysRuns[weekDayToday]) {

    // Not Started Yet
    if (isPastDate(trainData.routeStations[0].departs)) {
      content = (
        <div className="content">
          <div>
            <div className="icon"><i class="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div className="red">Not Started Yet</div>
              <div>will start after <span>{subTwoTimes(timeNow, trainData.routeStations[0].departs)}</span></div>
            </div>
          </div>
        </div>
      )
    }

    // Running Now
    else if (isTimeBetweenOrEqual(trainData.routeStations[0].departs, trainData.routeStations[trainData.routeStations.length - 1].arrives)) {
      //// if location in station
      if (isWaiting().result || timeNow === isWaiting().departs) {
        secondDiv = (
          <div>
            <div className="icon"><i class="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Waiting in <span className="underline">{isWaiting().station}</span> Station</div>
              <div>The train departs after <span>{subTwoTimes(timeNow, isWaiting().departs).slice(-3)}</span></div>
            </div>
          </div>
        )
      }
      //// if location in last station
      else if (timeNow === trainData.routeStations[trainData.routeStations.length - 1].departs) {
        secondDiv = (
          <div>
            <div className="icon"><i class="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Stop in <span className="underline">{isWaiting().station}</span> Station</div>
              <div>The train finish its journey</div>
            </div>
          </div>
        )
      }
      //// if location between two station
      else {
        secondDiv = (
          <div>
            <div className="icon"><i class="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Going To <span className="underline">{isBetweenStations().nextStation}</span> Station</div>
              <div>The train arrives in <span>{subTwoTimes(timeNow, isBetweenStations().arrives)}</span></div>
            </div>
          </div>
        )
      }

      content = (
        <div className="content">
          <div>
            <div className="icon"><i class="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div>Running Now</div>
              <div>has started since <span className="red">{subTwoTimes(trainData.routeStations[0].departs, timeNow)}</span></div>
            </div>
          </div>
          {secondDiv}
        </div>
      )
    }

    // Finish Its Journey
    else {
      content = (
        <div className="content">
          <div>
            <div className="icon"><i class="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div className="red">Finish Its Journey</div>
              <div>has finish since <span>{subTwoTimes(trainData.routeStations[trainData.routeStations.length - 1].arrives, timeNow)}</span></div>
            </div>
          </div>
        </div>
      )
    }

  }

  //* today is not workDay
  else {
    console.log("not Working today")
    content = (
      <div className="content">
        <div>
          <div className="icon"><i class="fas fa-bolt fa-2x fa-fw"></i></div>
          <div className="textContent">
            <div>Train Status</div>
            <div className="red">Not working Today</div>
            <div>first day of work is <span>{NameNextDayWork()}</span></div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="liveTrain">

      <div className="upperPart">
        <Navbar extraStyle="whiteBackground" />
        <div className="line"></div>
        <div className="SearchBarContainer">
          <SearchBar extraStyle="flat" searchOn="trains" />
        </div>
        <div className="line"></div>
      </div>

      <div className="mainPart container">
        <div className="runningStatus">
          <h2>{trainData.number} Running Status</h2>
          <div className="mainContent">
            <div className="segmentsContainer">
              <Segments routeStations={trainData.routeStations} timeNow={timeNow} />
            </div>
            <div className="refreshAndTime">
              <div class="refreshButton">
                <i class="fas fa-redo"></i>
                <div>Refresh</div>
              </div>
              <div className="lastUpdate">last update at {time24To12(timeNow)}</div>
            </div>
          </div>
        </div>
        <div className="side">
          <TrainCard forTrainPage liveTrainPage />
          <span> all train information <span class="anchor"></span></span>
          <div className="trainStatus">
            <div className="title">
              <h2>Train Status</h2>
              <div className="flash"><div><span></span></div></div>
            </div>
            {content}
          </div >
        </div >
      </div >
    </div >
  );
}

export default LiveTrain;
