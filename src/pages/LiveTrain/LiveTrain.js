import React from 'react';
import { useHistory } from "react-router-dom"
import './LiveTrain.scss';
import Navbar from '../../components/Navbar/Navbar'
import TrainCard from '../../components/TrainCard/TrainCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Segments from './Segments/Segments'
import Footer from '../../components/Footer/Footer'
import {
  timeNow,
  NameNextDayWork,
  weekDayToday,
  time24To12,
  subTwoTimes,
  isPastDate,
  isTimeBetweenOrEqual,
  isWaiting,
  isBetweenStations,
  refreshPage

} from '../../shared/utility'

const LiveTrain = () => {

  //#region - get train name then get all obj
  let params = new URLSearchParams(window.location.search);
  const trainName = params.get('name')
  const trainsDb = JSON.parse(window.localStorage.getItem('trainsDb'))
  let trainData = null;
  for (const val of trainsDb) {
    if (val.value.number === trainName) {
      trainData = val.value
    }
  }
  //#endregion

  console.log(trainData)

  //#region - generate content in trainStatus
  let content;
  let secondDiv;

  //* today is a workDay
  if (trainData.weekDayRuns[weekDayToday]) {

    // Not Started Yet
    if (isPastDate(trainData.stopStation[0].departTime)) {
      content = (
        <div className="content">
          <div>
            <div className="icon"><i className="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div className="red">Not Started Yet</div>
              <div>will start after <span>{subTwoTimes(timeNow, trainData.stopStation[0].departTime)}</span></div>
            </div>
          </div>
        </div>
      )
    }

    // Running Now
    else if (isTimeBetweenOrEqual(trainData.stopStation[0].departTime, trainData.stopStation[trainData.stopStation.length - 1].arrivalTime)) {
      //// if location in station
      if (isWaiting(trainData.stopStation).result || timeNow === isWaiting(trainData.stopStation).departs) {
        secondDiv = (
          <div>
            <div className="icon"><i className="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Waiting in <span className="underline">{isWaiting(trainData.stopStation).station}</span> Station</div>
              <div>The train departs after <span>{subTwoTimes(timeNow, isWaiting(trainData.stopStation).departs).slice(-3)}</span></div>
            </div>
          </div>
        )
      }
      //// if location in last station
      else if (timeNow === trainData.stopStation[trainData.stopStation.length - 1].departTime) {
        secondDiv = (
          <div>
            <div className="icon"><i className="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Stop in <span className="underline">{isWaiting(trainData.stopStation).station}</span> Station</div>
              <div>The train finish its journey</div>
            </div>
          </div>
        )
      }
      //// if location between two station
      else {
        secondDiv = (
          <div>
            <div className="icon"><i className="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train location</div>
              <div className="orange">Going To <span className="underline">{isBetweenStations(trainData.stopStation).nextStation}</span> Station</div>
              <div>The train arrives in <span>{subTwoTimes(timeNow, isBetweenStations(trainData.stopStation).arrives)}</span></div>
            </div>
          </div>
        )
      }

      content = (
        <div className="content">
          <div>
            <div className="icon"><i className="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div>Running Now</div>
              <div>has started since <span className="red">{subTwoTimes(trainData.stopStation[0].departTime, timeNow)}</span></div>
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
            <div className="icon"><i className="fas fa-bolt fa-2x fa-fw"></i></div>
            <div className="textContent">
              <div>Train Status</div>
              <div className="red">Finish Its Journey</div>
              <div>has finish since <span>{subTwoTimes(trainData.stopStation[trainData.stopStation.length - 1].arrivalTime, timeNow)}</span></div>
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
          <div className="icon"><i className="fas fa-bolt fa-2x fa-fw"></i></div>
          <div className="textContent">
            <div>Train Status</div>
            <div className="red">Not working Today</div>
            <div>first day of work is <span>{NameNextDayWork(trainData.weekDayRuns)}</span></div>
          </div>
        </div>
      </div>
    )
  }
  //#endregion

  //#region - when click on allTrainInformation button
  const history = useHistory();
  const trainInfoButtonClick = _ => {
    history.push(`/train?name=${trainData.number}`)
  }
  //#endregion

  return (
    <div className="liveTrain">

      <div className="upperPart">
        <Navbar extraStyle="whiteBackground" />
        <div className="line"></div>
        <div className="SearchBarContainer">
          <SearchBar
            extraStyle="flat"
            searchOn="trains"
            inLiveTrainPage
            trainName={trainData.number}
            trainStart={trainData.stopStation[0].name}
            trainEnd={trainData.stopStation[trainData.stopStation.length - 1].name}
          />
        </div>
        <div className="line"></div>
      </div>

      <div className="mainPart container">

        <div className="runningStatus">

          <h2>{trainData.number} Running Status</h2>

          <div className="mainContent">

            <div className="segmentsContainer">
              <Segments trainData={trainData} />
            </div>

            <div className="refreshAndTime">
              <div className="refreshButton">
                <i className="fas fa-redo"></i>
                <div onClick={refreshPage}>Refresh</div>
              </div>
              <div className="lastUpdate">last update at {time24To12(timeNow)}</div>
            </div>

          </div>

        </div>

        <div className="side">
          {/* <TrainCard liveTrainPage /> */}
          <TrainCard
            liveTrainPage
            name={trainData.number}
            trainStart={trainData.stopStation[0].name}
            trainEnd={trainData.stopStation[trainData.stopStation.length - 1].name}
            journeyTime={subTwoTimes(trainData.stopStation[0].departTime, trainData.stopStation[trainData.stopStation.length - 1].arrivalTime)}
            startTime={time24To12(trainData.stopStation[0].departTime)}
            endTime={time24To12(trainData.stopStation[trainData.stopStation.length - 1].arrivalTime)}
            numberOfStations={trainData.stopStation.length - 2}
            weekDayRuns={trainData.weekDayRuns}
            rate="3.7"
            Fare1A={trainData.fareClassess['1A'] ? true : false}
            Fare2A={trainData.fareClassess['2A'] ? true : false}
            Fare3A={trainData.fareClassess['3A'] ? true : false}
          />
          <span onClick={trainInfoButtonClick}> all train information <span className="anchor"></span></span>
          <div className="trainStatus">
            <div className="title">
              <h2>Train Status<span className="flash"><span><span></span></span></span></h2>
            </div>
            {content}
          </div >
        </div >

      </div >

      <div className="footerContainer">
        <Footer />
      </div>

    </div >
  );
}

export default LiveTrain;
