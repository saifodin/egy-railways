import React from 'react';
import css from './DayBox.module.scss'

const DayBox = props => {
  // <DayBox date="3 May, Mon" availability="available"/>
  // <DayBox date="3 May, Mon" availability="not available"/>
  // <DayBox date="3 May, Mon" availability="not exist"/>


  let style = "";
  switch (props.availability) {
    case "not available":
      style = css.notAvail
      break;
    case "not exist":
      style = css.notExist
      break;
    default:
      break;
  }

  return (
    <div className={css.dayBox}>
      <p>{props.date}</p>
      <p className={style} >{props.availability === "not exist" ? "" : props.availability}</p>
      <button>Book Now</button>
    </div>
  );
}

export default DayBox;
