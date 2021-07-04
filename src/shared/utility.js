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
    sun: false,
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

export const stationsAndGov = {
  "Alexandria": [
    { "name": "Alexandria", "isCapital": true, "order": 1 },
    { "name": "Sidi Gaber", "isCapital": false, "order": 2 }
  ],
  "Beheira": [
    { "name": "Kafr Aldawaar", "isCapital": false, "order": 3 },
    { "name": "Abu Homs", "isCapital": false, "order": 4 },
    { "name": "Damanhur", "isCapital": true, "order": 5 },
    { "name": "Etay Elbarrowd", "isCapital": false, "order": 6 },
    { "name": "Eltawfiqiuh", "isCapital": false, "order": 7 }
  ],
  "Gharbiya": [
    { "name": "Kafr Elzyat", "isCapital": false, "order": 8 },
    { "name": "Tanta", "isCapital": true, "order": 9 }
  ],
  "Menoufia": [
    { "name": "Barkih alsabe", "isCapital": false, "order": 10 },
    { "name": "Quesna", "isCapital": false, "order": 11 }
  ],
  "Qalyubia": [
    { "name": "Banha", "isCapital": true, "order": 12 },
    { "name": "Tookh", "isCapital": false, "order": 13 },
    { "name": "Qaha", "isCapital": false, "order": 14 },
    { "name": "Qalyoub", "isCapital": false, "order": 15 },
    { "name": "Shubra", "isCapital": false, "order": 16 }
  ],
  "Cairo": [
    { "name": "Cairo", "isCapital": true, "order": 17 }
  ],
}

export const stationsName = [
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
]

export let timeNow = new Date().toLocaleString('en-GB').slice(-8);

//#region - comments - timeNow test cases for test liveStation
//* firstWay
// timeNow = "07:40:00" // 902 in kafr -> tanta
// timeNow = "07:54:00" // 902 waiting in tanta
// timeNow = "08:00:00" // 902 tanta -> Barkih alsabe
// timeNow = "08:20:00" // 902 Barkih alsabe -> Quesna
// timeNow = "08:30:00" // 902 Quesna -> Banha

timeNow = "17:28:00" // 118 outNorth firstWay, 922 waiting in tanta, weekDayToday = "thu" 

//* secondWay
// timeNow = "06:48:00" // 903 in Banha -> Quesna
// timeNow = "07:00:00" // 903 in Quesna -> Barkih alsabe
// timeNow = "07:20:00" // 903 in Barkih alsabe -> tanta
// timeNow = "07:29:00" // 903 waiting in tanta
// timeNow = "07:40:00" // 903 tanta -> kafr


//#endregion

//#region - comments - timeNow test cases for test liveTrain
// timeNow = "17:28:00" // not moving yet 
// timeNow = "18:10:00" // in cairo
// timeNow = "18:11:00" // between cairo & tanta 
// timeNow = "19:07:00" // arrive tanta now
// timeNow = "19:09:00" // waiting in tanta
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

