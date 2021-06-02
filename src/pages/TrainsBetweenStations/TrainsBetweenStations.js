import React from 'react';
import css from './TrainsBetweenStations.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar';
import Footer from '../../components/Footer/Footer'
import CheckBoxOrRadio from '../../components/CheckBoxOrRadio/CheckBoxOrRadio'
import TrainsCards from './TrainsCards/TrainsCards'
import pngMorning from '../../assets/imgs/time/morning.png'
import pngAfternoon from '../../assets/imgs/time/afternoon.png'
import pngEvening from '../../assets/imgs/time/evening.png'
import pngNight from '../../assets/imgs/time/night.png'


const TrainsBetweenStations = _ => {
  console.log("TrainsBetweenStations.js")

  return (
    <div className={css.TrainsBetweenStations}>

      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar extraStyle="flat" searchOn="stations"/>
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
                    <div className={css.innerSection}>
                      <img alt="morning" src={pngMorning} />
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="afternoon" name="afternoon" />
                  <label for="afternoon">
                    <div className={css.innerSection}>
                      <img alt="afternoon" src={pngAfternoon} />
                      <p>11 AM - 05 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="evening" name="evening" />
                  <label for="evening">
                    <div className={css.innerSection}>
                      <img alt="evening" src={pngEvening} />
                      <p>05 PM - 11 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="night" name="night" />
                  <label for="night">
                    <div className={css.innerSection}>
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
          <TrainsCards />
        </div>
      </div>

      <div className={css.footer}>
        <Footer />
      </div>

    </div>
  )
};

export default TrainsBetweenStations;