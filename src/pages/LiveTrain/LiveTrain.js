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
      sat: true,
      san: true,
      mon: true,
      tue: false,
      wed: true,
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

  const weekDayToday = new Date().toLocaleString('en-US', { weekday: "short" }).toLowerCase();

  if (trainData.weekdaysRuns[weekDayToday]) {
    console.log("not working")
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
              <Segments routeStations={trainData.routeStations} />
            </div>
            <div class="refreshButton">
              <i class="fas fa-redo"></i>
              <div class="u-ib text u-v-align-middle">Refresh</div>
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
            <div className="content">
              <div>
                <div className="icon"><i class="fas fa-bolt fa-2x fa-fw"></i></div>
                <div className="textContent">
                  <div>Train Status</div>
                  <div>Not working Today</div>
                  <div>first day of work is <span>Sunday</span></div>
                </div>
              </div>
              <div>
                <div className="icon"><i class="fas fa-map-marked-alt fa-2x fa-fw"></i></div>
                <div className="textContent">
                  <div>Train location</div>
                  <div>Waiting in <span>Tanta</span>Station</div>
                  <div>The train departs after<span> 4m</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTrain;
