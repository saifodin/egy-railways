import React, { useState } from 'react'
import css from './SearchBar.module.scss'
import StationIcon from '../../assets/imgs/iconsSvg/StationIcon.svg';
import { stationsAndGov, createDateFormat } from '../../shared/utility'
import { useHistory } from "react-router-dom"


const SearchBar = props => {
  // <SearchBar extraStyle="flat" searchOn="stations"/>
  // <SearchBar extraStyle="flat" searchOn="trains"/>
  // <SearchBar extraStyle="flat" searchOn="station"/>

  let fromInputLS = window.localStorage.getItem('fromInput')
  let toInputLS = window.localStorage.getItem('toInput')
  let dateInputIndexLS = Number(window.localStorage.getItem('selectedDateIndex'))

  if (dateInputIndexLS === null) {
    dateInputIndexLS = 0
  }

  const [fromStationValue, setFromStationValue] = useState(null);
  const [toStationValue, setToStationValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dateInputIndexLS); //// 0 === today


  //#region - generate options in datalist
  let optionsFrom = []
  let optionsTo = []
  let governorates = Object.keys(stationsAndGov)
  for (const x in governorates) {
    for (const y in Object.keys(stationsAndGov[governorates[x]])) {
      //// gov = governorates[x]
      //// station = stationsAndGov[governorates[x]][y].name
      if (stationsAndGov[governorates[x]][y].name !== toStationValue) {
        optionsFrom.push(
          <option key={`${x}${y}`} placeholder="sdf" value={stationsAndGov[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
      if (stationsAndGov[governorates[x]][y].name !== fromStationValue) {
        optionsTo.push(
          <option key={`${x}${y}`} placeholder="sdf" value={stationsAndGov[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
    }
  }
  //#endregion

  //#region - when Submit form
  const history = useHistory();
  const onSubmitHandler = (e) => {
    if (fromStationValue) window.localStorage.setItem('fromInput', fromStationValue);
    if (toStationValue) window.localStorage.setItem('toInput', toStationValue);
    window.localStorage.setItem('selectedDateIndex', selectedDate);
    e.preventDefault();
    if (props.searchOn === "stations") history.push(`/trains-between-stations?from=${fromInputLS}&to=${toInputLS}&date=${createDateFormat(selectedDate).dateFormateDigit}`);
  }
  //#endregion

  //#region - add extra styles based on props
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

  //#region - generate radio dates to put it in <from searchOn="stations"/>
  let numOfDays = 3;
  let radios = []
  for (let i = 0; i < numOfDays; i++) {
    if (selectedDate === i) {
      radios.push(
        <div key={i}>
          <input type="radio" id={`${i}-option`} name="selector" defaultChecked />
          <label htmlFor={`${i}-option`}>
            <div className={css.nextDate} onClick={_ => setSelectedDate(i)}>
              <p>{`${createDateFormat(i).dayDigit} ${createDateFormat(i).monthName}`}</p>
              <p>{createDateFormat(i).weekDayName}</p>
            </div>
          </label>
        </div>
      )
    } else {
      radios.push(
        <div key={i}>
          <input type="radio" id={`${i}-option`} name="selector" />
          <label htmlFor={`${i}-option`}>
            <div className={css.nextDate} onClick={_ => setSelectedDate(i)}>
              <p>{`${createDateFormat(i).dayDigit} ${createDateFormat(i).monthName}`}</p>
              <p>{createDateFormat(i).weekDayName}</p>
            </div>
          </label>
        </div>
      )
    }
  }
  //#endregion

  //#region - generate <form/> depends on props.searchOn
  let form = "";
  if (props.searchOn === "stations") {
    form = (
      <form onSubmit={onSubmitHandler}>
        <div className={css.inputContainer}>
          <i className={`far fa-circle`}></i>
          <input type="text" list="fromStation" placeholder="From: City, Station" onChange={e => setFromStationValue(e.target.value)} defaultValue={fromInputLS} />
          <datalist id="fromStation" className={css.datalist}>
            {optionsFrom}
          </datalist>
        </div>

        <div className={css.inputContainer}>
          <i className="fas fa-map-marker-alt"></i>
          <input className="input-field" list="toStation" type="text" placeholder="To: City, Station" onChange={e => setToStationValue(e.target.value)} defaultValue={toInputLS} />
          <datalist id="toStation" className={css.datalist}>
            {optionsTo}
          </datalist>
        </div>

        <div className={`${css.inputContainer} ${css.inputDateContainer}`}>
          <i className="far fa-calendar-alt"></i>
          <input className="input-field" type="string" readOnly value={createDateFormat(selectedDate).dateFormat} />
        </div>

        <div className={css.nextDatesContainer}>
          {radios}
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
