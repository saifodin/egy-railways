import React from 'react';
import css from './TrainsBetweenStations.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar';
import CheckBoxOrRadio from '../../components/CheckBoxOrRadio/CheckBoxOrRadio'
import pngMorning from '../../assets/imgs/time/morning.png'
import pngAfternoon from '../../assets/imgs/time/afternoon.png'
import pngEvening from '../../assets/imgs/time/evening.png'
import pngNight from '../../assets/imgs/time/night.png'


const TrainsBetweenStations = props => {
  return (
    <div className={css.TrainsBetweenStations}>
      <div className={css.upperPart}>
        <Navbar />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar />
        </div>
      </div>
      <div className={css.mainPart}>
        <div className={css.filtersContainer}>
          <div className={`${css.filters} container`}>

            <div className={css.class}>
              <h4>Class</h4>
              <div className={css.checkBoxOrRadioContainer}>
                <CheckBoxOrRadio shapeOfStyles="basic" isCheckBoxNotRadio={true} wordsInLabel={['1A', '2A', '3A']} nameOfRadio="gender" />
              </div>
            </div>

            <div className={css.departureTime}>
              <h4>Class</h4>
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
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="evening" name="evening" />
                  <label for="evening">
                    <div class={css.innerSection}>
                      <img alt="evening" src={pngEvening} />
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="night" name="night" />
                  <label for="night">
                    <div class={css.innerSection}>
                      <img alt="night" src={pngNight} />
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

              </div>
            </div>

            <div>Sort by</div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default TrainsBetweenStations;