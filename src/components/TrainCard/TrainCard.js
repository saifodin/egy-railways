import React, { useState, Fragment } from 'react';
import DayBox from '../DayBox/DayBox'
import css from './TrainCard.module.scss'

const TrainCard = props => {
  // <TrainCard />  // in TrainsBetweenStations.js
  // <TrainCard forTrainPage /> // in train.js


  //#region add extra styles when Avail Closed
  const [isAvailOpen, setIsAvailOpen] = useState(false);
  let isAvailOpenClass = isAvailOpen ? "" : css.AvailClose;
  //#endregion

  //#region get price when click on Name of fare class 
  const [fare, setFare] = useState(20)
  const changeFare = trainClassName => {
    switch (trainClassName) {
      case "1A":
        setFare(20)
        break;
      case "2A":
        setFare(60)
        break;
      case "3A":
        setFare(120)
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
            <div>
              <i class="fas fa-star"></i>
              <p>Top Rated</p>
            </div>
            {/* <div>
          <i class="fas fa-star"></i>
          <p>Fastest</p>
        </div>
        <div>
          <i class="fas fa-star"></i>
          <p>Cheapest</p>
        </div> */}
          </div>

          <div className={css.trainCardTop}>
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
          </div>

          <div className={css.trainCardMiddle}>

            <div className={css.timeInfo}>
              <div className={css.departureTimeInfo}>
                <span>10:27<span>PM</span></span>
                <span>02 May, Sun</span>
              </div>
              <div className={css.durationAndStops}>
                <span className={css.duration}>0h13m</span>
                <div className={css.line}>
                  <span></span>
                  <span></span>
                </div>
                <span className={css.stops}>2 stops</span>
              </div>
              <div className={css.arrivalTimeInfo}>
                <span>10:40<span>PM</span></span>
                <span>02 May, Sun</span>
              </div>
            </div>

            <div className={css.fareClasses}>

              <div className={css.classes}>

                <div>
                  <input onClick={_ => changeFare("1A")} type="radio" id="train-1A" name="train-class" defaultChecked />
                  <label for="train-1A">1A</label>
                </div>

                <div>
                  <input onClick={_ => changeFare("2A")} type="radio" id="train-2A" name="train-class" />
                  <label for="train-2A">2A</label>
                </div>

                <div>
                  <input onClick={_ => changeFare("3A")} type="radio" id="train-3A" name="train-class" />
                  <label for="train-3A">3A</label>
                </div>

              </div>

              <div className={css.fare}>
                <span>{fare}</span>
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
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </li>
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
