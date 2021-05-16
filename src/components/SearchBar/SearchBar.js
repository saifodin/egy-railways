import React, { useState } from 'react'
import css from './SearchBar.module.scss'

const SearchBar = props => {
  // <SearchBar extraStyle="flat" searchOn="stations"/>
  // <SearchBar extraStyle="flat" searchOn="trains"/>



  //#region generate date today, tomorrow,...
  const [selectedDate, setSelectedDate] = useState(0);
  const createDateFormat = index => {
    // 0 => today
    // 1 => tomorrow
    // 2 => afterTomorrow

    // const tomorrow = new Date()
    // tomorrow.setDate(tomorrow.getDate() + 1)

    // const afterTomorrow = new Date()
    // afterTomorrow.setDate(afterTomorrow.getDate() + 2)

    // console.log(day)
    // console.log(tomorrow)
    // console.log(afterTomorrow)

    const day = new Date();

    day.setDate(day.getDate() + index)


    const monthName = day.toLocaleString('en-US', { month: 'short' })
    const weekDayName = day.toLocaleString('en-US', { weekday: 'short' })
    const dayDigit = day.toLocaleString('en-US', { day: '2-digit' })
    const dateFormat = `${dayDigit} ${monthName}, ${weekDayName}`;

    return {
      dateFormat,
      weekDayName,
      monthName,
      dayDigit,
    };
  };
  //#endregion 

  //#region add extra styles based on props
  let extraStyle = "";
  if (props.extraStyle === 'flat') {
    extraStyle = css.flat;
  }
  let searchOn = "";
  if (props.searchOn === 'trains') {
    searchOn = css.trains;
  }
  //#endregion

  //#region transform from search stations to search Trains
  let form = "";
  if (props.searchOn === "stations") {
    form = (
      <form>
        <div className={css.inputContainer}>
          <i className={`far fa-circle`}></i>
          <input type="text" placeholder="From: City, Station" />
        </div>

        <div className={css.inputContainer}>
          <i className="fas fa-map-marker-alt"></i>
          <input className="input-field" type="text" placeholder="To: City, Station" />
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
  } else if (props.searchOn === "trains") {
    form = (
      <form>
        <div className={css.inputContainer}>
          <i className="fas fa-subway"></i>
          <input type="text" placeholder="Train Number" />
        </div>

        <div className={css.inputContainer}>
          <i className={`far fa-circle`}></i>
          <input type="text" placeholder="From: City, Station" disabled />
        </div>

        <div className={css.inputContainer}>
          <i className="fas fa-map-marker-alt"></i>
          <input className="input-field" type="text" placeholder="To: City, Station" disabled />
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
