import React from 'react';
import css from './Train.module.scss'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import TrainCard from '../../components/TrainCard/TrainCard';
import DayBox from '../../components/DayBox/DayBox';
import Footer from '../../components/Footer/Footer'
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

      <div className={`${css.trainCard} container`}>
        <TrainCard forTrainPage />
      </div>

      <div className={`${css.fareAndSeatContainer} container`}>
        <h2>Fare and Seat Availability of 02461</h2>
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
                  <i className="fas fa-chevron-down"></i>
                </div>

                <i className="far fa-arrow-alt-circle-right"></i>

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
                  <i className="fas fa-chevron-down"></i>
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

      <div className={`${css.scheduleContainer} container`}>
        <div className={css.schedule}>
          <h2>02461 Schedule</h2>
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
                <tr>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`${css.reviewContainer} container`}>
        <div className={css.review}>
          <h2>Rating and Reviews of 02461</h2>
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
