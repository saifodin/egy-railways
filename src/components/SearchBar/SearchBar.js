import React, { useState, Fragment } from 'react'
import css from './SearchBar.module.scss'
import StationIcon from '../../assets/imgs/iconsSvg/StationIcon.svg';
import { stationsAndGov, createDateFormat, refreshPage } from '../../shared/utility'
import { useHistory } from "react-router-dom"


const SearchBar = props => {
  // <SearchBar extraStyle="flat" searchOn="stations"/>
  // <SearchBar extraStyle="flat" searchOn="trains"/>
  // <SearchBar extraStyle="flat" searchOn="station"/>

  let fromInputLS = window.localStorage.getItem('fromInput')
  let toInputLS = window.localStorage.getItem('toInput')
  let dateInputIndexLS = Number(window.localStorage.getItem('selectedDateIndex'))
  let stationNameLS = window.localStorage.getItem('station')

  if (dateInputIndexLS === null) {
    dateInputIndexLS = 0
  }

  const [fromStationValue, setFromStationValue] = useState(fromInputLS);
  const [toStationValue, setToStationValue] = useState(toInputLS);
  const [selectedDate, setSelectedDate] = useState(dateInputIndexLS); //// 0 === today

  const [trainName, setTrainName] = useState(props.trainName);

  const [stationName, setStationName] = useState(stationNameLS)


  //#region - generate options in datalist
  let optionsFrom = []
  let optionsTo = []
  let allStation = []
  let allTrainsNames = []
  let governorates = Object.keys(stationsAndGov)
  for (const x in governorates) {
    for (const y in Object.keys(stationsAndGov[governorates[x]])) {
      //// gov = governorates[x]
      //// station = stationsAndGov[governorates[x]][y].name
      allStation.push(
        <option key={`${x}${y}`} value={stationsAndGov[governorates[x]][y].name}>{governorates[x]}</option>
      )
      if (stationsAndGov[governorates[x]][y].name !== toStationValue) {
        optionsFrom.push(
          <option key={`${x}${y}`} value={stationsAndGov[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
      if (stationsAndGov[governorates[x]][y].name !== fromStationValue) {
        optionsTo.push(
          <option key={`${x}${y}`} value={stationsAndGov[governorates[x]][y].name}>{governorates[x]}</option>
        )
      }
    }
  }

  const trainsDb = JSON.parse(window.localStorage.getItem('trainsDb'))
  for (const val of trainsDb) {
    allTrainsNames.push(
      <option option key={val.value.number} value={val.value.number} > {val.value.number}</option>
    )
  }
  //#endregion

  //#region - when Submit <form/>
  const history = useHistory();
  const onSubmitHandlerStations = (e) => {
    if (fromStationValue) window.localStorage.setItem('fromInput', fromStationValue);
    if (toStationValue) window.localStorage.setItem('toInput', toStationValue);
    window.localStorage.setItem('selectedDateIndex', selectedDate);
    e.preventDefault();
    history.push(`/trains-between-stations?from=${fromInputLS}&to=${toInputLS}&date=${createDateFormat(selectedDate).dateFormateDigit}`);
  }

  const onSubmitHandlerTrains = (e) => {
    e.preventDefault();
    props.inLiveTrainPage ? history.push(`/live-train?name=${trainName}`) : history.push(`/train?name=${trainName}`)
    refreshPage()
  }

  const onSubmitHandlerLiveStation = (e) => {
    e.preventDefault();
    window.localStorage.setItem('station', stationName);
    history.push(`/live-station?station=${stationName}`)
    refreshPage()
  }
  //#endregion

  //#region - add extra styles based on props
  let extraStyle = "";
  let searchOn = "";
  let whichTrainPage = "";
  if (props.extraStyle === 'flat') {
    extraStyle = css.flat;
  }
  if (props.searchOn === 'trains') {
    searchOn = css.trains;
    if (props.inHomePage) {
      whichTrainPage = css.trainHomePage
    }

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
      <form onSubmit={onSubmitHandlerStations}>
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
      <form onSubmit={onSubmitHandlerTrains}>
        <div className={css.inputContainer}>
          <i className="fas fa-subway"></i>
          <input type="text" list="allTrainsNames" placeholder="Train Number" defaultValue={trainName} onChange={e => setTrainName(e.target.value)} />
          <datalist id="allTrainsNames" className={css.datalist}>
            {allTrainsNames}
          </datalist>
        </div>

        {!props.inHomePage &&
          <Fragment>
            <div className={css.inputContainer}>
              <i className={`far fa-circle`}></i>
              <input type="text" defaultValue={`Start From: ${props.trainStart}`} disabled />
            </div>

            <div className={css.inputContainer}>
              <i className="fas fa-map-marker-alt"></i>
              <input className="input-field" type="text" defaultValue={`End In: ${props.trainEnd}`} disabled />
            </div>
          </Fragment>
        }

        <button className={css.searchButton}>Search Train</button>

      </form>
    )
  }
  else if (props.searchOn === "LiveStation") {
    form = (
      <form onSubmit={onSubmitHandlerLiveStation}>
        <div className={css.inputContainer}>
          <img src={StationIcon} alt="Station Icon" />
          <input type="text" list="allStations" placeholder="Station Name" defaultValue={stationName} onChange={e => setStationName(e.target.value)} />
          <datalist id="allStations" className={css.datalist}>
            {allStation}
          </datalist>
        </div>

        <button className={css.searchButton}>Search Station</button>

      </form>
    )
  }
  //#endregion



  return (
    <div className={css.SearchBarContainer}>
      <div className={`container ${css.SearchBar} ${extraStyle} ${searchOn} ${whichTrainPage}`}>
        {form}
      </div>
    </div>
  )
}

export default SearchBar
