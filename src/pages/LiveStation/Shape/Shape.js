import React from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon';
// import Chair from '../../../assets/imgs/otherSvg/chair.svg';
import chairLeft from '../../../assets/imgs/otherSvg/chairLeft.svg';
import chairRight from '../../../assets/imgs/otherSvg/chairRight.svg';
import Railroad from '../../../assets/imgs/otherSvg/Railroad.svg';
import './Shape.scss'

// "Alexandria"
// "Sidi Gaber"
// "Kafr Aldawaar"

// "Abu Homs"

// "Damanhur"
// "Etay Elbarrowd"
// "Eltawfiqiuh"

const railroads = [];
for (let i = 0; i < 5; i++) {
  railroads.push(
    <img src={Railroad} alt="Railroad" />
  )
}

const arrowIcons = [];
for (let i = 0; i < 9; i++) {
  arrowIcons.push(
    <i class="fas fa-angle-double-down"></i>
  )
}

const Shape = () => {
  return (
    <div className="shape">
      <div className="arrowsContainers">
        {arrowIcons}
      </div>

      <div className="firstWayTrains">

        <div className="northStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
                <div className="trainInfo">
                  <span>3124</span>
                  <span>departs after</span>
                  <span>99h02m</span>
                </div>
              </div>
            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

      </div>

      <div className="stations">

        <div className="northStations">

          <div className="piece">
            <div className="station">
              <div className="stationName">Alexandria</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>
          <div className="piece">
            <div className="station">
              <div className="stationName">Sidi Gaber</div>
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>
          <div className="piece">
            <div className="station">
              <div className="stationName">Kafr Aldawaar</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>

        </div>

        <div className="theStation">
          <div className="piece">
            <div className="station">
              <div className="stationName">Abu Homs</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
            <div className="circle"></div>
          </div>
        </div>

        <div className="southStations">
          <div className="piece">
            <div className="station">
              <div className="stationName">Damanhur</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>
          <div className="piece">
            <div className="station">
              <div className="stationName">Etay Elbarrowd</div>
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>
          <div className="piece">
            <div className="station">
              <div className="stationName">Eltawfiqiuh</div>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="verLine"></div>
          </div>

        </div>

      </div>

      <div className="secondWayTrains">

        <div className="northStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div className="train">
              {railroads}
              <div className="trainContainer">
                <TrainIcon widthHight="18px" color="white" />
                <div className="flash"><div><span></span></div></div>
                <div className="trainInfo">
                  <span>3124</span>
                  <span>departs after</span>
                  <span>99h02m</span>
                </div>
              </div>
            </div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          <div className="piece train">
            <div className="railroadsContainer">{railroads}</div>
            <div className="trainContainer">
              <TrainIcon widthHight="18px" color="white" />
              <div className="flash"><div><span></span></div></div>
              <div className="trainInfo">
                <span>3124</span>
                <span>departs after</span>
                <span>99h02m</span>
              </div>
            </div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
          <div className="piece">
            <div className="railroadsContainer">{railroads}</div>
          </div>
        </div>

      </div>

      <div className="arrowsContainers">
        {arrowIcons}
      </div>

    </div>
  );
}

export default Shape;
