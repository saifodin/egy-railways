import React from 'react'

import '../../assets/fonts/Nexa.css' //font
import css from './Logo.module.css'



const Logo = props => {


  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
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
