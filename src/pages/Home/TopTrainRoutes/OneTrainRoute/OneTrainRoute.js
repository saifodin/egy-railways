import React from 'react';
import css from './OneTrainRoute.module.css'

const OneTrainRoute = (props) => {
  return (
    <div className={css.OneTrainRoute}>
      <p>
        <span>{props.from}</span>
        <span>&nbsp;-&nbsp; </span>
        <span>{props.to}</span>
        <span className={css.searchBtn}>Search Train</span>
      </p>
    </div>
  );
}

export default OneTrainRoute;
