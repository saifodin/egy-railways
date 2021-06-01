import React from 'react';
import './LiveTrain.scss';
import Navbar from '../../components/Navbar/Navbar'
import TrainCard from '../../components/TrainCard/TrainCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Segments from './Segments/Segments'
import Footer from '../../components/Footer/Footer'
import {
  timeNow,
  NameNextDayWork,
  trainData,
  weekDayToday,
  time24To12,
  subTwoTimes,
  isPastDate,
  isTimeBetweenOrEqual,
  isWaiting,
  isBetweenStations,

} from '../../shared/utility'

const LiveTrain = () => {


  //#region - generate content in trainStatus
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
  //#endregion


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
              <Segments />
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
              <h2>Train Status<span className="flash"><span><span></span></span></span></h2>
              {/* <div className="flash"><div><span></span></div></div> */}
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
