import React, { useState } from 'react'
import css from './SearchBar.module.scss'
import StationIcon from '../../assets/imgs/iconsSvg/StationIcon.svg';
import { stationsName, createDateFormat } from '../../shared/utility'
import { useHistory } from "react-router-dom"


const SearchBar = props => {
  // <SearchBar extraStyle="flat" searchOn="stations"/>
  // <SearchBar extraStyle="flat" searchOn="trains"/>
  // <SearchBar extraStyle="flat" searchOn="station"/>


  const [fromStationValue, setFromStationValue] = useState(null);
  const [toStationValue, setToStationValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0); //// 0 === today
  // const [dateValue, setDateValue] = useState((day + selectedDate).toLocaleDateString('en-GB'))
  // const [dateValue, setDateValue] = useState(createDateFormat(selectedDate).dateFormateDigit)
  // const [dateValue, setDateValue] = useState()

  //#region generate options in datalist

  let optionsFrom = []
  let optionsTo = []
  let governorates = Object.keys(stationsName)
  for (const x in governorates) {
    for (const y in Object.keys(stationsName[governorates[x]])) {
      //// gov = governorates[x]
      //// station = stationsName[governorates[x]][y].name
      if (stationsName[governorates[x]][y].name !== toStationValue) {
        optionsFrom.push(
          <option key={`${x}${y}`} placeholder="sdf" value={stationsName[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
      if (stationsName[governorates[x]][y].name !== fromStationValue) {
        optionsTo.push(
          <option key={`${x}${y}`} placeholder="sdf" value={stationsName[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
    }
  }

  //#endregion

  //#region - when Submit form
  const history = useHistory();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.searchOn === "stations") {
      history.push(`/trains-between-stations?from=${fromStationValue}&to=${toStationValue}&date=${createDateFormat(selectedDate).dateFormateDigit}`);
    }
  }
  //#endregion

  //#region generate date today, tomorrow,...
  // const createDateFormat = index => {
  //   // 0 => today
  //   // 1 => tomorrow
  //   // 2 => afterTomorrow

  //   const day = new Date();

  //   day.setDate(day.getDate() + index)

  //   const dateFormateDigit = day.toLocaleDateString('en-GB')
  //   //// 26/06/2021
  //   const monthName = day.toLocaleString('en-US', { month: 'short' })
  //   //// Jun
  //   const weekDayName = day.toLocaleString('en-US', { weekday: 'short' })
  //   //// Sat
  //   const dayDigit = day.toLocaleString('en-US', { day: '2-digit' })
  //   //// 26
  //   const dateFormat = `${dayDigit} ${monthName}, ${weekDayName}`;
  //   //// 26 Jun Sat


  //   return {
  //     dateFormat,
  //     weekDayName,
  //     monthName,
  //     dayDigit,
  //     dateFormateDigit
  //   };
  // };
  //#endregion 

  //#region add extra styles based on props
  let extraStyle = "";
  let searchOn = "";
  if (props.extraStyle === 'flat') {
    extraStyle = css.flat;
  }
  if (props.searchOn === 'trains') {
    searchOn = css.trains;
  }
  if (props.searchOn === 'LiveStation') {
    searchOn = css.liveStation;
  }
  //#endregion

  //#region transform from search stations to search Trains
  let form = "";
  if (props.searchOn === "stations") {
    form = (
      <form onSubmit={onSubmitHandler}>
        <div className={css.inputContainer}>
          <i className={`far fa-circle`}></i>
          <input type="text" list="fromStation" placeholder="From: City, Station" onChange={e => setFromStationValue(e.target.value)} />
          <datalist id="fromStation" className={css.datalist}>
            {optionsFrom}
          </datalist>
        </div>

        <div className={css.inputContainer}>
          <i className="fas fa-map-marker-alt"></i>
          <input className="input-field" list="toStation" type="text" placeholder="To: City, Station" onChange={e => setToStationValue(e.target.value)} />
          <datalist id="toStation" className={css.datalist}>
            {optionsTo}
          </datalist>
        </div>

        <div className={`${css.inputContainer} ${css.inputDateContainer}`}>
          <i className="far fa-calendar-alt"></i>
          <input className="input-field" type="string" readOnly value={createDateFormat(selectedDate).dateFormat} />
        </div>

        <div className={css.nextDatesContainer}>

          <div>
            <input type="radio" id="f-option" name="selector" defaultChecked />
            <label for="f-option">
              <div className={css.nextDate} onClick={_ => setSelectedDate(0)}>
                <p>{`${createDateFormat(0).dayDigit} ${createDateFormat(0).monthName}`}</p>
                <p>{createDateFormat(0).weekDayName}</p>
              </div>
            </label>
          </div>

          <div>
            <input type="radio" id="s-option" name="selector" />
            <label for="s-option">
              <div className={css.nextDate} onClick={_ => setSelectedDate(1)}>
                <p>{`${createDateFormat(1).dayDigit} ${createDateFormat(1).monthName}`}</p>
                <p>{createDateFormat(1).weekDayName}</p>
              </div>
            </label>
          </div>

          <div>
            <input type="radio" id="t-option" name="selector" />
            <label for="t-option">
              <div className={css.nextDate} onClick={_ => setSelectedDate(2)}>
                <p>{`${createDateFormat(2).dayDigit} ${createDateFormat(2).monthName}`}</p>
                <p>{createDateFormat(2).weekDayName}</p>
              </div>
            </label>
          </div>

        </div>

        <button className={css.searchButton}>Search</button>

      </form>
    )
  }
  else if (props.searchOn === "trains") {
    form = (
      <form>
        <div className={css.inputContainer}>
          <i className="fas fa-subway"></i>
          <input type="text" placeholder="Train Number" defaultValue="02461" />
        </div>

        <div className={css.inputContainer}>
          <i className={`far fa-circle`}></i>
          <input type="text" placeholder="From: City, Station" value="Start From: Cairo" disabled />
        </div>

        <div className={css.inputContainer}>
          <i className="fas fa-map-marker-alt"></i>
          <input className="input-field" type="text" placeholder="To: City, Station" value="End In: Alexandria" disabled />
        </div>

        <button className={css.searchButton}>Search Train</button>

      </form>
    )
  }
  else if (props.searchOn === "LiveStation") {
    form = (
      <form>
        <div className={css.inputContainer}>
          <img src={StationIcon} alt="Station Icon" />
          <input type="text" placeholder="Station Name" defaultValue="Tanta - Elgarbia" />
        </div>

        <button className={css.searchButton}>Search Train</button>

      </form>
    )
  }
  //#endregion

  return (
    <div className={css.SearchBarContainer}>
      <div className={`container ${css.SearchBar} ${extraStyle} ${searchOn}`}>
        {form}
      </div>
    </div>
  )
}

export default SearchBar
