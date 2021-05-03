import React, { useState } from 'react';
import css from './TrainsBetweenStations.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar';
import CheckBoxOrRadio from '../../components/CheckBoxOrRadio/CheckBoxOrRadio'
import pngMorning from '../../assets/imgs/time/morning.png'
import pngAfternoon from '../../assets/imgs/time/afternoon.png'
import pngEvening from '../../assets/imgs/time/evening.png'
import pngNight from '../../assets/imgs/time/night.png'


const TrainsBetweenStations = props => {
  console.log("TrainsBetweenStations.js")

  const [isAvailOpen, setIsAvailOpen] = useState(false);
  let isAvailOpenClass = isAvailOpen ? "" : css.AvailClose;
  // const AvailOpenTrigger = _ => {
  //   setIsAvailOpen(!isAvailOpen)
  // }


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

  return (
    <div className={css.TrainsBetweenStations}>

      <div className={css.upperPart}>
        <Navbar />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar />
        </div>
        <div className={css.line}></div>
      </div>


      <div className={css.mainPart}>

        <div className={css.filtersContainer}>
          <div className={`${css.filters} container`}>

            <div className={css.sortedBy}>
              <h4>
                Sorted by
              </h4>
              <div className={css.optionsContainer}>

                <div>
                  <input type="radio" id="departure" name="sortedBy" value="departure" defaultChecked />
                  <label for="departure">departure time</label>
                </div>

                <div>
                  <input type="radio" id="duration" name="sortedBy" value="duration" />
                  <label for="duration">duration</label>
                </div>

                <div>
                  <input type="radio" id="arrival" name="sortedBy" value="arrival" />
                  <label for="arrival">arrival time</label>
                </div>

              </div>
            </div>

            <span></span>

            <div className={css.class}>
              <h4>Class</h4>
              <div className={css.checkBoxOrRadioContainer}>
                <CheckBoxOrRadio shapeOfStyles="basic" isCheckBoxNotRadio={true} wordsInLabel={['1A', '2A', '3A']} nameOfRadio="gender" />
              </div>
            </div>
            <span></span>

            <div className={css.departureTime}>
              <h4>Departure time</h4>
              <div className={css.timesContainer}>

                <div>
                  <input type="checkbox" id="morning" name="morning" />
                  <label for="morning">
                    <div class={css.innerSection}>
                      <img alt="morning" src={pngMorning} />
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="afternoon" name="afternoon" />
                  <label for="afternoon">
                    <div class={css.innerSection}>
                      <img alt="afternoon" src={pngAfternoon} />
                      <p>11 AM - 05 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="evening" name="evening" />
                  <label for="evening">
                    <div class={css.innerSection}>
                      <img alt="evening" src={pngEvening} />
                      <p>05 PM - 11 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="night" name="night" />
                  <label for="night">
                    <div class={css.innerSection}>
                      <img alt="night" src={pngNight} />
                      <p>11 PM - 05 AM</p>
                    </div>
                  </label>
                </div>

              </div>
            </div>

          </div>
        </div>

        <div className={css.trainsCardsContainer}>

          <div className={`${css.trainsCards} container`}>
            <ul className='reset'>
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
                      <div>
                        <p>3 May, Mon</p>
                        <p>available</p>
                        <button>Book Now</button>
                      </div>
                      <div>
                        <p>6 May, Thu</p>
                        <p className={css.notAvail}>not available</p>
                        <button>Book Now</button>
                      </div>
                      <div>
                        <p>9 May, Sun</p>
                        <p>available</p>
                        <button>Book Now</button>
                      </div>
                      <div>
                        <p>12 May, Wed</p>
                        <p className={css.notExist}></p>
                        <button>Book Now</button>
                      </div>
                    </div>
                    <button>Train Details</button>
                    <div className={css.closeButton} onClick={_ => setIsAvailOpen(false)}>
                      <i class="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TrainsBetweenStations;