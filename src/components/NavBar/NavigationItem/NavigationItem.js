import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

import css from './NavigationItem.module.css'

const NavigationItem = (props) => {

  //#region comments how add extra styles based on current location
  //// import { useLocation } from "react-router-dom";
  // const location = useLocation();
  // let extraCss = "";
  // if (location.pathname === '/trains-between-stations') {
  //   extraCss = css.trainsBetweenStations;
  // }
  //#endregion

  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
    extraCss = css.trainsBetweenStations;
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




