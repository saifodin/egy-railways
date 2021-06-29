import React, { useState, Fragment } from 'react';
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
  */

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
  let trainCard = (
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
                  <div div >
                    <input onClick={_ => changeFare("1A")} type="radio" id={`train-${props.name}-1A`} name={`train-${props.name}-class`} defaultChecked />
                    <label for={`train-${props.name}-1A`}>1A</label>
                  </div>
                }
                {props.p2A &&
                  <div>
                    <input onClick={_ => changeFare("2A")} type="radio" id={`train-${props.name}-2A`} name={`train-${props.name}-class`} defaultChecked />
                    <label for={`train-${props.name}-2A`}>2A</label>
                  </div>
                }

                {props.p3A &&
                  <div>
                    <input onClick={_ => changeFare("3A")} type="radio" id={`train-${props.name}-3A`} name={`train-${props.name}-class`} defaultChecked />
                    <label for={`train-${props.name}-3A`}>3A</label>
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
          <button>Train Details</button>
          <div className={css.closeButton} onClick={_ => setIsAvailOpen(false)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    </li >
  )

  //* when trainCard called by train page, or called by liveTrain page
  if (props.forTrainPage) {
    trainCard = (
      <div className={`${css.trainCard} ${isAvailOpenClass} ${css.forTrainPage} ${css.liveTrainPage}`}>
        <div className={css.trainData}>

          <div className={css.trainCardTop}>
            <div className={css.rating}>
              <p>3.6</p>
            </div>
            <span className={css.trainNo}>02461</span>
            <div className={css.weekDays}>
              <ul className="reset">
                <li className={css.noRun}>S</li>
                <li>S</li>
                <li className={css.noRun}>M</li>
                <li>T</li>
                <li className={css.noRun}>W</li>
                <li className={css.noRun}>T</li>
                <li>F</li>
              </ul>
            </div>
            <div className={css.classes}>
              <span>1A</span>
              <span>2A</span>
              <span>3A</span>
            </div>
          </div>

          <div className={css.trainCardMiddle}>

            <div className={css.timeInfo}>
              <div className={css.departureTimeInfo}>
                <span>10:27<span>PM</span></span>
                <span>Cairo</span>
              </div>

              <div className={css.durationAndStops}>
                <span className={css.duration}>2h13m</span>
                <div className={css.line}>
                  <span></span>
                  <span></span>
                </div>
                <span className={css.stops}>6 Stations Between</span>
              </div>

              <div className={css.arrivalTimeInfo}>
                <span>01:40<span>PM</span></span>
                <span>Alexandria</span>
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
