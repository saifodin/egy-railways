import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

import css from './NavigationItem.module.css'

const NavigationItem = (props) => {

  // add this className in trains-between-stations page
  const location = useLocation();
  let extraCss = "";
  if (location.pathname === '/trains-between-stations') {
    extraCss = css.trainsBetweenStations;
  }

  return (
    <li className={css.navbarLists}>
      <NavLink className={`${css.navlink} ${extraCss}`} to={props.to} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem




