import React from 'react';
import TrainIcon from '../../../assets/imgs/iconsSvg/TrainIcon'
import './Segments.scss'


const Segments = (props) => {
  const routeStations = props.routeStations;

  // 0: {name: "Cairo", orderInRoute: 1, arrives: "18:00:00", departs: "18:10:00", stopTime: 10}
  // 1: {name: "Tanta", orderInRoute: 2, arrives: "19:07:00", departs: "19:10:00", stopTime: 3}
  // 2: {name: "Sidi Gaber", orderInRoute: 3, arrives: "20:28:00", departs: "20:30:00", stopTime: 2}
  // 3: {name: "Alexandria", orderInRoute: 4, arrives: "20:35:00", departs: "20:40:00", stopTime: 5}

  const time24To12 = (time) => {
    // time = "18:00:00"

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
    console.log(time)
    //// time = [6, ":", "00", "PM"]

    // 6 => "06"
    time[0] = time[0] < 10 ? `0${time[0]}` : time[0]
    //// time = ["06", ":", "00", "PM"]

    time = time.join('');
    //// time = "06:00 PM"

    return time
  }


  let dataPiece = [];
  for (let key = 0; key < routeStations.length - 1; key++) {
    dataPiece.push(
      <div className="piece">
        <div className="start">{routeStations[key].departs}</div>
        <di className="middle">1h22m</di>
        <div className="end">
          <div className="strong">{routeStations[key + 1].arrives}</div>
        </div>
      </div>
    )
  }

  /* <div className="start"><TrainIcon widthHight="18px" /></div> */

  return (
    <div className="segments">

      <div className="date">
        <div className="piece start">
          <div className="start">09:04 AM</div>
          <div className="middle">1h22m</div>
        </div>
        <div className="piece">
          <div className="start">09:04 AM</div>
          <div className="middle first">1h22m</div>
          <div className="end">10:04 AM</div>
          <div className="middle second">1h22m</div>
        </div>
        <div className="piece">
          <div className="start">09:04 AM</div>
          <div className="middle first">1h22m</div>
          <div className="end">10:04 AM</div>
          <div className="middle second">1h22m</div>
        </div>
        <div className="piece end">
          <div className="start">09:04 AM</div>
        </div>

      </div>

      <div className="shapes">
        <div className="piece start">
          <div className="start"><div className="circle"></div></div>
          <div className="verLine"></div>
        </div>
        <div className="piece">
          <div className="start"><i class="fas fa-map-marker-alt"></i></div>
          <div className="verLine first"></div>
          <div className="end"><div className="circle"></div></div>
          <div className="verLine second"></div>
        </div>
        <div className="piece">
          <div className="start"><i class="fas fa-map-marker-alt"></i></div>
          <div className="verLine first"></div>
          <div className="end"><div className="circle"></div></div>
          <div className="verLine second"></div>
        </div>
        <div className="piece end">
          <div className="start"><i class="fas fa-map-marker-alt"></i></div>
        </div>
      </div>

      <div className="info">
        <div className="piece start">
          <div className="start">Cairo</div>
          <div></div>
        </div>
        <div className="piece">
          <div className="start">Cairo</div>
          <div></div>
          <div className="end">Cairo</div>
          <div></div>
        </div>
        <div className="piece">
          <div className="start">Tanta</div>
          <div></div>
          <div className="end">TanTa</div>
          <div></div>
        </div>
        <div className="piece end">
          <div className="start">Tanta</div>
        </div>
      </div>
    </div>
  );
}

export default Segments;
