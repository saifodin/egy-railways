import React, { useState } from 'react';
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
import { stationsName, knowWeekday } from '../../shared/utility'


const TrainsBetweenStations = _ => {
  console.log("TrainsBetweenStations.js")


  
  //#region - get from, to, date, trainsDb values
  let params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('from')
  const toUrl = params.get('to')
  const dateUrl = params.get('date')
  // console.log(fromUrl)
  // console.log(toUrl)
  // console.log(dateUrl)
  const trainsDb = JSON.parse(window.localStorage.getItem('trainsDb'))
  // console.log(trainsDb)

  //#endregion

  //#region - create ourTrains form trainsDb based on search inputs
  //* to know did you want a train from alex->cairo or cairo->alex
  let isAlexToCairo = null;
  for (const value of stationsName) {
    if (value === fromUrl || value === toUrl) {
      // found from station first then alex->cairo
      if (value === fromUrl) {
        isAlexToCairo = true;
      }
      else {
        isAlexToCairo = false;
      }
      break;
    }
  }

  //* get all trains that have same direction
  let trainInMyDir = []
  if (isAlexToCairo) {
    for (const val of trainsDb) {
      if (val.value.stopStation[0].name === "Alexandria") {
        trainInMyDir.push(val)
      }
    }
  } else {
    for (const val of trainsDb) {
      if (val.value.stopStation[0].name === "Cairo") {
        trainInMyDir.push(val)
      }
    }
  }

  //* search first for fromUrl, if you found it search after that index for toUrl (not search form beginning) 
  let ourTrains = []
  for (const val of trainInMyDir) {
    let foundFromUrl = false
    // if this train run in this day
    if (val.value.weekDayRuns[knowWeekday(dateUrl)]) {
      for (const i in val.value.stopStation) {
        if (!foundFromUrl && val.value.stopStation[i].name === fromUrl) {
          foundFromUrl = true
        }
        if (foundFromUrl) {
          if (val.value.stopStation[i].name === toUrl) {
            ourTrains.push(val)
          }
        }
      }
    }
  }
  //#endregion

  //#region - change filters 
  //* Sorted by
  const [filterSorted, setFilterSorted] = useState("DEPARTURE_TIME");

  //* Class
  const [is1AActive, setIs1AActive] = useState(false)
  const [is2AActive, setIs2AActive] = useState(false)
  const [is3AActive, setIs3AActive] = useState(false)
  const whichClassIsActive = `${[is1AActive, is2AActive, is3AActive]}`
  const clickOnWhichLi = word => {
    if (word === "1A")
      setIs1AActive(prev => !prev)
    else if (word === "2A")
      setIs2AActive(prev => !prev)
    else if (word === "3A")
      setIs3AActive(prev => !prev)
  }

  //* Departure time
  const [morning, setMorning] = useState(false)
  const [afternoon, setAfternoon] = useState(false)
  const [midDay, setEvening] = useState(false)
  const [night, setNight] = useState(false)
  const depTimeFilter = `${[morning, afternoon, midDay, night]}`
  //#endregion


  return (
    <div className={css.TrainsBetweenStations}>

      <div className={css.upperPart}>
        <Navbar extraStyle="whiteBackground" />
        <div className={css.line}></div>
        <div className={css.SearchBarContainer}>
          <SearchBar extraStyle="flat" searchOn="stations" inputFrom={fromUrl} inputTo={toUrl} inputDate={dateUrl}/>
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
                  <label onClick={_ => setFilterSorted("DEPARTURE_TIME")} htmlFor="departure">departure time</label>
                </div>

                <div>
                  <input type="radio" id="duration" name="sortedBy" value="duration" />
                  <label onClick={_ => setFilterSorted("DURATION")} htmlFor="duration">duration</label>
                </div>

                <div>
                  <input type="radio" id="arrival" name="sortedBy" value="arrival" />
                  <label onClick={_ => setFilterSorted("ARRIVAL_TIME")} htmlFor="arrival">arrival time</label>
                </div>

              </div>
            </div>

            <span></span>

            <div className={css.class}>
              <h4>Class</h4>
              <div className={css.checkBoxOrRadioContainer}>
                <CheckBoxOrRadio
                  shapeOfStyles="basic"
                  isCheckBoxNotRadio={true}
                  wordsInLabel={['1A', '2A', '3A']}
                  nameOfRadio="FilterClass"
                  clickOnWhichLi={clickOnWhichLi}
                />
              </div>
            </div>
            <span></span>

            <div className={css.departureTime}>
              <h4>Departure time</h4>
              <div className={css.timesContainer}>

                <div>
                  <input type="checkbox" id="morning" name="morning" />
                  <label htmlFor="morning" onClick={_ => setMorning(prev => !prev)}>
                    <div className={css.innerSection}>
                      <img alt="morning" src={pngMorning} />
                      <p>05 AM - 11 AM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="afternoon" name="afternoon" />
                  <label htmlFor="afternoon" onClick={_ => setAfternoon(prev => !prev)}>
                    <div className={css.innerSection}>
                      <img alt="afternoon" src={pngAfternoon} />
                      <p>11 AM - 05 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="evening" name="evening" />
                  <label htmlFor="evening" onClick={_ => setEvening(prev => !prev)}>
                    <div className={css.innerSection}>
                      <img alt="evening" src={pngEvening} />
                      <p>05 PM - 11 PM</p>
                    </div>
                  </label>
                </div>

                <div>
                  <input type="checkbox" id="night" name="night" />
                  <label htmlFor="night" onClick={_ => setNight(prev => !prev)}>
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
          <TrainsCards
            filterSorted={filterSorted}
            whichClassIsActive={whichClassIsActive}
            depTimeFilter={depTimeFilter}
            ourTrains={ourTrains}
            fromUrl={fromUrl}
            toUrl={toUrl}
            dateUrl={dateUrl} />
        </div>
      </div>

      <div className={css.footer}>
        <Footer />
      </div>

    </div>
  )
};

export default TrainsBetweenStations;