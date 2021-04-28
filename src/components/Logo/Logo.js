import React from 'react'
import { useLocation } from "react-router-dom";

import '../../assets/fonts/Nexa.css' //font
import css from './Logo.module.css'



const Logo = () => {

  //#region add extra styles for different pages
  const location = useLocation();
  let extraCss = "";
  if (location.pathname === '/trains-between-stations') {
    extraCss = css.trainsBetweenStations;
  }
  //#endregion

  return (
    <div className={`${css.logoContainer} ${extraCss}`}>
      <p className={css.firstLine}><span className={css.coloredPart}>EGY</span>Railways</p>
      {/* <p className={css.secondLine} >Lifeline of the Nation</p> */}
    </div>
  )
}

export default Logo
