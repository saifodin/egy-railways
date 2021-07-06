import React from 'react';
import './AuthItem.scss'

const AuthItem = props => {

  //#region add extra styles based on props
  let extraCss = "";
  if (props.extraStyle === 'whiteBackground') {
    extraCss = "whiteBackground";
  }
  //#endregion

  return (
    <li className="authItem" onClick={_ => props.setOpenAuth(true)}>
      <i className={`fas fa-user-circle ${extraCss}`} ></i>
    </li>
  );
}

export default AuthItem;
