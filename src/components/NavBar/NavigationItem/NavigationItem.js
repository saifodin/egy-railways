import React from 'react'
import { NavLink } from "react-router-dom";

import css from './NavigationItem.module.css'

const NavigationItem = (props) => {
  return (
    <li className={css.navbarLists}>
      <NavLink className={css.navlink} to={props.to} exact={props.exact}>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem




