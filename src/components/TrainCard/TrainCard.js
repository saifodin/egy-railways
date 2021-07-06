import React, { useState, Fragment } from 'react';
import { useHistory } from "react-router-dom"
import DayBox from '../DayBox/DayBox'
import css from './TrainCard.module.scss'

const TrainCard = props => {
  // <TrainCard id name departTime arrivalTime dateUrl journeyTime numberOfStops p1A p2A p3A weekDayRuns isTopRated isCheapest isFastest /> // in TrainsCards.js
  // <TrainCard forTrainPage /> // in train.js

  /*
    <TrainCard
      key={val.id}
      id={val.id}
      name={val.value.number}
      departTime={val.value.departTime}
      arrivalTime={val.value.arrivalTime}
      dateUrl={digitDateToNice(dateUrl)}
      journeyTime={val.value.journeyTime}
      numberOfStops={val.value.numberOfStops}
      p1A={val.value.fareClassess["1A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p1A : null}
      p2A={val.value.fareClassess["2A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p2A : null}
      p3A={val.value.fareClassess["3A"] ? calFaresPrices(fromUrl, toUrl, val.value.numberOfStops).p3A : null}
      weekDayRuns={val.value.weekDayRuns}
      isTopRated={FastestId === val.value.number ? true : false}
      isCheapest={CheapestId === val.value.number ? true : false}
      isFastest={TopRatedId === val.value.number ? true : false}
    />

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
      rate="3.6"
      Fare1A={ourTrain.value.fareClassess['1A'] ? true : false}
      Fare2A={ourTrain.value.fareClassess['2A'] ? true : false}
      Fare3A={ourTrain.value.fareClassess['3A'] ? true : false}
    />
  */

  //#region - when click on trainDetails
  const history = useHistory();
  const trainDetailsButton = _ => {
    history.push(`/train?name=${props.name}`);
  }
  //#endregion

  //#region - when click on go to live Train
  const goToLiveTrain = _ => {
    history.push(`/live-train?name=${props.name}`);
  }
  //#endregion

  //#region add extra styles when Avail Closed
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  let isAvailOpenClass = isAvailOpen ? "" : css.AvailClose;
  //#endregion

  //#region get price when click on Name of fare class 
  const [fare, setFare] = useState(null)
  const changeFare = trainClassName => {
    switch (trainClassName) {
      case "1A":
        setFare(props.p1A)
        break;
      case "2A":
        setFare(props.p2A)
        break;
      case "3A":
        setFare(props.p3A)
        break;
      default:
        break;
    }
  }
  //#endregion

  //#region creat trainCard
  //* when trainCard called by TrainsBetweenStations page
  let trainCard = null
  if (props.forTrainsBetweenStations) {
    trainCard = (
      <li>
        <div className={`${css.trainCard} ${isAvailOpenClass}`}>
          <div className={css.trainData}>
            <div className={css.trainCardTags}>
              {/* {props.isTopRated &&
                <div>
                  <i className="fas fa-star"></i>
                  <p>Top Rated</p>
                </div>
              } */}
              {props.isFastest &&
                <div>
                  <i className="fas fa-star"></i>
                  <p>Fastest</p>
                </div>
              }
              {props.isCheapest &&
                <div>
                  <i className="fas fa-star"></i>
                  <p>Cheapest</p>
                </div>
              }
            </div>

            <div className={css.trainCardTop}>
              <span className={css.trainNo}>{props.name}</span>
              <div className={css.weekDays}>
                <ul className="reset">
                  {props.weekDayRuns.sat ? <li>S</li> : <li className={css.noRun}>S</li>}
                  {props.weekDayRuns.sun ? <li>S</li> : <li className={css.noRun}>S</li>}
                  {props.weekDayRuns.mon ? <li>M</li> : <li className={css.noRun}>M</li>}
                  {props.weekDayRuns.tue ? <li>T</li> : <li className={css.noRun}>T</li>}
                  {props.weekDayRuns.wed ? <li>W</li> : <li className={css.noRun}>W</li>}
                  {props.weekDayRuns.thu ? <li>T</li> : <li className={css.noRun}>T</li>}
                  {props.weekDayRuns.fri ? <li>F</li> : <li className={css.noRun}>F</li>}
                </ul>
              </div>
            </div>

            <div className={css.trainCardMiddle}>

              <div className={css.timeInfo}>
                <div className={css.departureTimeInfo}>
                  <span>{props.departTime.slice(0, props.departTime.length - 3)}<span>{props.departTime.slice(-2)}</span></span>
                  <span>{props.dateUrl}</span>
                </div>
                <div className={css.durationAndStops}>
                  <span className={css.duration}>{props.journeyTime}</span>
                  <div className={css.line}>
                    <span></span>
                    <span></span>
                  </div>
                  <span className={css.stops}>
                    {props.numberOfStops}
                    {props.numberOfStops > 1 ? " stops" : " stop"}
                  </span>
                </div>
                <div className={css.arrivalTimeInfo}>
                  <span>{props.arrivalTime.slice(0, props.arrivalTime.length - 3)}<span>{props.arrivalTime.slice(-2)}</span></span>
                  <span>{props.dateUrl}</span>
                </div>
              </div>

              <div className={css.fareClasses}>

                <div className={css.classes}>

                  {props.p1A &&
                    <div>
                      <input onClick={_ => changeFare("1A")} type="radio" id={`train-${props.name}-1A`} name={`train-${props.name}-class`} defaultChecked />
                      <label htmlFor={`train-${props.name}-1A`}>1A</label>
                    </div>
                  }
                  {props.p2A &&
                    <div>
                      <input onClick={_ => changeFare("2A")} type="radio" id={`train-${props.name}-2A`} name={`train-${props.name}-class`} defaultChecked />
                      <label htmlFor={`train-${props.name}-2A`}>2A</label>
                    </div>
                  }

                  {props.p3A &&
                    <div>
                      <input onClick={_ => changeFare("3A")} type="radio" id={`train-${props.name}-3A`} name={`train-${props.name}-class`} defaultChecked />
                      <label htmlFor={`train-${props.name}-3A`}>3A</label>
                    </div>
                  }

                </div>

                <div className={css.fare}>
                  <span>{fare ? fare : props.p3A ? props.p3A : props.p2A ? props.p2A : props.p1A ? props.p1A : null}</span>
                  <span>EGP</span>
                </div>
              </div>

              <div className={css.AvailButton}>
                <button onClick={_ => setIsAvailOpen(true)}>
                  Check Availability
                </button>
              </div>

            </div>

          </div>
          <div className={css.trainAvail}>
            <div className={css.daysBoxes}>
              <DayBox date="3 May, Mon" availability="available" />
              <DayBox date="6 May, Thu" availability="not available" />
              <DayBox date="9 May, Sun" availability="available" />
              <DayBox date="12 May, Wed" availability="not exist" />
            </div>
            <button onClick={trainDetailsButton}>Train Details</button>
            <div className={css.closeButton} onClick={_ => setIsAvailOpen(false)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        </div>
      </li >
    )
  }

  //* when trainCard called by train page, or called by liveTrain page
  else if (props.forTrainPage || props.liveTrainPage) {
    trainCard = (
      <div className={`${css.trainCard} ${isAvailOpenClass} ${css.forTrainPage} ${css.liveTrainPage}`}>
        <div className={css.trainData}>

          <div className={css.trainCardTop}>
            <div className={css.rating}>
              <p>{props.rate}</p>
            </div>
            <span className={css.trainNo}>{props.name}</span>
            <div className={css.weekDays}>
              <ul className="reset">
                {props.weekDayRuns.sat ? <li>S</li> : <li className={css.noRun}>S</li>}
                {props.weekDayRuns.sun ? <li>S</li> : <li className={css.noRun}>S</li>}
                {props.weekDayRuns.mon ? <li>M</li> : <li className={css.noRun}>M</li>}
                {props.weekDayRuns.tue ? <li>T</li> : <li className={css.noRun}>T</li>}
                {props.weekDayRuns.wed ? <li>W</li> : <li className={css.noRun}>W</li>}
                {props.weekDayRuns.thu ? <li>T</li> : <li className={css.noRun}>T</li>}
                {props.weekDayRuns.fri ? <li>F</li> : <li className={css.noRun}>F</li>}
              </ul>
            </div>
            <div className={css.classes}>
              {props.Fare1A ? <span>1A</span> : null}
              {props.Fare2A ? <span>2A</span> : null}
              {props.Fare3A ? <span>3A</span> : null}
            </div>
            { props.forTrainPage &&
              <div className={css.toLiveTrainContainer}>
                <span onClick={goToLiveTrain}> go to live train <span className={css.anchor}></span></span>
                <div className={css.flash}>
                  <div>
                    <span></span>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className={css.trainCardMiddle}>

            <div className={css.timeInfo}>
              <div className={css.departureTimeInfo}>
                <span>{props.startTime.slice(0, props.startTime.length - 3)}<span>{props.startTime.slice(-2)}</span></span>
                <span>{props.trainStart}</span>
              </div>

              <div className={css.durationAndStops}>
                <span className={css.duration}>{props.journeyTime}</span>
                <div className={css.line}>
                  <span></span>
                  <span></span>
                </div>
                <span className={css.stops}>{props.numberOfStations} Stations Between</span>
              </div>

              <div className={css.arrivalTimeInfo}>
                <span>{props.endTime.slice(0, props.endTime.length - 3)}<span>{props.endTime.slice(-2)}</span></span>
                <span>{props.trainEnd}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
  //#endregion

  return (
    <Fragment>
      {trainCard}
    </Fragment>
  );
}

export default TrainCard;
