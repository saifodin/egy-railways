export const trainData = {
  number: "921",
  noOfStations: 4,
  fareClasses: [
    "1A",
    "2A",
    "3A"
  ],
  weekdaysRuns: {
    sat: true,
    sun: false, //
    mon: false,
    tue: false,
    wed: false,
    thu: false,
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

export let timeNow = new Date().toLocaleString('en-GB').slice(-8);

//#region - comments - timeNow test cases for test
//* time in specific station
// timeNow = "17:28:00" // not moving yet 
// timeNow = "18:10:00" // in cairo
// timeNow = "18:11:00" // between cairo & tanta 
timeNow = "19:07:00" // arrive tanta now
// timeNow = "19:09:00" // waiting in tant
// timeNow = "19:10:00" // depart from tanta
// timeNow = "19:12:00" // between tanta & sidi gaber
// timeNow = "20:28:00" // arrive sidi gaber
// timeNow = "20:29:00" // waiting in sidi gaber
// timeNow = "20:30:00" //depart sidi gaber
// timeNow = "20:31:00" // between sidi  & alex
// timeNow = "20:35:00" // arrive alex
// timeNow = "20:39:00" // still in alex
// timeNow = "20:42:00" // not moving
//#endregion

export const weekDayToday = new Date().toLocaleString('en-US', { weekday: "short" }).toLowerCase();
//// "sun"

export const NameNextDayWork = _ => {

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

export const time24To12 = (time) => {
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

export const subTwoTimes = (startTime, endTime) => {
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

export const isPastDate = (timeDate) => {
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

export const isTimeBetweenOrEqual = (startTime, endTime) => {
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

export const isWaiting = () => {
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

export const isBetweenStations = () => {
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

export const isTimeBetween = (startTime, endTime) => {
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

  if (timeNowIn > startTime && endTime > timeNowIn) {
    return true
  } else {
    return false
  }
}
