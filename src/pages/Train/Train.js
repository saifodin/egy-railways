import React from 'react';
import css from './Train.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import TrainCard from '../../components/TrainCard/TrainCard';
import DayBox from '../../components/DayBox/DayBox';
// import TrainCard from '../TrainsBetweenStations/TrainsCards/TrainCard/TrainCard'

const Train = () => {
  return (
    <div className={css.train}>
      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar extraStyle="flat" searchOn="trains" />
        </div>
        <div className={css.line}></div>
      </div>
      <div className={`container`}>
        <TrainCard forTrainPage />
      </div>
      <h2>Fare and Seat Availability of 02461</h2>
      <div className={`container ${css.fareAndSeatContainer}`}>
        <div className={css.fareAndSeat}>
          <div className={css.inputs}>
            <div className={css.fromToSearch}>

              <form>
                <div>
                  <i className={`far fa-circle`}></i>
                  <select name="from" id="from">
                    <option value="Cairo">Cairo</option>
                    <option value="Shubra">Shubra</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Etay Elbarrowd">Etay Elbarrowd</option>
                    <option value="Sidi Gaber">Sidi Gaber</option>
                    <option value="Alexandria">Alexandria</option>
                  </select>
                  <i class="fas fa-chevron-down"></i>
                </div>

                <i class="far fa-arrow-alt-circle-right"></i>

                <div>
                  <i className="fas fa-map-marker-alt"></i>
                  <select name="to" id="to">
                    <option value="Cairo">Cairo</option>
                    <option value="Shubra">Shubra</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Etay Elbarrowd">Etay Elbarrowd</option>
                    <option value="Sidi Gaber">Sidi Gaber</option>
                    <option value="Alexandria" selected>Alexandria</option>
                  </select>
                  <i class="fas fa-chevron-down"></i>
                </div>
              </form>

            </div>
            <div className={css.fareAndPrice}>
              <div>
                <input type="radio" id="oneTrain-1A" name="oneTrain-class" defaultChecked />
                <label for="oneTrain-1A">1A<span>20</span></label>
                <div className={css.border}></div>
              </div>

              <div>
                <input type="radio" id="oneTrain-2A" name="oneTrain-class" />
                <label for="oneTrain-2A">2A<span>60</span></label>
                <div className={css.border}></div>
              </div>

              <div>
                <input type="radio" id="oneTrain-3A" name="oneTrain-class" />
                <label for="oneTrain-3A">3A<span>120</span></label>
                <div className={css.border}></div>
              </div>
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
    </div>
  );
}

export default Train;
