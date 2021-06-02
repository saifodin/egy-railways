import React from 'react';
import './LiveStation.scss';
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import Footer from '../../components/Footer/Footer'
import Shape from './Shape/Shape'
import { dbTrainsArray } from '../../firebase/database'

const LiveStation = () => {

  console.log(dbTrainsArray)

  return (
    <div className="liveStation">

      <div className="upperPart">
        <Navbar extraStyle="whiteBackground" />
        <div className="line"></div>
        <div className="SearchBarContainer">
          <SearchBar extraStyle="flat" searchOn="LiveStation" />
        </div>
        <div className="line"></div>
      </div>

      <div className="mainPart container">
        <div className="runningStatus">

          <h2> Abu Homs Station Live </h2>

          <div className="mainContent">

            <div className="refreshAndTime">
              <div class="refreshButton">
                <i class="fas fa-redo"></i>
                <div>Refresh</div>
              </div>
              <div className="lastUpdate">last update at </div>
            </div>

            <div className="shapeContainer">
              <Shape />
            </div>

          </div>

        </div>
      </div >

      <div className="footerContainer">
        <Footer />
      </div>

    </div>

  );
}

export default LiveStation;
