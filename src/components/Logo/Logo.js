import React from 'react'
import '../../assets/fonts/Nexa.css' //font
import css from './Logo.module.css'



const Logo = () => {
  return (
    <div className={css.logoContainer}>
      <p className={css.firstLine}><span className={css.coloredPart}>EGY</span>Railways</p>
      <p className={css.secondLine} >Lifeline of the Nation</p>
    </div>
  )
}

export default Logo
