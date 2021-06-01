import React from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon';
// import Chair from '../../../assets/imgs/otherSvg/chair.svg';
import chairLeft from '../../../assets/imgs/otherSvg/chairLeft.svg';
import chairRight from '../../../assets/imgs/otherSvg/chairRight.svg';
import './Shape.scss'

// "Alexandria"
// "Sidi Gaber"
// "Kafr Aldawaar"

// "Abu Homs"

// "Damanhur"
// "Etay Elbarrowd"
// "Eltawfiqiuh"

const Shape = () => {
  return (
    <div className="shape">

      <div className="firstWayTrains">

        <div className="northStations">
          <div className="linesContainer">
            <div className="arrowIcon"><i class="fas fa-angle-double-down"></i></div>
            {/* train */}
            <div className="line">
              <div className="piece">
                <div className="verLine">
                  <div className="trainContainer">
                    <TrainIcon widthHight="18px" color="white" />
                    <div className="flash"><div><span></span></div></div>
                    <div className="trainInfo">
                      <span>3124</span>
                      <span>arrives in</span>
                      <span>99h02m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
          </div>
          <div className="linesContainer">
            <div className="arrowIcon"><i class="fas fa-angle-double-down"></i></div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
            {/* train */}
            <div className="line">
              <div className="piece">
                <div className="verLine">
                  <div className="trainContainer">
                    <TrainIcon widthHight="18px" color="white" />
                    <div className="flash"><div><span></span></div></div>
                    <div className="trainInfo">
                      <span>3124</span>
                      <span>arrives in</span>
                      <span>99h02m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
          </div>
          <div className="linesContainer">
            <div className="arrowIcon"><i class="fas fa-angle-double-down"></i></div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
            <div className="line">
              <div className="piece">
                <div className="verLine"></div>
              </div>
            </div>
            {/* train */}
            <div className="line">
              <div className="piece">
                <div className="verLine">
                  <div className="trainContainer">
                    <TrainIcon widthHight="18px" color="white" />
                    <div className="flash"><div><span></span></div></div>
                    <div className="trainInfo">
                      <span>3124</span>
                      <span>arrives in</span>
                      <span>99h02m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="theStation">
          <div className="box">
            <div className="chair left">
              <img src={chairLeft} alt="chair"></img>
            </div>
            <div>train</div>
            <div className="chair right">
              <img src={chairRight} alt="chair"></img>
            </div>
          </div>
        </div>

        <div className="southStations">
          <div>station1</div>
          <div>station2</div>
          <div>station3</div>
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
          <div>station1</div>
          <div>station2</div>
          <div>station3</div>
        </div>
        <div className="theStation">
          <div>BigStation</div>
        </div>
        <div className="southStations">
          <div>station1</div>
          <div>station2</div>
          <div>station3</div>
        </div>

      </div>

    </div>
  );
}

export default Shape;


{/* <div className="piece">
<div className="station"><div className="circle"></div></div>
<div className="verLine"></div>
</div>
<div className="piece">
<div className="station"><div className="circle"></div></div>
<div className="verLine"></div>
</div>
<div className="piece">
<div className="station"><div className="circle"></div></div>
<div className="verLine"></div>
</div> */}
