import React, { useState, Fragment } from 'react';
import { useHistory } from "react-router-dom"
import DayBoxes from '../DayBoxes/DayBoxes';
import css from './TrainCard.module.scss'
import bookingDate from '../../assets/imgs/otherSvg/bookingDate.svg'

const TrainCard = props => {


  //#region - change <DayBoxes/> when change class
  let initialClassSelect = "1A"
  if (props.p2A) initialClassSelect = "2A"
  if (props.p3A) initialClassSelect = "3A"
  const [classSelect, setClassSelect] = useState(initialClassSelect)
  //#endregion

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
    setClassSelect(trainClassName)
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

          {isAvailOpen &&
            <div className={css.trainAvail}>
              <div className={css.daysBoxes}>
                <DayBoxes
                  fromStation={props.fromUrl}
                  toStation={props.toUrl}
                  trainNumber={props.name}
                  classSelect={classSelect}
                  weekDayRuns={props.weekDayRuns}
                  digitDate={props.digitDate}
                  departTimeDigit={props.departTimeDigit}
                  forBookingInfo={{
                    start: props.departTime,
                    end: props.arrivalTime,
                    journeyTime: props.journeyTime,
                    numberOfStops: props.numberOfStops,
                    price: fare ? fare : props.p3A ? props.p3A : props.p2A ? props.p2A : props.p1A ? props.p1A : null
                  }}
                />
              </div>
              <button onClick={trainDetailsButton}>Train Details</button>
              <div className={css.closeButton} onClick={_ => setIsAvailOpen(false)}>
                <i className="fas fa-times"></i>
              </div>
            </div>
          }
        </div>
      </li >
    )
  }

  //* when trainCard called by train page, or called by liveTrain page
  else if (props.forTrainPage || props.liveTrainPage) {
    trainCard = (
      <div className={`${css.trainCard} ${css.forTrainPage} ${css.liveTrainPage}`}>
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
            {props.forTrainPage &&
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

  else if (props.forBooking) {
    trainCard = (
      <div className={`${css.trainCard} ${css.forBooking}`}>
        <div className={css.trainData}>
          <div className={css.trainCardTop}>
            <span className={css.trainNo}>{props.name}</span>
          </div>

          <div className={css.trainCardMiddle}>
            <div className={css.timeInfo}>
              <div className={css.departureTimeInfo}>
                <span>{props.start.slice(0, props.start.length - 3)}<span>{props.end.slice(-2)}</span></span>
                <span>{props.startFrom}</span>
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
                <span>{props.end.slice(0, props.end.length - 3)}<span>{props.end.slice(-2)}</span></span>
                <span>{props.endIn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (props.myAccount) {
    trainCard = (
      <div className={`${css.trainCard} ${css.myAccount}`}>
        <div className={css.trainData}>

          <div className={css.trainCardTop}>
            <img src={bookingDate} alt="booking date icon" />
            <span>booking date and time: </span>
            <div className={css.bookingDate}>{props.bookingDate}</div>
            <div className={css.bookingTime}>{props.bookingTime}</div>
          </div>

          <div className={css.trainCardMiddle}>
            
            <div className={css.trainNoAndDate}>
              <div className={css.trainNo}>{props.name}</div>
              <div className={css.journeyDate}>{props.journeyDate}</div>
            </div>

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

            <div className={css.classAndPrice}>
              <span className={css.myClass}>{props.myClass}</span>
              <span className={css.price}>{props.price}<span>EGP</span></span>
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
