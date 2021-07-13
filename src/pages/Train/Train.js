import React, { useState } from 'react';
import css from './Train.module.scss'
import Navbar from '../../components/Navbar/NavBar'
import SearchBar from '../../components/SearchBar/SearchBar'
import TrainCard from '../../components/TrainCard/TrainCard';
import DayBox from '../../components/DayBox/DayBox';
import Footer from '../../components/Footer/Footer'
import { subTwoTimes, time24To12, calFaresPrices, KnowGov } from '../../shared/utility'

const Train = () => {





  //#region - get train obj
  let params = new URLSearchParams(window.location.search);
  const trainName = params.get('name')
  const trainsDb = JSON.parse(window.localStorage.getItem('trainsDb'))
  let ourTrain = null;
  for (const val of trainsDb) {
    if (val.value.number === trainName) {
      ourTrain = val
    }
  }
  //#endregion

  console.log(ourTrain)

  //#region - handle Availability search

  const [from, setFrom] = useState(ourTrain.value.stopStation[0].name)
  const [to, setTo] = useState(ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name)
  const [, setFareClass] = useState('1A')

  // console.log(from)
  // console.log(to)

  //* know all Stations
  let fromIndex = null
  let allStations = []
  for (let i = 0; i < ourTrain.value.stopStation.length; i++) {
    allStations.push(ourTrain.value.stopStation[i].name)
  }

  const numberOfStops = allStations.indexOf(to) - allStations.indexOf(from) - 1


  //*generate optionsFrom
  let optionsFrom = []
  for (let i = 0; i < ourTrain.value.stopStation.length - 1; i++) {
    optionsFrom.push(
      <option key={i} value={`${ourTrain.value.stopStation[i].name}`}>{ourTrain.value.stopStation[i].name}</option>
    )
  }

  //* generate optionsTo
  let optionsTo = []
  if (ourTrain.value.stopStation) {
    if (from === ourTrain.value.stopStation[0].name) {
      for (let i = 1; i < ourTrain.value.stopStation.length; i++) {
        if (to === ourTrain.value.stopStation[i].name) {
          optionsTo.push(
            <option key={i} value={`${ourTrain.value.stopStation[i].name}`} selected>{ourTrain.value.stopStation[i].name}</option>
          )
        } else {
          optionsTo.push(
            <option key={i} value={`${ourTrain.value.stopStation[i].name}`}>{ourTrain.value.stopStation[i].name}</option>
          )
        }
      }
    }
    else {
      fromIndex = allStations.indexOf(from)
      for (let i = 1; i < ourTrain.value.stopStation.length; i++) {
        if (fromIndex >= i) {
          optionsTo.push(
            <option key={i} value={`${ourTrain.value.stopStation[i].name}`} disabled>{ourTrain.value.stopStation[i].name}</option>
          )
        }
        else {
          optionsTo.push(
            <option key={i} value={`${ourTrain.value.stopStation[i].name}`} >{ourTrain.value.stopStation[i].name}</option>
          )
        }
      }
    }
  }


  //* generate fareAndPrice
  let fareAndPrice = []
  if (ourTrain.value.fareClassess) {
    if (ourTrain.value.fareClassess['1A'])
      fareAndPrice.push(
        <div key={"1A"}>
          <input type="radio" id="oneTrain-1A" name="oneTrain-class" defaultChecked />
          <label htmlFor="oneTrain-1A" onClick={_ => setFareClass('1A')}>1A<span>{calFaresPrices(from, to, numberOfStops).p1A}</span></label>
          <div className={css.border}></div>
        </div>
      )
    if (ourTrain.value.fareClassess['2A'])
      fareAndPrice.push(
        <div key={"2A"}>
          <input type="radio" id="oneTrain-2A" name="oneTrain-class" defaultChecked />
          <label htmlFor="oneTrain-2A" onClick={_ => setFareClass('2A')}>2A<span>{calFaresPrices(from, to, numberOfStops).p2A}</span></label>
          <div className={css.border}></div>
        </div>
      )
    if (ourTrain.value.fareClassess['3A'])
      fareAndPrice.push(
        <div key={"3A"}>
          <input type="radio" id="oneTrain-3A" name="oneTrain-class" defaultChecked />
          <label htmlFor="oneTrain-3A" onClick={_ => setFareClass('3A')}>3A<span>{calFaresPrices(from, to, numberOfStops).p3A}</span></label>
          <div className={css.border}></div>
        </div>
      )
  }
  //#endregion

  //#region - handle Schedule
  let tbody = []
  if (ourTrain.value.stopStation) {
    tbody.push(
      <tr key={0}>
        <td>{ourTrain.value.stopStation[0].name}</td>
        <td>starts</td>
        <td>{ourTrain.value.stopStation[0].arrivalTime.slice(0, 5)}</td>
        <td>10 min</td>
        <td>1</td>
        <td>{KnowGov(ourTrain.value.stopStation[0].name).isCapital ? <i className="fas fa-flag"></i> : <i className={css.noFlag}></i>} {KnowGov(ourTrain.value.stopStation[0].name).gov}</td>
      </tr>
    )
    for (let i = 1; i < ourTrain.value.stopStation.length - 1; i++) {
      tbody.push(
        <tr key={i}>
          <td>{ourTrain.value.stopStation[i].name}</td>
          <td>{ourTrain.value.stopStation[i].arrivalTime.slice(0, 5)}</td>
          <td>{ourTrain.value.stopStation[i].departTime.slice(0, 5)}</td>
          <td>{ourTrain.value.stopStation[i].stopTime} min</td>
          <td>1</td>
          <td>{KnowGov(ourTrain.value.stopStation[i].name).isCapital ? <i className="fas fa-flag"></i> : <i className={css.noFlag}></i>} {KnowGov(ourTrain.value.stopStation[i].name).gov}</td>
        </tr>
      )
    }
    tbody.push(
      <tr key={ourTrain.value.stopStation.length - 1}>
        <td>{ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name}</td>
        <td>{ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].arrivalTime.slice(0, 5)}</td>
        <td>ends</td>
        <td>10 min</td>
        <td>1</td>
        <td>{KnowGov(ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name).isCapital ? <i className="fas fa-flag"></i> : <i className={css.noFlag}></i>} {KnowGov(ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name).gov}</td>
      </tr>
    )
  }
  //#endregion




  return (
    <div className={css.train}>

      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar
            extraStyle="flat"
            searchOn="trains"
            trainName={ourTrain.value.number}
            trainStart={ourTrain.value.stopStation[0].name}
            trainEnd={ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name}
          />
        </div>
        <div className={css.line}></div>
      </div>

      <div className={`${css.trainCard} container`}>
        <TrainCard
          forTrainPage
          name={ourTrain.value.number}
          trainStart={ourTrain.value.stopStation[0].name}
          trainEnd={ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name}
          journeyTime={subTwoTimes(ourTrain.value.stopStation[0].departTime, ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].arrivalTime)}
          startTime={time24To12(ourTrain.value.stopStation[0].departTime)}
          endTime={time24To12(ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].arrivalTime)}
          numberOfStations={ourTrain.value.stopStation.length - 2}
          weekDayRuns={ourTrain.value.weekDayRuns}
          rate="3.7"
          Fare1A={ourTrain.value.fareClassess['1A'] ? true : false}
          Fare2A={ourTrain.value.fareClassess['2A'] ? true : false}
          Fare3A={ourTrain.value.fareClassess['3A'] ? true : false}
        />
      </div>

      <div className={`${css.fareAndSeatContainer} container`}>
        <h2>Fare and Seat Availability of {ourTrain.value.number}</h2>
        <div className={css.fareAndSeat}>
          <div className={css.inputs}>
            <div className={css.fromToSearch}>

              <form>
                <div>
                  <i className={`far fa-circle`}></i>
                  <select name="from" id="from" value={from} onChange={e => setFrom(e.target.value)} onClick={_ => setTo(ourTrain.value.stopStation[ourTrain.value.stopStation.length - 1].name)}>
                    {optionsFrom}
                  </select>
                  <i className="fas fa-chevron-down"></i>
                </div>

                <i className="far fa-arrow-alt-circle-right"></i>

                <div>
                  <i className="fas fa-map-marker-alt"></i>
                  <select name="to" id="to" value={to} onChange={e => setTo(e.target.value)}>
                    {optionsTo}
                  </select>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </form>

            </div>
            <div className={css.fareAndPrice}>
              {fareAndPrice}
            </div>
          </div>
          <div className={css.results}>
            <DayBox date="3 May, Mon" availability="available" />
            <DayBox date="3 May, Mon" availability="not available" />
            <DayBox date="3 May, Mon" availability="not exist" />
            <DayBox date="3 May, Mon" availability="available" />
            <DayBox date="3 May, Mon" availability="not available" />
            <DayBox date="3 May, Mon" availability="not exist" />
            <DayBox date="3 May, Mon" availability="available" />
            <DayBox date="3 May, Mon" availability="not available" />
            <DayBox date="3 May, Mon" availability="not exist" />
            <DayBox date="3 May, Mon" availability="not exist" />
            <DayBox date="3 May, Mon" availability="not exist" />
            <DayBox date="3 May, Mon" availability="not exist" />
          </div>

        </div>
      </div>

      <div className={`${css.scheduleContainer} container`}>
        <div className={css.schedule}>
          <h2>{ourTrain.value.number} Schedule</h2>
          <div className={css.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Station Name</th>
                  <th>Arrives</th>
                  <th>Departs</th>
                  <th>Stop time</th>
                  <th>Day</th>
                  <th>Stn Governorate</th>
                </tr>
              </thead>
              <tbody>
                {tbody}
                {/* <tr>
                  <td>Cairo</td>
                  <td>starts</td>
                  <td>00:05</td>
                  <td>-</td>
                  <td>1</td>
                  <td>Cairo<i className="fas fa-flag"></i></td>
                </tr>
                <tr>
                  <td>Tanta</td>
                  <td>19:07</td>
                  <td>19:10</td>
                  <td>3</td>
                  <td>1</td>
                  <td>Gharbiya</td>
                </tr>
                <tr>
                  <td>Alexandria </td>
                  <td>20:35</td>
                  <td>20:40</td>
                  <td>5</td>
                  <td>1</td>
                  <td>Alexandria<i className="fas fa-flag"></i></td>
                </tr>
                <tr>
                  <td>Cairo</td>
                  <td>starts</td>
                  <td>00:05</td>
                  <td>-</td>
                  <td>1</td>
                  <td>Cairo</td>
                </tr>
                <tr>
                  <td>Tanta</td>
                  <td>19:07</td>
                  <td>19:10</td>
                  <td>3</td>
                  <td>1</td>
                  <td>Gharbiya</td>
                </tr>
                <tr>
                  <td>Alexandria </td>
                  <td>20:35</td>
                  <td>20:40</td>
                  <td>5</td>
                  <td>1</td>
                  <td>Alexandria</td>
                </tr>
                <tr>
                  <td>Cairo</td>
                  <td>starts</td>
                  <td>00:05</td>
                  <td>-</td>
                  <td>1</td>
                  <td>Cairo</td>
                </tr>
                <tr>
                  <td>Tanta</td>
                  <td>19:07</td>
                  <td>19:10</td>
                  <td>3</td>
                  <td>1</td>
                  <td>Gharbiya<i className="fas fa-flag"></i></td>
                </tr>
                <tr>
                  <td>Alexandria </td>
                  <td>20:35</td>
                  <td>20:40</td>
                  <td>5</td>
                  <td>1</td>
                  <td>Alexandria</td>
                </tr>
                <tr>
                  <td>Cairo</td>
                  <td>starts</td>
                  <td>00:05</td>
                  <td>-</td>
                  <td>1</td>
                  <td>Cairo</td>
                </tr>
                <tr>
                  <td>Tanta</td>
                  <td>19:07</td>
                  <td>19:10</td>
                  <td>3</td>
                  <td>1</td>
                  <td>Gharbiya<i className="fas fa-flag"></i></td>
                </tr>
                <tr>
                  <td>Alexandria </td>
                  <td>20:35</td>
                  <td>20:40</td>
                  <td>5</td>
                  <td>1</td>
                  <td>Alexandria</td>
                </tr>
                */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`${css.reviewContainer} container`}>
        <div className={css.review}>
          <h2>Rating and Reviews of {ourTrain.value.number}</h2>
          <div className={css.mainReview}>
            <div className={css.totalRate}>3.6</div>
            <div className={css.numberOfReviews}>15 Reviews</div>
          </div>
          <div className={css.subReviews}>
            <div className={css.cleanliness}>
              <div>Cleanliness</div>
              <div>
                <i className={`${css.active} fas fa-star`}></i>
                <i className={`${css.active} fas fa-star`}></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className={css.onTime}>
              <div>On Time</div>
              <div>
                <i className={`${css.active} fas fa-star`}></i>
                <i className={`${css.active} fas fa-star`}></i>
                <i className={`${css.active} fas fa-star`}></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className={css.onTime}>
              <div>Comforts</div>
              <div>
                <i className={`${css.active} fas fa-star`}></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css.footerContainer}>
        <Footer />
      </div>

    </div>
  );
}

export default Train;
