import React from 'react';
import './LiveStation.scss';
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import Footer from '../../components/Footer/Footer'
import Shape from './Shape/Shape'
import { timeNow, time24To12, refreshPage } from '../../shared/utility'

const LiveStation = () => {


  //#region - get station name
  let params = new URLSearchParams(window.location.search);
  const stationName = params.get('station')
  //#endregion

  let isFirstRender = true;
  if (isFirstRender) {
    // refreshPage()
    isFirstRender = false
  }

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

          <h2> {stationName} Station Live </h2>

          <div className="mainContent">

            <div className="refreshAndTime">
              <div className="refreshButton">
                <i className="fas fa-redo"></i>
                <div onClick={refreshPage}>Refresh</div>
              </div>
              <div className="lastUpdate">last update at {time24To12(timeNow)}</div>
            </div>

            <div className="shapeContainer">
              <Shape stationName={stationName} />
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