export let weekDayToday = new Date().toLocaleString('en-US', { weekday: "short" }).toLowerCase();
//// "sun"
weekDayToday = "thu"

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
//* "18:00:00" => "06:00 PM"
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
//* "18:00:00" => 1080
export const time24ToMin = time => {
  //// time = "18:00:00"

  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  //// time = ["18:00:00", "18", ":", "00", ":00"]

  // Remove "18:00:00" and ":00" 
  time = time.slice(1, 4);
  //// time = ["18", ":", "00"]

  return Number(time[0]) * 60 + Number(time[2])
}
//* "18:10:00","18:17:00" => "0h07m"
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

  // timeNow = "17:28:00"
  // console.log(isPastDate("20:00:00")) //true

  return result
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
//* 0 => "26 Jun Sat"
export const createDateFormat = index => {
  // 0 => today
  // 1 => tomorrow
  // 2 => afterTomorrow

  const day = new Date();

  day.setDate(day.getDate() + index)

  const dateFormateDigit = day.toLocaleDateString('en-GB')
  //// 26/06/2021
  const monthName = day.toLocaleString('en-US', { month: 'short' })
  //// Jun
  const weekDayName = day.toLocaleString('en-US', { weekday: 'short' })
  //// Sat
  const dayDigit = day.toLocaleString('en-US', { day: '2-digit' })
  //// 26
  const dateFormat = `${dayDigit} ${monthName}, ${weekDayName}`;
  //// 26 Jun Sat


  return {
    dateFormat,
    weekDayName,
    monthName,
    dayDigit,
    dateFormateDigit
  };
};
//* "01/07/2021" => "01 Jul, Thu"
export const digitDateToNice = dateFormateDigit => {
  //// "01/07/2021"

  const dayNum = Number(dateFormateDigit.slice(0, 2))
  //// 1
  const monthIndex = Number(dateFormateDigit.slice(3, 5) - 1)
  //// 6
  const year = Number(dateFormateDigit.slice(6))
  //// 2021

  const day = new Date(year, monthIndex, dayNum);
  //// object => Thu Jul 01 2021 00:00:00 GMT+0200 (Eastern European Standard Time)

  const monthName = day.toLocaleString('en-US', { month: 'short' })
  //// Jul
  const weekDayName = day.toLocaleString('en-US', { weekday: 'short' })
  //// Thu
  const dayDigit = day.toLocaleString('en-US', { day: '2-digit' })
  //// 01

  return `${dayDigit} ${monthName}, ${weekDayName}`;
  //// 01 Jul, Thu
};
//* "01/07/2021" => "thu"
export const knowWeekday = dateFormateDigit => {
  //// "01/07/2021"

  const day = Number(dateFormateDigit.slice(0, 2))
  //// 1
  const monthIndex = Number(dateFormateDigit.slice(3, 5) - 1)
  //// 6
  const year = Number(dateFormateDigit.slice(6))
  //// 2021

  const date = new Date(year, monthIndex, day);
  //// object => Thu Jul 01 2021 00:00:00 GMT+0200 (Eastern European Standard Time)

  return date.toLocaleString('en-US', { weekday: 'short' }).toLowerCase()
  //// "thu"
}
//* "2h04m" => "124"
export const ToMinOnly = hourAndMin => {
  //// 2h04m

  // know index of h 
  const indexOfH = hourAndMin.indexOf('h')
  //// 1

  const hours = Number(hourAndMin.slice(0, indexOfH))
  //// slice(0, 1) => Number(2) => 2
  const min = Number(hourAndMin.slice(indexOfH + 1, hourAndMin.length - 1))
  //// slice(2, 4) => Number(04) => 4

  return hours * 60 + min
  //// 124

}

export const calFaresPrices = (station, anotherStation, numOfStops) => {

  const stationsAndOrder = {
    "Alexandria": 1,
    "Sidi Gaber": 2,
    "Kafr Aldawaar": 3,
    "Abu Homs": 4,
    "Damanhur": 5,
    "Etay Elbarrowd": 6,
    "Eltawfiqiuh": 7,
    "Kafr Elzyat": 8,
    "Tanta": 9,
    "Barkih alsabe": 10,
    "Quesna": 11,
    "Banha": 12,
    "Tookh": 13,
    "Qaha": 14,
    "Qalyoub": 15,
    "Shubra": 16,
    "Cairo": 17
  }
  const distance = Math.abs(stationsAndOrder[station] - stationsAndOrder[anotherStation])

  return {
    p1A: (distance * 10) - (numOfStops * 4),
    p2A: (distance * 5) - (numOfStops * 2),
    p3A: (distance * 3) - (numOfStops * 1)
  }
}

export const KnowGov = (station) => {

  const stationsAndGov = [
    { "name": "Alexandria", "isCapital": true, "gov": "Alexandria" },
    { "name": "Sidi Gaber", "isCapital": false, "gov": "Alexandria" },
    { "name": "Kafr Aldawaar", "isCapital": false, "gov": "Beheira" },
    { "name": "Abu Homs", "isCapital": false, "gov": "Beheira" },
    { "name": "Damanhur", "isCapital": true, "gov": "Beheira" },
    { "name": "Etay Elbarrowd", "isCapital": false, "gov": "Beheira" },
    { "name": "Eltawfiqiuh", "isCapital": false, "gov": "Beheira" },

    { "name": "Kafr Elzyat", "isCapital": false, "gov": "Gharbiya" },
    { "name": "Tanta", "isCapital": true, "gov": "Gharbiya" },

    { "name": "Barkih alsabe", "isCapital": false, "gov": "Menoufia" },
    { "name": "Quesna", "isCapital": false, "gov": "Menoufia" },

    { "name": "Banha", "isCapital": true, "gov": "Qalyubia" },
    { "name": "Tookh", "isCapital": false, "gov": "Qalyubia" },
    { "name": "Qaha", "isCapital": false, "gov": "Qalyubia" },
    { "name": "Qalyoub", "isCapital": false, "gov": "Qalyubia" },
    { "name": "Shubra", "isCapital": false, "gov": "Qalyubia" },

    { "name": "Cairo", "isCapital": true, "gov": "Cairo" }
  ]
  for (const val of stationsAndGov) {
    if (station === val.name) {
      return {
        gov: val.gov,
        isCapital: val.isCapital
      }
    }
  }
}
