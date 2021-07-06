import React from 'react'
import { NavLink } from "react-router-dom";

import css from './NavigationItem.module.css'

const NavigationItem = (props) => {


  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
    extraCss = css.whiteBackground;
  }
  //#endregion

  return (
    <li className={css.navbarLists}>
      <NavLink className={`${css.navlink} ${extraCss}`} to={props.to} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem




