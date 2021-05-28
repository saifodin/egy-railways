import React from 'react';
import './LiveTrain.scss';
import Navbar from '../../components/Navbar/Navbar'
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
      },
      {
        name: "ismailia",
        orderInRoute: 4,
        arrives: "22:35:00",
        departs: "22:40:00",
        stopTime: 5
      }
    ]
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
        <div className="main">
          <h2>{trainData.number} Running Status</h2>
          <Segments routeStations={trainData.routeStations} />
        </div>
        <div className="side">
          side
        </div>
      </div>

    </div>
  );
}

export default LiveTrain;
